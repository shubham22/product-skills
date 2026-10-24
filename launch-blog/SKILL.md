---
name: launch-blog
description: "Write or revise concise product and feature launch blogs in an AWS News Blog and Kiro-inspired style, with a concrete problem, clear announcement, practical walkthrough, and evidence-led screenshots or GIFs. Use for launch posts and turning demos into launch blogs, not engineering design docs or API references."
---

# Launch Blog

Create a launch story that explains why the feature matters and shows it working. The preferred voice is plain, active, and confident, with a shared “we” walkthrough. Follow explicit user choices over these defaults.

## Establish the story

Read [references/v3-exemplar.md](references/v3-exemplar.md) before the first draft or a substantial rewrite. It records the user-approved v3 style from an earlier launch; reuse its decisions, not its product facts.

Use the provided notes, recording, code, and references to establish:
- The reader and the concrete task they want to complete.
- What makes that task difficult today and what the feature changes.
- The demonstrated workflow, actual results, and important limits.
- Availability and the next action the reader can take.

Reuse context already supplied. Ask only about facts that would materially change the story. Do not delay a useful draft over an optional title or format choice. Do not infer general availability, pricing, performance gains, or security guarantees from a working demo. Flag unresolved launch facts to the user outside the publishable copy.

## Preferred narrative

Use this as a flexible sequence, not mandatory headings or a fixed number of paragraphs:

1. **Begin with the reader’s situation.** Show a specific task and the decision or obstacle it creates. Prefer “You connect an agent to Gmail…” over “Organizations need…” or broad claims about an industry. Do not force every opening into a rhetorical question.
2. **Explain the friction.** Name the work, uncertainty, or risk the reader must manage. Keep it short and factual; no invented customer research or quantified pain.
3. **Announce the feature.** “Today, we’re introducing [feature]…” followed by what it is, what the reader can do, and why that helps. Position the feature on its own merits; “it is different” is not positioning.
4. **Show one coherent use case.** Use “we” or “let’s” for the walkthrough and “you” for reader guidance. Keep the agent, apps, and task consistent. Explain enough UI and code to reproduce the key behavior without turning the post into an exhaustive tutorial.
5. **Show the result.** Use actual output or an observed before/after. When enforcement is the feature, show an allowed action and a rejected action through the same relevant execution path. Qualify what the evidence proves.
6. **Close with essential limits and a next step.** Explain behavior such as whether changes reach existing setups or only new ones, where it affects adoption. State verified availability and provide one useful getting-started link. Avoid a generic future-looking conclusion.

For a short feature launch, aim initially for roughly 500–750 words of prose, excluding code and captions. Expand only when the task needs it. Do not pad a small feature or cut a necessary caveat to meet a count.

## Voice and editing

- Default to “we” for the product team and shared demonstration, not a fictional first-person author. Preserve “I” when the user explicitly wants an individual author’s voice. First-person words inside quoted prompts need not change.
- Prefer concrete verbs and short, complete sentences. Vary sentence length naturally; avoid staccato slogans and staged contrasts.
- Explain the capability and its benefit together. Cut repeated benefits, redundant screenshot narration, hype, jargon, and corporate scene-setting.
- Use descriptive titles and section headings. Avoid clever headings that hide the subject.
- Default to generic examples with no customer names. Check media as well as prose for customer identifiers. Include named customers only when explicitly requested and authorized.
- Keep code small, copyable, and consistent in format. Use placeholders for credentials and account-specific identifiers; distinguish runnable code from an HTTP request illustration. Do not bury the example in comments or unneeded demo checks.
- Use AWS/Kiro references for narrative and pacing, not copied language, product claims, or an assumption that every AWS post follows one pattern. Browse the specific posts when the user asks or when their contents are needed. Do not put style-research citations into publishable copy unless relevant to the story.

## Screenshots and GIFs

When visuals are requested or materially improve the explanation, read [references/media.md](references/media.md). Favor the actual configuration screen and evidence of the outcome. Use a GIF for meaningful change over time, not decoration. Screenshots, GIFs, and code should each earn their space rather than repeat the same point.

## Deliver and verify

- Use the requested folder and format. Preserve earlier accepted drafts when making a substantial revision.
- For DOCX, use the available document-authoring skill and its render-and-inspect workflow. If unavailable, use an appropriate local authoring path and report any unverified rendering limits. This writing skill does not replace artifact QA.
- Read the draft aloud mentally: does it sound like a product team explaining a useful feature, or a template? Check the opening, announcement, walkthrough voice, and evidence for every claimed result.
- Check screenshots and every GIF phase for legibility, clipping, and private information. Inspect every rendered document page. Check the delivered artifact, not only its source text.
- Return the finished artifact and only the useful publishing assets requested. Briefly describe material changes and any playback or availability caveat. Do not publish, change product settings, call write APIs, or run a live demo without authorization for those actions.
