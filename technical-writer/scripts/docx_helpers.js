// Helpers for building design docs with docx-js: Calibri 11, US Letter, auto-sized figures,
// DXA tables (Google Docs safe), hyperlinks with visible URLs, bullets via numbering config.
// Usage: const H = require('./docx_helpers'); see example_build.js.
const fs = require('fs');
let docx;
try { docx = require(require.resolve('docx', { paths: [process.cwd(), __dirname] })); }
catch (e) { console.error('The `docx` package is not installed. Run `npm install docx` in your working directory, then retry.'); process.exit(1); }
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ImageRun, AlignmentType, BorderStyle, LevelFormat, ShadingType, ExternalHyperlink,
} = docx;

const INK = '1B222B', MUTED = '5B6673', ACCENT = '1F4E9C', HEADFILL = 'EEF1F5';
const t = (text) => new TextRun({ text });
const b = (text) => new TextRun({ text, bold: true });
const i = (text) => new TextRun({ text, italics: true });
const p = (children, opts = {}) => new Paragraph({
  children: typeof children === 'string' ? [new TextRun(children)] : children,
  spacing: { after: opts.after ?? 110, line: 252, lineRule: 'auto', before: opts.before ?? 0 },
  alignment: opts.align,
});
const labeled = (label, text) => p([b(label + ' '), t(text)]);
const bullet = (children) => new Paragraph({
  children: typeof children === 'string' ? [new TextRun(children)] : children,
  numbering: { reference: 'bullets', level: 0 }, spacing: { after: 60, line: 252, lineRule: 'auto' },
});
const h1 = (text) => new Paragraph({ text, heading: HeadingLevel.HEADING_1 });
const h2 = (text) => new Paragraph({ text, heading: HeadingLevel.HEADING_2 });
const h3 = (text) => new Paragraph({ text, heading: HeadingLevel.HEADING_3 });

const pngSize = (file) => { const buf = fs.readFileSync(file); return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }; };
// Figure: PNG path + caption; width capped at maxW inches, height at 3.4in (keeps ~6 pages honest).
const fig = (path, caption, maxW = 6.5, maxH = 3.4) => {
  const { w, h } = pngSize(path);
  let wIn = maxW, hIn = (h / w) * wIn;
  if (hIn > maxH) { hIn = maxH; wIn = (w / h) * hIn; }
  return [
    new Paragraph({ children: [new ImageRun({ type: 'png', data: fs.readFileSync(path), transformation: { width: Math.round(wIn * 96), height: Math.round(hIn * 96) } })], alignment: AlignmentType.CENTER, spacing: { before: 60, after: 16 } }),
    new Paragraph({ children: [new TextRun({ text: caption, italics: true, size: 18, color: MUTED })], alignment: AlignmentType.CENTER, spacing: { after: 130 } }),
  ];
};

const thin = { style: BorderStyle.SINGLE, size: 4, color: 'C9CFD6' };
const borders = { top: thin, bottom: thin, left: thin, right: thin };
const cell = (text, width, head = false, boldCol = false) => new TableCell({
  width: { size: width, type: WidthType.DXA }, borders,
  shading: head ? { type: ShadingType.CLEAR, fill: HEADFILL } : undefined,
  margins: { top: 36, bottom: 36, left: 80, right: 80 },
  children: [new Paragraph({ children: [new TextRun({ text, bold: head || boldCol, size: 17 })], spacing: { after: 0, line: 224, lineRule: 'auto' } })],
});
// table(colWidthsDXA, rows) — first row is the header; first column bold. Widths should sum to ≤ 9936 (6.9in).
const table = (colWidths, rows) => new Table({
  width: { size: colWidths.reduce((a, c) => a + c, 0), type: WidthType.DXA }, columnWidths: colWidths,
  rows: rows.map((r, ri) => new TableRow({ children: r.map((c, ci) => cell(c, colWidths[ci], ri === 0, ri > 0 && ci === 0)) })),
});
const link = (label, url) => new Paragraph({
  children: [new ExternalHyperlink({ children: [new TextRun({ text: label, style: 'Hyperlink', size: 19 })], link: url }), new TextRun({ text: `  ${url}`, size: 16, color: MUTED })],
  numbering: { reference: 'bullets', level: 0 }, spacing: { after: 30, line: 240 },
});
const spacer = (after = 100) => new Paragraph({ children: [], spacing: { after } });

// Title block: title, meta line, and the purpose/decision line with a rule under it.
const titleBlock = (title, meta, leadLabel, leadText) => [
  new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 34 })], spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: meta, size: 19, color: MUTED })], spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: leadLabel + ' ', bold: true, size: 20, color: ACCENT }), new TextRun({ text: leadText, size: 20 })], spacing: { after: 150 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'C9CFD6', space: 6 } } }),
];

// buildDoc(children, outPath): Letter, 0.69in top/bottom, 0.76in sides, Calibri 11.
const buildDoc = (children, outPath) => {
  const doc = new Document({
    numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 340, hanging: 200 } } } }] }] },
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 22, color: INK } },
        heading1: { run: { font: 'Calibri', size: 27, bold: true, color: INK }, paragraph: { spacing: { before: 280, after: 100 } } },
        heading2: { run: { font: 'Calibri', size: 23, bold: true, color: INK }, paragraph: { spacing: { before: 200, after: 80 } } },
        heading3: { run: { font: 'Calibri', size: 21, bold: true, color: ACCENT }, paragraph: { spacing: { before: 160, after: 60 } } },
      },
      characterStyles: [{ id: 'Hyperlink', name: 'Hyperlink', basedOn: 'DefaultParagraphFont', run: { color: ACCENT, underline: {} } }],
    },
    sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } }, children }],
  });
  return Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(outPath, buf); return outPath; });
};

module.exports = { t, b, i, p, labeled, bullet, h1, h2, h3, fig, table, link, spacer, titleBlock, buildDoc };
