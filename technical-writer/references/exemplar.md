# Exemplar: "Acme Hybrid Deployment: Architecture Options" (the doc the team praised)

Annotations in `> Why it works:` blocks. Everything else is the doc as delivered (≈2,300 words, three figures, two tables, six pages at Calibri 11), with the company, customer, and internal service names replaced by placeholders. Real docs use the real names.

---

**Acme Hybrid Deployment: Architecture Options**

Purpose: This document presents the architecture options and the design choices inside them so the team can weigh them and plan execution. It informs rather than decides.

> Why it works: the first line tells the reader what the doc is for and what it will not do. Nobody reads six pages waiting for a recommendation that never comes.

## 1. The requirement, and why the current architecture cannot meet it

Security-first customers are asking Acme to be structurally unable to possess their downstream customers' data. Customer A accepted customer-controlled token storage but separately objected to Acme seeing tool-call payloads, even under zero-retention terms. Customer B, after a security incident, observed that credential encryption alone would not remove Acme from its customers' subprocessor chain. Six other customers asked for variations on the same theme. The requirement behind the word "subprocessor" is zero possession and zero payload transit, not zero retention: procurement friction, breach blast radius, and the wish to govern data under their own KMS, IAM, DLP, and retention controls all follow from whether data can reach us at all.

*Figure 1. Current execution path. Every tool call, credential, and response transits three Acme-cloud services.*

Today, every tool call flows through three Acme-cloud services: the API service authenticates and decrypts the provider credential, the orchestrator forwards it with the arguments and the connector bundle to the tool runtime, and the response returns along the same path with logs retained up to one year by default. Two existing capabilities frame the options. The first is a built, customer-operable credential proxy: OAuth exchange, refresh, and the final provider call can run inside the customer's environment while we store only opaque envelopes. It removes credential possession but not payload transit. Execution portability is the second: the execution payload is self-contained (arguments, authorization, and the versioned connector bundle travel with each request), and the orchestrator can already invoke the tool runtime over plain HTTP instead of AWS Lambda. Execution can move; the open questions are where the trust boundary sits and what product surrounds it. Our current full self-host answers the security question and fails the operating one — manual updates, a periodically rebuilt catalog image, no telemetry back, 220+ support hours for one customer, and fleet divergence for another.

> Why it works: named customers, the customer's own phrasing, one number (220+ hours), and a precise restatement of the requirement ("zero possession and zero payload transit, not zero retention"). The architecture paragraph is concept-level — no file paths — and ends by naming the two open questions the rest of the doc answers.

## 2. The pattern comparable products converged on

Across roughly thirty products surveyed, vendors selling to this buyer converge on a control plane / data plane split and then differ on one dial: vendor possession versus vendor reach. At one end, vendor-operated BYOC (Snowplow, Aiven, ClickHouse) keeps standing access into the customer account — full fleet control, but exactly the reach the strictest buyers reject. At the other end, full self-host and air-gap remove all reach and all product. The winning middle is a customer-run data plane with outbound-only control, an enumerated metadata contract, and last-known-good independence. Within that middle, products still differ on where application traffic enters — directly at the customer data plane (E2B, Kong, Buildkite) or via the vendor cloud (Snyk Broker, HCP Terraform agents, Temporal's ciphertext relay). That same fork is Acme's central design choice, and it is why two options are presented in detail below.

| Product | Sensitive data path | What the vendor sees | Lesson for Acme |
|---|---|---|---|
| Fivetran Hybrid | Pipeline processing stays in the customer network; outbound-mTLS agent | Metadata, logs, schema names, usage | Closest execution-and-connector precedent; our metadata contract must be narrower |
| E2B BYOC | Client traffic goes directly to the customer VPC | Anonymized infrastructure metrics | Direct client routing makes the non-possession claim clean |
| turbopuffer BYOC | Data plane and customer-side control component in the customer cluster | Non-sensitive telemetry, aggregate usage | Bounded, signed, audited operations; optional approval; offline continuity |
| Temporal payload codecs | Cloud relays and stores ciphertext; customer workers hold keys | Ciphertext plus workflow metadata | An encrypted relay is feasible; the vendor stays in the transaction path |
| Dagster+, HCP Terraform, Snyk Broker | Execution local, but payloads, logs, or artifacts return to the cloud | Broad "metadata" incl. compute logs | Local execution alone is not non-possession; "metadata" needs a typed allowlist |
| Kong Konnect, GitHub runners | Traffic and execution local; config and code delivered from the cloud | Config, telemetry; opt-in session captures | Consent-based debugging; self-updating agents with a staleness policy |

> Why it works: the survey is compressed to one organizing idea (a "dial"), and the table's last column is the so-what for us. The paragraph ends by connecting the survey to the doc's own fork.

## 3. The bookend options, briefly

**Full self-hosting and air-gap.** The customer runs the entire platform. Strongest isolation and the only answer for disconnected environments, but the customer inherits databases, migrations, upgrades, and incident recovery, and Acme supports diverging platform versions while losing continuous connector delivery. This is today's model and the source of the operating problems above; it frames the space rather than solving it.

**Credential proxy alone.** The smallest change: a customer proxy owns credentials and the final provider call while orchestration stays in our cloud. Arguments and responses still transit Acme, and degraded paths can fall back to platform-held credentials. It is the right credential subsystem inside either option below, and a sufficient standalone product only for buyers whose concern stops at key custody. Customer A evaluated this position and refused it.

> Why it works: the extremes get one paragraph each so the reader knows the space is bounded, then the doc spends its pages on the real choices.

## 4. Option A — Cloud-orchestrated execution with a customer-hosted executor

*Figure 2. Option A. The API service and orchestrator keep orchestrating; execution and credentials move to a customer-hosted executor; results relay sealed through the API service.*

The API service and the orchestrator keep their roles, exactly as today. Per organization, the orchestrator routes the already self-contained execution job — arguments, sealed credential envelopes, and the signed connector bundle — to an executor the customer hosts: the tool runtime packaged together with the credential proxy. The executor resolves credentials from the customer's KMS, runs the full connector logic, calls the provider from the customer's network, and returns the result through the API service to the unchanged SDK. Two response modes are possible and are themselves a design choice: a sealed mode in which the executor encrypts the result to customer-held keys and the API service relays ciphertext it cannot read, and a plaintext mode with zero-retention terms for customers one notch less strict.

**What Acme keeps.** The strongest fleet position of any option: full orchestration traces, error classes, and latency in our own dashboard, so debugging stays close to today's workflow; one codebase and no new public API surface; no SDK or endpoint change for customers; the smallest new engineering surface, because the routing seam and the executor container already exist and the executor stays stateless — no local ingress, database, or policy engine to package. Customer adoption cost is one container plus a KMS grant, which also makes this the easiest offer to sell mid-market.

**What it costs.** Acme remains in the transaction path. Our cloud's availability and latency sit in front of every execution, files and large payloads ride through us twice, and the non-possession claim must lean on "we only ever carry ciphertext." Some security teams accept that; others — Customer A's "not visible to our data, even in transit" phrasing — may not, and Temporal's experience shows procurement can treat ciphertext transit as participation in the transaction. Sealed mode also introduces real design work: key distribution between executor and SDK, response-size limits, and streaming. Trigger payload paths do not change in this option and must be solved separately either way.

**When A is the right resting point.** If design partners confirm in writing that ciphertext transit clears their reviews, Option A delivers the boundary at a fraction of the product cost and with the best operability. If they do not, A is still not wasted work — see the composability note in section 6.

> Why it works: labeled paragraphs a skimmer can compare across options; the costs are stated as plainly as the gains; the last paragraph tells the reader under what condition this option wins. (In the later, longer version the first paragraph was cut because Figure 2 already shows the flow — the rule "don't narrate the diagram.")

## 5. Option B — Customer-hosted execution plane with direct application traffic

*Figure 3. Option B. The application calls a customer-hosted Gateway; requests, credentials, and responses never touch Acme cloud.*

The customer's application, agent, or MCP client calls an Acme Gateway running inside the customer's environment. Everything that requires plaintext or a credential runs locally: ingress authentication, connected accounts, OAuth callbacks and token refresh, policy and DLP, orchestration and execution (the orchestrator and tool runtime), provider egress, payload logs, polling triggers, and webhook ingress. Acme cloud becomes a pure control plane — connector catalog and schemas, signed artifact distribution with staged rollout and rollback, desired-state configuration, fleet health, entitlements, and aggregate billing — reached only by an outbound fleet agent carrying an enumerated metadata allowlist: tool slug, status, latency, error class, versions, health; never arguments, responses, tokens, or provider identifiers. In strict mode the plane fails closed: no platform-credential fallback, no dual-written secrets, no payload-bearing cloud logs.

**What Acme gains.** The claim that closes reviews like Customer A's and Customer B's, stated as a testable negative: customer payloads and credentials do not transit or persist in Acme-managed infrastructure. Our cloud leaves the execution availability path — customer executions continue on cached, signed, last-known-good artifacts through any Acme outage, which converts our uptime from a customer risk into a non-event. Connector velocity is preserved because connectors still ship centrally as signed bundles. No integrations competitor sells a managed hybrid today; this is an open category position.

**What it costs.** A materially larger product surface, owned from Acme's side: the edge API becomes a stable, versioned contract; OAuth and token lifecycle must run locally, including a customer-owned redirect domain; the SDK gains a deployment base URL; and the first packaging will reuse existing services in an execution-only profile, which risks drifting into a mini self-host unless a slimmer gateway extraction is treated as a design commitment. Debugging changes shape: our dashboard sees health and the allowlist, and anything deeper is a consent-based, session-scoped capture the customer approves (the Kong model). Upgrades need a deliberate mechanism — self-updating components with version pinning and a staleness policy (the GitHub runner model), or vendor-orchestrated desired state through the local agent (the Qdrant model). Webhook relays and cloud-dashboard test executions become labeled exceptions that visibly break the strict badge.

**What the customer takes on.** Running the plane (Helm on their Kubernetes), the substrate underneath it, TLS and DNS for the local endpoint, and the OAuth redirect domain. In exchange they get the boundary their downstream customers can verify, payload logs under their own retention, and execution that keeps working when Acme is down.

> Why it works: "never …" and "only …" statements are what security readers look for; every cost names the mechanism that mitigates it (Kong, GitHub runner, Qdrant) so the reader knows it is solvable, not hand-waved.

## 6. How the options relate, and the design choices inside both

**Composability.** A is a strict subset of B. The routed executor that A ships is the execution core of B's Gateway, and B subsumes A as its managed-relay compatibility mode for clients that cannot reach a private endpoint (including cloud-dashboard test runs). Building A first strands no work; building B first still wants A's relay as a mode. The real fork is which trust boundary Acme markets and which product surface it commits to first — which is why the questions below matter more than the label.

**Data contract.** Both options need a typed egress allowlist enforced at the boundary — not log scrubbing — plus a customer-inspectable egress ledger. Open: whether tool slug is acceptable billing metadata, and what error detail crosses (stable codes only, never provider error bodies or URLs).

**Credential semantics.** Sealed client-side intake everywhere; strict mode fails closed on credential-proxy or KMS failure with no platform fallback and no dual writes; a separate availability-first mode may keep fallback for customers who want it — but the two must be explicit, labeled modes, never a silent degradation.

**Upgrades.** Customer-pull (turbopuffer), self-update with pinning and a staleness policy (GitHub), or vendor-orchestrated desired state via the local agent (Qdrant). This can be a per-customer choice; the default determines how much of today's version-divergence pain returns.

**Debugging.** Choose the default telemetry depth (health and allowlist only, versus Dagster-style logs-by-default with an off switch) and build the consent-based capture workflow: session-scoped, locally redacted, encrypted to a time-limited key, audited on both sides.

**Triggers.** Polling runs locally in both options. Webhooks either terminate on a customer-owned ingress or use an Acme relay as a labeled, per-connector exception. Publish hybrid readiness connector by connector (execution, OAuth, polling, webhook) as an automated release gate, extending the per-tool gating the credential proxy already established.

**Vendor reach.** Strict outbound-only versus a managed mode with scoped, approval-gated, time-bound access (the ClickHouse pattern) for customers who want zero upgrade burden and accept the reach. Offering both widens the market without weakening the strict tier.

**Large payloads and response paths.** The shared-S3 handoff used today does not cross the boundary; choose inline size caps, presigned-URL handshakes, or streaming. In A this interacts with sealed-mode key distribution; in B with local endpoint capacity.

**Connector IP.** Signed, compiled bundles plus contract terms in both options; locally executed code cannot be perfectly secret, so protect the development and distribution pipeline and accept the residual, as every BYOC vendor does.

> Why it works: the design choices are the decisions the team actually has to make; each names the industry precedent it borrows, so the reader can go verify.

## 7. Side-by-side

| Dimension | Credential proxy only | A. Cloud-orchestrated executor | B. Direct-traffic plane | Full self-host |
|---|---|---|---|---|
| Credential possession removed | Yes | Yes | Yes | Yes |
| Payload possession removed | No | Yes | Yes | Yes |
| Payload transit removed | No | No (ciphertext relay) | Yes | Yes |
| Answers Customer A's review | No — refused | Uncertain; partner-dependent | Yes | Yes |
| SDK / endpoint change | None | None | Base URL per deployment | Full replatform |
| Customer footprint | One proxy | Executor + credential-proxy container | Execution plane (Helm) | Entire platform |
| Acme in execution availability path | Yes | Yes | No | No |
| Fleet control and debugging | Full (today's) | Near-full (orchestration traces) | Telemetry + consent capture | Little to none |
| New engineering surface | Finish GA gaps | Routing, transport, sealed mode | Edge API, local auth/OAuth, fleet agent, artifacts | Multi-instance control plane |
| Connector velocity | Unchanged | Unchanged (bundles per call) | Preserved via signed bundles | Customer-paced |

Open design questions that shape either build: worker and tenant isolation inside the executor; key distribution and rotation for sealed responses; the webhook end-state; metering and abuse controls from metadata alone; edge-API versioning discipline; and whether the executor and credential proxy ship as one unit or remain separable for key-custody-only buyers.

> Why it works: the table's rows are the things reviewers argue about, and the doc ends with questions rather than a plan because the team, not the doc, owns execution.
