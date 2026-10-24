// Minimal example: node example_build.js out.docx  (requires `npm install docx` in cwd if not preinstalled)
const H = require('./docx_helpers');
const out = process.argv[2] || 'example.docx';
const children = [
  ...H.titleBlock('Widget Routing: Architecture Options', 'Version 1 · 2026-09-13 · Evidence: customer calls, the platform repo, vendor docs',
    'Purpose:', 'This document presents the options and the design choices inside them so the team can plan execution. It informs rather than decides; one option carries (preferred).'),
  H.h1('1. The requirement, and why the current design cannot meet it'),
  H.p('State the requirement in the customer’s words, name the evidence, and say what already exists that helps.'),
  // ...H.fig('diagrams/current.png', 'Figure 1. Current path. Every request transits three vendor services.'),
  H.h1('2. Option A — Cloud-orchestrated executor'),
  H.labeled('What we keep.', 'Full orchestration traces and one codebase.'),
  H.labeled('What it costs.', 'We stay in the transaction path.'),
  H.h1('3. Side-by-side'),
  H.table([2600, 1800, 1800, 1800], [
    ['Dimension', 'A', 'B (preferred)', 'Self-host'],
    ['Payload transit removed', 'No', 'Yes', 'Yes'],
  ]),
  H.h1('4. References'),
  H.link('Fivetran — Hybrid Deployment', 'https://fivetran.com/docs/deployment-models/hybrid-deployment'),
];
H.buildDoc(children, out).then((f) => console.log('wrote', f));
