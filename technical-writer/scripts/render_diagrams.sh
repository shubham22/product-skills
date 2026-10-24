#!/usr/bin/env bash
# Render every .mmd in a directory to .png with the skill's Mermaid theme.
# Usage: render_diagrams.sh <dir> [scale=2]
set -euo pipefail
DIR="${1:?dir with .mmd files}"; SCALE="${2:-2}"
CFG="$(cd "$(dirname "$0")/.." && pwd)/assets/mermaid-config.json"
for f in "$DIR"/*.mmd; do
  out="${f%.mmd}.png"
  npx -y -p @mermaid-js/mermaid-cli mmdc -i "$f" -o "$out" -c "$CFG" -s "$SCALE" --backgroundColor white >/dev/null 2>&1 \
    && echo "rendered $(basename "$out")" || echo "FAILED $(basename "$f")"
done
