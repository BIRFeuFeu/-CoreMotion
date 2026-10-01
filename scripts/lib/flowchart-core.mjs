/**
 * CoreMotiom — Núcleo do fluxograma do usuário.
 * -------------------------------------------------
 * Fonte única de verdade: dados dos diagramas, motor de layout/roteamento e
 * renderizador SVG. É consumido por:
 *   - scripts/generate-user-flowchart.mjs      (documento HTML)
 *   - scripts/generate-user-flowchart-pdf.mjs  (documento PDF vetorial)
 *
 * Para alterar um fluxo, edite as estruturas DIAGRAMS / USE_CASES / tabelas aqui
 * e rode os dois geradores (ver CONTRIBUTING.md, seção 5).
 */

/**
 * CoreMotiom — Gerador do Fluxograma Completo do Usuário
 * ------------------------------------------------------
 * Lê o mapeamento de telas/fluxos do app (app/page.tsx, lib/store.tsx, components/*,
 * services/*, app/api/*, supabase/migrations) e gera:
 *
 *   Fluxograma/Diagrama C. De Uso/fluxograma-usuario.html → documento autocontido (SVGs inline, sem CDN)
 *
 * Uso:
 *   node scripts/generate-user-flowchart.mjs
 *   FLOW_EMIT_SVG=/tmp/svgs node scripts/generate-user-flowchart.mjs   # p/ inspeção dos SVGs
 *
 * Gerado automaticamente — edite os dados em DIAGRAMS e rode novamente.
 */



/* ------------------------------------------------------------------ *
 * 1. Tema / paleta                                                    *
 * ------------------------------------------------------------------ */

const CANVAS_BG = '#0B0C10';

const ACTORS = {
  visitante: { label: 'Visitante (sem conta)', fill: '#181C25', stroke: '#8B93A7', text: '#E5E7EB', sub: '#A8AFBF' },
  atleta: { label: 'Atleta / Usuário (role: user)', fill: '#0E2A22', stroke: '#34D399', text: '#ECFDF5', sub: '#8FD9C0' },
  lojista: { label: 'Lojista (role: seller)', fill: '#0D2337', stroke: '#38BDF8', text: '#EFF6FF', sub: '#9CCBEC' },
  admin: { label: 'Super Admin (e-mails master)', fill: '#2E1219', stroke: '#F87171', text: '#FEF2F2', sub: '#EBA8A8' },
  sistema: { label: 'Sistema / Dados', fill: '#1C1633', stroke: '#A78BFA', text: '#F5F3FF', sub: '#BDB0EE' },
  atencao: { label: 'Alerta / Lacuna / Erro', fill: '#2B2107', stroke: '#FBBF24', text: '#FFFBEB', sub: '#E3C87F' },
  sucesso: { label: 'Confirmação / Sucesso', fill: '#0E2A22', stroke: '#22C55E', text: '#F0FDF4', sub: '#93DBA8' },
};

const EDGE_KINDS = {
  flow: { stroke: '#8B93A7', label: '#C7CDDA' },
  auth: { stroke: '#A78BFA', label: '#D6CCF5' },
  success: { stroke: '#34D399', label: '#A7E9CE' },
  error: { stroke: '#F87171', label: '#F0B0B0' },
  admin: { stroke: '#FBBF24', label: '#E7CD8C' },
  data: { stroke: '#38BDF8', label: '#A9D8F2' },
};

/* ------------------------------------------------------------------ *
 * 2. Geometria                                                        *
 * ------------------------------------------------------------------ */

const GEO = {
  colW: 276,
  x0: 62,
  y0: 26,
  vGap: 46,
  padX: 13,
  widths: { start: 188, end: 188, process: 214, decision: 236, data: 224, note: 220 },
  titleSize: 12.6,
  subSize: 10.4,
  titleLH: 15.5,
  subLH: 13.2,
};

const escapeXml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrapText(text, maxWidth, fontSize, bold) {
  const charW = fontSize * (bold ? 0.62 : 0.578);
  const maxChars = Math.max(6, Math.floor(maxWidth / charW));
  const out = [];
  for (const rawLine of String(text).split('\n')) {
    const words = rawLine.split(/\s+/).filter(Boolean);
    let line = '';
    for (const word of words) {
      if (!line) line = word;
      else if ((line + ' ' + word).length <= maxChars) line += ' ' + word;
      else {
        out.push(line);
        line = word;
      }
    }
    if (line) out.push(line);
  }
  return out.length ? out : [''];
}

/** Layout: atribui caixa (x,y,w,h) a cada nó do diagrama. */
function layout(diagram) {
  const nodes = new Map();
  for (const node of diagram.nodes) {
    const w = GEO.widths[node.type] || GEO.widths.process;
    const innerW = node.type === 'decision' ? w - 62 : w - GEO.padX * 2;
    const titleLines = wrapText(node.t, innerW, GEO.titleSize, true);
    const subLines = node.s ? wrapText(node.s, innerW, GEO.subSize, false) : [];
    const h =
      node.type === 'start' || node.type === 'end'
        ? Math.max(46, 22 + titleLines.length * GEO.titleLH + (subLines.length ? 4 + subLines.length * GEO.subLH : 0))
        : Math.max(
            54,
            22 + titleLines.length * GEO.titleLH + (subLines.length ? 6 + subLines.length * GEO.subLH : 0)
          );
    nodes.set(node.id, { ...node, w, h, titleLines, subLines, innerW });
  }

  const rows = [...new Set([...nodes.values()].map((n) => n.row))].sort((a, b) => a - b);
  const rowY = new Map();
  let cursor = GEO.y0;
  for (const row of rows) {
    rowY.set(row, cursor);
    const maxH = Math.max(...[...nodes.values()].filter((n) => n.row === row).map((n) => n.h));
    cursor += maxH + GEO.vGap;
  }

  const cols = Math.max(...[...nodes.values()].map((n) => n.col)) + 1;
  const width = GEO.x0 * 2 + cols * GEO.colW;
  const height = cursor - GEO.vGap + GEO.y0 + 18;

  for (const n of nodes.values()) {
    n.y = rowY.get(n.row);
    n.x = GEO.x0 + n.col * GEO.colW + (GEO.colW - n.w) / 2;
    n.cx = n.x + n.w / 2;
    n.cy = n.y + n.h / 2;
    n.bottom = n.y + n.h;
    n.right = n.x + n.w;
  }

  return { nodes, width, height, rows, cols };
}

/** Roteamento ortogonal das setas. */
function routeEdge(src, dst, edge = {}) {
  const pts = [];

  // Saída lateral: contorna pelo corredor vazio entre colunas
  if (edge.fromSide === 'right' || edge.fromSide === 'left') {
    const dir = edge.fromSide === 'right' ? 1 : -1;
    const sx = edge.fromSide === 'right' ? src.right : src.x;
    const gx = sx + dir * (26 + (edge.gutter || 0));
    let ex;
    if (gx < dst.x) ex = dst.x;
    else if (gx > dst.right) ex = dst.right;
    else ex = dst.cx;
    pts.push([sx, src.cy], [gx, src.cy], [gx, dst.cy], [ex, dst.cy]);
    return pts;
  }

  // Entrada lateral em convergências (fan-in de várias origens)
  if (edge.toSide === 'left') {
    pts.push([src.cx, src.bottom], [src.cx, dst.cy], [dst.x, dst.cy]);
    return pts;
  }
  if (edge.toSide === 'right') {
    pts.push([src.cx, src.bottom], [src.cx, dst.cy], [dst.right, dst.cy]);
    return pts;
  }

  const sx = src.cx + (edge.srcOffsetX || 0);
  const dx = dst.cx + (edge.dstOffsetX || 0);

  if (dst.row > src.row) {
    if (Math.abs(sx - dx) < 4) {
      pts.push([sx, src.bottom], [dx, dst.y]);
    } else {
      const midY =
        src.bottom + Math.max(14, Math.min(26, (dst.y - src.bottom) / 2)) + (edge.bend || 0);
      pts.push([sx, src.bottom], [sx, midY], [dx, midY], [dx, dst.y]);
    }
  } else if (dst.row === src.row) {
    if (dst.cx > src.cx) pts.push([src.right, src.cy], [dst.x, dst.cy]);
    else pts.push([src.x, src.cy], [dst.right, dst.cy]);
  } else {
    // aresta de retorno (volta para uma linha acima)
    if (dst.cx < src.cx) {
      const ch = src.right + 26;
      pts.push([src.right, src.cy], [ch, src.cy], [ch, dst.cy], [dst.right, dst.cy]);
    } else {
      const ch = src.x - 26;
      pts.push([src.x, src.cy], [ch, src.cy], [ch, dst.cy], [dst.x, dst.cy]);
    }
  }
  return pts;
}

function polylinePath(points) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${round(p[0])},${round(p[1])}`).join(' ');
}

const round = (n) => Math.round(n * 100) / 100;

function labelAnchor(points, edge) {
  let best = { len: -1, i: 0 };
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    const len = Math.hypot(dx, dy);
    if (len > best.len) best = { len, i, horizontal: Math.abs(dx) > Math.abs(dy) };
  }
  const [ax, ay] = points[best.i];
  const [bx, by] = points[best.i + 1];
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  if (edge.labelOffset) return { x: mx + edge.labelOffset[0], y: my + edge.labelOffset[1], horizontal: best.horizontal };
  return best.horizontal ? { x: mx, y: my - 7, horizontal: true } : { x: mx + 8, y: my + 3, horizontal: false };
}

/* ------------------------------------------------------------------ *
 * 3. Render do SVG                                                    *
 * ------------------------------------------------------------------ */

function renderNodeSvg(n, defs) {
  const a = ACTORS[n.actor] || ACTORS.sistema;
  const dash = n.type === 'note' ? ' stroke-dasharray="6 5"' : '';
  const strokeW = n.type === 'note' ? 1.3 : 1.5;
  let shape = '';
  if (n.type === 'decision') {
    const i = 26;
    shape = `<polygon points="${round(n.x + i)},${round(n.y)} ${round(n.right - i)},${round(n.y)} ${round(
      n.right
    )},${round(n.cy)} ${round(n.right - i)},${round(n.bottom)} ${round(n.x + i)},${round(n.bottom)} ${round(
      n.x
    )},${round(n.cy)}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="${strokeW}"${dash} />`;
  } else if (n.type === 'data') {
    const i = 15;
    shape = `<polygon points="${round(n.x + i)},${round(n.y)} ${round(n.right)},${round(n.y)} ${round(
      n.right - i
    )},${round(n.bottom)} ${round(n.x)},${round(n.bottom)}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="${strokeW}"${dash} />`;
  } else {
    const rx = n.type === 'start' || n.type === 'end' ? n.h / 2 : 13;
    shape = `<rect x="${round(n.x)}" y="${round(n.y)}" width="${round(n.w)}" height="${round(n.h)}" rx="${round(
      rx
    )}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="${strokeW}"${dash} />`;
  }

  let text = '';
  const totalTextH = n.titleLines.length * GEO.titleLH + (n.subLines.length ? 6 + n.subLines.length * GEO.subLH : 0);
  let ty = n.cy - totalTextH / 2 + GEO.titleLH - 3.4;
  for (const line of n.titleLines) {
    text += `<text x="${round(n.cx)}" y="${round(ty)}" text-anchor="middle" font-family="inherit" font-size="${
      GEO.titleSize
    }" font-weight="700" fill="${a.text}">${escapeXml(line)}</text>`;
    ty += GEO.titleLH;
  }
  if (n.subLines.length) {
    ty += 6 - GEO.titleLH + GEO.subLH - 3;
    for (const line of n.subLines) {
      text += `<text x="${round(n.cx)}" y="${round(ty)}" text-anchor="middle" font-family="inherit" font-size="${
        GEO.subSize
      }" fill="${a.sub}">${escapeXml(line)}</text>`;
      ty += GEO.subLH;
    }
  }
  return { shape, text };
}

function renderDiagram(diagram) {
  const { nodes, width, height } = layout(diagram);
  const body = [];
  const defs = [];

  // Sombras / realces de linha (agrupamento por faixa opcional)
  for (const band of diagram.bands || []) {
    const bandNodes = [...nodes.values()].filter((n) => band.ids.includes(n.id));
    if (!bandNodes.length) continue;
    const x = Math.min(...bandNodes.map((n) => n.x)) - 18;
    const y = Math.min(...bandNodes.map((n) => n.y)) - 32;
    const w = Math.max(...bandNodes.map((n) => n.right)) - x + 18;
    const h = Math.max(...bandNodes.map((n) => n.bottom)) - y + 20;
    body.push(
      `<rect x="${round(x)}" y="${round(y)}" width="${round(w)}" height="${round(
        h
      )}" rx="22" fill="${band.fill || 'rgba(255,255,255,0.017)'}" stroke="${band.stroke || '#1E2330'}" stroke-width="1.2" />`,
      `<text x="${round(x + w - 16)}" y="${round(y + 18)}" text-anchor="end" font-size="10.5" font-weight="700" letter-spacing="0.9" fill="${
        band.text || '#6B7280'
      }">${escapeXml(band.label)}</text>`
    );
  }

  for (const edge of diagram.edges) {
    const src = nodes.get(edge.from);
    const dst = nodes.get(edge.to);
    if (!src || !dst) throw new Error(`Aresta inválida em ${diagram.id}: ${edge.from} → ${edge.to}`);
    const points = routeEdge(src, dst, edge);
    const kind = EDGE_KINDS[edge.kind || 'flow'];
    const dashed = edge.kind === 'error' || edge.dashed ? ' stroke-dasharray="5 4"' : '';
    body.push(
      `<path d="${polylinePath(points)}" fill="none" stroke="${kind.stroke}" stroke-width="${
        edge.thick ? 2 : 1.6
      }" stroke-linecap="round" stroke-linejoin="round"${dashed} marker-end="url(#arrow-${edge.kind || 'flow'})" />`
    );
    if (edge.label) {
      const pos = labelAnchor(points, edge);
      const w = edge.label.length * 6.05 + 12;
      body.push(
        `<rect x="${round(pos.x - w / 2)}" y="${round(pos.y - 11)}" width="${round(w)}" height="15" rx="7" fill="${
          CANVAS_BG
        }" opacity="0.94" />`,
        `<text x="${round(pos.x)}" y="${round(pos.y)}" text-anchor="middle" font-size="10.3" font-weight="600" fill="${
          kind.label
        }">${escapeXml(edge.label)}</text>`
      );
    }
  }

  const nodeMarkup = [...nodes.values()]
    .map((n) => {
      const { shape, text } = renderNodeSvg(n, defs);
      return `${shape}${text}`;
    })
    .join('\n');

  for (const key of Object.keys(EDGE_KINDS)) {
    defs.push(
      `<marker id="arrow-${key}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${EDGE_KINDS[key].stroke}" /></marker>`
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(width)} ${round(
    height
  )}" width="${round(width)}" height="${round(height)}" role="img" aria-label="${escapeXml(
    diagram.title
  )}" class="flow-svg">
<defs>${defs.join('')}</defs>
<rect x="0" y="0" width="${round(width)}" height="${round(height)}" fill="${CANVAS_BG}" />
${body.join('\n')}
${nodeMarkup}
</svg>`;
}

/* ------------------------------------------------------------------ *
 * 4. Conteúdo dos diagramas                                           *
 * ------------------------------------------------------------------ */

const DIAGRAMS = [
  /* ---------------------------------------------------------------- */
  {
    id: 'visao-geral',
    num: 1,
    title: 'Visão geral — do primeiro acesso às jornadas por papel',
    desc: 'Mapa macro de tudo que o app entrega hoje: bootstrap da SPA, detecção de sessão, papéis (visitante, atleta, lojista, admin), as seis jornadas de uso e a camada de persistência.',
    legend: ['visitante', 'atleta', 'lojista', 'admin', 'sistema'],
    nodes: [
      { id: 'g1', t: 'App carrega em “/”', s: 'Next.js 15 + layout + CoreMotiomProvider', type: 'start', actor: 'sistema', col: 2, row: 0 },
      { id: 'g2', t: 'Bootstrap do estado', s: 'testSupabaseConnection + produtos, lojas e posts ao vivo', type: 'process', actor: 'sistema', col: 2, row: 1 },
      { id: 'g3', t: 'Sessão válida?', s: 'Supabase getSession + localStorage (coremotiom_state_v1)', type: 'decision', actor: 'sistema', col: 2, row: 2 },
      { id: 'g4', t: 'VISITANTE', s: 'Explora marketplace, lojas, treinadores e feed (leitura)', type: 'process', actor: 'visitante', col: 0, row: 3 },
      { id: 'g5', t: 'ATLETA / LOJISTA', s: 'role = user | seller · perfil sincronizado', type: 'process', actor: 'atleta', col: 2, row: 3 },
      { id: 'g6', t: 'ADMIN MASTER', s: 'E-mail na lista de administradores credenciados', type: 'process', actor: 'admin', col: 4, row: 3 },
      { id: 'g7', t: 'Ação exige conta?', s: 'Favoritar, anunciar, postar, comentar, agendar, criar loja', type: 'decision', actor: 'atencao', col: 0, row: 4 },
      { id: 'g8', t: 'JORNADAS DE COMPRA E USO', s: 'Marketplace → carrinho → checkout → pedido em custódia', type: 'process', actor: 'atleta', col: 2, row: 4 },
      { id: 'g9', t: 'PODERES DE ADMINISTRAÇÃO', s: '8 módulos executivos do painel master', type: 'process', actor: 'admin', col: 4, row: 4 },
      { id: 'g10', t: 'AuthModal', s: 'login · cadastro · Google · esqueci a senha', type: 'process', actor: 'atleta', col: 0, row: 5 },
      { id: 'g11', t: 'Vender C2C', s: 'Anúncio de equipamento seminovo', type: 'process', actor: 'atleta', col: 1, row: 6 },
      { id: 'g12', t: 'Loja oficial + selo', s: 'CNPJ, auditoria e homologação', type: 'process', actor: 'lojista', col: 2, row: 6 },
      { id: 'g13', t: 'Comunidade & Treinadores', s: 'Feed de atletas e assessoria esportiva', type: 'process', actor: 'sistema', col: 3, row: 4 },
      { id: 'g14', t: 'Persistência', s: 'localStorage + Supabase + PostgreSQL (RLS) via API Routes', type: 'data', actor: 'sistema', col: 2, row: 7 },
      { id: 'g15', t: 'Toasts, estados e logout', s: 'Feedback global em todas as ações', type: 'end', actor: 'sucesso', col: 2, row: 8 },
    ],
    edges: [
      { from: 'g1', to: 'g2' },
      { from: 'g2', to: 'g3' },
      { from: 'g3', to: 'g4', label: 'Não' },
      { from: 'g3', to: 'g5', label: 'Sim', labelOffset: [-30, -9] },
      { from: 'g3', to: 'g6', label: 'e-mail master', kind: 'admin', labelOffset: [-46, -8] },
      { from: 'g4', to: 'g7' },
      { from: 'g7', to: 'g10', label: 'Sim' },
      { from: 'g7', to: 'g8', label: 'Não', kind: 'success', labelOffset: [40, -9] },
      { from: 'g5', to: 'g8', label: 'compra', kind: 'success', labelOffset: [-52, -8] },
      { from: 'g5', to: 'g13', label: 'engaja', kind: 'success', labelOffset: [-34, -8] },
      { from: 'g6', to: 'g9', label: 'acesso total', kind: 'admin' },
      { from: 'g10', to: 'g11', label: 'após login', kind: 'auth', labelOffset: [34, -9] },
      { from: 'g8', to: 'g11', label: 'vende', kind: 'success', labelOffset: [30, -9] },
      { from: 'g9', to: 'g12', label: 'homologa', kind: 'admin', labelOffset: [-4, -9] },
      { from: 'g11', to: 'g14', label: 'C2C grava', kind: 'data', toSide: 'left', labelOffset: [30, -6] },
      { from: 'g12', to: 'g14', label: 'loja grava', kind: 'data', dstOffsetX: -52, labelOffset: [-46, -6] },
      { from: 'g13', to: 'g14', label: 'feed grava', kind: 'data', fromSide: 'left', labelOffset: [-6, -8] },
      { from: 'g14', to: 'g15' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'autenticacao',
    num: 2,
    title: 'Autenticação, papéis e ciclo de sessão',
    desc: 'AuthModal (4 modos), acesso rápido de demonstração, login por e-mail/senha, cadastro com tipo de conta, Google OAuth via popup + /auth/callback, guarda de admin e logout.',
    legend: ['atleta', 'lojista', 'admin', 'atencao', 'sistema', 'sucesso'],
    nodes: [
      { id: 'a1', t: 'Usuário aciona “Entrar”, “Cadastrar” ou uma ação protegida', type: 'start', actor: 'visitante', col: 2, row: 0 },
      { id: 'a2', t: 'AuthModal abre', s: 'modo: login | register | forgot | switch', type: 'process', actor: 'sistema', col: 2, row: 1 },
      { id: 'a3', t: 'Acesso rápido de 1 clique', s: 'Super Admin · Lojista Pro · Atleta — switchRole() / loginAsMasterAdmin()', type: 'process', actor: 'atencao', col: 0, row: 2 },
      { id: 'a4', t: 'Qual método?', type: 'decision', actor: 'sistema', col: 2, row: 2 },
      { id: 'a5', t: 'Google OAuth', s: 'Supabase popup → /auth/callback → postMessage OAUTH_AUTH_SUCCESS', type: 'process', actor: 'sistema', col: 4, row: 2 },
      { id: 'a6', t: 'Login e-mail + senha', s: 'zod → AuthService.loginWithEmail → Supabase Auth', type: 'process', actor: 'atleta', col: 1, row: 3 },
      { id: 'a7', t: 'Criar conta', s: 'nome, e-mail, senha e tipo: Atleta C2C ou Lojista B2C', type: 'process', actor: 'lojista', col: 3, row: 3 },
      { id: 'a8', t: 'Credenciais válidas?', type: 'decision', actor: 'atencao', col: 1, row: 4 },
      { id: 'a9', t: 'Confirmação de e-mail pendente?', s: 'signUp sem sessão → aviso para confirmar', type: 'decision', actor: 'sistema', col: 3, row: 4 },
      { id: 'a10', t: 'Erro exibido no modal', s: 'credenciais inválidas · Supabase não configurado · OAuth desativado', type: 'process', actor: 'atencao', col: 0, row: 5 },
      { id: 'a11', t: 'getProfileOrCreate → setUser + allUsers', s: 'toast de boas-vindas e fechamento do modal', type: 'process', actor: 'sucesso', col: 2, row: 5 },
      { id: 'a12', t: 'Esqueci a senha', s: 'Modal só exibe aviso: resetPassword() existe no service e não é chamado ⚠', type: 'note', actor: 'atencao', col: 0, row: 6 },
      { id: 'a13', t: 'Sessão monitorada', s: 'getSession + onAuthStateChange → setUser / SIGNED_OUT limpa usuário', type: 'process', actor: 'sistema', col: 2, row: 6 },
      { id: 'a14', t: 'Papéis derivados', s: 'role · isVisitor · isAuthenticated · isUserAdmin(email)', type: 'process', actor: 'sistema', col: 4, row: 6 },
      { id: 'a15', t: 'E-mail na lista master?', s: 'mattheusxmljz · professorchines2026 · operacaoamd · admin@coremotiom', type: 'decision', actor: 'admin', col: 2, row: 7 },
      { id: 'a16', t: 'Atleta / Lojista', s: 'compra, anuncia, cria loja e publica no feed', type: 'process', actor: 'atleta', col: 0, row: 8 },
      { id: 'a17', t: 'Admin master', s: 'Painel liberado; demais perfis veem “Acesso Restrito”', type: 'process', actor: 'admin', col: 4, row: 8 },
      { id: 'a18', t: 'Logout', s: 'AuthService.signOut → limpa usuário → volta para a Home', type: 'end', actor: 'sucesso', col: 2, row: 9 },
    ],
    edges: [
      { from: 'a1', to: 'a2' },
      { from: 'a2', to: 'a4' },
      { from: 'a2', to: 'a3', label: 'atalho de teste', kind: 'admin', labelOffset: [-4, -8] },
      { from: 'a4', to: 'a6', label: 'e-mail' },
      { from: 'a4', to: 'a7', label: 'cadastro' },
      { from: 'a4', to: 'a5', label: 'Google', kind: 'auth' },
      { from: 'a6', to: 'a8' },
      { from: 'a8', to: 'a10', label: 'Não', kind: 'error' },
      { from: 'a8', to: 'a11', label: 'Sim', kind: 'success', dstOffsetX: -50, labelOffset: [-20, -9] },
      { from: 'a7', to: 'a9' },
      { from: 'a9', to: 'a11', label: 'aguarda e-mail', kind: 'error', dstOffsetX: 52, bend: 26, labelOffset: [-4, -20] },
      { from: 'a5', to: 'a11', label: 'perfil Google', kind: 'auth', dstOffsetX: 0, labelOffset: [-42, -8] },
      { from: 'a11', to: 'a13' },
      { from: 'a13', to: 'a12', label: 'recuperação de senha', kind: 'error', labelOffset: [-6, -9] },
      { from: 'a13', to: 'a14' },
      { from: 'a14', to: 'a15' },
      { from: 'a15', to: 'a16', label: 'Não' },
      { from: 'a15', to: 'a17', label: 'Sim', kind: 'admin' },
      { from: 'a16', to: 'a18', label: 'sair', dstOffsetX: -50 },
      { from: 'a17', to: 'a18', label: 'sair', dstOffsetX: 50 },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'compra',
    num: 3,
    title: 'Jornada de compra — descoberta, carrinho, pagamento e custódia',
    desc: 'Fluxo completo de compra: Home e busca global, filtros do marketplace, ficha do produto, carrinho, entrega, três meios de pagamento, criação do pedido e ciclo de status até a entrega.',
    legend: ['visitante', 'atleta', 'atencao', 'sucesso', 'sistema', 'admin'],
    nodes: [
      { id: 'c1', t: 'Home — carrossel de destaques', s: 'Vitrine Bento, filtros por modalidade e abas B2C / C2C', type: 'start', actor: 'visitante', col: 1, row: 0 },
      { id: 'c2', t: 'Descoberta do produto', s: 'Barra lateral com busca instantânea (⌘K) ou “Explorar Catálogo”', type: 'process', actor: 'visitante', col: 1, row: 1 },
      { id: 'c3', t: 'Marketplace', s: 'Filtros: tipo (B2C/C2C), categoria, modalidade, condição, selo verificado, ordenação e paginação', type: 'process', actor: 'visitante', col: 1, row: 2 },
      { id: 'c4', t: 'Seleciona o produto', s: 'ProductDetailModal: galeria, numeração, frete por CEP, descrição, loja e vendedor', type: 'process', actor: 'visitante', col: 1, row: 3 },
      { id: 'c5', t: 'Qual ação?', type: 'decision', actor: 'sistema', col: 1, row: 4 },
      { id: 'c6', t: 'Favoritar / curtir', s: 'Salva na lista de desejos (localStorage) · visitante → AuthModal ⚠', type: 'process', actor: 'atleta', col: 3, row: 4 },
      { id: 'c7', t: 'Comprar agora / Adicionar ao carrinho', s: 'addToCart com tamanho selecionado', type: 'process', actor: 'atleta', col: 1, row: 5 },
      { id: 'c8', t: 'Passo 1 — Carrinho', s: 'Alterar quantidade, remover itens, subtotal + frete com seguro', type: 'process', actor: 'atleta', col: 1, row: 6 },
      { id: 'c9', t: 'Passo 2 — Entrega', s: 'Destinatário, CEP, telefone, endereço, cidade/UF · envio fixado em “pac” ⚠', type: 'process', actor: 'atleta', col: 1, row: 7 },
      { id: 'c10', t: 'Passo 3 — Pagamento', s: 'PIX (−5% + QR + copia-e-cola) · Cartão (1–12x) · Boleto', type: 'process', actor: 'atleta', col: 1, row: 8 },
      { id: 'c11', t: 'createOrder', s: 'OrderService grava no Supabase/PostgreSQL · se falhar, gera pedido local com PIX e rastreio', type: 'process', actor: 'sistema', col: 1, row: 9 },
      { id: 'c12', t: 'Forma de pagamento?', type: 'decision', actor: 'sistema', col: 1, row: 10 },
      { id: 'c13', t: 'PIX / Boleto', s: 'payment_status = pending · order_status = pending_payment', type: 'process', actor: 'atencao', col: 0, row: 11 },
      { id: 'c14', t: 'Cartão de crédito', s: 'payment_status = completed · order_status = preparing', type: 'process', actor: 'sucesso', col: 2, row: 11 },
      { id: 'c15', t: 'Passo 4 — Pedido confirmado', s: 'Nº do pedido, valor retido em custódia, prazo de 2 a 4 dias e código de rastreio', type: 'end', actor: 'sucesso', col: 1, row: 12 },
      { id: 'c16', t: 'Retaguarda do pedido', s: 'Admin confirma pagamento (sandbox) e muda status: paid → shipped → delivered', type: 'process', actor: 'admin', col: 3, row: 12 },
      { id: 'c17', t: 'Compra como visitante ⚠', s: 'Carrinho e checkout não exigem login · createOrder usa “guest-user”, sem dono para consultar depois', type: 'note', actor: 'atencao', col: 3, row: 6 },
      { id: 'c18', t: 'Caminho com login', s: 'Favoritar, publicar, comentar, agendar e vender continuam exigindo conta (ir para o fluxo 2)', type: 'note', actor: 'sistema', col: 3, row: 8 },
    ],
    edges: [
      { from: 'c1', to: 'c2' },
      { from: 'c2', to: 'c3' },
      { from: 'c3', to: 'c4' },
      { from: 'c4', to: 'c5' },
      { from: 'c5', to: 'c7', label: 'comprar', kind: 'success' },
      { from: 'c5', to: 'c6', label: 'salvar' },
      { from: 'c7', to: 'c8' },
      { from: 'c8', to: 'c9' },
      { from: 'c8', to: 'c17', label: 'sem exigir conta', kind: 'error', fromSide: 'right', labelOffset: [-40, -8] },
      { from: 'c9', to: 'c10' },
      { from: 'c9', to: 'c18', label: 'atalho p/ login', kind: 'auth', fromSide: 'right', labelOffset: [-36, 10] },
      { from: 'c10', to: 'c11' },
      { from: 'c11', to: 'c12' },
      { from: 'c12', to: 'c13', label: 'PIX / boleto' },
      { from: 'c12', to: 'c14', label: 'cartão', kind: 'success' },
      { from: 'c13', to: 'c15', label: 'aguardando', kind: 'error' },
      { from: 'c14', to: 'c15', kind: 'success' },
      { from: 'c15', to: 'c16', label: 'acompanhamento', kind: 'admin', labelOffset: [0, -9] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'venda',
    num: 4,
    title: 'Jornada de venda — C2C, loja oficial e selo verificado',
    desc: 'Dois caminhos de oferta: atleta anunciando equipamento seminovo (C2C com custódia) e lojista abrindo/enviando loja para auditoria de CNPJ, com a homologação feita pelo admin.',
    legend: ['visitante', 'atleta', 'lojista', 'admin', 'atencao', 'sucesso'],
    nodes: [
      { id: 'v1', t: 'Menu “Vender C2C”', type: 'start', actor: 'atleta', col: 0, row: 0 },
      { id: 'v2', t: 'É visitante?', type: 'decision', actor: 'atencao', col: 0, row: 1 },
      { id: 'v3', t: 'Bloqueio + AuthModal', s: 'Tela “Acesso Restrito para Atletas Cadastrados”', type: 'process', actor: 'atencao', col: 1, row: 2 },
      { id: 'v4', t: 'Central de Vendas C2C', s: 'Abas: Criar anúncio · Meus anúncios · Vendas em custódia · Rascunhos', type: 'process', actor: 'atleta', col: 0, row: 3 },
      { id: 'v5', t: 'Formulário do anúncio', s: 'Título, categoria, modalidade, condição, preço, preço original, descrição, fotos por URL, local e frete', type: 'process', actor: 'atleta', col: 0, row: 4 },
      { id: 'v6', t: 'Título e preço preenchidos?', type: 'decision', actor: 'atencao', col: 0, row: 5 },
      { id: 'v7', t: 'Toast “Campos obrigatórios”', type: 'note', actor: 'atencao', col: 1, row: 6 },
      { id: 'v8', t: 'createProduct', s: 'product_type = c2c · stock 1 · status active → POST /api/listings', type: 'process', actor: 'sistema', col: 0, row: 6 },
      { id: 'v9', t: 'Anúncio publicado', s: 'Aparece no marketplace e em “Meus anúncios” (com exclusão)', type: 'process', actor: 'sucesso', col: 0, row: 7 },
      { id: 'v10', t: 'Venda em custódia', s: 'Valor retido e liberado após confirmação/inspeção do comprador', type: 'end', actor: 'sucesso', col: 0, row: 8 },
      { id: 'w1', t: 'Quero ser lojista', s: 'Cadastro com tipo de conta “Lojista B2C” ou botão “Criar loja”', type: 'start', actor: 'lojista', col: 3, row: 0 },
      { id: 'w2', t: 'CreateStoreModal', s: 'Nome, categoria, descrição, contatos, logo e banner', type: 'process', actor: 'lojista', col: 3, row: 1 },
      { id: 'w3', t: 'createStore', s: 'Loja criada e usuário promovido a seller com store_id', type: 'process', actor: 'sistema', col: 3, row: 2 },
      { id: 'w4', t: 'Solicitar verificação', s: 'CNPJ, razão social e site → verification_status = pending (promessa de 24h)', type: 'process', actor: 'lojista', col: 3, row: 3 },
      { id: 'w5', t: 'Admin audita em “Auditoria de Lojas”', s: 'Lojas pendentes listadas no painel master', type: 'process', actor: 'admin', col: 3, row: 4 },
      { id: 'w6', t: 'Aprovar?', type: 'decision', actor: 'admin', col: 3, row: 5 },
      { id: 'w7', t: 'Selo “Loja Verificada”', s: 'is_verified = true · produtos ganham is_verified_store', type: 'process', actor: 'sucesso', col: 2, row: 6 },
      { id: 'w8', t: 'Verificação recusada', s: 'verification_status = rejected com observações', type: 'process', actor: 'atencao', col: 4, row: 6 },
      { id: 'w9', t: 'Loja visível com filtro “somente verificadas”', type: 'end', actor: 'lojista', col: 3, row: 7 },
    ],
    edges: [
      { from: 'v1', to: 'v2' },
      { from: 'v2', to: 'v3', label: 'Sim', kind: 'error' },
      { from: 'v2', to: 'v4', label: 'Não', kind: 'success' },
      { from: 'v3', to: 'v4', label: 'após login', kind: 'auth', labelOffset: [40, -9] },
      { from: 'v4', to: 'v5' },
      { from: 'v5', to: 'v6' },
      { from: 'v6', to: 'v7', label: 'Não', kind: 'error', labelOffset: [-7, -9] },
      { from: 'v6', to: 'v8', label: 'Sim', kind: 'success', labelOffset: [-38, -8] },
      { from: 'v7', to: 'v5', label: 'corrige', kind: 'error', labelOffset: [-4, -9] },
      { from: 'v8', to: 'v9' },
      { from: 'v9', to: 'v10' },
      { from: 'w1', to: 'w2' },
      { from: 'w2', to: 'w3' },
      { from: 'w3', to: 'w4' },
      { from: 'w4', to: 'w5', label: 'fila de análise', kind: 'admin' },
      { from: 'w5', to: 'w6' },
      { from: 'w6', to: 'w7', label: 'Sim', kind: 'success' },
      { from: 'w6', to: 'w8', label: 'Não', kind: 'error' },
      { from: 'w7', to: 'w9' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'engajamento',
    num: 5,
    title: 'Engajamento — comunidade, treinadores e favoritos',
    desc: 'Fluxos sociais e de serviço: feed com 5 categorias, publicação, curtidas e comentários; agendamento de assessoria esportiva com CREF; e a lista de desejos.',
    legend: ['visitante', 'atleta', 'sistema', 'atencao', 'sucesso'],
    nodes: [
      { id: 'e1', t: 'Comunidade — Feed de Atletas', s: 'Filtro por categoria: equipamentos, treino, eventos, dúvidas e conquistas', type: 'start', actor: 'sistema', col: 0, row: 0 },
      { id: 'e2', t: 'Qual interação?', type: 'decision', actor: 'sistema', col: 0, row: 1 },
      { id: 'e3', t: 'Publicar post', s: 'Título, conteúdo e categoria · badge “Admin / Loja Oficial / Atleta”', type: 'process', actor: 'atleta', col: 0, row: 2 },
      { id: 'e4', t: 'Curtir', s: 'likeCommunityPost → likes_count +1', type: 'process', actor: 'atleta', col: 1, row: 2 },
      { id: 'e5', t: 'Comentar', s: 'Comentário com avatar e data', type: 'process', actor: 'atleta', col: 2, row: 2 },
      { id: 'e6', t: 'É visitante?', type: 'decision', actor: 'atencao', col: 0, row: 3 },
      { id: 'e7', t: 'AuthModal', s: 'Curtir é livre; publicar e comentar exigem conta', type: 'process', actor: 'atencao', col: 0, row: 4 },
      { id: 'e8', t: 'Post/comentário no feed', s: 'CommunityService grava em community_posts', type: 'process', actor: 'sucesso', col: 1, row: 4 },
      { id: 'e9', t: 'Moderação', s: 'reportCommunityPost() e adminDeleteCommunityPost() existem no store, mas nenhuma tela oferece os botões ⚠', type: 'note', actor: 'atencao', col: 2, row: 4 },
      { id: 't1', t: 'Treinadores Especializados', s: 'Cards com CREF validado, avaliação, modalidade e valor/hora', type: 'start', actor: 'sistema', col: 3, row: 0 },
      { id: 't2', t: 'Filtro por modalidade', s: 'Corrida · Maratona · Triatlo · Ciclismo · Trail Running', type: 'process', actor: 'atleta', col: 3, row: 1 },
      { id: 't3', t: 'Escolhe plano', s: 'Mensal · Consultoria pontual · Temporada', type: 'process', actor: 'atleta', col: 3, row: 2 },
      { id: 't4', t: 'Confirmar agendamento', s: 'Visitante → AuthModal ⚠ (modal fecha sozinho após ~2,5s, sem persistir)', type: 'process', actor: 'atencao', col: 3, row: 4 },
      { id: 't5', t: 'Toast de solicitação enviada', type: 'end', actor: 'sucesso', col: 3, row: 5 },
      { id: 'f1', t: 'Favoritar produto', s: 'Coração no card do marketplace e na ficha do produto', type: 'start', actor: 'atleta', col: 4, row: 0 },
      { id: 'f2', t: 'Visitante?', type: 'decision', actor: 'atencao', col: 4, row: 1 },
      { id: 'f6', t: 'AuthModal', s: 'Login necessário para salvar', type: 'process', actor: 'atencao', col: 4, row: 3 },
      { id: 'f4', t: 'toggleFavorite → localStorage', s: 'Lista de favoritos salva por navegador', type: 'process', actor: 'sistema', col: 4, row: 2 },
      { id: 'f5', t: '“Meus Favoritos” na sidebar', s: 'Abre a view “profile”, que não é renderizada em app/page.tsx ⚠ — lista sem tela', type: 'note', actor: 'atencao', col: 4, row: 5 },
    ],
    edges: [
      { from: 'e1', to: 'e2' },
      { from: 'e2', to: 'e3' },
      { from: 'e2', to: 'e4' },
      { from: 'e2', to: 'e5' },
      { from: 'e3', to: 'e6' },
      { from: 'e5', to: 'e6', label: 'exige conta', kind: 'error', labelOffset: [0, 34] },
      { from: 'e6', to: 'e7', label: 'Sim', kind: 'error' },
      { from: 'e6', to: 'e8', label: 'Não', kind: 'success', labelOffset: [26, -9] },
      { from: 'e7', to: 'e8', kind: 'auth' },
      { from: 'e8', to: 'e9', kind: 'error', dashed: true },
      { from: 't1', to: 't2' },
      { from: 't2', to: 't3' },
      { from: 't3', to: 't4', label: 'agendar' },
      { from: 't4', to: 't5' },
      { from: 'f1', to: 'f2' },
      { from: 'f2', to: 'f6', label: 'Sim', kind: 'error', dashed: true, fromSide: 'left', labelOffset: [10, -6] },
      { from: 'f2', to: 'f4', label: 'Não' },
      { from: 'f6', to: 'f4', label: 'após login', kind: 'auth', labelOffset: [12, 0] },
      { from: 'f4', to: 'f5', label: 'abrir lista', kind: 'error', fromSide: 'left', labelOffset: [46, -6] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'admin',
    num: 6,
    title: 'Painel administrativo — 8 módulos executivos',
    desc: 'Guarda de acesso por e-mail master, barra de ações rápidas e os módulos: métricas, auditoria de lojas, catálogo, usuários, pedidos/custódia, lojas e banco de dados.',
    legend: ['admin', 'atencao', 'sistema', 'sucesso'],
    nodes: [
      { id: 'd1', t: 'Acesso ao Painel Admin', s: 'Item de menu só aparece para admin ou e-mail master', type: 'start', actor: 'admin', col: 1, row: 0 },
      { id: 'd2', t: 'isUserAdmin(email)?', type: 'decision', actor: 'atencao', col: 1, row: 1 },
      { id: 'd3', t: 'Tela “Acesso Restrito”', s: 'Botão “Entrar como Super Admin Master” e atalho para o marketplace', type: 'process', actor: 'atencao', col: 3, row: 2 },
      { id: 'd4', t: 'Barra master', s: 'Sincronizar Supabase · + Novo Usuário · Console SQL', type: 'process', actor: 'admin', col: 1, row: 2 },
      { id: 'd5', t: '1. Métricas & Ecossistema', s: 'GMV, receita estimada de custódia (4,5%), lojas verificadas, B2C x C2C', type: 'process', actor: 'admin', col: 0, row: 3 },
      { id: 'd6', t: '2. Auditoria de Lojas', s: 'Aprovar ou recusar selo · notas de compliance', type: 'process', actor: 'admin', col: 1, row: 3 },
      { id: 'd7', t: '3. Moderar Catálogo', s: 'Status active/draft/sold/suspended, filtro e exclusão de anúncios', type: 'process', actor: 'admin', col: 2, row: 3 },
      { id: 'd8', t: '4. Usuários & Atletas', s: 'Criar, excluir, banir/desbanir e trocar papel · conta master protegida', type: 'process', actor: 'admin', col: 3, row: 3 },
      { id: 'd9', t: '5. Pedidos & Custódia', s: 'Status do pedido e do pagamento · confirmar pagamento em sandbox', type: 'process', actor: 'admin', col: 0, row: 5 },
      { id: 'd10', t: '6. Lojas Oficiais', s: 'Lista consolidada com selo, dono e catálogo', type: 'process', actor: 'admin', col: 1, row: 5 },
      { id: 'd11', t: '7. Banco Supabase', s: 'Contagens por tabela, host PostgreSQL, RLS e console SQL', type: 'process', actor: 'sistema', col: 2, row: 5 },
      { id: 'd12', t: 'Ações de API', s: 'Papel, banimento e exclusão de usuário chamam /api/users · lojas usam /api/stores', type: 'process', actor: 'sistema', col: 3, row: 5 },
      { id: 'd13', t: 'Somente estado local', s: 'adminUpdateOrderStatus e adminToggleProductStatus alteram só a memória (sem gravar no banco) ⚠', type: 'note', actor: 'atencao', col: 1, row: 7 },
      { id: 'd14', t: 'Sync Supabase', s: 'Recarrega produtos, lojas e posts no estado · toast de resultado', type: 'end', actor: 'sucesso', col: 3, row: 7 },
    ],
    edges: [
      { from: 'd1', to: 'd2' },
      { from: 'd2', to: 'd3', label: 'Não', kind: 'error' },
      { from: 'd2', to: 'd4', label: 'Sim', kind: 'admin', labelOffset: [-30, -2] },
      { from: 'd3', to: 'd4', label: 'após login master', kind: 'auth', labelOffset: [10, -9] },
      { from: 'd4', to: 'd5', label: 'módulos', labelOffset: [-52, -8] },
      { from: 'd4', to: 'd6' },
      { from: 'd4', to: 'd7' },
      { from: 'd4', to: 'd8', bend: 14 },
      { from: 'd5', to: 'd9' },
      { from: 'd6', to: 'd10' },
      { from: 'd7', to: 'd11' },
      { from: 'd8', to: 'd12' },
      { from: 'd9', to: 'd13', label: 'status', kind: 'data', fromSide: 'right', labelOffset: [46, -8] },
      { from: 'd11', to: 'd14', label: 'contagens', kind: 'data', toSide: 'left', labelOffset: [40, -8] },
      { from: 'd12', to: 'd14', label: 'grava', kind: 'data', labelOffset: [-34, -8] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'dados',
    num: 7,
    title: 'Dados, serviços e persistência — onde cada ação é gravada',
    desc: 'Camadas do sistema: estado global no cliente, services que falam com o Supabase e com as API Routes, pool PostgreSQL com RLS, server actions validadas por zod (hoje sem uso) e o fallback offline.',
    legend: ['sistema', 'atencao', 'sucesso', 'admin'],
    bands: [
      { ids: ['s1', 's2', 's3'], label: 'CLIENTE (BROWSER)', fill: 'rgba(167,139,250,0.05)', stroke: '#3A3159' },
      { ids: ['s4', 's5', 's10'], label: 'SERVIDOR NEXT.JS', fill: 'rgba(56,189,248,0.05)', stroke: '#27455C' },
      { ids: ['s6', 's7', 's8'], label: 'DADOS PERSISTENTES', fill: 'rgba(52,211,153,0.04)', stroke: '#26493D' },
    ],
    nodes: [
      { id: 's1', t: 'Estado global', s: 'CoreMotiomProvider: produtos, lojas, pedidos, carrinho, favoritos, posts, toasts', type: 'process', actor: 'sistema', col: 0, row: 0 },
      { id: 's2', t: 'localStorage', s: 'coremotiom_state_v1: user, cart, orders, favorites, posts', type: 'data', actor: 'sistema', col: 0, row: 1 },
      { id: 's3', t: 'Services do cliente', s: 'AuthService · ProductService · StoreService · OrderService · CommunityService', type: 'process', actor: 'sistema', col: 1, row: 1 },
      { id: 's9', t: 'Fallback offline', s: 'Sem Supabase: INITIAL_PRODUCTS, INITIAL_STORES e dados de demonstração seguem operando', type: 'note', actor: 'atencao', col: 2, row: 1 },
      { id: 's4', t: 'API Routes', s: '/api/products · /api/stores · /api/listings · /api/users · /api/auth/sync', type: 'process', actor: 'sistema', col: 0, row: 2 },
      { id: 's5', t: 'Server Actions (zod)', s: 'auth · products · stores · orders — nenhuma é chamada pelo cliente hoje ⚠', type: 'note', actor: 'atencao', col: 1, row: 2 },
      { id: 's10', t: 'Middleware', s: 'Apenas injeta o header x-coremotiom-platform — não protege rotas ⚠', type: 'note', actor: 'atencao', col: 2, row: 2 },
      { id: 's6', t: 'PostgreSQL (Supabase)', s: 'profiles · stores · products · orders · community_posts (migração SQL + RLS)', type: 'data', actor: 'sucesso', col: 0, row: 3 },
      { id: 's7', t: 'Supabase Auth', s: 'E-mail/senha, OAuth Google e callback em /auth/callback', type: 'process', actor: 'admin', col: 1, row: 3 },
      { id: 's8', t: 'Imagens do catálogo', s: 'Arquivos em /public/products e URLs externas nos anúncios', type: 'data', actor: 'sistema', col: 2, row: 3 },
    ],
    edges: [
      { from: 's1', to: 's3', label: 'ações', kind: 'flow', dstOffsetX: 40 },
      { from: 's1', to: 's2', label: 'saveState()', kind: 'data', srcOffsetX: -60, dstOffsetX: -60 },
      { from: 's3', to: 's4', label: 'fetch', dstOffsetX: -50 },
      { from: 's4', to: 's6', label: 'pg Pool', kind: 'data' },
      { from: 's3', to: 's5', label: 'sem chamadas', kind: 'error', labelOffset: [58, -8] },
      { from: 's3', to: 's7', label: 'auth', kind: 'admin', fromSide: 'right', labelOffset: [0, -6] },
      { from: 's3', to: 's8', label: 'mídia', fromSide: 'right', gutter: 12, labelOffset: [6, -70] },
      { from: 's9', to: 's1', label: 'hidrata (seed)', kind: 'error', fromSide: 'left', labelOffset: [-30, -6] },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * 5. Conteúdo textual (tabelas, lacunas, arquivos)                    *
 * ------------------------------------------------------------------ */

const PERMISSIONS = {
  head: ['Capacidade', 'Visitante', 'Atleta (user)', 'Lojista (seller)', 'Admin master'],
  rows: [
    ['Navegar Home, Marketplace, Lojas, Treinadores e Feed', 'sim', 'sim', 'sim', 'sim'],
    ['Busca global (⌘K) e filtros do marketplace', 'sim', 'sim', 'sim', 'sim'],
    ['Curtir post da comunidade', 'sim', 'sim', 'sim', 'sim'],
    ['Favoritar produto', 'não → AuthModal', 'sim', 'sim', 'sim'],
    ['Adicionar ao carrinho e finalizar compra', 'sim (pedido guest)', 'sim', 'sim', 'sim'],
    ['Publicar post e comentar', 'não → AuthModal', 'sim', 'sim', 'sim'],
    ['Agendar treinador', 'não → AuthModal', 'sim', 'sim', 'sim'],
    ['Anunciar equipamento C2C (SellC2CView)', 'não → AuthModal', 'sim', 'sim', 'sim'],
    ['Criar loja oficial (CreateStoreModal)', 'não', 'sim (vira seller)', 'sim', 'sim'],
    ['Solicitar selo de loja verificada', 'não', 'não', 'sim (dono)', 'sim'],
    ['Ver o item “Painel Admin” na sidebar', 'não', 'não', 'não', 'sim'],
    ['Aprovar lojas, moderar catálogo e usuários', 'não', 'não', 'não', 'sim'],
    ['Acesso rápido de demonstração (switchRole)', 'sim', 'sim', 'sim', 'sim'],
  ],
};

const STATUS_TABLE = {
  head: ['Entidade', 'Status possíveis', 'Quem altera'],
  rows: [
    ['Order.order_status', 'pending_payment → paid → preparing → shipped → delivered · cancelled', 'Checkout (criação) e Admin (confirmar pagamento / alterar status)'],
    ['Order.payment_status', 'pending · completed · failed · refunded', 'Checkout e Admin (sandbox)'],
    ['Store.verification_status', 'none → pending → verified / rejected', 'Lojista solicita; Admin homologa'],
    ['Product.status', 'active · draft · sold · suspended', 'Lojista (criação) e Admin (moderação)'],
    ['UserProfile.role', 'visitor · user · seller · admin', 'Cadastro e Admin (updateUserRole)'],
    ['UserProfile.is_banned', 'false → true (ban_reason)', 'Admin (banir / desbanir)'],
  ],
};

const GAPS = [
  {
    t: 'View “profile” não existe',
    d: 'A sidebar leva para activeView = "profile" em “Meus Favoritos” e no avatar mobile, mas app/page.tsx não renderiza esse bloco — a tela fica vazia, sem lista de favoritos, dados do perfil ou pedidos do usuário.',
    tag: 'Navegação',
  },
  {
    t: 'View “news” declarada e sem tela',
    d: 'ActiveView inclui "news" e o store carrega INITIAL_NEWS, mas nenhum componente consome essas notícias.',
    tag: 'Navegação',
  },
  {
    t: 'SmartScanView órfão',
    d: 'components/SmartScanView.tsx (análise de desgaste/pace com IA) tem 356 linhas e não é importado por nenhuma view do app.',
    tag: 'Funcionalidade',
  },
  {
    t: 'Componentes duplicados',
    d: 'AuthModal, MarketplaceView, ProductCard, ProductDetailModal, StoresView, CreateStoreModal, Footer e AdminDashboard existem na raiz de components/ e também em subpastas que apenas reexportam — risco real de editar o arquivo errado.',
    tag: 'Manutenção',
  },
  {
    t: 'Checkout não coleta bairro/número',
    d: 'O formulário pede apenas endereço, cidade e UF, mas grava "Bela Vista" e número "1000" fixos; o shippingMethod é sempre "pac". O checkoutSchema do zod exige neighborhood e number — o server action de checkout rejeitaria esses dados.',
    tag: 'Checkout',
  },
  {
    t: 'Server actions sem uso',
    d: 'serverLogin, serverSignUp, serverProcessCheckout, serverCreateProduct e serverCreateStore nunca são chamadas: os componentes falam direto com Supabase/services. Duas trilhas concorrentes de escrita, com validações diferentes.',
    tag: 'Arquitetura',
  },
  {
    t: 'Visitante finaliza compra',
    d: 'O carrinho e o CheckoutModal não exigem login; createOrder usa user?.id || "guest-user". Pedidos de visitante não têm dono para consulta posterior.',
    tag: 'Regra de negócio',
  },
  {
    t: 'Moderação de posts inacessível',
    d: 'reportCommunityPost e adminDeleteCommunityPost existem no store, mas nenhum componente expõe botão de denúncia ou exclusão — os campos is_reported/report_reason nunca são acionados pela UI.',
    tag: 'Comunidade',
  },
  {
    t: 'Recuperação de senha inoperante',
    d: 'O modal de “Esqueci a senha” só exibe uma mensagem informativa; AuthService.resetPassword existe e não é chamado, e não há rota /auth/reset-password.',
    tag: 'Autenticação',
  },
  {
    t: 'Status de pedido e produto só em memória',
    d: 'adminUpdateOrderStatus e adminToggleProductStatus alteram apenas o estado do React. Não há função de ordens em lib/db-queries.ts — pedidos vivem em localStorage/Supabase, sem trilha administrativa persistida.',
    tag: 'Dados',
  },
  {
    t: 'Credenciais no código',
    d: 'lib/db.ts traz DEFAULT_DATABASE_URL com usuário e senha do PostgreSQL em texto puro como fallback. Essas credenciais devem sair do repositório e virar variável de ambiente (com rotação).',
    tag: 'Segurança',
  },
  {
    t: 'Middleware não protege rotas',
    d: 'middleware.ts apenas adiciona o header de plataforma; /admin e APIs internas não têm verificação de sessão no servidor — a regra de admin é só client-side (isUserAdmin por e-mail).',
    tag: 'Segurança',
  },
  {
    t: 'Favoritos, carrinho e pedidos sem tabela',
    d: 'A migração SQL cobre profiles, stores, products, orders e community_posts; carrinho e favoritos existem apenas no localStorage e não sincronizam entre dispositivos.',
    tag: 'Dados',
  },
  {
    t: 'Agendamento de treinador não persiste',
    d: 'handleConfirmBooking só dispara toast e fecha o modal após 2,5s: não há tabela, serviço ou registro de agendamento.',
    tag: 'Funcionalidade',
  },
];

const FILE_MAP = {
  head: ['Fluxo', 'Ponto de entrada', 'Regras e dados'],
  rows: [
    ['Shell e navegação', 'app/layout.tsx · app/page.tsx · components/Sidebar.tsx', 'lib/store.tsx (ActiveView, modais globais, toasts)'],
    ['Autenticação', 'components/AuthModal.tsx · app/auth/callback/page.tsx', 'services/authService.ts · app/api/auth/sync/route.ts · lib/db-queries.ts'],
    ['Compra', 'components/HomeHeroAndHighlights.tsx · MarketplaceView · ProductDetailModal · CheckoutModal', 'services/orderService.ts · lib/schemas/order.schema.ts'],
    ['Venda C2C', 'components/SellC2CView.tsx · ProductCard.tsx', 'services/productService.ts · app/api/listings/route.ts · lib/schemas/product.schema.ts'],
    ['Lojas e selo', 'components/StoresView.tsx · CreateStoreModal.tsx · AdminDashboard.tsx', 'services/storeService.ts · app/api/stores/route.ts · lib/schemas/store.schema.ts'],
    ['Comunidade', 'components/CommunityView.tsx', 'services/communityService.ts · lib/initial-data.ts'],
    ['Treinadores', 'components/CoachesView.tsx', 'INITIAL_COACHES (lib/initial-data.ts)'],
    ['Administração', 'components/AdminDashboard.tsx', 'lib/store.tsx (ações admin) · app/api/users/route.ts · app/api/products/route.ts'],
    ['Banco e infraestrutura', 'lib/db.ts · lib/db-queries.ts · middleware.ts', 'supabase/migrations/20250101000000_coremotiom_initial_schema.sql'],
  ],
};

const FILES_SUMMARY = [
  ['Rotas/telas renderizadas', '7 views: home, marketplace, stores, sell, coaches, community, admin'],
  ['Modais globais', 'AuthModal · SupabaseConfigModal · CheckoutModal · CreateStoreModal · ProductDetailModal'],
  ['Tabelas PostgreSQL', 'profiles · stores · products · orders · community_posts'],
  ['Rotas de API', '/api/products · /api/stores · /api/listings · /api/users · /api/auth/sync'],
  ['Services de domínio', 'AuthService · ProductService · StoreService · OrderService · CommunityService'],
];

/* ------------------------------------------------------------------ *
 * 5b. Metadados do produto                                            *
 * ------------------------------------------------------------------ */

const META = {
  product: 'CoreMotiom',
  tagline: 'Plataforma & marketplace esportivo de alta performance',
  stack: 'Next.js 15 · React 19 · TypeScript · Supabase / PostgreSQL · Tailwind CSS v4',
  repo: 'BIRFeuFeu/-CoreMotion',
  doc: 'Fluxograma completo do usuário e diagrama de casos de uso',
};

export {
  CANVAS_BG,
  ACTORS,
  EDGE_KINDS,
  GEO,
  escapeXml,
  round,
  wrapText,
  layout,
  routeEdge,
  labelAnchor,
  polylinePath,
  renderDiagram,
  DIAGRAMS,
  PERMISSIONS,
  STATUS_TABLE,
  GAPS,
  FILE_MAP,
  FILES_SUMMARY,
  META,
};
