'use strict';
// No network services, libraries or storage required. Also works through file://.
const stage = document.getElementById('stage');
const diagram = document.getElementById('diagram');
const map = document.getElementById('map');
const mapWindow = document.getElementById('map-window');
const moduleSelect = document.getElementById('module');
const help = document.getElementById('help');
const helpButton = document.getElementById('help-button');
const W = 1736, H = 1921, MIN = .1, MAX = 5;
const bands = [
  { y: 134, h: 242 }, { y: 402, h: 289 }, { y: 717, h: 242 },
  { y: 985, h: 242 }, { y: 1253, h: 289 }, { y: 1568, h: 195 }
];
let scale = 1, x = 0, y = 0, initialized = false;
const pointers = new Map();
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const size = () => ({ w: stage.clientWidth, h: stage.clientHeight });
const local = e => {
  const r = stage.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
};
function draw() {
  const { w, h } = size();
  // Leave a small margin, but never lose the drawing outside the canvas.
  x = clamp(x, Math.min(70, w - W * scale - 70), Math.max(w - W * scale - 70, 70));
  y = clamp(y, Math.min(70, h - H * scale - 90), Math.max(h - H * scale - 90, 70));
  diagram.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  document.getElementById('zoom').value = `${Math.round(scale * 100)}%`;
  const mx = clamp(-x / scale, 0, W), my = clamp(-y / scale, 0, H);
  const mw = Math.max(0, Math.min(W, (w - x) / scale) - mx);
  const mh = Math.max(0, Math.min(H, (h - y) / scale) - my);
  Object.entries({ x: mx, y: my, width: mw, height: mh }).forEach(([k, v]) => mapWindow.setAttribute(k, v));
  map.setAttribute('aria-valuenow', String(Math.round(clamp((h / 2 - y) / scale / H, 0, 1) * 100)));
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
  scale = clamp(Math.min((w - 40) / W, (h - 130) / H), MIN, MAX);
  x = (w - W * scale) / 2;
  y = 50 + (h - 130 - H * scale) / 2;
  moduleSelect.value = '';
  draw();
}
function fitWidth() {
  const { w } = size();
  scale = clamp((w - (w < 760 ? 28 : 80)) / W, MIN, MAX);
  x = (w - W * scale) / 2;
  y = 58;
  moduleSelect.value = '';
  draw();
}
function goToModule(index) {
  const band = bands[index];
  if (!band) return;
  const { w, h } = size();
  // On a phone, give readable access to the left column instead of shrinking
  // the entire drawing to illegible text. Drag to see the second column.
  const focusWidth = w < 760 ? 590 : 1250;
  scale = clamp(Math.min((w - 36) / focusWidth, (h - 155) / (band.h + 30)), MIN, 1.7);
  x = w < 760 ? 18 - 270 * scale : (w - 1140 * scale) / 2 - 270 * scale;
  y = 58 + (h - 145 - band.h * scale) / 2 - band.y * scale;
  draw();
}
function toggleHelp(open = help.hidden) {
  help.hidden = !open;
  helpButton.setAttribute('aria-expanded', String(open));
}
document.getElementById('plus').onclick = () => zoomBy(1.25);
document.getElementById('minus').onclick = () => zoomBy(.8);
document.getElementById('actual').onclick = () => zoomBy(1 / scale);
document.getElementById('fit').onclick = fit;
document.getElementById('width').onclick = fitWidth;
helpButton.onclick = () => toggleHelp();
moduleSelect.onchange = () => moduleSelect.value === '' ? fit() : goToModule(Number(moduleSelect.value));
stage.addEventListener('wheel', e => {
  e.preventDefault();
  const p = local(e);
  const units = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? stage.clientHeight : 1;
  changeScale(scale * Math.exp(-clamp(e.deltaY * units, -300, 300) * .0016), p.x, p.y);
}, { passive: false });
stage.addEventListener('pointerdown', e => {
  if (e.button !== 0) return;
  stage.focus({ preventScroll: true });
  toggleHelp(false);
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
  const old = [...pointers.values()];
  const prev = pointers.get(e.pointerId);
  const p = local(e);
  pointers.set(e.pointerId, p);
  if (pointers.size === 1) {
    x += p.x - prev.x; y += p.y - prev.y; draw();
  } else if (pointers.size === 2) {
    const before = gesture(old), after = gesture([...pointers.values()]);
    const next = clamp(scale * after.distance / Math.max(before.distance, 1), MIN, MAX);
    x = after.cx - (before.cx - x) * next / scale;
    y = after.cy - (before.cy - y) * next / scale;
    scale = next;
    draw();
  }
});
function release(e) {
  pointers.delete(e.pointerId);
  if (!pointers.size) stage.classList.remove('drag');
}
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => stage.addEventListener(type, release));
stage.addEventListener('dblclick', e => { e.preventDefault(); fit(); });
function mapTo(e) {
  const r = map.getBoundingClientRect(), { w, h } = size();
  x = w / 2 - clamp((e.clientX - r.left) / r.width, 0, 1) * W * scale;
  y = h / 2 - clamp((e.clientY - r.top) / r.height, 0, 1) * H * scale;
  draw();
}
map.addEventListener('pointerdown', e => {
  if (e.button !== 0) return;
  e.preventDefault(); map.focus({ preventScroll: true }); map.setPointerCapture(e.pointerId); mapTo(e);
});
map.addEventListener('pointermove', e => { if (map.hasPointerCapture(e.pointerId)) mapTo(e); });
map.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault(); e.stopPropagation();
    y += (e.key === 'ArrowDown' ? -1 : 1) * stage.clientHeight * .3; draw();
  }
});
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
  const moves = { ArrowLeft: [75, 0], ArrowRight: [-75, 0], ArrowUp: [0, 75], ArrowDown: [0, -75] };
  if (moves[e.key]) { e.preventDefault(); x += moves[e.key][0]; y += moves[e.key][1]; draw(); }
  else if (['+', '='].includes(e.key)) { e.preventDefault(); zoomBy(1.2); }
  else if (e.key === '-') { e.preventDefault(); zoomBy(1 / 1.2); }
  else if (e.key === '0') fit();
  else if (e.key === '1') zoomBy(1 / scale);
  else if (e.key.toLowerCase() === 'l') fitWidth();
  else if (e.key === '?') toggleHelp();
  else if (e.key === 'Escape') { toggleHelp(false); helpButton.focus(); }
});
document.addEventListener('pointerdown', e => {
  if (!help.contains(e.target) && !helpButton.contains(e.target)) toggleHelp(false);
});
const initial = () => {
  if (initialized || !diagram.naturalWidth) return;
  initialized = true;
  // Start at width on desktop; the entire document is always one click away.
  if (stage.clientWidth < 760) fit(); else fitWidth();
};
diagram.addEventListener('load', initial);
diagram.addEventListener('error', () => { document.getElementById('load-error').hidden = false; });
if (diagram.complete) initial();
let oldSize = size();
new ResizeObserver(() => {
  const next = size();
  if (initialized) {
    x += (next.w - oldSize.w) / 2;
    y += (next.h - oldSize.h) / 2;
    draw();
  }
  oldSize = next;
}).observe(stage);
