# Style guide with before/after examples

Each rule below comes from an edit the team asked for while producing the exemplar doc.
Use the "after" forms as patterns, not as text to copy.
Company, customer, and internal service names are placeholders here. Real docs use the real names.

## 1. Don't narrate the diagram

**Before** (paragraph under a sequence diagram that already shows the flow):
> The API service and the orchestrator keep their roles, exactly as today. Per organization, the orchestrator routes the already self-contained execution job — arguments, sealed credential envelopes, and the signed connector bundle — to an executor the customer hosts. The executor resolves credentials from the customer's KMS, runs the full connector logic, calls the provider from the customer's network, and returns the result through the API service to the unchanged SDK.

**After**:
> **Design choice inside A.** Two response modes: a sealed mode in which the executor encrypts results to customer-held keys and the API service relays ciphertext it cannot read, and a plaintext mode with zero-retention terms for customers one notch less strict.

Why: the figure already shows who calls whom. The prose should add the thing the picture cannot — the policy choice.

## 2. Concept over code path

**Before**:
> `InvokeWithHttp` in `apps/orchestrator/lib/awsutils/lambda.go:73` POSTs the identical payload to `LAMBDA_USE_HTTP_ENDPOINT`, exercised in `playwright_orchestrator_runtime.yaml:236-249`.

**After**:
> The orchestrator can already invoke the tool runtime over plain HTTP instead of AWS Lambda, a mode our CI exercises daily. Execution can move; the open questions are where the trust boundary sits and what product surrounds it.

Why: the reader needs the capability and its consequence. File:line citations go into an engineering appendix or the PR, not the narrative.

## 3. Label paragraphs so options compare across sections

Use the same labels in every option: **What Acme keeps/gains.** · **What it costs.** · **What the customer takes on.** · **When X is the right resting point.** A skimming reader can then read only the "What it costs" paragraphs across all options.

## 4. Evidence is named and numbered

**Before**: "Several customers have raised concerns about data handling."
**After**: "Customer A accepted customer-controlled token storage but separately objected to Acme seeing tool-call payloads, even under zero-retention terms. Customer B, after a security incident, observed that credential encryption alone would not remove Acme from its customers' subprocessor chain."

**Before**: "Self-hosting has been operationally expensive."
**After**: "One customer consumed more than 220 support hours; another accumulated divergent cherry-picked releases that now complicate every upgrade."

## 5. Every external example ends with the so-what

Case-study block skeleton (two to four sentences each):

- **Access.** What standing access the vendor keeps, how it is gated and audited.
- **Upgrades and cadence.** Who upgrades the customer-side component, how, how often.
- **Contract / what the vendor sees.** Enumerated where the vendor enumerates it.
- **Scale signals.** Counts, team size, dates — or "not published."
- **Pros.** From our point of view.
- **Cons.** Honest; include what the vendor's own engineers admit.
- **Relevance to us.** Which of our options or design choices it informs.

Table rows likewise end with a "Lesson for us" column.

## 6. Inform vs decide

When the ask is "present the options," the purpose line says so ("It informs rather than decides"), each option gets equal depth, one carries "(preferred)" in its heading and table column, and there is no delivery plan — a section of open design questions instead. When the ask is "recommend," the decision line comes first and the options section argues for it.

**Before** (in an options doc): "Stage 1 — Managed execution appliance… Stage 2 — Extract the slim gateway… Next steps: 1. Doc read Tuesday…"
**After**: removed; replaced by "Open design questions that shape any build: worker and tenant isolation…; key distribution and rotation…; the webhook end-state…"

## 7. Cut what only shows effort

Delete: "It is worth noting that", "As mentioned above", "In order to", "very", "significant", "robust", "leverage", "we believe that", "it should be emphasized". Delete sentences that summarize the previous sentence. Delete a paragraph that repeats a table.

**Before**: "It is important to note that, in terms of operational overhead, this option could potentially introduce significant additional complexity."
**After**: "Fleet tooling is a product we must build: provisioning, wave rollouts, health gates, rollback, identity rotation, diagnostics."

## 8. Sentences

- One idea each; verb early; about 20 words.
- Define a term once, then use it consistently (execution plane, control plane, sealed relay).
- Prefer "never" and "only" statements when they are literally true — they are what security readers look for: "never arguments, responses, tokens, or provider identifiers."
- Use the customer's own words when they define the requirement: "not visible to our data, even in transit."

## 9. Captions

A caption states the point: "Figure 3. Option B. The application calls a customer-hosted Gateway; requests, credentials, and responses never touch Acme cloud." Not: "Figure 3. Option B architecture."

## 10. Comparison tables

Rows are the dimensions a reviewer would argue about; columns are the options. Cells are short, literal values ("No (ciphertext relay)", "Base URL per deployment", "Fleet-managed"). Put "preferred" in the column header if the doc marks one.
