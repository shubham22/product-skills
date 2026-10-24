---
name: technical-writer
description: Write clear, evidence-driven technical design docs, decision narratives (Amazon/AWS "6-pager" style), architecture-options docs, and industry/competitor case studies with rendered diagrams. Use this whenever the user asks for a design doc, decision doc, options doc, architecture proposal, technical narrative, RFC, doc read, "Amazon-style" doc, or wants an approach "written up" for engineers, PMs, or leadership — even when they only say "put this in a doc for the team" or "write up what we discussed." Also use it to rewrite an existing draft to be simpler and tighter, or to turn meeting notes plus research into a document.
---

# Technical writer

This skill produces documents that engineers and leaders actually read to the end: a
decision narrative or options doc where every sentence carries information, diagrams do
the explaining, and options are treated fairly. The bar was set by an Acme hybrid-deployment
doc that the whole team praised for its simplicity; `references/exemplar.md` is that doc, annotated.

## What good looks like

- A reader who knows the domain but missed every meeting understands the problem, the
  current state, what others do, the options, and what is preferred — in one sitting.
- Full sentences, plain words, no filler. Each paragraph exists because a reader needs it.
- Concepts, not code paths. "The orchestrator can already invoke the tool runtime over HTTP instead of Lambda"
  beats a file:line citation. Code references belong in engineering notes, not the narrative.
- Diagrams carry the flows; prose carries what the diagram cannot show (policy, cadence,
  numbers, trade-offs). Never narrate a diagram in the paragraph under it.
- Options get equal, honest treatment: what we gain, what it costs, who takes on what.
  If the doc informs rather than decides, mark one option "(preferred)" and stop there.
- Evidence is named and numbered: customer names, hours, counts, dates, quotes. "Some
  customers" and "significant effort" are not evidence.

## Workflow

Work in this order; each step feeds the next and skipping one shows in the draft.

1. **Read the ask, then decide the doc type.** Decision narrative (recommend one path),
   options doc (present paths, mark a preferred), or case-study reference (what others do).
   Confirm audience and length target. Decision docs for a doc read: about six pages at
   Calibri 11. Reference docs: as long as the evidence needs, never longer than it earns.
2. **Gather evidence before writing.** Customer calls and quotes, the codebase (read it,
   then translate to concepts), competitor/industry docs, meeting notes. Fan out research to
   subagents when there are more than three sources to cover. Keep every URL; the doc ends
   with a references section.
3. **Frame the problem in the reader's terms.** State the requirement precisely (what is
   actually being asked, and what it is not), why the current design cannot meet it, and
   what already exists that helps. This section earns the reader's trust for everything after.
4. **Survey what others do, with their diagrams.** One block per company: a diagram drawn
   in the doc's own style (link the original), what runs where, what access the vendor
   keeps, who upgrades and how often, what the vendor sees, scale signals, pros, cons,
   relevance to us. Close with a comparison matrix and a paragraph on what the evidence says.
5. **Lay out the options.** Bookends briefly (the extremes that frame the space), then
   each real option in full: one figure, the design choices inside it, what we gain,
   what it costs, what the customer takes on. Then how the options relate (subsets,
   composability), the design choices common to all, and a side-by-side table.
6. **Draw the diagrams before polishing prose**, so the prose only says what the
   diagram cannot. See "Diagrams" below and `assets/diagram-snippets.md`.
7. **Cut.** Reread each paragraph asking "what does the reader lose if this goes?"
   Remove restatements of figures, hedges, throat-clearing, and anything that only shows
   effort. Check the list in `references/style-guide.md`.
8. **Verify and deliver.** Render the document, look at every page, then deliver in the
   format the audience uses (see "Delivery"). Send the file; don't describe it.

## Writing rules

These are the rules the team responded to. `references/style-guide.md` has before/after
examples for each.

- **Lead with the answer.** The first block after the title states purpose (and the
  decision, if it is a decision doc) in two or three sentences.
- **One idea per sentence, verbs early, terms defined once.** Prefer "the agent polls the
  control plane" to "the control plane is polled by the agent via a mechanism whereby…".
- **Label paragraphs inside option sections** — "What Acme keeps.", "What it costs.",
  "What the customer takes on.", "When A is the right resting point." — so a skimming
  reader can compare options across sections.
- **Pros / Cons / Relevance for every external example**, each two to four sentences,
  written from our point of view, honest about the cons.
- **Numbers and names over adjectives.** "220 support hours for one customer" and
  "100+ clusters, no DevOps function" do the persuading.
- **No hedging, no marketing.** If something is uncertain, say what is unknown and why;
  don't soften with "may potentially."
- **Concept over mechanism.** Explain what a component does and where the trust boundary
  is; leave function names, file paths, and env vars out of the narrative.
- **Don't decide when asked to inform**, and don't plan when asked to decide. If the team
  owns execution, leave out delivery stages and next steps unless requested; put open
  design questions instead.
- **Every table row ends with a so-what** (a "Lesson for us" or "Relevance" column).
- **Comparison tables use dimensions the reader would argue about** (possession, transit,
  vendor access, who upgrades, debugging, engineering surface), not feature lists.

## Diagrams

Diagrams are the primary explanation for anything with a flow or a boundary; draw one for
the current state, one per option, and one per external case study. Render them as images
in the doc (never ASCII art in a final document). Mermaid works well:

- Sequence diagram for a request path (current state, each option's tool call).
- Flowchart with two subgraphs — customer environment and vendor cloud — for
  control-plane / data-plane splits; label edges with direction and what crosses
  ("outbound-only mTLS · metadata allowlist").
- One consistent theme across all diagrams (`assets/mermaid-config.json`), white background,
  scale 2 for docs. Keep labels short; put policy detail in the caption or the prose.
- Captions carry the point of the figure, not its title: "Every tool call, credential, and
  response transits three Acme-cloud services."
- Render with `scripts/render_diagrams.sh <dir>` and look at each PNG: note text can render
  invisible on some themes, tall diagrams need narrower widths, `box…end` grouping needs
  Mermaid ≥ 10.3 (fall back to labels in participant names for older renderers).
- Draw industry examples yourself, modeled on the vendor's published architecture, and
  link the original diagram in the references; this keeps style consistent and avoids
  reproducing copyrighted figures.

## Structure

Pick the template in `references/templates.md` that matches the doc type:

- **Decision narrative** — purpose + decision line, problem, current architecture,
  what others do, options with a recommendation, what changes and what doesn't,
  open questions, (next steps only if asked).
- **Options doc** — purpose line that says it informs, requirement, current state,
  industry pattern, bookends, each option in full, how options relate + shared design
  choices, side-by-side, open questions, references. Mark one option "(preferred)".
- **Case-study reference** — the survey section expanded, with a diagram per vendor and a
  comparison matrix; used when the team wants to see the landscape before choosing.

## Length and format

- Decision doc for a doc read: ≤ 6 pages, Calibri 11, US Letter, ~0.7–0.8" margins,
  images 6.5" wide and ≤ 3.4" tall, tables at 9 pt. Budget roughly 2,600 words plus three
  figures for six pages.
- Reference/options doc: no page limit, but the same density rules; add a references
  section grouped by topic with the full URL visible next to each link.
- Use tables for anything the reader will compare; use bullets only for genuinely
  parallel items; write everything else as prose.

## Delivery

- **Word (.docx)**: use `scripts/docx_helpers.js` (docx-js, Calibri 11, Letter, image
  auto-sizing, DXA tables, hyperlinks). `scripts/example_build.js` shows the pattern.
  If the `docx` skill is available, load it for its gotchas; the helpers already encode
  the common ones (dual table widths, `ImageRun` type, no literal bullets).
- **Preview without Word/LibreOffice**: `scripts/preview_docx.sh <file.docx>` renders an
  approximate PDF via mammoth + headless Chrome and page PNGs via PyMuPDF; use it to check
  page count and that figures appear. Quick Look drops images from .docx — warn users
  who report "no images" and give them a PDF companion.
- **Google Docs**: connectors usually cannot upload binaries larger than a few hundred KB
  inline; upload the .docx by hand or via a browser tool, and keep the original untouched
  when asked to "work on a copy."
- **Markdown/HTML artifact**: fine for drafts and internal reads; convert to .docx for
  doc reads with people who comment in Word/Google Docs.

## Before sending — checklist

- Purpose/decision line is the first thing after the title.
- Every figure has a caption that states the point; no paragraph restates a figure.
- Every option has gains, costs, and who-takes-on-what; the preferred one is marked
  if the doc informs rather than decides.
- Every external example has pros, cons, and relevance; the comparison table has a
  so-what column.
- No file paths, function names, or env vars in the narrative.
- Numbers, names, dates, and quotes present where claims are made; references section
  present with URLs.
- Page count matches the target; images visible on every rendered page.
