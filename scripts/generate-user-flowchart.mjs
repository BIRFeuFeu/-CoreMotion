#!/usr/bin/env node
/**
 * CoreMotiom — Gerador do documento HTML do fluxograma do usuário.
 *   node scripts/generate-user-flowchart.mjs
 *   FLOW_EMIT_SVG=/tmp/svgs node scripts/generate-user-flowchart.mjs   # SVGs individuais
 *
 * O núcleo (dados + layout + SVG) fica em scripts/lib/flowchart-core.mjs.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  USE_CASE_DIAGRAM,
  USE_CASE_CATALOG,
  USE_CASE_MODULES,
  USE_CASE_STATS,
  UC_ACTORS,
  UC_EXTERNALS,
  renderUseCaseSvg,
} from './lib/usecase-core.mjs';
import {
  CANVAS_BG,
  ACTORS,
  EDGE_KINDS,
  escapeXml,
  layout,
  renderDiagram,
  DIAGRAMS,
  PERMISSIONS,
  STATUS_TABLE,
  GAPS,
  FILE_MAP,
  FILES_SUMMARY,
  META,
} from './lib/flowchart-core.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_DIR = path.join(ROOT, 'Fluxograma', 'Diagrama C. De Uso');
const OUT_HTML = path.join(DOCS_DIR, 'fluxograma-usuario.html');
const SVG_DUMP_DIR = process.env.FLOW_EMIT_SVG || '';
const EMIT_JSON = process.env.FLOW_EMIT_JSON || '';

/* ------------------------------------------------------------------ *
 * 6. Template HTML                                                    *
 * ------------------------------------------------------------------ */

function shapeSample(type, actor, label) {
  const a = ACTORS[actor];
  const w = 168;
  const h = 42;
  const dash = type === 'note' ? ' stroke-dasharray="6 5"' : '';
  let shape;
  if (type === 'decision') {
    const i = 18;
    shape = `<polygon points="${i},0 ${w - i},0 ${w},${h / 2} ${w - i},${h} ${i},${h} 0,${h / 2}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="1.5"${dash} />`;
  } else if (type === 'data') {
    const i = 12;
    shape = `<polygon points="${i},0 ${w},0 ${w - i},${h} 0,${h}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="1.5"${dash} />`;
  } else {
    const rx = type === 'start' || type === 'end' ? h / 2 : 12;
    shape = `<rect x="0" y="0" width="${w}" height="${h}" rx="${rx}" fill="${a.fill}" stroke="${a.stroke}" stroke-width="1.5"${dash} />`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="sample">${shape}<text x="${
    w / 2
  }" y="${h / 2 + 4}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${a.text}">${escapeXml(
    label
  )}</text></svg>`;
}

function buildHtml() {
  const diagramsHtml = DIAGRAMS.map((d) => {
    const svg = renderDiagram(d);
    if (SVG_DUMP_DIR) {
      fs.mkdirSync(SVG_DUMP_DIR, { recursive: true });
      fs.writeFileSync(path.join(SVG_DUMP_DIR, `${String(d.num).padStart(2, '0')}-${d.id}.svg`), svg);
    }
    const legend = (d.legend || [])
      .map((k) => `<span class="chip" style="--c:${ACTORS[k].stroke}">${escapeXml(ACTORS[k].label)}</span>`)
      .join('');
    return `      <section class="card" id="${d.id}">
        <div class="card-head">
          <span class="num">${d.num}</span>
          <div>
            <h2>${escapeXml(d.title)}</h2>
            <p class="desc">${escapeXml(d.desc)}</p>
          </div>
        </div>
        <div class="legend">${legend}</div>
        <div class="canvas" role="group" aria-label="${escapeXml(d.title)}">
${svg}
        </div>
        <p class="hint">Dica: use a rolagem horizontal para ver o diagrama inteiro em telas pequenas.</p>
      </section>`;
  }).join('\n\n');

  const uc = USE_CASE_DIAGRAM;
  if (SVG_DUMP_DIR) {
    fs.mkdirSync(SVG_DUMP_DIR, { recursive: true });
    fs.writeFileSync(path.join(SVG_DUMP_DIR, `08-${uc.id}.svg`), renderUseCaseSvg(uc));
  }
  const useCaseHtml = `      <section class="card" id="${uc.id}">
        <div class="card-head">
          <span class="num">${uc.num}</span>
          <div>
            <h2>${escapeXml(uc.title)}</h2>
            <p class="desc">${escapeXml(uc.desc)}</p>
          </div>
        </div>
        <div class="legend">
          ${Object.values(UC_ACTORS)
            .map((a) => `<span class="chip" style="--c:${ACTORS[a.actor].stroke}">${escapeXml(a.label)}</span>`)
            .join('')}
          ${Object.values(UC_EXTERNALS)
            .map((e) => `<span class="chip" style="--c:#38BDF8">${escapeXml(e.label)}</span>`)
            .join('')}
        </div>
        <div class="canvas" role="group" aria-label="${escapeXml(uc.title)}">
${renderUseCaseSvg(uc)}
        </div>
        <p class="hint">Cada pílula é um caso de uso (UC). Relações «include» aparecem tracejadas em roxo; integrações com sistemas externos, em azul; o ponto âmbar marca casos com lacuna conhecida.</p>
      </section>`;

  const catalogRows = USE_CASE_MODULES.map(
    (m) => `
        <tr class="group"><td colspan="6">${escapeXml(m.title)}</td></tr>
        ${m.uc
          .map(
            (u) => `<tr>
            <td class="mono">${escapeXml(u.id)}</td>
            <td class="k">${escapeXml(u.name)}${u.flag ? ` <span class="flag" title="${escapeXml(u.flag)}">⚠ ${escapeXml(u.flag)}</span>` : ''}</td>
            <td class="actors">${[
              ...u.actors.map((a) => `<i style="--c:${ACTORS[a].stroke}" title="${escapeXml(UC_ACTORS[a].label)}"></i>`),
              ...(u.ext ? [`<i style="--c:#38BDF8" title="${escapeXml(UC_EXTERNALS[u.ext].label)}"></i>`] : []),
            ].join('')}</td>
            <td class="mono small">${escapeXml(u.src)}</td>
          </tr>`
          )
          .join('')}`
  ).join('');

  const useCaseCatalogHtml = `      <section class="card" id="catalogo-uc">
        <h2 class="section-title">9. Catálogo completo de casos de uso</h2>
        <p class="sub">Os ${USE_CASE_STATS.total} casos de uso da plataforma, com atores envolvidos, arquivo responsável e lacunas conhecidas.</p>
        <div class="load-stats">
          <div class="mini"><span>Casos de uso</span><strong>${USE_CASE_STATS.total}</strong></div>
          <div class="mini"><span>Módulos funcionais</span><strong>${USE_CASE_STATS.modules}</strong></div>
          <div class="mini"><span>Atores primários</span><strong>${USE_CASE_STATS.atores}</strong></div>
          <div class="mini"><span>Sistemas externos</span><strong>${USE_CASE_STATS.externos}</strong></div>
          <div class="mini"><span>Com lacuna parcial</span><strong>${USE_CASE_STATS.parciais}</strong></div>
        </div>
        <div class="tbl-wrap"><table class="uc-table">
          <thead><tr><th>ID</th><th>Caso de uso</th><th>Atores</th><th>Onde está no código</th></tr></thead>
          <tbody>${catalogRows}</tbody>
        </table></div>
      </section>`;

  const legendShapes = [
    ['start', 'sistema', 'Início'],
    ['process', 'atleta', 'Ação / tela'],
    ['decision', 'atencao', 'Decisão / guarda'],
    ['data', 'sistema', 'Dado / persistência'],
    ['note', 'atencao', 'Observação / lacuna'],
    ['end', 'sucesso', 'Fim de fluxo'],
  ]
    .map(
      ([type, actor, label]) =>
        `<div class="legend-item">${shapeSample(type, actor, label)}<span>${label}</span></div>`
    )
    .join('');

  const actorLegend = Object.entries(ACTORS)
    .map(([, a]) => `<span class="chip big" style="--c:${a.stroke}">${escapeXml(a.label)}</span>`)
    .join('');

  const edgeLegend = Object.entries({
    flow: 'Fluxo padrão',
    auth: 'Autenticação / sessão',
    success: 'Caminho de sucesso',
    error: 'Erro, bloqueio ou lacuna',
    admin: 'Ação administrativa',
    data: 'Gravação / leitura de dados',
  })
    .map(([k, label]) => `<span class="edge-key"><i style="--c:${EDGE_KINDS[k].stroke};--d:${
    k === 'error' ? '5 4' : 'none'
  }"></i>${label}</span>`)
    .join('');

  const table = (t) =>
    `<table><thead><tr>${t.head.map((h) => `<th>${escapeXml(h)}</th>`).join('')}</tr></thead><tbody>${t.rows
      .map(
        (r) =>
          `<tr>${r
            .map((c, i) => {
              const v = String(c);
              const cls = /^não/.test(v)
                ? ' class="no"'
                : /^sim/.test(v)
                ? ' class="yes"'
                : i === 0
                ? ' class="k"'
                : '';
              return `<td${cls}>${escapeXml(v)}</td>`;
            })
            .join('')}</tr>`
      )
      .join('')}</tbody></table>`;

  const gapsHtml = GAPS.map(
    (g) => `        <article class="gap">
          <span class="tag">${escapeXml(g.tag)}</span>
          <h3>${escapeXml(g.t)}</h3>
          <p>${escapeXml(g.d)}</p>
        </article>`
  ).join('\n');

  const filesHtml = table(FILE_MAP);
  const permsHtml = table(PERMISSIONS);
  const statusHtml = table(STATUS_TABLE);
  const summaryHtml = FILES_SUMMARY.map(
    ([k, v]) => `<div class="mini"><span>${escapeXml(k)}</span><strong>${escapeXml(v)}</strong></div>`
  ).join('');

  const nav = DIAGRAMS.map(
    (d) => `<a href="#${d.id}"><b>${d.num}</b><span>${escapeXml(d.title.split('—')[0].trim())}</span></a>`
  ).join('');

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>CoreMotiom — Fluxograma Completo do Usuário</title>
<meta name="description" content="Fluxograma completo das jornadas do usuário na plataforma CoreMotiom: autenticação, compra, venda C2C, lojas verificadas, comunidade, treinadores e painel admin." />
<style>
  :root {
    --bg: #08090c;
    --panel: #101217;
    --panel-2: #14171e;
    --line: #22262f;
    --text: #f3f5f9;
    --muted: #98a0b1;
    --red: #e11d2e;
    --red-soft: #f87171;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    background:
      radial-gradient(1200px 600px at 15% -10%, rgba(225, 29, 46, 0.16), transparent 60%),
      radial-gradient(900px 500px at 100% 0%, rgba(167, 139, 250, 0.08), transparent 55%),
      var(--bg);
    color: var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 1360px; margin: 0 auto; padding: 32px 20px 80px; }
  header.hero {
    border: 1px solid var(--line);
    background: linear-gradient(160deg, rgba(24, 26, 33, 0.96), rgba(12, 13, 17, 0.96));
    border-radius: 26px;
    padding: 30px clamp(20px, 4vw, 40px);
    position: relative;
    overflow: hidden;
  }
  header.hero::after {
    content: "";
    position: absolute; inset: 0 0 auto 0; height: 3px;
    background: linear-gradient(90deg, #7f1d1d, var(--red), #f97316);
  }
  .brandline { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
  .logo {
    width: 42px; height: 42px; border-radius: 13px; display: grid; place-items: center;
    background: linear-gradient(135deg, #b91c1c, var(--red));
    font-weight: 900; letter-spacing: -0.5px; box-shadow: 0 10px 30px rgba(225, 29, 46, 0.35);
  }
  .brandline h1 { font-size: clamp(20px, 3vw, 30px); margin: 0; letter-spacing: -0.5px; }
  .pill {
    font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 999px; border: 1px solid rgba(248, 113, 113, 0.4);
    background: rgba(225, 29, 46, 0.14); color: #fca5a5;
  }
  header.hero p.lead { color: var(--muted); font-size: 14px; max-width: 96ch; margin: 0 0 18px; }
  header.hero code { background: #171a21; border: 1px solid var(--line); border-radius: 6px; padding: 1px 5px; font-size: 12.5px; }
  .mini-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
  .mini {
    border: 1px solid var(--line); background: rgba(20, 23, 30, 0.7); border-radius: 14px; padding: 10px 13px;
  }
  .mini span { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #7b8496; font-weight: 700; }
  .mini strong { font-size: 12.5px; font-weight: 600; color: #dfe3ec; }
  nav.toc {
    position: sticky; top: 0; z-index: 20; margin: 20px 0 26px; padding: 10px;
    display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none;
    background: rgba(8, 9, 12, 0.92); backdrop-filter: blur(10px);
    border: 1px solid var(--line); border-radius: 18px;
  }
  nav.toc::-webkit-scrollbar { display: none; }
  nav.toc a {
    display: inline-flex; align-items: center; gap: 8px; white-space: nowrap;
    color: #b9c0ce; text-decoration: none; font-size: 12px; font-weight: 600;
    padding: 7px 12px; border-radius: 999px; border: 1px solid transparent; transition: all 0.15s ease;
  }
  nav.toc a:hover { background: var(--panel-2); border-color: var(--line); color: #fff; }
  nav.toc a b {
    display: grid; place-items: center; width: 19px; height: 19px; border-radius: 6px;
    background: rgba(225, 29, 46, 0.18); color: #fca5a5; font-size: 10.5px;
  }
  section.card {
    border: 1px solid var(--line); background: var(--panel); border-radius: 24px;
    padding: 22px clamp(16px, 2.4vw, 26px) 18px; margin-bottom: 26px; scroll-margin-top: 84px;
  }
  .card-head { display: flex; gap: 14px; align-items: flex-start; }
  .num {
    flex: 0 0 auto; width: 34px; height: 34px; border-radius: 11px; display: grid; place-items: center;
    background: rgba(225, 29, 46, 0.14); border: 1px solid rgba(248, 113, 113, 0.32);
    color: #fca5a5; font-weight: 800; font-size: 14px;
  }
  .card h2 { margin: 2px 0 6px; font-size: clamp(17px, 2.2vw, 22px); letter-spacing: -0.4px; }
  .desc { color: var(--muted); font-size: 13px; margin: 0; max-width: 110ch; }
  .legend { display: flex; flex-wrap: wrap; gap: 7px; margin: 16px 0 12px; }
  .chip {
    font-size: 10.5px; font-weight: 600; color: #cdd3de; border: 1px solid var(--line);
    background: rgba(20, 23, 30, 0.75); border-radius: 999px; padding: 4px 10px 4px 8px;
    display: inline-flex; align-items: center; gap: 7px;
  }
  .chip::before { content: ""; width: 8px; height: 8px; border-radius: 3px; background: var(--c); }
  .chip.big { font-size: 11.5px; padding: 6px 13px 6px 10px; }
  .canvas {
    border: 1px solid var(--line); border-radius: 18px; overflow-x: auto; overflow-y: hidden;
    background: #0b0c10; padding: 4px;
  }
  .canvas .flow-svg { display: block; width: 100%; height: auto; min-width: 880px; font-family: inherit; }
  .hint { color: #6f7889; font-size: 11.5px; margin: 10px 2px 0; }
  .split { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .legend-item { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; font-size: 11.5px; color: var(--muted); }
  .sample { display: block; }
  table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  thead th {
    text-align: left; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.9px;
    color: #8d95a6; background: var(--panel-2); padding: 10px 12px; border-bottom: 1px solid var(--line);
  }
  tbody td { padding: 9px 12px; border-bottom: 1px solid #191d25; color: #cbd2de; vertical-align: top; }
  tbody tr:last-child td { border-bottom: none; }
  tbody td.k { color: #fff; font-weight: 600; }
  tbody td.yes { color: #6ee7b7; font-weight: 600; }
  tbody td.no { color: #fca5a5; font-weight: 600; }
  .tbl-wrap { border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
  table.uc-table td.mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; color: #9aa3b2; }
  table.uc-table td.mono.small { font-size: 11px; }
  table.uc-table tr.group td {
    background: #171a22; color: #e5e9f0; font-weight: 700; font-size: 11px;
    letter-spacing: 0.9px; text-transform: uppercase; padding: 8px 12px;
  }
  table.uc-table td.actors { white-space: nowrap; }
  table.uc-table td.actors i { display: inline-block; width: 9px; height: 9px; border-radius: 3px; background: var(--c); margin-right: 5px; }
  .flag {
    font-size: 10px; font-weight: 700; color: #fcd34d; background: rgba(251, 191, 36, 0.12);
    border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 999px; padding: 1px 7px; margin-left: 6px;
    white-space: nowrap;
  }
  .load-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 16px; }
  .load-stats .mini strong { font-size: 18px; color: #fff; display: block; }
  .gap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; }
  .gap {
    border: 1px solid var(--line); background: var(--panel-2); border-radius: 18px; padding: 16px;
    border-left: 3px solid var(--red-soft);
  }
  .gap .tag {
    font-size: 10px; font-weight: 800; letter-spacing: 0.9px; text-transform: uppercase;
    color: #fcd34d; background: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.28);
    padding: 3px 9px; border-radius: 999px;
  }
  .gap h3 { font-size: 14px; margin: 10px 0 6px; }
  .gap p { font-size: 12.5px; color: var(--muted); margin: 0; }
  .edge-keys { display: flex; flex-wrap: wrap; gap: 14px; font-size: 12px; color: var(--muted); }
  .edge-key { display: inline-flex; align-items: center; gap: 8px; }
  .edge-key i { width: 34px; height: 0; border-top: 2px solid var(--c); border-top-style: var(--d); display: inline-block; }
  h2.section-title { font-size: clamp(18px, 2.3vw, 23px); letter-spacing: -0.4px; margin: 0 0 6px; }
  .sub { color: var(--muted); font-size: 13px; margin: 0 0 18px; max-width: 110ch; }
  footer.foot { color: #6b7385; font-size: 11.5px; text-align: center; margin-top: 34px; }
  footer.foot code { background: var(--panel-2); border: 1px solid var(--line); border-radius: 6px; padding: 2px 6px; }
  @media print {
    body { background: #fff; color: #111; }
    nav.toc { display: none; }
    section.card, header.hero, .gap, .mini { break-inside: avoid; border-color: #ccc; background: #fff; }
    .canvas { overflow: visible; }
  }
</style>
</head>
<body>
<div class="wrap">

  <header class="hero">
    <div class="brandline">
      <div class="logo">CM</div>
      <div>
        <h1>CoreMotiom — Fluxograma Completo do Usuário</h1>
        <div style="display:flex;gap:8px;align-items:center;margin-top:6px;flex-wrap:wrap">
          <span class="pill">Marketplace esportivo + C2C</span>
          <span class="pill">Next.js 15 · React 19 · Supabase</span>
          <span class="pill">7 fluxos + casos de uso</span>
        </div>
      </div>
    </div>
    <p class="lead">
      Documento único com todas as jornadas de usuário implementadas no projeto: do primeiro acesso como visitante
      até as operações executivas do painel master. Cada diagrama foi montado a partir da leitura do código-fonte
      (<code>app/</code>, <code>components/</code>, <code>lib/store.tsx</code>, <code>services/</code>, <code>app/api/</code> e a migração SQL),
      incluindo decisões, guardas de acesso, gravações no banco e lacunas encontradas.
    </p>
    <div class="mini-grid">${summaryHtml}</div>
  </header>

  <nav class="toc">
    ${nav}
    <a href="#casos-de-uso"><b>8</b><span>Casos de uso</span></a>
    <a href="#catalogo-uc"><b>9</b><span>Catálogo UC</span></a>
    <a href="#papeis"><b>10</b><span>Permissões</span></a>
    <a href="#status"><b>11</b><span>Status</span></a>
    <a href="#lacunas"><b>12</b><span>Lacunas &amp; riscos</span></a>
    <a href="#arquivos"><b>13</b><span>Arquivos-chave</span></a>
    <a href="#leitura"><b>14</b><span>Como ler</span></a>
  </nav>

${diagramsHtml}

${useCaseHtml}

${useCaseCatalogHtml}

  <section class="card" id="papeis">
    <h2 class="section-title">10. Papéis e permissões por tela</h2>
    <p class="sub">Como o app decide o que cada perfil vê e faz (lib/store.tsx + guardas em cada componente).</p>
    <div class="tbl-wrap">${permsHtml}</div>
  </section>

  <section class="card" id="status">
    <h2 class="section-title">11. Máquina de estados do domínio</h2>
    <p class="sub">Todos os estados previstos nos tipos do projeto e quem os movimenta.</p>
    <div class="tbl-wrap">${statusHtml}</div>
  </section>

  <section class="card" id="lacunas">
    <h2 class="section-title">12. Lacunas e riscos encontrados no fluxo</h2>
    <p class="sub">Pontos em que o caminho do usuário termina em tela vazia, em ação sem persistência ou em risco operacional. Cada item traz o impacto direto na jornada.</p>
    <div class="gap-grid">
${gapsHtml}
    </div>
  </section>

  <section class="card" id="arquivos">
    <h2 class="section-title">13. Arquivos-chave por fluxo</h2>
    <p class="sub">Onde mexer para evoluir cada jornada.</p>
    <div class="tbl-wrap">${filesHtml}</div>
  </section>

  <section class="card" id="leitura">
    <h2 class="section-title">14. Como ler este fluxograma</h2>
    <div class="split">
      <div>
        <h3 style="font-size:13px;margin:0 0 12px;color:#cfd5e0">Formatos dos nós</h3>
        <div class="split">${legendShapes}</div>
      </div>
      <div>
        <h3 style="font-size:13px;margin:0 0 12px;color:#cfd5e0">Cores por perfil</h3>
        <div class="legend">${actorLegend}</div>
        <h3 style="font-size:13px;margin:18px 0 12px;color:#cfd5e0">Tipos de seta</h3>
        <div class="edge-keys">${edgeLegend}</div>
        <p style="font-size:12px;color:#79818f;margin-top:18px">
          Nós com traço tracejado e cor âmbar marcam lacunas ou comportamentos apenas parciais no código atual.
        </p>
      </div>
    </div>
  </section>

  <footer class="foot">
    Gerado por <code>scripts/generate-user-flowchart.mjs</code> a partir do estado do repositório ·
    CoreMotiom (BIRFeuFeu/-CoreMotion) · documento autocontido, sem dependências externas.
  </footer>
</div>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ *
 * Execução                                                            *
 * ------------------------------------------------------------------ */

const data = {
  meta: META,
  diagrams: DIAGRAMS.map((d) => {
    const { width, height } = layout(d);
    return { ...d, width, height };
  }),
  useCases: {
    diagram: USE_CASE_DIAGRAM,
    modules: USE_CASE_MODULES,
    stats: USE_CASE_STATS,
    actors: UC_ACTORS,
    externals: UC_EXTERNALS,
  },
  permissions: PERMISSIONS,
  status: STATUS_TABLE,
  gaps: GAPS,
  files: FILE_MAP,
  summary: FILES_SUMMARY,
};

if (EMIT_JSON) {
  fs.writeFileSync(EMIT_JSON, JSON.stringify(data, null, 1), 'utf8');
  console.log(`✓ manifesto JSON em ${EMIT_JSON}`);
}

fs.mkdirSync(path.dirname(OUT_HTML), { recursive: true });
fs.writeFileSync(OUT_HTML, buildHtml(), 'utf8');
console.log(
  `✓ Fluxograma/Diagrama C. De Uso/fluxograma-usuario.html gerado (${DIAGRAMS.length} diagramas, ${(
    fs.statSync(OUT_HTML).size / 1024
  ).toFixed(1)} KB)`
);
