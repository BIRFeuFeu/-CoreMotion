#!/usr/bin/env node
/**
 * CoreMotiom — Gerador do PDF do fluxograma do usuário + casos de uso.
 *
 *   node scripts/generate-user-flowchart-pdf.mjs
 *   FLOW_PNG_DIR=/caminho/com/pngs node scripts/generate-user-flowchart-pdf.mjs
 *
 * Pipeline:
 *   1. Garante o manifesto JSON gerado por `node scripts/generate-user-flowchart.mjs`
 *      (roda o gerador automaticamente se o manifesto estiver ausente/desatualizado).
 *   2. Rasteriza cada diagrama SVG (núcleo em scripts/lib/) em PNG com @resvg/resvg-js.
 *      Sem a dependência, usa os PNGs numerados de FLOW_PNG_DIR.
 *   3. Monta o PDF A4 — capa, sumário numerado, os 7 fluxos, o diagrama de casos de
 *      uso, o catálogo de UC, permissões, máquina de estados, lacunas e arquivos.
 *
 * Saída: docs/fluxograma-usuario.pdf
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { DIAGRAMS, renderDiagram, layout, ACTORS } from './lib/flowchart-core.mjs';
import {
  renderUseCaseSvg,
  USE_CASE_DIAGRAM,
  USE_CASE_MODULES,
  USE_CASE_STATS,
  UC_ACTOR_INFO,
  UC_EXTERNAL_INFO,
} from './lib/usecase-core.mjs';
import { PdfDoc, PALETTE, pdfSafe } from './lib/pdf-kit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_PDF = path.join(ROOT, 'docs', 'fluxograma-usuario.pdf');
const OUT_PDF_UC = path.join(ROOT, 'docs', 'casos-de-uso.pdf');
/** FLOW_PDF_ONLY=fluxos|casos limita a geração a um dos documentos. */
const ONLY = (process.env.FLOW_PDF_ONLY || '').toLowerCase();
const MANIFEST = process.env.FLOW_MANIFEST || path.join(ROOT, 'docs', '.flowchart-data.json');
const PNG_DIR = process.env.FLOW_PNG_DIR || '';
const HTML_SCRIPT = path.join(ROOT, 'scripts', 'generate-user-flowchart.mjs');
const CORE_FILES = [
  path.join(ROOT, 'scripts', 'lib', 'flowchart-core.mjs'),
  path.join(ROOT, 'scripts', 'lib', 'usecase-core.mjs'),
];

const A4 = { portrait: { width: 595.28, height: 841.89 }, landscape: { width: 841.89, height: 595.28 } };
const TOC_ENTRIES = [];
const SHORT_ACTORS = { visitante: 'Visitante', atleta: 'Atleta', lojista: 'Lojista', admin: 'Super Admin' };

const shortActor = (a) => SHORT_ACTORS[a] || a;

/* ------------------------------------------------------------------ *
 * 1. Manifesto                                                        *
 * ------------------------------------------------------------------ */

function ensureManifest() {
  const targets = [HTML_SCRIPT, ...CORE_FILES];
  const stale =
    !fs.existsSync(MANIFEST) ||
    targets.some((f) => fs.existsSync(f) && fs.statSync(f).mtimeMs > fs.statSync(MANIFEST).mtimeMs + 1);

  if (stale) {
    process.stdout.write('• atualizando manifesto de dados… ');
    const res = spawnSync(process.execPath, [HTML_SCRIPT], {
      cwd: ROOT,
      env: { ...process.env, FLOW_EMIT_JSON: MANIFEST },
      encoding: 'utf8',
    });
    if (res.status !== 0) {
      console.error('\n' + (res.stderr || res.stdout));
      throw new Error('falha ao gerar o manifesto (scripts/generate-user-flowchart.mjs)');
    }
    console.log('ok');
  }
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

/* ------------------------------------------------------------------ *
 * 2. Rasterização                                                     *
 * ------------------------------------------------------------------ */

const RESVG_CANDIDATES = () =>
  [
    '@resvg/resvg-js',
    '/home/user/tools/node_modules/@resvg/resvg-js/index.js',
    path.join(ROOT, 'node_modules/@resvg/resvg-js/index.js'),
  ].filter(Boolean);

async function loadResvg() {
  for (const candidate of RESVG_CANDIDATES()) {
    try {
      const mod = await import(candidate);
      const Resvg = mod.Resvg || mod.default?.Resvg;
      if (Resvg) return Resvg;
    } catch {
      /* tenta o próximo */
    }
  }
  return null;
}

const FONT_CANDIDATES = [
  '/home/user/tools/node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf',
  '/home/user/tools/node_modules/dejavu-fonts-ttf/ttf/DejaVuSans-Bold.ttf',
];

function pngFromSvg(Resvg, svg, scale) {
  // Fontes: usa as empacotadas quando existirem; caso contrário, as do sistema.
  const fontFiles = FONT_CANDIDATES.filter((f) => fs.existsSync(f));
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'zoom', value: scale },
    font: fontFiles.length
      ? { loadSystemFonts: false, fontFiles, defaultFontFamily: 'DejaVu Sans' }
      : { loadSystemFonts: true },
  });
  return Buffer.from(resvg.render().asPng());
}

async function renderFigures(manifest) {
  const Resvg = await loadResvg();
  const figures = [];

  for (const d of manifest.diagrams) {
    const { width, height } = layout(d);
    figures.push({
      key: `flow-${d.id}`,
      kind: 'flow',
      num: d.num,
      title: d.title,
      desc: d.desc,
      legend: (d.legend || []).map((k) => ACTORS[k].label),
      svg: renderDiagram(d),
      aspect: width / height,
      png: null,
    });
  }

  const uc = manifest.useCases;
  if (uc?.diagram) {
    const svg = renderUseCaseSvg(uc.diagram);
    const viewBox = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    figures.push({
      key: 'usecase',
      kind: 'usecase',
      num: uc.diagram.num,
      title: uc.diagram.title,
      desc: uc.diagram.desc,
      legend: [
        'Atores primários nos corredores laterais',
        'Sistemas externos (azul tracejado)',
        '«include» (roxo tracejado)',
        'Ponto âmbar = lacuna conhecida',
      ],
      svg,
      aspect: viewBox ? Number(viewBox[1]) / Number(viewBox[2]) : 1,
      png: null,
    });
  }

  for (const f of figures) {
    if (Resvg) f.png = pngFromSvg(Resvg, f.svg, 2);
    else if (PNG_DIR) {
      const prefix = String(f.num).padStart(2, '0');
      const name = fs.readdirSync(PNG_DIR).find((file) => file.endsWith('.png') && file.startsWith(prefix));
      if (name) f.png = fs.readFileSync(path.join(PNG_DIR, name));
    }
    if (!f.png) {
      throw new Error(
        `não foi possível gerar a imagem do diagrama ${f.key}. ` +
          'Instale o rasterizador com "npm i -D @resvg/resvg-js" ou aponte FLOW_PNG_DIR para os PNGs numerados.'
      );
    }
  }

  if (!Resvg) console.warn('• aviso: @resvg/resvg-js ausente — usando PNGs de FLOW_PNG_DIR');
  return figures;
}

/* ------------------------------------------------------------------ *
 * 3. Blocos de documento                                              *
 * ------------------------------------------------------------------ */

function cover(doc, manifest, figures) {
  const { width: W, height: H } = A4.portrait;
  doc.newPageIfFresh(A4.portrait);
  doc.page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PALETTE.dark });
  doc.page.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: PALETTE.accent });

  doc.page.drawRectangle({ x: 52, y: H - 138, width: 46, height: 46, color: PALETTE.accent });
  doc.page.drawText('CM', { x: 60, y: H - 121, size: 20, font: doc.fonts.bold, color: PALETTE.white });

  doc.page.drawText('CoreMotiom', { x: 52, y: H - 204, size: 34, font: doc.fonts.bold, color: PALETTE.white });
  doc.page.drawText(pdfSafe('Fluxograma completo do usuário'), {
    x: 52, y: H - 230, size: 15.5, font: doc.fonts.regular, color: PALETTE.amber,
  });
  doc.page.drawText(pdfSafe('e catálogo de casos de uso'), {
    x: 52, y: H - 250, size: 15.5, font: doc.fonts.regular, color: PALETTE.amber,
  });
  doc.page.drawText(pdfSafe(manifest.meta.tagline), {
    x: 52, y: H - 288, size: 11, font: doc.fonts.regular, color: PALETTE.faint,
  });
  doc.page.drawText(pdfSafe(manifest.meta.stack), {
    x: 52, y: H - 306, size: 9.4, font: doc.fonts.regular, color: PALETTE.faint,
  });

  const stats = [
    [String(figures.filter((f) => f.kind === 'flow').length), 'diagramas de fluxo'],
    ['1', 'diagrama UML de casos de uso'],
    [String(manifest.useCases?.stats?.total ?? 48), 'casos de uso catalogados'],
    [String(manifest.gaps.length), 'lacunas e riscos mapeados'],
  ];
  stats.forEach(([value, label], i) => {
    const x = 52 + i * 122;
    const y = H - 404;
    doc.page.drawRectangle({ x, y, width: 108, height: 66, color: PALETTE.darkSoft, borderColor: PALETTE.accent, borderWidth: 0.7 });
    doc.page.drawText(value, { x: x + 12, y: y + 34, size: 21, font: doc.fonts.bold, color: PALETTE.white });
    doc.page.drawText(pdfSafe(label), { x: x + 12, y: y + 18, size: 7.4, font: doc.fonts.regular, color: PALETTE.faint });
  });

  const stamp = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date());
  doc.page.drawText(pdfSafe(`Gerado em ${stamp} a partir do código-fonte de ${manifest.meta.repo}`), {
    x: 52, y: 80, size: 8.4, font: doc.fonts.regular, color: PALETTE.faint,
  });
  doc.page.drawText(
    pdfSafe('7 fluxos de usuário · 1 diagrama UML de casos de uso · permissões por papel · máquina de estados · lacunas e riscos.'),
    { x: 52, y: 64, size: 8.4, font: doc.fonts.regular, color: PALETTE.faint }
  );
}

function tableOfContents(doc, entries, pageMap) {
  doc.newPage(A4.portrait);
  doc.heading('Sumário', { level: 1 });
  doc.paragraph(
    'A numeração abaixo segue a ordem de leitura do PDF. Cada diagrama ocupa uma página própria, com legenda de atores e de tipos de seta.'
  );
  doc.spacer(4);
  doc.table(
    ['Seção', 'Página'],
    entries.map((e) => [e.level === 1 ? e.title : `     ${e.title}`, pageMap[e.id] ? String(pageMap[e.id]) : '—']),
    [86, 14],
    { size: 9.4, boldFirst: false, wrap: false }
  );
}

function sectionHeader(doc, section) {
  doc.heading(section.title, { level: 1 });
  if (section.desc) doc.paragraph(section.desc);
}

/** Escolhe a orientação que permite desenhar o diagrama no maior tamanho. */
function bestOrientation(aspect, headerSpace) {
  const fits = (size) => {
    const maxW = size.width - 104;
    const maxH = size.height - 104 - headerSpace;
    return Math.min(maxW / aspect, maxH); // altura máxima alcançável
  };
  const portrait = fits(A4.portrait);
  const landscape = fits(A4.landscape);
  return landscape > portrait * 1.05 ? A4.landscape : A4.portrait;
}

async function figurePage(doc, figure, record) {
  const headerSpace = 64 + (figure.desc ? 20 : 0) + (figure.legend?.length ? 14 : 0);
  doc.newPage(bestOrientation(figure.aspect, headerSpace));
  if (record) record(`fig-${figure.num}`);
  doc.page.drawRectangle({ x: doc.margin, y: doc.height - doc.margin - 4, width: 3, height: 16, color: PALETTE.accent });
  doc.page.drawText(pdfSafe(`${figure.num}. ${figure.title}`), {
    x: doc.margin + 10, y: doc.height - doc.margin + 2, size: 12.6, font: doc.fonts.bold, color: PALETTE.ink,
  });
  doc.y = doc.height - doc.margin - 16;
  if (figure.desc) doc.paragraph(figure.desc, { size: 8.8, color: PALETTE.muted, after: 4 });
  if (figure.legend?.length) doc.paragraph(`Legenda: ${figure.legend.join(' · ')}`, { size: 8, color: PALETTE.faint, after: 4 });
  // 44pt de folga: evita que o placeImage abra uma página nova (e deixe a anterior vazia)
  await doc.placeImage(figure.png, {
    maxHeight: doc.y - doc.margin - 44,
    cacheKey: `fig-${figure.num}`,
  });
}

/* ------------------------------------------------------------------ *
 * 4. Conteúdo                                                         *
 * ------------------------------------------------------------------ */

const SELECTION = [
  'Cada diagrama é uma seção numerada; os identificadores UC01… do diagrama de casos de uso correspondem ao catálogo da seção 9.',
  'Cores identificam o perfil do ator: cinza (visitante), verde (atleta), azul (lojista) e vermelho (admin master).',
  'As setas têm semântica: fluxo padrão, autenticação/sessão, sucesso, erro/bloqueio, ação administrativa e gravação de dados.',
  'Nós âmbar tracejados, marcados com (!), documentam lacunas ou comportamentos parciais no código atual.',
];

async function renderStructure(doc, manifest, figures, record) {
  const flowFigures = figures.filter((f) => f.kind === 'flow');
  const ucFigure = figures.find((f) => f.kind === 'usecase');

  /* --- 1. visão geral --- */
  doc.newPage(A4.portrait);
  record('sec-mapa');
  sectionHeader(doc, {
    title: '1. Visão geral e mapa dos diagramas',
    desc:
      'Este documento reúne o mapa completo das jornadas de usuário da plataforma CoreMotiom e o catálogo de casos de uso, ' +
      'extraídos diretamente do código-fonte: telas renderizadas, modais globais, guardas de acesso, serviços, rotas de API e a migração SQL.',
  });
  doc.pills(manifest.summary.map(([k, v]) => [k, v]));
  doc.spacer(2);
  doc.heading('Como ler os diagramas', { level: 2 });
  doc.bullets(SELECTION);
  doc.spacer(2);
  doc.heading('Mapa dos diagramas', { level: 2 });
  doc.table(
    ['#', 'Diagrama', 'O que cobre'],
    manifest.diagrams.map((d) => [`${d.num}`, d.title, d.desc]),
    [6, 34, 60],
    { boldFirst: true }
  );
  doc.paragraph(
    'Para leitura com zoom, os mesmos diagramas estão disponíveis em docs/fluxograma-usuario.html, gerado a partir deste mesmo núcleo de dados.',
    { size: 8.4, color: PALETTE.faint }
  );

  /* --- fluxos --- */
  for (const f of flowFigures) {
    await figurePage(doc, f, record);
  }

  /* --- casos de uso --- */
  doc.newPage(A4.portrait);
  record('sec-uc');
  sectionHeader(doc, { title: `${ucFigure.num}. Diagrama de casos de uso`, desc: ucFigure.desc });
  await doc.placeImage(ucFigure.png, { maxHeight: doc.y - doc.margin - 30, cacheKey: 'usecase' });
  doc.paragraph(
    'Atores primários ocupam os corredores laterais (visitante, atleta e lojista à esquerda; super admin à direita). ' +
      'Sistemas externos aparecem em azul tracejado, as relações «include» em roxo e os pontos âmbar marcam casos com lacuna conhecida.',
    { size: 8.4, color: PALETTE.faint }
  );

  /* --- catálogo --- */
  doc.newPage(A4.portrait);
  record('sec-catalogo');
  doc.heading('9. Catálogo completo de casos de uso', { level: 1 });
  const stats = manifest.useCases.stats;
  doc.pills([
    ['Casos de uso', String(stats.total)],
    ['Módulos', String(stats.modules)],
    ['Atores', String(stats.atores)],
    ['Sistemas externos', String(stats.externos)],
    ['Com lacuna', String(stats.parciais)],
  ]);
  const ucRows = [];
  for (const m of manifest.useCases.modules) {
    ucRows.push({ group: m.title });
    for (const u of m.uc) {
      ucRows.push({
        cells: [
          u.id,
          u.flag ? `${u.name}   (!) ${u.flag}` : u.name,
          u.actors.map(shortActor).join(', ') + (u.ext ? ` + ${u.ext}` : ''),
          u.src,
        ],
      });
    }
  }
  doc.table(['ID', 'Caso de uso', 'Atores', 'Onde está no código'], ucRows, [7, 42, 18, 33]);

  /* --- permissões --- */
  doc.newPage(A4.portrait);
  record('sec-permissoes');
  doc.heading('10. Papéis e permissões por tela', { level: 1 });
  doc.paragraph('Como o app decide o que cada perfil vê e faz (lib/store.tsx + guardas em cada componente).');
  doc.table(manifest.permissions.head, manifest.permissions.rows, [40, 15, 15, 15, 15], { boldFirst: true });

  /* --- estados --- */
  record('sec-status');
  doc.heading('11. Máquina de estados do domínio', { level: 1 });
  doc.paragraph('Todos os estados previstos nos tipos do projeto e quem os movimenta.');
  doc.table(manifest.status.head, manifest.status.rows, [24, 42, 34], { boldFirst: true });

  /* --- lacunas --- */
  doc.newPage(A4.portrait);
  record('sec-lacunas');
  doc.heading('12. Lacunas e riscos encontrados no fluxo', { level: 1 });
  doc.paragraph('Pontos em que o caminho do usuário termina em tela vazia, em ação sem persistência ou em risco operacional.');
  for (const g of manifest.gaps) doc.card(`${g.t}  ·  ${g.tag}`, g.d, { accent: PALETTE.amber });

  /* --- arquivos --- */
  record('sec-arquivos');
  doc.heading('13. Arquivos-chave por fluxo', { level: 1 });
  doc.paragraph('Onde mexer para evoluir cada jornada.');
  doc.table(manifest.files.head, manifest.files.rows, [22, 40, 38], { boldFirst: true });

  /* --- manutenção --- */
  record('sec-manutencao');
  doc.heading('14. Manutenção deste documento', { level: 1 });
  doc.paragraph(
    'O PDF é gerado por script a partir do mesmo núcleo que produz o HTML — não edite os arquivos à mão. ' +
      'Ao mudar uma jornada, atualize scripts/lib/flowchart-core.mjs (fluxos) ou scripts/lib/usecase-core.mjs (casos de uso) e rode os geradores.'
  );
  doc.bullets([
    'node scripts/generate-user-flowchart.mjs ......... regenera docs/fluxograma-usuario.html',
    'node scripts/generate-user-flowchart-pdf.mjs ..... regenera docs/fluxograma-usuario.pdf',
    'npm i -D @resvg/resvg-js ......................... rasterizador usado para embutir os diagramas',
  ]);
}

/* ------------------------------------------------------------------ *
 * 5. Execução (duas passagens para numerar o sumário)                 *
 * ------------------------------------------------------------------ */

/* ---------------- documento "Casos de uso" ---------------- */

function coverUseCases(doc, manifest, figures) {
  const { width: W, height: H } = A4.portrait;
  doc.newPageIfFresh(A4.portrait);
  doc.page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PALETTE.dark });
  doc.page.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: PALETTE.accent });

  doc.page.drawRectangle({ x: 52, y: H - 138, width: 46, height: 46, color: PALETTE.accent });
  doc.page.drawText('CM', { x: 60, y: H - 121, size: 20, font: doc.fonts.bold, color: PALETTE.white });

  doc.page.drawText('CoreMotiom', { x: 52, y: H - 204, size: 34, font: doc.fonts.bold, color: PALETTE.white });
  doc.page.drawText(pdfSafe('Diagrama e catálogo de'), {
    x: 52, y: H - 230, size: 15.5, font: doc.fonts.regular, color: PALETTE.amber,
  });
  doc.page.drawText(pdfSafe('casos de uso'), {
    x: 52, y: H - 250, size: 15.5, font: doc.fonts.regular, color: PALETTE.amber,
  });
  doc.page.drawText(pdfSafe('Tudo que a plataforma oferece: 48 casos de uso em 6 módulos funcionais.'), {
    x: 52, y: H - 288, size: 10.4, font: doc.fonts.regular, color: PALETTE.faint,
  });
  doc.page.drawText(pdfSafe(manifest.meta.stack), {
    x: 52, y: H - 306, size: 9.4, font: doc.fonts.regular, color: PALETTE.faint,
  });

  const st = manifest.useCases.stats;
  const stats = [
    [String(st.total), 'casos de uso'],
    [String(st.modules), 'módulos funcionais'],
    [String(st.atores), 'atores primários'],
    [String(st.externos), 'sistemas externos'],
  ];
  stats.forEach(([value, label], i) => {
    const x = 52 + i * 122;
    const y = H - 404;
    doc.page.drawRectangle({ x, y, width: 108, height: 66, color: PALETTE.darkSoft, borderColor: PALETTE.accent, borderWidth: 0.7 });
    doc.page.drawText(value, { x: x + 12, y: y + 34, size: 21, font: doc.fonts.bold, color: PALETTE.white });
    doc.page.drawText(pdfSafe(label), { x: x + 12, y: y + 18, size: 7.6, font: doc.fonts.regular, color: PALETTE.faint });
  });

  const stamp = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date());
  doc.page.drawText(pdfSafe(`Gerado em ${stamp} a partir do código-fonte de ${manifest.meta.repo}`), {
    x: 52, y: 80, size: 8.4, font: doc.fonts.regular, color: PALETTE.faint,
  });
  doc.page.drawText(
    pdfSafe('Documento complementar a docs/fluxograma-usuario.pdf, que detalha as jornadas passo a passo.'),
    { x: 52, y: 64, size: 8.4, font: doc.fonts.regular, color: PALETTE.faint }
  );
}

function tocEntriesUseCases() {
  return [
    { id: 'uc-atores', title: '1. Atores e sistemas externos', level: 1 },
    { id: 'uc-diagrama', title: '2. Diagrama de casos de uso', level: 1 },
    { id: 'uc-catalogo', title: '3. Catálogo completo (48 casos de uso)', level: 2 },
    { id: 'uc-resumo', title: '4. Resumo por módulo', level: 1 },
    { id: 'uc-lacunas', title: '5. Casos de uso com lacuna conhecida', level: 2 },
    { id: 'uc-manutencao', title: '6. Manutenção deste documento', level: 2 },
  ];
}

async function renderUseCaseStructure(doc, manifest, figures, record) {
  const uc = manifest.useCases;
  const figure = figures.find((f) => f.kind === 'usecase');
  const catalog = uc.modules.flatMap((m) => m.uc.map((u) => ({ ...u, module: m.title })));

  /* --- 1. atores e sistemas externos --- */
  doc.newPage(A4.portrait);
  record('uc-atores');
  sectionHeader(doc, {
    title: '1. Atores e sistemas externos',
    desc:
      'Atores primários são pessoas com papel definido no sistema; os sistemas externos participam de casos de uso específicos e aparecem tracejados em azul no diagrama.',
  });
  doc.heading('Atores primários', { level: 2 });
  doc.table(
    ['Ator', 'Papel no sistema', 'O que faz'],
    Object.entries(uc.actors).map(([key, a]) => [SHORT_ACTORS[key] || a.label, String(key), UC_ACTOR_INFO[key] || '']),
    [16, 12, 72],
    { boldFirst: true }
  );
  doc.heading('Sistemas externos', { level: 2 });
  doc.table(
    ['Sistema', 'Participação'],
    Object.entries(uc.externals).map(([key, e]) => [e.label, UC_EXTERNAL_INFO[key] || '']),
    [22, 78],
    { boldFirst: true }
  );

  /* --- 2. diagrama --- */
  record('uc-diagrama');
  doc.newPage(bestOrientation(figure.aspect, 92));
  doc.page.drawRectangle({ x: doc.margin, y: doc.height - doc.margin - 4, width: 3, height: 16, color: PALETTE.accent });
  doc.page.drawText(pdfSafe('2. Diagrama de casos de uso'), {
    x: doc.margin + 10, y: doc.height - doc.margin + 2, size: 12.6, font: doc.fonts.bold, color: PALETTE.ink,
  });
  doc.y = doc.height - doc.margin - 16;
  doc.paragraph(figure.desc, { size: 8.8, color: PALETTE.muted, after: 4 });
  doc.paragraph(
    'Legenda: atores primários nos corredores laterais · sistemas externos em azul tracejado · relações «include» em roxo · ponto âmbar = lacuna conhecida.',
    { size: 8, color: PALETTE.faint, after: 4 }
  );
  await doc.placeImage(figure.png, { maxHeight: doc.y - doc.margin - 44, cacheKey: 'usecase-doc' });

  /* --- 3. catálogo --- */
  doc.newPage(A4.portrait);
  record('uc-catalogo');
  doc.heading('3. Catálogo completo de casos de uso', { level: 1 });
  doc.pills([
    ['Casos de uso', String(uc.stats.total)],
    ['Módulos', String(uc.stats.modules)],
    ['Com lacuna', String(uc.stats.parciais)],
  ]);
  const rows = [];
  for (const m of uc.modules) {
    rows.push({ group: m.title });
    for (const u of m.uc) {
      rows.push({
        cells: [
          u.id,
          u.flag ? `${u.name}   (!) ${u.flag}` : u.name,
          u.actors.map(shortActor).join(', ') + (u.ext ? ` + ${u.ext}` : ''),
          u.src,
        ],
      });
    }
  }
  doc.table(['ID', 'Caso de uso', 'Atores', 'Onde está no código'], rows, [7, 42, 18, 33]);

  /* --- 4. resumo por módulo --- */
  doc.newPage(A4.portrait);
  record('uc-resumo');
  doc.heading('4. Resumo por módulo', { level: 1 });
  doc.paragraph('Distribuição dos casos de uso, atores envolvidos e lacunas conhecidas por módulo funcional.');
  doc.table(
    ['Módulo', 'UCs', 'Atores', 'Lacunas'],
    uc.modules.map((m) => [
      m.title,
      String(m.uc.length),
      m.actors.map((a) => SHORT_ACTORS[a] || a).join(', ') || 'Sistema',
      m.uc.filter((u) => u.flag).length ? `${m.uc.filter((u) => u.flag).length} (${m.uc.filter((u) => u.flag).map((u) => u.id).join(', ')})` : '—',
    ]),
    [30, 6, 24, 40],
    { boldFirst: true }
  );

  /* --- 5. lacunas --- */
  record('uc-lacunas');
  doc.heading('5. Casos de uso com lacuna conhecida', { level: 1 });
  doc.paragraph(
    'Comportamentos parciais ou inoperantes no código atual — os mesmos pontos marcados com (!) no catálogo e com ponto âmbar no diagrama.'
  );
  const flagged = catalog.filter((u) => u.flag);
  doc.table(
    ['ID', 'Caso de uso', 'Módulo', 'Lacuna'],
    flagged.map((u) => [u.id, u.name, u.module, u.flag]),
    [6, 30, 22, 42],
    { boldFirst: true }
  );

  /* --- 6. manutenção --- */
  record('uc-manutencao');
  doc.heading('6. Manutenção deste documento', { level: 1 });
  doc.paragraph(
    'Diagrama, estatísticas e catálogo são derivados de scripts/lib/usecase-core.mjs. Ao criar ou remover um caso de uso, ' +
      'edite a lista do módulo correspondente e rode os geradores — as contagens da capa, do catálogo e o diagrama se ajustam sozinhos.'
  );
  doc.bullets([
    'npm run flow .......................... regenera HTML, o PDF do fluxograma e este PDF de casos de uso',
    'FLOW_PDF_ONLY=casos npm run flow:pdf ... regenera apenas docs/casos-de-uso.pdf',
  ]);
}

async function buildUseCaseDoc(manifest, figures, pageMap) {
  const doc = await PdfDoc.create({
    title: 'CoreMotiom — Casos de uso',
    subject: 'Diagrama e catálogo de casos de uso da plataforma CoreMotiom',
    footerLabel: `${manifest.meta.product} · Casos de uso`,
  });
  coverUseCases(doc, manifest, figures);
  tableOfContents(doc, TOC_ENTRIES, pageMap || {});
  await renderUseCaseStructure(doc, manifest, figures, (id) => {
    if (pageMap) pageMap[id] = doc.pages.length;
  });
  return doc;
}

function tocEntries(figures) {
  const ucNum = figures.find((f) => f.kind === 'usecase')?.num ?? 8;
  const entries = [{ id: 'sec-mapa', title: '1. Visão geral e mapa dos diagramas', level: 1 }];
  for (const f of figures.filter((x) => x.kind === 'flow')) {
    entries.push({ id: `fig-${f.num}`, title: `${f.num}. ${f.title}`, level: 2 });
  }
  entries.push({ id: 'sec-uc', title: `${ucNum}. Diagrama de casos de uso`, level: 1 });
  entries.push({ id: 'sec-catalogo', title: '9. Catálogo completo de casos de uso', level: 2 });
  entries.push({ id: 'sec-permissoes', title: '10. Papéis e permissões por tela', level: 1 });
  entries.push({ id: 'sec-status', title: '11. Máquina de estados do domínio', level: 2 });
  entries.push({ id: 'sec-lacunas', title: '12. Lacunas e riscos encontrados no fluxo', level: 1 });
  entries.push({ id: 'sec-arquivos', title: '13. Arquivos-chave por fluxo', level: 1 });
  entries.push({ id: 'sec-manutencao', title: '14. Manutenção deste documento', level: 2 });
  return entries;
}

async function build(manifest, figures, pageMap) {
  const doc = await PdfDoc.create({
    title: 'CoreMotiom — Fluxograma completo do usuário',
    subject: manifest.meta.doc,
    footerLabel: `${manifest.meta.product} · Fluxograma do usuário & casos de uso`,
  });
  cover(doc, manifest, figures);
  tableOfContents(doc, TOC_ENTRIES, pageMap || {});
  await renderStructure(doc, manifest, figures, (id) => {
    if (pageMap) pageMap[id] = doc.pages.length;
  });
  return doc;
}

async function main() {
  const manifest = ensureManifest();
  console.log('• rasterizando diagramas…');
  const figures = await renderFigures(manifest);
  fs.mkdirSync(path.dirname(OUT_PDF), { recursive: true });

  const pageCounts = {};

  if (ONLY !== 'casos') {
    TOC_ENTRIES.length = 0;
    TOC_ENTRIES.push(...tocEntries(figures));
    const pageMap = {};
    await build(manifest, figures, pageMap);            // passagem 1: mede as páginas
    const doc = await build(manifest, figures, pageMap); // passagem 2: sumário numerado
    await doc.stampFooters({ label: `${manifest.meta.product} · Fluxograma do usuário & casos de uso` });
    const bytes = await doc.save();
    fs.writeFileSync(OUT_PDF, bytes);
    pageCounts.main = doc.pages.length;
    console.log(
      `✓ docs/fluxograma-usuario.pdf gerado (${doc.pages.length} páginas, ${(bytes.length / 1024).toFixed(0)} KB)`
    );
  }

  if (ONLY !== 'fluxos') {
    TOC_ENTRIES.length = 0;
    TOC_ENTRIES.push(...tocEntriesUseCases());
    const ucPageMap = {};
    await buildUseCaseDoc(manifest, figures, ucPageMap);
    const doc = await buildUseCaseDoc(manifest, figures, ucPageMap);
    await doc.stampFooters({ label: `${manifest.meta.product} · Casos de uso` });
    const bytes = await doc.save();
    fs.writeFileSync(OUT_PDF_UC, bytes);
    pageCounts.uc = doc.pages.length;
    console.log(
      `✓ docs/casos-de-uso.pdf gerado (${doc.pages.length} páginas, ${(bytes.length / 1024).toFixed(0)} KB)`
    );
    console.log(`  sumário: ${Object.entries(ucPageMap).map(([k, v]) => `${k}=p${v}`).join(' · ')}`);
  }

  // sidecar usado pelos geradores de documentação mestre (não versionado)
  const sidecar = path.join(ROOT, 'docs', '.flowchart-pages.json');
  const previous = fs.existsSync(sidecar) ? JSON.parse(fs.readFileSync(sidecar, 'utf8')) : {};
  fs.writeFileSync(sidecar, JSON.stringify({ ...previous, ...pageCounts, generatedAt: new Date().toISOString() }, null, 2));
}

main().catch((err) => {
  console.error('\n✗ ' + (process.env.PDF_DEBUG ? err.stack : err.message));
  process.exit(1);
});
