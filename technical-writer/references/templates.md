# Templates

## A. Decision narrative (recommend one path; ~6 pages)

```
Title
Status · date · evidence line
Decision: <two sentences: what we will build and what we will not>

1. Executive summary          (problem → why current design fails → what others do → decision → caveat)
2. The customer problem       (named evidence; what "the word" they use actually means; three business risks)
3. Current architecture       (Figure 1; concept-level path; what already exists that helps; what falls short)
4. What comparable products have done   (table with a "Lesson" column; 1 paragraph of synthesis)
5. Options                    (A/B/C…: 3–6 sentences each + conclusion; score table)
6. The preferred architecture (Figures; responsibilities on each side; the contract; operating model; failure behavior)
7. What this changes, and what it does not
8. Open questions
(9. Delivery stages / next steps — only if the audience asked for a plan)
```

## B. Options doc (inform; mark "(preferred)"; no page limit)

```
Title
Version · date · evidence line
Purpose: informs rather than decides; one option carries (preferred)

1. The requirement, and why the current architecture cannot meet it   (Figure 1)
2. How comparable products solve it
   2.x  <Vendor> — <one-line characterization>       (figure; Access; Upgrades; What it sees; Scale; Pros; Cons; Relevance)
   Briefly: other vendors that add signal            (bullets)
   Comparison matrix                                  (vendor × dimensions)
   What the evidence says about operating cost
3. Cross-cutting lessons for us                       (bullets, each with a bolded lead)
4. The bookend options, briefly
5. Option A — <name>          (figure; design choices inside A; gains; costs; when A is right)
6. Option B — <name> (preferred)   (same shape)
7. Option C — <name>          (same shape)
8. How the options relate, and the design choices inside them   (composability; bulleted choices)
9. Side-by-side               (dimensions × options)
10. Open questions and what to ask peer engineers
11. References                (grouped; label + visible URL)
```

## C. Case-study block (one per external vendor)

```
<Vendor> — <one-line characterization>
[figure: customer environment vs vendor cloud; edge labels state direction and what crosses]
Caption: the point of the figure.
Access. …
Upgrades and cadence. …
What the vendor sees. …            (say "enumerated" when the vendor publishes a list)
Scale signals. …                    (numbers, dates, team size, or "not published")
Pros. …   Cons. …   Relevance to us. …
```

## D. Comparison-matrix dimensions that worked

Data plane runs in · Vendor access into customer environment · Who upgrades; cadence ·
What the vendor sees · Scale signal — for vendor surveys.

Credential possession removed · Payload possession removed · Payload transit removed ·
Answers <strictest-customer>-class review · Vendor access · Who upgrades · SDK/endpoint change ·
Customer footprint · Vendor in execution availability path · Fleet control and debugging ·
New engineering surface · Connector velocity — for option side-by-sides.

## E. References section

Group by topic (reference architectures; peers; primitives; legal; precedents; internal
evidence). Each entry: descriptive label as a hyperlink, then the raw URL in small grey
text so the link survives printing and copy-paste.
