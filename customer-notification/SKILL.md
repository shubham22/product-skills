---
name: customer-notification
description: Write or rewrite customer notification emails to the AWS customer-communication standard. That covers pricing changes, plan limits and their enforcement, the start of billing, plan retirements and forced migrations, deprecations, end-of-life notices, outages and incidents, and policy, terms, or security changes. The standard means saying why this reader got the email, what changes and exactly when, what breaks, what to do, what happens if they do nothing, and giving one contact. Use this whenever someone shares a draft email, in-app notice, or announcement meant for existing customers, asks to bring a customer email "to AWS standard", wants a customer email shorter, clearer, or more professional, or needs one notice per customer segment, even if they never say "notification".
---

# Customer notification

A customer notification has one job: in a single read, each recipient learns whether it affects them, what will happen and when, and what to do about it. AWS service notifications set the bar. They are plain, specific, calm, and complete, and they never make the reader guess. Every rule below serves that job.

## Workflow

1. **Pin down the notice and its audience.** Work out who receives it (plan, segment, and the condition that put them there, such as "reached a limit"), what changes, the effective date and time, and what happens to a customer who does nothing.
   - If one draft serves two audiences through a conditional ("If your account is grandfathered..."), recommend one email per segment. Readers can't tell which branch they are in, and the doubt spreads to the rest of the email.
   - Say how to build the recipient list from the system of record, such as the account's plan field, not a proxy such as a billing price ID that other plans may share. Send it to people who can act on it, such as account admins, or tell everyone else whom to ask.
2. **Find the sources of truth, then verify every fact against them.** That means prices, limits, dates, plan names, links, and every product capability the email tells customers to use.
   - A notification is a commitment, and a wrong number becomes a support ticket or a refund.
   - **Public pages:** fetch the live pricing, terms, or status page, and quote it rather than memory.
   - **The product:** check the UI, or the code if you can read it, for every feature, page, button, or link the email mentions. Take the copy shown at the moment of action, such as a confirmation dialog, from the product.
   - **Decisions:** check the team's record of decisions (chat, docs, tickets) for anything not yet public, such as an enforcement date.
   - If the user keeps a facts file for their company or campaign (see `references/company-facts-template.md`), read it first and re-verify anything that looks stale.
   - If you cannot verify something, leave it out or mark it as an open item. Never fill the gap with a plausible guess.
3. **Write with the template below.**
4. **Cut to one screen.** That is about 150 to 200 words plus any table. Move explanations a link can carry onto the linked page. Keep the impact sentence, the one that says what breaks, because that is the line that makes people act.
5. **Deliver** the email, a short list of what changed and why, and the open items to resolve before sending (see Output).

## Template

**Subject:** `<prefix>` `<what changes>` `<effective date>`

- Use "Action required:" when every recipient must act by a date to avoid an outcome.
- Use "Action may be required:" when only some recipients will need to act.
- Use no prefix for a purely informational notice.

```
Hello,

We are contacting you because <the specific reason this recipient got it: account or organization name, plan, and the condition that put them in this segment>.

Starting <Month D, YYYY at HH:MM UTC>, <who> will <what changes, in concrete terms: what gets blocked, billed, removed, or moved, and for how long>. <Impact: what breaks or what the customer will see.> <Reassurance only if it is true and specific.>

<Optional: a table personalized to the recipient, such as usage against limits, with the date range and time zone in its label.>

<What to do: one primary action with an account-specific link, plus its cost and what happens at the moment they act. Add a second option only if it is real, such as staying on the free plan by staying within its limits.>

<What happens if they do nothing, unless the paragraphs above already make it obvious.>

<Exceptions, phrased as a test the reader can apply, if any.>

If you have questions, contact us at <one contact>.

Sincerely,
The <Company> Team
```

## Rules, and why they matter

- **Open with why this reader got the email.** "We are contacting you because..." lets each recipient decide in one sentence whether to keep reading. "Hi there" and "This is a reminder" give them nothing to decide with.
- **Give exact dates and times with a time zone.** Write "Starting March 1, 2027 at 00:00 UTC" and spell out the month, because readers outside the US read 3/1 as January 3. This overrides any numeric house date style for customer-facing email.
- **Name what happens, and who does it.** "We will block API calls beyond the Free plan's monthly limits" beats "Usage beyond an applicable allowance will be blocked". Use active voice with the company as the subject, then say what the customer will see, such as failing workflows or new charges.
- **Use one word per concept, everywhere.** Pick terms that match what actually happens, and keep them identical across the email, the rest of the set, the pricing page, and the UI.
  - A useful split is "limit" where usage stops and "included" where usage past the amount is billed.
  - Avoid soft words such as "allowance" that hide the consequence. Never alternate between two words for the same thing, because readers assume they mean different things.
- **Turn internal jargon into a test the reader can apply.** "Grandfathered", "current pricing", "applicable pricing", "legacy terms", and internal product or project names mean nothing to customers. Write "If your account was created before January 15, 2027, your earlier pricing applies through June 30, 2027."
- **Scope every promise.** "Charges will not be applied retroactively" must not contradict anything you already bill. Say exactly which usage the promise covers.
- **Never point customers at something that does not exist.** If the email tells them to use a feature, page, or button, confirm it exists in the product today. Pricing and marketing pages sometimes run ahead of the product, and a customer who can't find the promised control loses trust in the whole notice.
- **Send links to the exact place for this recipient.** Use account-specific URLs built with merge fields. Avoid shortcut links that redirect based on the signed-in session, because they can drop a user who belongs to several accounts into the wrong one. Prefer one primary call to action.
- **Price the action.** When the action is an upgrade or a plan switch, say what it costs and what happens the moment they click: an immediate charge, proration, a new billing cycle, or no way back. Take this from the product's own confirmation copy.
- **Disclose what gets worse, not only what gets better.** If the new plan includes less than the old one, or costs more for heavy users, say so with the numbers. Give the break-even point when there is one, such as "the new plan costs more above about 500,000 calls a month", and a per-account estimate when you can compute it. Customers will find out from the first invoice anyway, and a notice that hid it becomes the thing they quote back to you.
- **Check who can't take the action.** Some recipients will be blocked by permissions, a missing billing setup, a negotiated contract, or a discount the action would drop. Give them a path in the email, or send them a separate one.
- **Always say what happens if they do nothing.** If that decision isn't made yet, keep a visible placeholder in the email, list it as an open item, and don't send until it is filled.
- **Cut vague selling.** "Access new features available on Pro" reads as a sales push. Name a concrete feature or drop the line.
- **Keep a set consistent.** Emails for different segments of the same change should share the subject pattern, structure, contact, and sign-off, and differ only where the segment differs. Customers compare notes, and inconsistencies become support tickets.
- **Write plainly.** Use full sentences and active voice. Use numerals and %. Avoid semicolons, em dashes, exclamation marks, and marketing adjectives.
- **Leave merge fields exactly as the sender wrote them,** including their brace syntax. When a link or sentence needs a new field, name it and add it to the open items.

## Output

Give the user three things, in this order, and keep commentary out of the email itself.

1. **The email**, with subject and body, ready to paste.
2. **What changed from your draft:** 3 to 6 bullets, each naming a change and the reason for it.
3. **Open items before sending:** a numbered list of facts to confirm, missing merge fields, product or pricing-page fixes, and segmentation decisions. Put what blocks sending first, keep each item to two or three sentences, and leave out anything that doesn't need a decision.

When the user asks to keep a set of notifications in a shared document (Notion, Google Docs, a wiki), use this layout:

- One section per email, each with its audience, merge fields, subject, and body.
- After the emails, a shared section for links and wording rules.
- One combined open-items checklist at the end.

Re-read the document before editing it, because others may have changed it.

## References

- `references/examples.md` has four worked pairs for a fictional company: the original draft, the rewrite, and the reasons. Read it when a new draft resembles one of these cases: a free plan that reached its limits, a free plan close to its limits, a paid plan where usage billing starts, and a retired plan that must switch.
- `references/company-facts-template.md` is a template for the facts a team reuses across notifications: sources of truth, plan names, link patterns, contact, sign-off, wording rules, and known traps. Offer to fill it in when the user will send more than one notification, and save it where they choose.
