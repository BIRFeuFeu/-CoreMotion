'use strict';
// Página sem dependências externas: funciona aberta direto do computador,
// inclusive sem internet.
const stage = document.getElementById('stage');
const diagram = document.getElementById('diagram');
const map = document.getElementById('map');
const mapWindow = document.getElementById('map-window');
const zoomLabel = document.getElementById('zoom');
const notes = document.getElementById('notes');
const notesButton = document.getElementById('notes-button');
const chips = [...document.querySelectorAll('.chip')];
const W = 1736;
const H = 1855;
const MIN = .1;
const MAX = 5;
// Uma faixa por área, na mesma ordem em que aparecem no desenho.
const bands = [
  { y: 68, h: 242 },
  { y: 336, h: 289 },
  { y: 651, h: 242 },
  { y: 919, h: 242 },
  { y: 1187, h: 289 },
  { y: 1502, h: 195 },
];
let scale = 1;
let x = 0;
let y = 0;
let ready = false;
const pointers = new Map();
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const size = () => ({ w: stage.clientWidth, h: stage.clientHeight });
const local = e => {
  const r = stage.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
};

function draw() {
  const { w, h } = size();
  // Uma folga generosa, mas o desenho nunca se perde de vista.
  x = clamp(x, Math.min(60, w - W * scale - 60), Math.max(w - W * scale - 60, 60));
  y = clamp(y, Math.min(60, h - H * scale - 80), Math.max(h - H * scale - 80, 60));
  diagram.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  zoomLabel.value = `${Math.round(scale * 100)}%`;
  const mx = clamp(-x / scale, 0, W);
  const my = clamp(-y / scale, 0, H);
  const mw = Math.max(0, Math.min(W, (w - x) / scale) - mx);
  const mh = Math.max(0, Math.min(H, (h - y) / scale) - my);
  Object.entries({ x: mx, y: my, width: mw, height: mh }).forEach(([k, v]) => mapWindow.setAttribute(k, v));
  map.setAttribute('aria-valuenow', String(Math.round(clamp((h / 2 - y) / scale / H, 0, 1) * 100)));
}

function markChip(area) {
  chips.forEach(chip => chip.setAttribute('aria-pressed', String(chip.dataset.area === area)));
}

function changeScale(next, cx, cy) {
  next = clamp(next, MIN, MAX);
  x = cx - (cx - x) * next / scale;
  y = cy - (cy - y) * next / scale;
  scale = next;
  draw();
}

function zoomBy(factor) {
  const { w, h } = size();
  changeScale(scale * factor, w / 2, h / 2);
}

function fit() {
  const { w, h } = size();
  scale = clamp(Math.min((w - 48) / W, (h - 96) / H), MIN, MAX);
  x = (w - W * scale) / 2;
  y = 46 + (h - 96 - H * scale) / 2;
  markChip('');
  draw();
}

// Em telas estreitas o desenho ficaria ilegível por inteiro: a área escolhida
// é mostrada em tamanho de leitura, e o restante continua a um arrasto de distância.
function showArea(index) {
  const band = bands[index];
  if (!band) return fit();
  const { w, h } = size();
  // No computador cabe a faixa inteira; no celular, uma coluna por vez.
  const focusWidth = w < 760 ? 480 : 1120;
  scale = clamp(Math.min((w - 40) / focusWidth, (h - 150) / (band.h + 40)), MIN, 1.7);
  x = w < 760 ? 14 - 232 * scale : (w - 1192 * scale) / 2 - 244 * scale;
  y = 48 + (h - 132 - band.h * scale) / 2 - band.y * scale;
  markChip(String(index));
  draw();
}

function openNotes(open = !notes.classList.contains('open')) {
  notes.classList.toggle('open', open);
  notesButton.setAttribute('aria-expanded', String(open));
}

document.getElementById('plus').onclick = () => zoomBy(1.25);
document.getElementById('minus').onclick = () => zoomBy(.8);
document.getElementById('actual').onclick = () => zoomBy(1 / scale);
document.getElementById('fit').onclick = fit;
document.getElementById('notes-close').onclick = () => openNotes(false);
notesButton.onclick = () => openNotes();
chips.forEach(chip => {
  chip.onclick = () => (chip.dataset.area === '' ? fit() : showArea(Number(chip.dataset.area)));
});

function hideHint() {
  document.getElementById('hint').classList.add('seen');
}
stage.addEventListener('wheel', e => {
  hideHint();
  e.preventDefault();
  const p = local(e);
  const units = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? stage.clientHeight : 1;
  changeScale(scale * Math.exp(-clamp(e.deltaY * units, -300, 300) * .0016), p.x, p.y);
}, { passive: false });

stage.addEventListener('pointerdown', e => {
  if (e.button !== 0) return;
  hideHint();
  stage.focus({ preventScroll: true });
  stage.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, local(e));
  stage.classList.add('drag');
});

function gesture(points) {
  const [a, b] = points;
  return { cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, distance: Math.hypot(a.x - b.x, a.y - b.y) };
}

stage.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) return;
  const previous = [...pointers.values()];
  const before = pointers.get(e.pointerId);
  const p = local(e);
  pointers.set(e.pointerId, p);
  if (pointers.size === 1) {
    x += p.x - before.x;
    y += p.y - before.y;
    draw();
  } else if (pointers.size === 2) {
    const from = gesture(previous);
    const to = gesture([...pointers.values()]);
    const next = clamp(scale * to.distance / Math.max(from.distance, 1), MIN, MAX);
    x = to.cx - (from.cx - x) * next / scale;
    y = to.cy - (from.cy - y) * next / scale;
    scale = next;
    draw();
  }
});

function release(e) {
  pointers.delete(e.pointerId);
  if (!pointers.size) stage.classList.remove('drag');
}
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => stage.addEventListener(type, release));
stage.addEventListener('dblclick', e => {
  e.preventDefault();
  fit();
});

function mapTo(e) {
  const r = map.getBoundingClientRect();
  const { w, h } = size();
  x = w / 2 - clamp((e.clientX - r.left) / r.width, 0, 1) * W * scale;
  y = h / 2 - clamp((e.clientY - r.top) / r.height, 0, 1) * H * scale;
  draw();
}
map.addEventListener('pointerdown', e => {
  if (e.button !== 0) return;
  e.preventDefault();
  map.focus({ preventScroll: true });
  map.setPointerCapture(e.pointerId);
  mapTo(e);
});
map.addEventListener('pointermove', e => {
  if (map.hasPointerCapture(e.pointerId)) mapTo(e);
});
map.addEventListener('keydown', e => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  e.preventDefault();
  e.stopPropagation();
  y += (e.key === 'ArrowDown' ? -1 : 1) * stage.clientHeight * .3;
  draw();
});

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
  const moves = { ArrowLeft: [80, 0], ArrowRight: [-80, 0], ArrowUp: [0, 80], ArrowDown: [0, -80] };
  if (moves[e.key]) {
    e.preventDefault();
    x += moves[e.key][0];
    y += moves[e.key][1];
    draw();
  } else if (e.key === '+' || e.key === '=') {
    e.preventDefault();
    zoomBy(1.2);
  } else if (e.key === '-') {
    e.preventDefault();
    zoomBy(1 / 1.2);
  } else if (e.key === '0') fit();
  else if (e.key === '1') zoomBy(1 / scale);
  else if (e.key === 'Escape') openNotes(false);
});

stage.addEventListener('pointerdown', () => {
  if (stage.clientWidth <= 900) openNotes(false);
});

const start = () => {
  if (ready || !diagram.naturalWidth) return;
  ready = true;
  // Começa pela primeira área, em tamanho de leitura; "Ver tudo" mostra o conjunto.
  showArea(0);
};
diagram.addEventListener('load', start);
diagram.addEventListener('error', () => {
  document.getElementById('load-error').hidden = false;
});
if (diagram.complete) start();

let previous = size();
new ResizeObserver(() => {
  const now = size();
  if (ready) {
    x += (now.w - previous.w) / 2;
    y += (now.h - previous.h) / 2;
    draw();
  }
  previous = now;
}).observe(stage);
