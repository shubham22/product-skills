---
name: ai-tropes-editor
description: Edit a draft to remove the rhetorical habits that make writing sound machine-generated, such as counted headings ("Three fixes for three failures"), slogan headings, "X, not Y" corrections, staged reveals, announced importance, and recaps that repeat the paragraph above them. Use this as the last pass on any design doc, launch post, customer notice, email, or PR description, and whenever the user says a draft "sounds like AI", "sounds like ChatGPT", feels "salesy" or "punchy", or asks to make it sound human, natural, or less polished. Also use it to review someone else's draft for these habits.
---

# AI tropes editor

Language models reach for a small set of rhetorical moves that make prose sound rehearsed: headings built for memorability, corrections of misconceptions nobody holds, and summaries that arrive in neatly counted packages. Readers notice them quickly, and once they do, they trust the content less. This skill finds those moves in a draft and replaces each one with the fact, number, or mechanism it was standing in for.

The patterns are prompts for judgment, not bans, and they are not a test of who wrote the text. One instance of a pattern is often fine. Act when a pattern repeats, when it replaces evidence, or when it makes a claim sound cleaner or bigger than the facts allow.

## How to edit

1. **Read the whole draft before changing anything.** Most of these patterns only show up as repetition across sections.
2. **Mark each instance against the list below.** Note where it is and which pattern it matches.
3. **Fix it by saying the thing directly.** Usually that means stating the number, naming the customer, or describing what the system does. Deleting the sentence is often enough, because many of these sentences carry no information.
4. **Keep the author's wording everywhere else.** Change only what the pattern touches. Keep a contrast, a parallel structure, or a technical term when it does real work.
5. **Never invent a fact to fill a gap.** If removing a trope exposes a missing number or source, leave a placeholder such as `[P95 latency before and after]` and list it for the user.

When the user asks for a review rather than an edit, return each finding with its location, the pattern, and a suggested rewrite. When editing, return the revised text followed by a short list of what changed.

## Structure and framing

1. **Counted headings.** "One gateway, two audiences." "Three fixes for three failures." These read like conference titles. Use a heading that names the topic: "How admins and members use the gateway."
2. **Slogan headings.** "Defaults beat settings." "Latency matters." "The data disagrees." State the finding with its evidence instead: "Teams that kept the defaults shipped in 2 days on average."
3. **Headings that explain the explanation.** "What this means." "Why it matters." "How it works," repeated in every section. One is fine. A doc full of them makes the reader feel led by the hand.
4. **Exposition staged as questions.** "Which raises the real question: who owns the key?" "Here the question changes." Make the point the question was setting up.
5. **Grand compression claims.** "The whole strategy in one sentence." "It comes down to one idea." Write the sentence without announcing it.
6. **Recap boxes and takeaway lists.** A callout, TL;DR, or "Key takeaways" list that repeats the paragraph above it. Keep a summary only when it leads the doc or serves a reader who skips the body.
7. **Promises about later sections.** "The next section explains." "As we'll see." One roadmap at the top is enough.
8. **Tour-guide transitions.** "Back to the customer." "Now for the interesting part." "Let's dig in." Start the next paragraph with its content.

## Sentence patterns

9. **Corrective antithesis.** "The problem is trust, not latency." The contrast is sometimes the point. When the "X, not Y" shape repeats across a doc, rewrite most of them as plain statements.
10. **A made-up misconception followed by a reveal.** "Most teams treat audit logs as a compliance checkbox. That view is incomplete." Drop the setup and explain what audit logs do.
11. **Answering an objection nobody raised.** "This is not a regression." "That is not a gap in the design." Give the reason directly: "Latency stays flat because the check runs after the response is sent."
12. **Counted packages and signposts.** "Three things stand out." "Two numbers matter here." "Two consequences follow." Delete the sentence and present the things.
13. **Mirror sentences.** "Admins set the policy, and members live inside it." The symmetry makes a claim sound more categorical than its exceptions allow. Write it plainly and keep the exceptions.
14. **Staccato fragments.** "Simple. Fast. Secure." "No setup. No keys. No waiting." Write a full sentence that says what makes it simple.
15. **Stitched reveals.** A dash or semicolon used to set up a punchline: "The fix took one line — and a week to find." "We tried five fixes; one worked." Split it into plain sentences that say what the fix was.
16. **Announced importance.** "This matters because." "Crucially." "It's worth noting that." The fact that follows should show its own importance.
17. **Morals after results.** "The lesson: simplicity wins." "More features are not always better." End on the result and let the reader draw the conclusion.
18. **Repeated caveats.** The same limit stated twice within a few paragraphs. Keep the clearer one.
19. **Decorative -ing endings.** "..., highlighting the need for governance." "..., underscoring its potential." State the cause or consequence in its own sentence, or cut it.

## Word choice

20. **One metaphor used everywhere.** "What the cache buys us." "What SSO unlocks." "The price of flexibility." Describe the effect: "The cache cuts P95 latency from 900 ms to 120 ms."
21. **Systems with personalities.** "The router decides." "The policy engine wants." Fine once. When it recurs, describe behavior: "The router returns the tool with the highest match score."
22. **Consultancy vocabulary.** "Playbook," "north star," "operating model," "unlock," "leverage," "Rollout Readiness Framework." Name the actual procedure.
23. **Moral adjectives.** "Honest numbers." "Real security." "True zero trust." Say which property you mean: "numbers from the metering table," "keys that never leave the customer's cloud."
24. **Theatrical disclaimers.** "This won't solve every conceivable compliance requirement." The limit is fair, but "every conceivable" inflates it. State the actual limit.
25. **Inflated significance.** "Game-changing." "Pivotal." "A testament to." Replace with what changed and the evidence for it.
26. **Vague authority.** "Customers have told us." "Industry experts agree." "Studies show." Name the customer, the call, or the source, or soften the claim to what you can show.
27. **Filler openings and closings.** "In today's fast-moving AI landscape." A stock "Challenges and next steps" paragraph with no concrete problem in it. Delete both.
28. **Mechanical sameness.** Every paragraph built the same way, every bullet a bold label plus one line of equal length, every list in threes. Vary structure to match the content.

## What not to change

- Precise technical terms, even when a simpler word exists, if the simpler word would be wrong.
- A pattern that carries the argument, such as a deliberate "X, not Y" when the doc exists to correct a common mistake the reader holds.
- The author's own voice and phrasing outside the flagged sentence.
- A style rule from the user, the repo, or another loaded skill. Where they conflict with this list, follow theirs.

## Credits

The pattern list adapts the AI-tropes section of the `scholarly-paper-revision` skill, which targets mathematical papers, and [Wikipedia's guide to signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing). The examples here are rewritten for product and engineering writing.
