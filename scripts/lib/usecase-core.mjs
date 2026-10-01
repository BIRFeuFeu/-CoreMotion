/**
 * CoreMotiom — Diagrama e catálogo de casos de uso (UML).
 * ------------------------------------------------------
 * Modela TUDO que a plataforma oferece hoje, agrupado em 6 módulos funcionais,
 * com atores primários (visitante, atleta, lojista, admin) e secundários
 * (Google OAuth, Supabase, PIX/banco, transportadora).
 *
 * Casos de uso marcados com `flag` documentam comportamentos parciais ou
 * inoperantes no código atual (mesmos pontos ⚠ do fluxograma).
 *
 * Consumido por scripts/generate-user-flowchart.mjs (HTML) e
 * scripts/generate-user-flowchart-pdf.mjs (PDF).
 */

import { ACTORS, CANVAS_BG, escapeXml, round, wrapText } from './flowchart-core.mjs';

/* ------------------------------------------------------------------ *
 * 1. Atores                                                           *
 * ------------------------------------------------------------------ */

export const UC_ACTORS = {
  visitante: { label: 'Visitante', actor: 'visitante', side: 'left' },
  atleta: { label: 'Atleta (usuário)', actor: 'atleta', side: 'left' },
  lojista: { label: 'Lojista (vendedor)', actor: 'lojista', side: 'bottom' },
  admin: { label: 'Super Admin', actor: 'admin', side: 'right' },
};

export const UC_EXTERNALS = {
  google: { label: 'Google OAuth', actor: 'sistema' },
  supabaseAuth: { label: 'Supabase Auth', actor: 'sistema' },
  postgres: { label: 'PostgreSQL (RLS)', actor: 'sistema' },
  pix: { label: 'Banco / PIX', actor: 'sistema' },
  correios: { label: 'Transportadora', actor: 'sistema' },
};

/* ------------------------------------------------------------------ *
 * 2. Casos de uso por módulo                                          *
 * ------------------------------------------------------------------ */

export const USE_CASE_MODULES = [
  {
    id: 'm-conta',
    title: 'Conta & Acesso',
    col: 0,
    row: 0,
    actors: ['visitante', 'atleta'],
    uc: [
      { id: 'UC01', name: 'Criar conta (Atleta C2C ou Lojista B2C)', src: 'components/AuthModal.tsx', actors: ['visitante'] },
      { id: 'UC02', name: 'Entrar com e-mail e senha', src: 'services/authService.ts', actors: ['visitante'] },
      { id: 'UC03', name: 'Entrar com Google (OAuth)', src: 'app/auth/callback/page.tsx', actors: ['visitante'], ext: 'google' },
      { id: 'UC04', name: 'Usar acesso rápido de demonstração', src: 'lib/store.tsx · switchRole()', actors: ['visitante', 'atleta'] },
      { id: 'UC05', name: 'Simular outro papel (visitante/atleta/lojista/admin)', src: 'components/Sidebar.tsx', actors: ['atleta'] },
      { id: 'UC06', name: 'Editar perfil e interesses esportivos', src: 'lib/store.tsx · updateUserProfile()', actors: ['atleta'], flag: 'sem tela' },
      { id: 'UC07', name: 'Recuperar senha', src: 'components/AuthModal.tsx · modo forgot', actors: ['visitante'], flag: 'inoperante' },
      { id: 'UC08', name: 'Encerrar sessão (logout)', src: 'services/authService.ts · signOut()', actors: ['atleta', 'lojista', 'admin'] },
    ],
  },
  {
    id: 'm-compra',
    title: 'Descoberta & Compra',
    col: 0,
    row: 1,
    actors: ['visitante', 'atleta'],
    uc: [
      { id: 'UC09', name: 'Navegar pela Home e vitrines de destaque', src: 'components/HomeHeroAndHighlights.tsx', actors: ['visitante'] },
      { id: 'UC10', name: 'Buscar produtos no catálogo (⌘K)', src: 'components/Sidebar.tsx', actors: ['visitante'] },
      { id: 'UC11', name: 'Filtrar e ordenar catálogo (tipo, categoria, modalidade, condição, selo)', src: 'components/MarketplaceView.tsx', actors: ['visitante'] },
      { id: 'UC12', name: 'Ver ficha do produto (galeria, tamanhos, avaliação)', src: 'components/ProductDetailModal.tsx', actors: ['visitante'] },
      { id: 'UC13', name: 'Calcular frete por CEP', src: 'components/ProductDetailModal.tsx', actors: ['visitante'] },
      { id: 'UC14', name: 'Salvar produto nos favoritos', src: 'lib/store.tsx · toggleFavorite()', actors: ['atleta'], flag: 'sem tela' },
      { id: 'UC15', name: 'Gerenciar carrinho (quantidade, remover, subtotal)', src: 'components/CheckoutModal.tsx', actors: ['visitante', 'atleta'] },
      { id: 'UC16', name: 'Finalizar compra (carrinho → entrega → pagamento)', src: 'components/CheckoutModal.tsx', actors: ['visitante', 'atleta'], include: ['UC15'] },
      { id: 'UC17', name: 'Pagar com PIX, cartão ou boleto', src: 'lib/store.tsx · createOrder()', actors: ['visitante', 'atleta'], ext: 'pix' },
      { id: 'UC18', name: 'Acompanhar pedidos e rastreio', src: 'lib/store.tsx · orders', actors: ['atleta'], flag: 'sem tela' },
    ],
  },
  {
    id: 'm-oferta',
    title: 'Oferta & Lojas',
    col: 1,
    row: 0,
    actors: ['atleta', 'lojista'],
    uc: [
      { id: 'UC19', name: 'Anunciar equipamento seminovo (C2C)', src: 'components/SellC2CView.tsx', actors: ['atleta'] },
      { id: 'UC20', name: 'Gerenciar meus anúncios (listar e excluir)', src: 'components/SellC2CView.tsx', actors: ['atleta'] },
      { id: 'UC21', name: 'Acompanhar vendas em custódia', src: 'components/SellC2CView.tsx', actors: ['atleta'], flag: 'placeholder' },
      { id: 'UC22', name: 'Salvar rascunho de anúncio', src: 'components/SellC2CView.tsx', actors: ['atleta'], flag: 'placeholder' },
      { id: 'UC23', name: 'Criar loja oficial (B2C)', src: 'components/CreateStoreModal.tsx', actors: ['lojista'] },
      { id: 'UC24', name: 'Exibir catálogo e perfil público da loja', src: 'components/StoresView.tsx', actors: ['lojista', 'visitante'] },
      { id: 'UC25', name: 'Solicitar selo de loja verificada (CNPJ)', src: 'components/StoresView.tsx', actors: ['lojista'] },
      { id: 'UC26', name: 'Filtrar lojas verificadas', src: 'components/StoresView.tsx', actors: ['visitante'] },
    ],
  },
  {
    id: 'm-comunidade',
    title: 'Comunidade & Serviços',
    col: 1,
    row: 1,
    actors: ['atleta'],
    uc: [
      { id: 'UC27', name: 'Publicar no feed da comunidade', src: 'components/CommunityView.tsx', actors: ['atleta'] },
      { id: 'UC28', name: 'Curtir publicação', src: 'services/communityService.ts', actors: ['visitante'] },
      { id: 'UC29', name: 'Comentar publicação', src: 'components/CommunityView.tsx', actors: ['atleta'] },
      { id: 'UC30', name: 'Filtrar feed por categoria', src: 'components/CommunityView.tsx', actors: ['visitante'] },
      { id: 'UC31', name: 'Denunciar publicação para moderação', src: 'lib/store.tsx · reportCommunityPost()', actors: ['atleta'], flag: 'sem UI' },
      { id: 'UC32', name: 'Buscar treinador por modalidade', src: 'components/CoachesView.tsx', actors: ['visitante'] },
      { id: 'UC33', name: 'Agendar assessoria esportiva', src: 'components/CoachesView.tsx', actors: ['atleta'], flag: 'não persiste' },
    ],
  },
  {
    id: 'm-admin',
    title: 'Administração',
    col: 2,
    row: 0,
    actors: ['admin'],
    uc: [
      { id: 'UC34', name: 'Acessar painel executivo master', src: 'components/AdminDashboard.tsx', actors: ['admin'] },
      { id: 'UC35', name: 'Ver métricas (GMV, custódia 4,5%, B2C × C2C)', src: 'components/AdminDashboard.tsx', actors: ['admin'] },
      { id: 'UC36', name: 'Auditar loja: aprovar ou recusar selo', src: 'lib/store.tsx · adminVerifyStore()', actors: ['admin'] },
      { id: 'UC37', name: 'Moderar catálogo (status e exclusão)', src: 'lib/store.tsx · adminToggleProductStatus()', actors: ['admin'] },
      { id: 'UC38', name: 'Gerenciar usuários (criar, papel, banir, excluir)', src: 'app/api/users/route.ts', actors: ['admin'] },
      { id: 'UC39', name: 'Atualizar status de pedidos e pagamentos', src: 'lib/store.tsx · adminUpdateOrderStatus()', actors: ['admin'], flag: 'só memória' },
      { id: 'UC40', name: 'Confirmar pagamento em sandbox', src: 'services/orderService.ts', actors: ['admin'] },
      { id: 'UC41', name: 'Sincronizar dados com Supabase', src: 'lib/store.tsx · adminSyncSupabase()', actors: ['admin'] },
      { id: 'UC42', name: 'Diagnosticar banco e abrir console SQL', src: 'components/SupabaseConfigModal.tsx', actors: ['admin'] },
    ],
  },
  {
    id: 'm-plataforma',
    title: 'Plataforma & Integrações',
    col: 2,
    row: 1,
    actors: [],
    uc: [
      { id: 'UC43', name: 'Autenticar contas no Supabase Auth', src: 'services/supabaseClient.ts', actors: [], ext: 'supabaseAuth' },
      { id: 'UC44', name: 'Persistir dados em PostgreSQL com RLS', src: 'lib/db-queries.ts', actors: [], ext: 'postgres' },
      { id: 'UC45', name: 'Expor API Routes internas (produtos, lojas, usuários)', src: 'app/api/*', actors: [] },
      { id: 'UC46', name: 'Servir imagens do catálogo', src: 'public/products/*', actors: [] },
      { id: 'UC47', name: 'Operar em modo offline com dados iniciais', src: 'lib/initial-data.ts', actors: [] },
      { id: 'UC48', name: 'Consultar prazo e frete da transportadora', src: 'components/ProductDetailModal.tsx', actors: [], ext: 'correios' },
    ],
  },
];

export const USE_CASE_DIAGRAM = {
  id: 'casos-de-uso',
  num: 8,
  title: 'Diagrama de casos de uso — tudo que a plataforma oferece',
  desc:
    'Visão UML dos 48 casos de uso implementados, agrupados em 6 módulos funcionais, com atores primários (visitante, atleta, lojista, admin) e sistemas externos (Google OAuth, Supabase, PostgreSQL, banco/PIX e transportadora). Os identificadores UC correspondem ao catálogo completo logo abaixo.',
};

/* ------------------------------------------------------------------ *
 * 3. Catálogo consolidado                                             *
 * ------------------------------------------------------------------ */

export const USE_CASE_CATALOG = USE_CASE_MODULES.flatMap((m) =>
  m.uc.map((u) => ({
    module: m.title,
    id: u.id,
    name: u.name,
    actors: u.actors,
    external: u.ext ? UC_EXTERNALS[u.ext].label : '',
    src: u.src,
    flag: u.flag || '',
    include: u.include || [],
  }))
);

export const USE_CASE_STATS = {
  total: USE_CASE_CATALOG.length,
  modules: USE_CASE_MODULES.length,
  atores: Object.keys(UC_ACTORS).length,
  externos: Object.keys(UC_EXTERNALS).length,
  parciais: USE_CASE_CATALOG.filter((u) => u.flag).length,
};

/* ------------------------------------------------------------------ *
 * 4. Layout do diagrama UML                                           *
 *    Faixas horizontais empilhadas (1 módulo por faixa) com corredores *
 *    laterais de atores — nenhuma associação cruza um módulo.          *
 * ------------------------------------------------------------------ */

const UML = {
  laneLeft: 244,
  boundaryPad: 26,
  bandW: 1140,
  bandPadX: 18,
  bandHeaderH: 38,
  colGap: 44,
  pillH: 38,
  pillGap: 9,
  bandGap: 26,
  top: 104,
  itemFont: 11.8,
  idFont: 8.8,
  actorSpineX: 158,
  actorIconX: 96,
};

const BAND_TITLES = {
  'm-conta': 'Conta & Acesso',
  'm-compra': 'Descoberta & Compra',
  'm-oferta': 'Oferta & Lojas',
  'm-comunidade': 'Comunidade & Serviços',
  'm-admin': 'Administração',
  'm-plataforma': 'Plataforma & Integrações',
};

function actorGlyph(cx, cy, label, color, textColor, anchor = 'middle') {
  return `
  <circle cx="${round(cx)}" cy="${round(cy - 19)}" r="8.5" fill="none" stroke="${color}" stroke-width="1.7" />
  <path d="M${round(cx)},${round(cy - 10.5)} V${round(cy + 7)}" stroke="${color}" stroke-width="1.7" fill="none" />
  <path d="M${round(cx - 16)},${round(cy - 3)} H${round(cx + 16)}" stroke="${color}" stroke-width="1.7" fill="none" />
  <path d="M${round(cx - 13)},${round(cy + 27)} L${round(cx)},${round(cy + 7)} L${round(cx + 13)},${round(cy + 27)}" stroke="${color}" stroke-width="1.7" fill="none" />
  <text x="${round(cx)}" y="${round(cy + 44)}" text-anchor="${anchor}" font-size="12.6" font-weight="700" fill="${textColor}">${escapeXml(label)}</text>`;
}

/** Distribui os casos de uso de um módulo em duas colunas, mantendo a ordem de leitura. */
function splitColumns(items) {
  const cols = { L: [], R: [] };
  const columnOf = new Map();
  for (const it of items) {
    const included = (it.include || []).map((id) => columnOf.get(id)).find(Boolean);
    if (it.ext) cols.R.push(it);
    else if (included) cols[included].push(it);
    else if (cols.L.length <= cols.R.length) cols.L.push(it);
    else cols.R.push(it);
    columnOf.set(it.id, cols.L.includes(it) ? 'L' : 'R');
  }
  return cols;
}

export function renderUseCaseSvg(diagram = USE_CASE_DIAGRAM) {
  // ---------- 1. medição ----------
  const bands = USE_CASE_MODULES.map((m) => {
    const items = m.uc.map((u) => ({ ...u, lines: wrapText(u.name, UML.bandW / 2 - 76, UML.itemFont, false) }));
    const cols = splitColumns(items);
    const colH = (list) => list.reduce((a, it) => a + Math.max(UML.pillH, 16 + it.lines.length * 14.6) + UML.pillGap, 0);
    const inner = Math.max(colH(cols.L), colH(cols.R));
    return { ...m, items, cols, h: UML.bandHeaderH + inner + 16 };
  });

  const bandStackH = bands.reduce((a, b) => a + b.h + UML.bandGap, 0) - UML.bandGap;
  const boundaryX = UML.laneLeft;
  const boundaryY = UML.top;
  const boundaryW = UML.bandW + UML.boundaryPad * 2;
  const boundaryH = bandStackH + UML.boundaryPad * 2 + 8;
  const boundaryRight = boundaryX + boundaryW;
  const width = boundaryRight + 300;

  /** Empurra itens para que fiquem no mínimo `minGap` afastados no eixo Y. */
  const spread = (items, minGap) => {
    const sorted = [...items].sort((a, b) => a.desiredY - b.desiredY);
    let last = -Infinity;
    for (const it of sorted) {
      it.y = Math.max(it.desiredY, last + minGap);
      last = it.y;
    }
    return sorted;
  };

  const bandX = boundaryX + UML.boundaryPad;
  const pillW = (UML.bandW - UML.bandPadX * 2 - UML.colGap) / 2;

  // ---------- 2. posicionamento ----------
  let y = boundaryY + UML.boundaryPad + 4;
  for (const b of bands) {
    b.x = bandX;
    b.y = y;
    b.cy = y + b.h / 2;
    let cursorL = y + UML.bandHeaderH;
    b.cols.L.forEach((it) => {
      it.x = bandX + UML.bandPadX;
      it.y = cursorL;
      it.w = pillW;
      it.h = Math.max(UML.pillH, 16 + it.lines.length * 14.6);
      cursorL += it.h + UML.pillGap;
    });
    let cursorR = y + UML.bandHeaderH;
    b.cols.R.forEach((it) => {
      it.x = bandX + UML.bandPadX + pillW + UML.colGap;
      it.y = cursorR;
      it.w = pillW;
      it.h = Math.max(UML.pillH, 16 + it.lines.length * 14.6);
      cursorR += it.h + UML.pillGap;
    });
    y += b.h + UML.bandGap;
  }
  const byId = (id) => bands.flatMap((b) => b.items).find((i) => i.id === id);

  // ---------- 3. desenho ----------
  const body = [];

  // faixa de título / legenda superior
  const legendY = 52;
  const legend = [
    ['#8B93A7', 'Atores primários à esquerda e à direita'],
    ['#38BDF8', 'Sistemas externos (tracejado azul)'],
    ['#A78BFA', 'Relações «include» (tracejado roxo)'],
    ['#FBBF24', 'Caso de uso com lacuna conhecida'],
  ];
  let lx = UML.laneLeft - 40;
  legend.forEach(([color, text], i) => {
    const x = lx + i * 430;
    body.push(
      `<circle cx="${round(x)}" cy="${round(legendY - 4)}" r="5" fill="${color}" />`,
      `<text x="${round(x + 14)}" y="${round(legendY)}" font-size="11.4" font-weight="600" fill="#98A0B1">${escapeXml(text)}</text>`
    );
  });

  // boundary (fronteira do sistema)
  body.push(
    `<rect x="${boundaryX}" y="${boundaryY}" width="${boundaryW}" height="${round(
      boundaryH
    )}" rx="24" fill="rgba(255,255,255,0.018)" stroke="#3A4152" stroke-width="1.6" />`,
    `<text x="${boundaryX + 20}" y="${boundaryY + 25}" font-size="13.4" font-weight="700" fill="#C7CDDA">CoreMotiom — Sistema de Marketplace Esportivo</text>`,
    `<text x="${round(boundaryRight - 20)}" y="${boundaryY + 25}" text-anchor="end" font-size="10.8" font-weight="700" letter-spacing="1.1" fill="#767F93">${USE_CASE_STATS.total} CASOS DE USO · ${USE_CASE_STATS.modules} MÓDULOS</text>`
  );

  // corredores dos atores primários
  const lanes = { left: [], right: [] };
  for (const [key, def] of Object.entries(UC_ACTORS)) {
    const mods = bands.filter((b) => b.actors.includes(key));
    if (!mods.length) continue;
    lanes[def.side === 'right' ? 'right' : 'left'].push({ key, def, mods });
  }
  const leftActors = spread(
    lanes.left.map(({ key, def, mods }) => ({ key, def, mods, desiredY: Math.min(...mods.map((m) => m.cy)) })),
    112
  );
  leftActors.forEach(({ key, def, mods }, idx) => {
    const color = ACTORS[def.actor].stroke;
    const spineX = UML.actorSpineX + idx * 18;
    const offset = (idx - (leftActors.length - 1) / 2) * 16;
    const conns = mods.map((m) => ({ y: m.cy + offset, band: m }));
    const top = Math.min(...conns.map((c) => c.y));
    const bottom = Math.max(...conns.map((c) => c.y));
    const cyIcon = idx === 0 ? top : bottom;
    body.push(
      `<path d="M${round(spineX)},${round(Math.min(top, cyIcon))} V${round(
        Math.max(bottom, cyIcon)
      )}" fill="none" stroke="${color}" stroke-width="1.7" opacity="0.85" />`,
      `<path d="M${round(UML.actorIconX + 22)},${round(cyIcon)} H${round(spineX)}" fill="none" stroke="${color}" stroke-width="1.7" opacity="0.85" />`
    );
    for (const c of conns) {
      body.push(
        `<path d="M${round(spineX)},${round(c.y)} H${round(c.band.x)}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.9" />`
      );
    }
    body.push(actorGlyph(UML.actorIconX, cyIcon, UC_ACTORS[key].label, color, ACTORS[def.actor].text));
  });

  // corredor direito: Super Admin
  lanes.right.forEach(({ key, def, mods }) => {
    const color = ACTORS[def.actor].stroke;
    const spineX = boundaryRight + 54;
    const cy = mods[0].cy;
    body.push(
      `<path d="M${round(spineX)},${round(cy - 26)} V${round(cy + 26)}" fill="none" stroke="${color}" stroke-width="1.7" opacity="0.85" />`
    );
    for (const m of mods) {
      body.push(
        `<path d="M${round(boundaryRight)},${round(m.cy)} H${round(spineX)}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.9" />`
      );
    }
    body.push(actorGlyph(spineX + 46, cy, UC_ACTORS[key].label, color, ACTORS[def.actor].text));
  });

  // módulos + casos de uso
  for (const b of bands) {
    const accent = ACTORS[(b.actors[0] || 'sistema')].stroke;
    body.push(
      `<rect x="${round(b.x)}" y="${round(b.y)}" width="${UML.bandW}" height="${round(
        b.h
      )}" rx="16" fill="rgba(15,17,22,0.95)" stroke="${accent}" stroke-width="1.3" stroke-dasharray="7 5" />`,
      `<text x="${round(b.x + UML.bandPadX)}" y="${round(b.y + 25)}" font-size="12.8" font-weight="700" fill="${accent}">${escapeXml(
        BAND_TITLES[b.id] || b.title
      )}</text>`,
      `<text x="${round(b.x + UML.bandW - UML.bandPadX)}" y="${round(b.y + 25)}" text-anchor="end" font-size="10.2" font-weight="700" fill="#6F7789">${b.items.length} UC · ${b.actors.map((a) => UC_ACTORS[a].label.replace(/ \(.*\)/, '')).join(' · ')}</text>`
    );

    for (const it of b.items) {
      const a = ACTORS[it.actors[0] || 'sistema'];
      const cy = it.y + it.h / 2;
      body.push(
        `<rect x="${round(it.x)}" y="${round(it.y)}" width="${round(it.w)}" height="${round(it.h)}" rx="${round(
          it.h / 2
        )}" fill="${a.fill}" stroke="${it.ext ? '#38BDF8' : a.stroke}" stroke-width="1.25" />`,
        `<text x="${round(it.x + 16)}" y="${round(cy + 3.7)}" font-size="${UML.idFont}" font-weight="700" fill="${a.sub}">${escapeXml(
          it.id
        )}</text>`,
        `<text x="${round(it.x + 50)}" y="${round(cy + 4.2)}" font-size="${UML.itemFont}" fill="${a.text}">${escapeXml(
          it.lines[0]
        )}</text>`
      );
      if (it.flag) {
        body.push(
          `<circle cx="${round(it.x + it.w - 16)}" cy="${round(cy)}" r="4" fill="#FBBF24" />`,
          `<title>${escapeXml(it.id)}: ${escapeXml(it.flag)}</title>`
        );
      }
    }

    // «include» entre casos de uso
    for (const it of b.items) {
      for (const inc of it.include || []) {
        const t = byId(inc);
        if (!t) continue;
        const sameCol = Math.abs(it.x - t.x) < 2;
        if (sameCol) {
          const x = it.x + 26;
          body.push(
            `<path d="M${round(x)},${round(it.y + it.h)} V${round(t.y - 6)}" fill="none" stroke="#A78BFA" stroke-width="1.3" stroke-dasharray="5 4" marker-end="url(#uc-include)" />`,
            `<text x="${round(x + 8)}" y="${round((it.y + it.h + t.y) / 2)}" font-size="9.6" font-weight="600" fill="#C4B5FD">«include»</text>`
          );
        } else {
          const fromRight = t.x > it.x;
          const x1 = fromRight ? it.x + it.w : it.x;
          const x2 = fromRight ? t.x : t.x + t.w;
          const y = t.y + t.h / 2;
          const midX = (x1 + x2) / 2;
          body.push(
            `<path d="M${round(x1)},${round(it.y + it.h / 2)} H${round(midX)} V${round(y)} H${round(
              x2
            )}" fill="none" stroke="#A78BFA" stroke-width="1.3" stroke-dasharray="5 4" marker-end="url(#uc-include)" />`,
            `<text x="${round(midX)}" y="${round(Math.min(it.y, t.y) - 4)}" text-anchor="middle" font-size="9.6" font-weight="600" fill="#C4B5FD">«include»</text>`
          );
        }
      }
    }

  }

  // integrações com sistemas externos (corredor direito, sem sobreposição)
  const extItems = bands
    .flatMap((b) => b.items.filter((it) => it.ext))
    .map((it) => ({ it, desiredY: it.y + it.h / 2 }));
  const placedExt = spread(extItems, 92);
  const height = Math.max(boundaryY + boundaryH, Math.max(...placedExt.map((e) => e.y)) + 78) + 34;
  placedExt.forEach(({ it, y }) => {
    const ext = UC_EXTERNALS[it.ext];
    const pillCy = it.y + it.h / 2;
    const iconX = boundaryRight + 150;
    const elbow = iconX - 62;
    body.push(
      `<path d="M${round(it.x + it.w)},${round(pillCy)} H${round(elbow)} V${round(y)} H${round(
        iconX - 26
      )}" fill="none" stroke="#38BDF8" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#uc-ext)" />`,
      actorGlyph(iconX, y, ext.label, '#38BDF8', '#A9D8F2')
    );
  });

  const defs = `<marker id="uc-include" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#A78BFA" /></marker>
<marker id="uc-ext" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#38BDF8" /></marker>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(width)} ${round(
    height
  )}" width="${round(width)}" height="${round(height)}" role="img" aria-label="${escapeXml(
    diagram.title
  )}" class="flow-svg">
<defs>${defs}</defs>
<rect x="0" y="0" width="${round(width)}" height="${round(height)}" fill="${CANVAS_BG}" />
${body.join('\n')}
</svg>`;
}
