#!/usr/bin/env node
/**
 * CoreMotiom — Gerador dos documentos MESTRE.
 * -------------------------------------------
 * Produz dois arquivos autocontidos (markdown) que permitem a um chat novo do Arena
 * recriar a documentação do produto sem acesso ao repositório:
 *
 *   Fluxograma/Diagrama C. De Uso/mestre-fluxograma.md    — dossiê do site, dados dos 7
 *                                    diagramas, regras de layout/render e código-fonte
 *                                    de referência (núcleo + geradores + kit de PDF).
 *   Fluxograma/Diagrama C. De Uso/mestre-casos-de-uso.md  — diagrama UML e catálogo dos 48 UC,
 *                                    com dados, regras de layout e código do núcleo.
 *
 * Uso:
 *   node scripts/generate-master-docs.mjs
 *   MASTER_SEM_CODIGO=1 node scripts/generate-master-docs.mjs   # sem o apêndice de código
 *
 * As contagens de página dos PDFs vêm de .flowchart-pages.json (escrito pelo gerador
 * de PDF). Se o arquivo não existir, os comandos `npm run flow:pdf` são sugeridos no aviso.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  CANVAS_BG,
  ACTORS,
  EDGE_KINDS,
  GEO,
  DIAGRAMS,
  PERMISSIONS,
  STATUS_TABLE,
  GAPS,
  FILE_MAP,
  FILES_SUMMARY,
  META,
} from './lib/flowchart-core.mjs';
import {
  UC_ACTORS,
  UC_EXTERNALS,
  UC_ACTOR_INFO,
  UC_EXTERNAL_INFO,
  USE_CASE_MODULES,
  USE_CASE_DIAGRAM,
  USE_CASE_CATALOG,
  USE_CASE_STATS,
} from './lib/usecase-core.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TPL_DIR = path.join(ROOT, 'scripts', 'master-templates');
const DOCS_REL = 'Fluxograma/Diagrama C. De Uso';
const DOCS_DIR = path.join(ROOT, 'Fluxograma', 'Diagrama C. De Uso');
const OUT_FLOW = path.join(DOCS_DIR, 'mestre-fluxograma.md');
const OUT_UC = path.join(DOCS_DIR, 'mestre-casos-de-uso.md');
const SEM_CODIGO = !!process.env.MASTER_SEM_CODIGO;

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const tpl = (name) => read(path.join('scripts', 'master-templates', name));
const json = (value) => JSON.stringify(value, null, 2);
const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/* ------------------------------------------------------------------ *
 * 1. Inventários do site                                              *
 * ------------------------------------------------------------------ */

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel));
    else out.push(rel);
  }
  return out;
}

const COMPONENT_ROLES = {
  'components/Sidebar.tsx': 'Navegação lateral, item “Painel Admin” e troca de papel (demo)',
  'components/Header.tsx': 'Busca global ⌘K, carrinho e avatar',
  'components/Footer.tsx': 'Rodapé institucional',
  'components/AuthModal.tsx': 'Login, cadastro, Google OAuth, “esqueci a senha” e switch de papel (4 modos)',
  'components/CheckoutModal.tsx': 'Endereço, frete, pagamento (PIX/cartão/boleto) e criação do pedido',
  'components/ProductDetailModal.tsx': 'Ficha do produto, galeria, frete por CEP, favoritar e carrinho',
  'components/ProductCard.tsx': 'Cartão de produto usado nos grids e vitrines',
  'components/MarketplaceView.tsx': 'Grid do catálogo com busca, filtros e ordenação',
  'components/HomeHeroAndHighlights.tsx': 'Hero, destaques e vitrines da Home',
  'components/StoresView.tsx': 'Lista de lojas oficiais e filtro por selo',
  'components/CreateStoreModal.tsx': 'Criação da loja oficial (vira seller)',
  'components/SellC2CView.tsx': 'Anúncio C2C do atleta e lista “Meus anúncios”',
  'components/CommunityView.tsx': 'Feed social: post, curtir e comentar',
  'components/CoachesView.tsx': 'Treinadores: cards, especialidades e agendamento',
  'components/AdminDashboard.tsx': 'Painel executivo com 8 módulos (GMV, custódia 4,5%, homologação, usuários, pedidos…)',
  'components/SupabaseConfigModal.tsx': 'Diagnóstico de configuração e sincronização manual do Supabase',
  'components/SmartScanView.tsx': 'Análise de desgaste/pace com IA — **órfão**, não é importado por nenhuma view (lacuna nº 3)',
  'components/error.tsx': 'Tela de erro do App Router',
};

function componentsInventory() {
  const files = walk('components').filter((f) => /\.(tsx|ts)$/.test(f) && !f.includes('/ui/'));
  const rows = files.map((f) => {
    const lines = read(f).split('\n').length;
    const role = COMPONENT_ROLES[f] || (f.endsWith('index.ts') ? 'Reexporta os componentes da pasta' : '—');
    const label = f.endsWith('index.ts') ? `\`${f}\`` : `\`${f.replace('components/', '')}\``;
    return `| ${label} | ${lines} | ${role} |`;
  });
  const ui = walk('components/ui').length;
  return [
    '| Arquivo | Linhas | Papel |',
    '| --- | ---: | --- |',
    ...rows.sort((a, b) => a.length - b.length || a.localeCompare(b)),
    '',
    `> Além destes, há **${ui} componentes de UI** em \`components/ui/\` (badge, button, card, dialog, form, input, label, separator, skeleton, tabs, textarea) — primitivos Radix/Tailwind sem regra de negócio.`,
  ].join('\n');
}

function servicesInventory() {
  const files = walk('services').filter((f) => f.endsWith('.ts') && !f.endsWith('index.ts'));
  const rows = [];
  for (const f of files) {
    const src = read(f);
    const fns = [
      ...[...src.matchAll(/export\s+(?:async\s+)?(?:function|const)\s+([A-Za-z_][\w]*)/g)].map((m) => m[1]),
      ...[...src.matchAll(/static\s+(?:async\s+)?([A-Za-z_][\w]*)\s*\(/g)].map((m) => `${m[1]}()`),
    ];
    const cls = src.match(/export class (\w+)/);
    rows.push(`| \`${f}\` | ${cls ? `**${cls[1]}**` : 'funções'} | ${fns.length ? fns.join(' · ') : '—'} |`);
  }
  return ['| Arquivo | Tipo | API principal |', '| --- | --- | --- |', ...rows.sort()].join('\n');
}

function gapsTable() {
  return [
    '| # | Tag | Lacuna | O que acontece |',
    '| ---: | --- | --- | --- |',
    ...GAPS.map((g, i) => `| ${i + 1} | ${g.tag} | **${g.t}** | ${g.d} |`),
  ].join('\n');
}

function fileMapTable() {
  const { head, rows } = FILE_MAP;
  return [
    `| ${head.join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| ${r.join(' | ')} |`),
  ].join('\n');
}

function summaryList() {
  return FILES_SUMMARY.map(([k, v]) => `- **${k}:** ${v}`).join('\n');
}

/* ------------------------------------------------------------------ *
 * 2. Derivados dos diagramas de fluxo                                 *
 * ------------------------------------------------------------------ */

function diagramStats(d) {
  const types = {};
  for (const n of d.nodes) types[n.type] = (types[n.type] || 0) + 1;
  const kinds = {};
  for (const e of d.edges) kinds[e.kind || 'flow'] = (kinds[e.kind || 'flow'] || 0) + 1;
  const actors = [...new Set(d.nodes.map((n) => n.actor))];
  const rows = d.nodes.map((n) => n.row);
  return { types, kinds, actors, minRow: Math.min(...rows), maxRow: Math.max(...rows) };
}

function resumoDiagramas() {
  return [
    '| # | Fluxo (`id`) | O que documenta | Atores envolvidos | Nós · Arestas |',
    '| ---: | --- | --- | --- | ---: |',
    ...DIAGRAMS.map((d) => {
      const s = diagramStats(d);
      const act = s.actors.map((a) => ACTORS[a]?.label || a).join(', ');
      return `| ${d.num} | ${d.title} (\`${d.id}\`) | ${d.desc} | ${act} | ${d.nodes.length} · ${d.edges.length} |`;
    }),
  ].join('\n');
}

function datasheetDiagramas() {
  return DIAGRAMS.map((d) => {
    const s = diagramStats(d);
    const linhas = [...new Set(d.nodes.map((n) => n.row))].sort((a, b) => a - b);
    const sequencia = linhas
      .map((r) => {
        const nodes = d.nodes.filter((n) => n.row === r);
        return `  - **linha ${r}:** ${nodes.map((n) => `\`${n.id}\` ${n.t}`).join(' · ')}`;
      })
      .join('\n');
    return [
      `### ${d.num}. ${d.title}`,
      '',
      `- **id:** \`${d.id}\` · **${d.nodes.length} nós** · **${d.edges.length} arestas** · linhas ${s.minRow}–${s.maxRow}`,
      `- **legenda de atores:** ${d.legend.map((a) => ACTORS[a]?.label || a).join(' · ')}`,
      `- **tipos de nó:** ${Object.entries(s.types).map(([k, v]) => `${k} ${v}`).join(' · ')}`,
      `- **tipos de aresta:** ${Object.entries(s.kinds).map(([k, v]) => `${k} ${v}`).join(' · ')}`,
      `- **rótulos de decisão/aresta:** ${d.edges.filter((e) => e.label).map((e) => `“${e.label}”`).join(' · ') || '—'}`,
      '- **sequência por linha:**',
      sequencia,
    ].join('\n');
  }).join('\n\n');
}

/* ------------------------------------------------------------------ *
 * 3. Derivados dos casos de uso                                       *
 * ------------------------------------------------------------------ */

const MODULE_SUMMARY = {
  'm-conta': 'Cadastro (Atleta C2C / Lojista B2C), login por e-mail e senha, Google OAuth, acesso rápido de demonstração, troca de papel, perfil e logout.',
  'm-compra': 'Descoberta no catálogo (busca, filtros, ficha, frete por CEP), favoritos, carrinho, checkout com PIX/cartão/boleto e acompanhamento de pedidos em custódia.',
  'm-oferta': 'Publicação e gestão de anúncios C2C, criação da loja oficial e solicitação/obtenção do selo de loja verificada.',
  'm-comunidade': 'Feed social com criação de post, curtidas e comentários, além do agendamento de treinadores.',
  'm-admin': 'Painel executivo: homologação de lojas, moderação de catálogo, gestão de usuários, pedidos/status e sincronização do Supabase.',
  'm-plataforma': 'Sessão Supabase, persistência em PostgreSQL com RLS, APIs internas, suporte a lojas verificadas e cálculo de frete.',
};

function modulosResumo() {
  return USE_CASE_MODULES.map((m) => {
    const ids = m.uc.map((u) => u.id);
    const actors = m.actors.map((a) => UC_ACTORS[a]?.label || a).join(', ') || 'Sistema';
    return `- **${m.title}** — ${m.uc.length} UC (${ids[0]}–${ids[ids.length - 1]}) · atores: ${actors}\n  ${MODULE_SUMMARY[m.id] || ''}`;
  }).join('\n');
}

function catalogoTabela() {
  const lines = [
    '| ID | Caso de uso | Módulo | Atores | Sistema externo | Onde está no código | Lacuna |',
    '| --- | --- | --- | --- | --- | --- | --- |',
  ];
  for (const m of USE_CASE_MODULES) {
    for (const u of m.uc) {
      const actors = u.actors.map((a) => UC_ACTORS[a]?.label || a).join(', ') || '—';
      const ext = u.ext ? UC_EXTERNALS[u.ext]?.label || u.ext : '—';
      lines.push(
        `| \`${u.id}\` | ${u.name} | ${m.title} | ${actors} | ${ext} | \`${u.src}\` | ${u.flag ? `(!) ${u.flag}` : '—'} |`
      );
    }
  }
  return lines.join('\n');
}

function modulosTabela() {
  return [
    '| Módulo | UCs | Faixa | Atores | Sistemas externos | Lacunas |',
    '| --- | ---: | --- | --- | --- | --- |',
    ...USE_CASE_MODULES.map((m) => {
      const ids = m.uc.map((u) => u.id);
      const exts = [...new Set(m.uc.filter((u) => u.ext).map((u) => UC_EXTERNALS[u.ext].label))];
      const flags = m.uc.filter((u) => u.flag);
      return `| ${m.title} | ${m.uc.length} | ${ids[0]}–${ids[ids.length - 1]} | ${m.actors.map((a) => UC_ACTORS[a]?.label || a).join(', ') || 'Sistema'} | ${exts.join(', ') || '—'} | ${flags.length ? `${flags.length} (${flags.map((u) => u.id).join(', ')})` : '—'} |`;
    }),
  ].join('\n');
}

function lacunasUcTabela() {
  const flagged = USE_CASE_CATALOG.filter((u) => u.flag);
  return [
    '| ID | Caso de uso | Módulo | Lacuna | Arquivo |',
    '| --- | --- | --- | --- | --- |',
    ...flagged.map((u) => `| \`${u.id}\` | ${u.name} | ${u.module} | ${u.flag} | \`${u.src}\` |`),
  ].join('\n');
}

/* ------------------------------------------------------------------ *
 * 4. Recortes de código-fonte                                         *
 * ------------------------------------------------------------------ */

function codeOf(rel) {
  let src = read(rel);
  if (src.startsWith('#!')) src = src.slice(src.indexOf('\n') + 1);
  return src.trim();
}

function slice(rel, from, to, { includeTo = false } = {}) {
  const src = read(rel);
  const i = src.indexOf(from);
  if (i < 0) throw new Error(`marcador não encontrado em ${rel}: ${from.slice(0, 60)}`);
  const j = src.indexOf(to, i);
  if (j < 0) throw new Error(`marcador final não encontrado em ${rel}: ${to.slice(0, 60)}`);
  return src.slice(i, includeTo ? j + to.length : j).trim();
}

/* ------------------------------------------------------------------ *
 * 5. Contagem de páginas dos PDFs                                     *
 * ------------------------------------------------------------------ */

function pageCounts() {
  const sidecar = path.join(DOCS_DIR, '.flowchart-pages.json');
  if (fs.existsSync(sidecar)) {
    const data = JSON.parse(fs.readFileSync(sidecar, 'utf8'));
    if (data.main && data.uc) return { main: data.main, uc: data.uc };
  }
  console.warn('! .flowchart-pages.json ausente — rode `npm run flow:pdf` antes para numerar as páginas com precisão.');
  return { main: 18, uc: 7 };
}

/* ------------------------------------------------------------------ *
 * 6. Montagem dos documentos                                          *
 * ------------------------------------------------------------------ */

const DATA_GERACAO = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date());
const TOTAL_UC = USE_CASE_STATS.total;

function dossieSite() {
  return tpl('_dossie-site.md.tpl')
    .replace('{{DATA_GERACAO}}', DATA_GERACAO)
    .replace('{{INVENTARIO_COMPONENTES}}', componentsInventory())
    .replace('{{INVENTARIO_SERVICES}}', servicesInventory())
    .replace('{{TABELA_LACUNAS}}', gapsTable())
    .replace('{{TABELA_ARQUIVOS}}', fileMapTable())
    .replace('{{RESUMO_ARQUIVOS}}', summaryList());
}

function fill(template, values, label) {
  const missing = new Set();
  const out = template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, key) => {
    if (key in values) return values[key];
    missing.add(key);
    return m;
  });
  if (missing.size) {
    throw new Error(`placeholders não preenchidos em ${label}: ${[...missing].join(', ')}`);
  }
  return out;
}

function buildFlowMaster() {
  const pages = pageCounts();
  const codigo = SEM_CODIGO
    ? '_(apêndice de código desativado: MASTER_SEM_CODIGO=1)_'
    : codeOf('scripts/lib/flowchart-core.mjs');
  const values = {
    DATA_GERACAO,
    DOCS_DIR: DOCS_REL,
    STACK: META.stack,
    REPO: META.repo,
    PAGINAS_PDF: String(pages.main),
    TOTAL_UC: String(TOTAL_UC),
    DOSSIE_SITE: dossieSite(),
    JSON_BASE: json({
      meta: META,
      canvasBg: CANVAS_BG,
      actors: ACTORS,
      edgeKinds: EDGE_KINDS,
      geo: GEO,
      totalDiagramas: DIAGRAMS.length,
    }),
    JSON_DIAGRAMAS: json(DIAGRAMS),
    JSON_TABELAS: json({ permissions: PERMISSIONS, status: STATUS_TABLE, gaps: GAPS, fileMap: FILE_MAP, filesSummary: FILES_SUMMARY }),
    RESUMO_DIAGRAMAS: resumoDiagramas(),
    DATASHEET_DIAGRAMAS: datasheetDiagramas(),
    CODIGO_FLOWCHART_CORE: codigo,
    CODIGO_PDF_KIT: SEM_CODIGO ? '_(desativado)_' : codeOf('scripts/lib/pdf-kit.mjs'),
    CODIGO_GEN_HTML: SEM_CODIGO ? '_(desativado)_' : codeOf('scripts/generate-user-flowchart.mjs'),
    CODIGO_GEN_PDF: SEM_CODIGO ? '_(desativado)_' : codeOf('scripts/generate-user-flowchart-pdf.mjs'),
  };
  return fill(tpl('mestre-fluxograma.md.tpl'), values, 'mestre-fluxograma');
}

function buildUcMaster() {
  const pages = pageCounts();
  const values = {
    DATA_GERACAO,
    DOCS_DIR: DOCS_REL,
    STACK: META.stack,
    REPO: META.repo,
    PAGINAS_UC_PDF: String(pages.uc),
    TOTAL_UC: String(USE_CASE_STATS.total),
    TOTAL_MODULOS: String(USE_CASE_STATS.modules),
    TOTAL_ATORES: String(USE_CASE_STATS.atores),
    TOTAL_EXTERNOS: String(USE_CASE_STATS.externos),
    TOTAL_PARCIAIS: String(USE_CASE_STATS.parciais),
    TITULO_DIAGRAMA: USE_CASE_DIAGRAM.title,
    DESC_DIAGRAMA: USE_CASE_DIAGRAM.desc,
    MODULOS_RESUMO: modulosResumo(),
    JSON_UC: json({
      diagram: USE_CASE_DIAGRAM,
      stats: USE_CASE_STATS,
      actors: UC_ACTORS,
      externals: UC_EXTERNALS,
      modules: USE_CASE_MODULES,
    }),
    JSON_UC_INFO: json({ actorInfo: UC_ACTOR_INFO, externalInfo: UC_EXTERNAL_INFO, catalog: USE_CASE_CATALOG }),
    CATALOGO_TABELA: catalogoTabela(),
    MODULOS_TABELA: modulosTabela(),
    LACUNAS_UC_TABELA: lacunasUcTabela(),
    CODIGO_USECASE_CORE: SEM_CODIGO ? '_(desativado)_' : codeOf('scripts/lib/usecase-core.mjs'),
    CODIGO_HTML_UC: SEM_CODIGO
      ? '_(desativado)_'
      : slice(
          'scripts/generate-user-flowchart.mjs',
          '  const uc = USE_CASE_DIAGRAM;',
          '  const legendShapes = ['
        ),
    CODIGO_PDF_UC: SEM_CODIGO
      ? '_(desativado)_'
      : slice('scripts/generate-user-flowchart-pdf.mjs', "  record('sec-uc');", "  record('sec-permissoes');"),
    CODIGO_PDF_UC_DOC: SEM_CODIGO
      ? '_(desativado)_'
      : slice('scripts/generate-user-flowchart-pdf.mjs', 'function coverUseCases(', 'function tocEntries(figures) {'),
  };
  return fill(tpl('mestre-casos-de-uso.md.tpl'), values, 'mestre-casos-de-uso');
}

/* ------------------------------------------------------------------ *
 * 7. Saída                                                            *
 * ------------------------------------------------------------------ */

function main() {
  fs.mkdirSync(path.dirname(OUT_FLOW), { recursive: true });
  const flow = buildFlowMaster();
  const uc = buildUcMaster();
  fs.writeFileSync(OUT_FLOW, flow);
  fs.writeFileSync(OUT_UC, uc);
  const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(0)} KB`;
  console.log(`✓ Fluxograma/Diagrama C. De Uso/mestre-fluxograma.md gerado (${kb(flow)}, ${flow.split('\n').length} linhas)`);
  console.log(`✓ Fluxograma/Diagrama C. De Uso/mestre-casos-de-uso.md gerado (${kb(uc)}, ${uc.split('\n').length} linhas)`);
  console.log(
    `  conteúdo: ${DIAGRAMS.length} diagramas de fluxo · ${USE_CASE_STATS.total} casos de uso · ` +
      `${GAPS.length} lacunas · ${USE_CASE_STATS.parciais} UC com lacuna${SEM_CODIGO ? ' · sem apêndice de código' : ''}`
  );
}

main();
