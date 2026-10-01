/**
 * Mini-kit de PDF para os documentos do CoreMotiom (pdf-lib).
 * Suporta texto com quebra automática, títulos, tabelas, imagens e rodapé
 * com numeração — tudo em coordenadas pt (A4 = 595 x 842).
 *
 * Uso interno dos scripts generate-user-flowchart*.mjs.
 */

/* pdf-lib é dependência de desenvolvimento (documentos). Resolvida de forma
 * tolerante: node_modules local, pasta de ferramentas do sandbox ou PDF_LIB_PATH. */
const PDF_LIB_CANDIDATES = [
  process.env.PDF_LIB_PATH,                                   // override explícito
  'pdf-lib',                                                  // node_modules do projeto
  '/home/user/node_modules/pdf-lib/es/index.js',              // fallbacks de sandbox
  '/home/user/tools/node_modules/pdf-lib/es/index.js',
  '/home/user/tools/node_modules/pdf-lib/cjs/index.js',
].filter(Boolean);

async function loadPdfLib() {
  for (const candidate of PDF_LIB_CANDIDATES) {
    try {
      const mod = await import(candidate);
      const lib = mod.PDFDocument ? mod : mod.default;
      if (lib?.PDFDocument) return lib;
    } catch {
      /* tenta o próximo */
    }
  }
  throw new Error(
    'pdf-lib não encontrado. Instale com "npm i -D pdf-lib @resvg/resvg-js" ' +
      'ou defina PDF_LIB_PATH apontando para o módulo.'
  );
}

const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();

export const PALETTE = {
  ink: rgb(0.07, 0.09, 0.13),
  muted: rgb(0.42, 0.46, 0.53),
  faint: rgb(0.62, 0.65, 0.7),
  line: rgb(0.85, 0.87, 0.9),
  accent: rgb(0.76, 0.15, 0.18),
  accentSoft: rgb(0.98, 0.92, 0.92),
  panel: rgb(0.96, 0.97, 0.98),
  dark: rgb(0.043, 0.047, 0.063),
  darkSoft: rgb(0.11, 0.12, 0.15),
  white: rgb(1, 1, 1),
  ok: rgb(0.06, 0.5, 0.35),
  warn: rgb(0.72, 0.45, 0.02),
  amber: rgb(0.98, 0.75, 0.14),
};

/** pdf-lib usa WinAnsi: substitui caracteres fora do escopo. */
export function pdfSafe(text) {
  return String(text)
    .replace(/⚠/g, '(!)')
    .replace(/→/g, '->')
    .replace(/←/g, '<-')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/⌘/g, 'Cmd')
    .replace(/•/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u00a0/g, ' ')
    .replace(/[^\u0000-\u00ff]/g, '');
}

export class PdfDoc {
  constructor(doc, fonts, opts = {}) {
    this.doc = doc;
    this.fonts = fonts;
    this.width = opts.width || 595.28;
    this.height = opts.height || 841.89;
    this.margin = opts.margin ?? 52;
    this.footerLabel = opts.footerLabel || '';
    this.pages = [];
    this.pageRecords = [];
    this.newPage();
    this.fresh = true;          // página recém-criada e ainda sem conteúdo
  }

  static async create(opts = {}) {
    const doc = await PDFDocument.create();
    doc.setTitle(pdfSafe(opts.title || 'Documento'));
    doc.setAuthor('CoreMotiom');
    doc.setSubject(pdfSafe(opts.subject || ''));
    doc.setCreator('scripts/generate-user-flowchart-pdf.mjs');
    const fonts = {
      regular: await doc.embedFont(StandardFonts.Helvetica),
      bold: await doc.embedFont(StandardFonts.HelveticaBold),
      mono: await doc.embedFont(StandardFonts.Courier),
      monoBold: await doc.embedFont(StandardFonts.CourierBold),
    };
    return new PdfDoc(doc, fonts, opts);
  }

  /* ---------------- páginas ---------------- */

  /** Marca a página atual como "usada" (evita páginas em branco). */
  markUsed() {
    this.fresh = false;
  }

  /** Só cria página nova se a atual já tiver conteúdo. */
  newPageIfFresh(size) {
    if (!this.fresh) this.newPage(size);
    return this.page;
  }

  newPage(size) {
    if (size) {
      this.width = size.width || this.width;
      this.height = size.height || this.height;
    }
    const page = this.doc.addPage([this.width, this.height]);
    this.page = page;
    this.pages.push(page);
    this.pageIndex = this.pages.length - 1;
    this.y = this.height - this.margin;
    this.records = [];
    this.pageRecords.push(this.records);
    this.fresh = true;
    return page;
  }

  ensure(h) {
    if (this.y - h < this.margin + 26) this.newPage();
  }

  spacer(h = 10) {
    this.y -= h;
  }

  /* ---------------- medidas ---------------- */

  wrap(text, size, maxWidth, font = this.fonts.regular) {
    const words = pdfSafe(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(test, size) <= maxWidth) line = test;
      else {
        if (line) lines.push(line);
        line = w;
      }
    }
    if (line) lines.push(line);
    return lines.length ? lines : [''];
  }

  /* ---------------- blocos de texto ---------------- */

  text(str, opts = {}) {
    this.markUsed();
    const size = opts.size ?? 9.6;
    const font = opts.bold ? this.fonts.bold : opts.mono ? this.fonts.mono : this.fonts.regular;
    const color = opts.color || PALETTE.ink;
    const x = opts.x ?? this.margin;
    const maxWidth = opts.maxWidth ?? this.width - this.margin * 2;
    const lineHeight = opts.lineHeight ?? size * 1.42;
    const lines = opts.noWrap ? [pdfSafe(str)] : this.wrap(str, size, maxWidth, font);
    for (const line of lines) {
      this.ensure(lineHeight);
      this.page.drawText(line, { x, y: this.y - size, size, font, color });
      if (opts.underline) {
        const w = font.widthOfTextAtSize(line, size);
        this.page.drawLine({
          start: { x, y: this.y - size - 2 },
          end: { x: x + w, y: this.y - size - 2 },
          thickness: 0.5,
          color: PALETTE.line,
        });
      }
      this.y -= lineHeight;
    }
    return this;
  }

  heading(str, opts = {}) {
    const level = opts.level ?? 1;
    const size = level === 1 ? 17 : level === 2 ? 12.6 : 10.6;
    const gapTop = level === 1 ? 16 : level === 2 ? 14 : 10;
    this.ensure(size * 2.6 + gapTop);
    this.spacer(gapTop);
    if (level === 1) {
      this.page.drawRectangle({
        x: this.margin,
        y: this.y - 19,
        width: 3,
        height: 19,
        color: PALETTE.accent,
      });
      this.text(str, { size, bold: true, x: this.margin + 11 });
      this.spacer(6);
      this.page.drawLine({
        start: { x: this.margin, y: this.y },
        end: { x: this.width - this.margin, y: this.y },
        thickness: 0.7,
        color: PALETTE.line,
      });
      this.spacer(10);
    } else {
      this.text(str, { size, bold: true, color: level === 2 ? PALETTE.ink : PALETTE.muted });
      this.spacer(level === 2 ? 4 : 2);
    }
    return this;
  }

  paragraph(str, opts = {}) {
    this.text(str, { size: opts.size ?? 9.8, color: opts.color || PALETTE.ink, lineHeight: 14.2 });
    this.spacer(opts.after ?? 6);
    return this;
  }

  bullets(items, opts = {}) {
    for (const it of items) {
      this.ensure(14);
      const x = (opts.x ?? this.margin) + 8;
      this.page.drawCircle({ x: x - 3, y: this.y - 4, size: 1.5, color: PALETTE.accent });
      this.text(it, { size: opts.size ?? 9.6, x, maxWidth: this.width - this.margin * 2 - 12 });
      this.spacer(2);
    }
    this.spacer(opts.after ?? 4);
    return this;
  }

  /* ---------------- componentes ---------------- */

  pills(items, opts = {}) {
    this.markUsed();
    const size = 8.6;
    let x = opts.x ?? this.margin;
    const y = this.y;
    for (const [label, value] of items) {
      const text = pdfSafe(`${label}: ${value}`);
      const w = this.fonts.bold.widthOfTextAtSize(text, size) + 16;
      if (x + w > this.width - this.margin) {
        x = this.margin;
        this.y -= 22;
      }
      this.page.drawRectangle({
        x,
        y: this.y - 16,
        width: w,
        height: 16,
        color: PALETTE.panel,
        borderColor: PALETTE.line,
        borderWidth: 0.6,
      });
      this.page.drawText(text, { x: x + 8, y: this.y - 11.5, size, font: this.fonts.bold, color: PALETTE.muted });
      x += w + 6;
    }
    this.y -= 24;
    if (this.y === y) this.y -= 4;
    return this;
  }

  table(head, rows, colWidths, opts = {}) {
    this.markUsed();
    const size = opts.size ?? 8.7;
    const pad = 6;
    const total = colWidths.reduce((a, b) => a + b, 0);
    const scale = (this.width - this.margin * 2) / total;
    const widths = colWidths.map((w) => w * scale);
    const x0 = this.margin;

    const drawRow = (cells, { header = false, group = false, wrapText = true } = {}) => {
      const font = header || group ? this.fonts.bold : this.fonts.regular;
      const lines = cells.map((c, i) =>
        wrapText ? this.wrap(c, size, widths[i] - pad * 2, font) : [pdfSafe(c)]
      );
      const h = Math.max(...lines.map((l) => l.length)) * (size * 1.35) + pad * 1.5;
      if (this.y - h < this.margin + 26) {
        this.newPage();
        if (!header) drawRow(head, { header: true });
      }
      const rowY = this.y - h;
      if (header) {
        this.page.drawRectangle({ x: x0, y: rowY, width: this.width - this.margin * 2, height: h, color: PALETTE.darkSoft });
      } else if (group) {
        this.page.drawRectangle({
          x: x0,
          y: rowY,
          width: this.width - this.margin * 2,
          height: h,
          color: PALETTE.accentSoft,
        });
      } else {
        this.page.drawLine({
          start: { x: x0, y: rowY },
          end: { x: this.width - this.margin, y: rowY },
          thickness: 0.4,
          color: PALETTE.line,
        });
      }
      let cx = x0;
      const cellsCount = cells.length;
      lines.forEach((linesOfCell, i) => {
        const color = header ? PALETTE.white : group ? PALETTE.accent : i === 0 ? PALETTE.ink : PALETTE.muted;
        linesOfCell.forEach((line, li) => {
          this.page.drawText(line, {
            x: cx + pad,
            y: rowY + h - pad * 0.75 - size * 1.2 - li * size * 1.35,
            size,
            font: header ? this.fonts.bold : group ? this.fonts.bold : i === 0 && opts.boldFirst ? this.fonts.bold : font,
            color,
          });
        });
        cx += widths[i];
      });
      this.y = rowY;
    };

    drawRow(head, { header: true });
    for (const row of rows) {
      if (row.group) drawRow([row.group, ...new Array(head.length - 1).fill('')], { group: true, wrapText: false });
      else drawRow(row.cells || row, { wrapText: opts.wrap !== false });
    }
    this.spacer(10);
    return this;
  }

  async image(bytes, opts = {}) {
    const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
    this.__imgCache = this.__imgCache || new Map();
    const key = opts.cacheKey || `${isPng ? 'png' : 'jpg'}:${bytes.length}:${bytes[0]}`;
    let img = this.__imgCache.get(key);
    if (!img) {
      img = isPng ? await this.doc.embedPng(bytes) : await this.doc.embedJpg(bytes);
      this.__imgCache.set(key, img);
    }
    const maxW = opts.maxWidth ?? this.width - this.margin * 2;
    const maxH = opts.maxHeight ?? this.height - this.margin * 2 - 40;
    const scale = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    return { img, w, h, maxW, maxH };
  }

  async placeImage(bytes, opts = {}) {
    this.markUsed();
    const { img, w, h } = await this.image(bytes, opts);

    this.ensure(h + 8);
    const x = opts.center === false ? this.margin : (this.width - w) / 2;
    this.page.drawRectangle({
      x: x - 1,
      y: this.y - h - 1,
      width: w + 2,
      height: h + 2,
      color: PALETTE.dark,
    });
    this.page.drawImage(img, { x, y: this.y - h, width: w, height: h });
    this.y -= h + (opts.after ?? 8);
    return { w, h };
  }

  card(title, body, opts = {}) {
    this.markUsed();
    const size = 9.4;
    const padX = 11;
    const padY = 9;
    const maxW = this.width - this.margin * 2 - padX * 2;
    const titleLines = this.wrap(title, size + 0.6, maxW, this.fonts.bold);
    const bodyLines = this.wrap(body, size - 0.6, maxW);
    const h = padY * 2 + titleLines.length * 13 + 3 + bodyLines.length * 12.4;
    this.ensure(h + 8);
    const y = this.y - h;
    this.page.drawRectangle({
      x: this.margin,
      y,
      width: this.width - this.margin * 2,
      height: h,
      color: PALETTE.panel,
      borderColor: PALETTE.line,
      borderWidth: 0.6,
    });
    this.page.drawRectangle({ x: this.margin, y, width: 2.4, height: h, color: opts.accent || PALETTE.accent });
    let ty = this.y - padY;
    titleLines.forEach((l) => {
      this.page.drawText(l, { x: this.margin + padX, y: ty - size, size: size + 0.6, font: this.fonts.bold, color: PALETTE.ink });
      ty -= 13;
    });
    ty -= 3;
    bodyLines.forEach((l) => {
      this.page.drawText(l, { x: this.margin + padX, y: ty - size + 0.4, size: size - 0.6, font: this.fonts.regular, color: PALETTE.muted });
      ty -= 12.4;
    });
    this.y = y - 9;
    return this;
  }

  /* ---------------- finalização ---------------- */

  stampFooters({ label, cover = true } = {}) {
    this.pages.forEach((page, i) => {
      if (cover && i === 0) return;
      page.drawLine({
        start: { x: this.margin, y: this.margin - 12 },
        end: { x: this.width - this.margin, y: this.margin - 12 },
        thickness: 0.5,
        color: PALETTE.line,
      });
      page.drawText(pdfSafe(label || this.footerLabel), {
        x: this.margin,
        y: this.margin - 22,
        size: 7.6,
        font: this.fonts.regular,
        color: PALETTE.faint,
      });
      const num = `${i + 1} / ${this.pages.length}`;
      const w = this.fonts.bold.widthOfTextAtSize(num, 7.8);
      page.drawText(num, {
        x: this.width - this.margin - w,
        y: this.margin - 22,
        size: 7.8,
        font: this.fonts.bold,
        color: PALETTE.faint,
      });
    });
  }

  async save() {
    return this.doc.save();
  }
}
