#!/usr/bin/env bash
# Approximate render of a .docx when Word/LibreOffice are unavailable:
# mammoth -> HTML (Calibri 11, Letter, 0.7in margins) -> headless Chrome PDF -> page PNGs.
# Usage: preview_docx.sh <file.docx> [outdir]
set -euo pipefail
DOCX="${1:?docx}"; OUT="${2:-$(dirname "$DOCX")/preview}"; mkdir -p "$OUT"
npx -y mammoth "$DOCX" --output-format=html > "$OUT/inner.html" 2>/dev/null
python3 - "$OUT" <<'PY'
import sys, os
out = sys.argv[1]; inner = open(f"{out}/inner.html").read()
html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@page {{ size: 8.5in 11in; margin: 0.69in 0.76in; }}
body {{ font-family: Calibri, Carlito, sans-serif; font-size: 11pt; line-height: 1.05; margin:0; }}
p {{ margin: 0 0 5pt; }} h1 {{ font-size: 13.5pt; margin: 14pt 0 5pt; }} h2 {{ font-size: 11.5pt; margin: 10pt 0 4pt; }} h3 {{ font-size: 10.5pt; margin: 8pt 0 3pt; }}
table {{ border-collapse: collapse; font-size: 8.5pt; }} td, th {{ border: 0.5pt solid #C9CFD6; padding: 2pt 4pt; vertical-align: top; }}
img {{ max-width: 6.6in; max-height: 3.4in; display:block; margin: 4pt auto 2pt; }}
</style></head><body>{inner}</body></html>"""
open(f"{out}/preview.html","w").write(html)
PY
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
command -v google-chrome >/dev/null && CHROME=google-chrome
"$CHROME" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$OUT/preview.pdf" "$OUT/preview.html" >/dev/null 2>&1
python3 - "$OUT" <<'PY'
import sys
try:
    import fitz
except ImportError:
    print("pip3 install --user pymupdf  # needed for page images"); sys.exit(0)
out = sys.argv[1]; d = fitz.open(f"{out}/preview.pdf"); print("pages:", d.page_count)
for i, pg in enumerate(d):
    pg.get_pixmap(dpi=60).save(f"{out}/page-{i+1:02d}.png")
PY
echo "preview in $OUT (approximate layout; Word may paginate slightly differently)"
