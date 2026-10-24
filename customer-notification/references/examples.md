# Worked examples

These four emails belong to one campaign at a fictional API company, Acme. Acme starts enforcing its plan pricing on March 1, 2027. Each example shows the sender's original draft, the rewrite, and why it changed. Copy the reasoning, not the wording, because prices, dates, and links belong to Acme.

Acme's plans in these examples:

- **Free:** 50,000 API calls a month, up to 10,000 of them through Acme-hosted connectors. Usage stops at a limit, and the plan is never billed.
- **Pro:** $49 a month. It includes 50,000 API calls and a $49 monthly usage credit, then $0.0005 per call.
- **Starter (retired):** $49 a month for 150,000 API calls. It must switch to Pro before July 1, 2027.

## 1. Free plan, reached a limit

**Draft**

```
Hi there,

Your account, {{{account_name}}}, is on Free. Your February usage has reached at least one monthly allowance in our pricing. Here's your usage so far.

Usage from February 1, 2027 to Feb 20, 2027

API calls	Used	Monthly allowance
Total	{{{calls_total}}}	50,000
Of those, from hosted connectors	{{{calls_hosted}}}	10,000
Calls from hosted connectors are included in total calls.

From March 1, 2027, we'll enforce Free's monthly limits for accounts on the current pricing. Usage beyond an applicable allowance will be blocked, which can interrupt production workflows. Free will not automatically incur overage charges.

March limits apply to March usage. February overuse alone will not cause a block. If your account is grandfathered, its earlier terms remain protected through June 30, 2027.

Upgrade to Pro if you need usage beyond Free's limits. You can stay on Free within its allowances.
```

**Rewrite**

```
Subject: Action may be required: Acme Free plan limits take effect March 1, 2027

Hello,

We are contacting you because your account, {{{account_name}}}, is on the Acme Free plan and reached at least one of its monthly limits in February.

Starting March 1, 2027 at 00:00 UTC, Acme will block API calls beyond the Free plan's monthly limits until the limits reset on the first of the next month, or until you upgrade. Workflows that rely on those calls will fail while they are blocked. The Free plan never charges for usage beyond its limits, and Acme will not block any February usage.

Your usage, February 1 to 20, 2027 (UTC)
| API calls | Used | Monthly limit |
| All API calls | {{{calls_total}}} | 50,000 |
| Through Acme-hosted connectors | {{{calls_hosted}}} | 10,000 |
Calls through Acme-hosted connectors also count toward all API calls.

To keep your workflows running, upgrade to Pro at https://app.acme.example/{{{account_slug}}}/settings/billing. Pro costs $49 a month and includes a $49 monthly usage credit. To stay on Free, keep usage within its limits. You can track usage at https://app.acme.example/{{{account_slug}}}/settings/usage.

If you have questions, contact us at support@acme.example.

Sincerely,
The Acme Team
```

**Why it changed**

- The opening now says why this recipient got the email.
- "Allowance" and "limits" were used interchangeably, so one word, "limit", now covers both. "Limit" matches what happens when usage stops.
- "Usage beyond an applicable allowance will be blocked" became "Acme will block", plus what breaks and when the blocking ends.
- "Accounts on the current pricing" and the "if your account is grandfathered" sentence are gone. Grandfathered accounts get their own email.
- The call to action now goes to the account's own billing page and says what Pro costs.
- One open item stayed with the email: the account slug needs a new merge field for the links.

## 2. Free plan, close to a limit

**Draft:** the same as example 1, except "is approaching at least one monthly allowance".

**Rewrite:** the same as example 1, with three sentences changed so the pair reads as a set.

- **The opening** says "its February usage is close to at least one of its monthly limits".
- **The impact sentence** starts with "If your account reaches a limit,", because these recipients haven't reached one.
- **The call to action** starts with "If you expect to need more, upgrade to Pro at ...".
- **"Acme will not block any February usage" is cut,** because it doesn't apply to an account still under its limits.

**Why:** state the threshold as a number if the segment uses one. "Has used more than 80% of" beats "close to". A forecast line ("At your February pace, you would reach the limit around March 18") is worth adding when it's cheap to compute.

## 3. Paid plan, usage billing starts

**Draft**

```
Hi there,

Your account, {{{account_name}}}, is on Pro. Add-on usage is already billed. We haven't applied the other Pro usage charges so far.

From March 1, 2027, all usage will be billed according to the pricing applicable to your account, including its allowances and credits. Existing grandfathering and contract terms remain unchanged. Charges will not be applied retroactively.

You're already on Pro, so no plan change is needed. Review your Billing page before March 1 (View pricing).

Questions about what this means for your account? Reply to this email.

Thanks,
Team Acme
```

**Rewrite**

```
Subject: Acme will bill Pro usage beyond included amounts starting March 1, 2027

Hello,

We are contacting you because your account, {{{account_name}}}, is on the Acme Pro plan. Starting March 1, 2027 at 00:00 UTC, Acme will bill Pro usage beyond the amounts your plan includes each month. Until now, Acme has billed only add-on usage.

Your $49 monthly usage credit applies first. After the credit, API calls beyond 50,000 a month are billed at the rates on our pricing page. Acme will not charge for any of this usage from before March 1.

At your February usage, your March usage charges would be about {{{estimated_usage_charge}}} after the credit.

You don't need to change your plan. Before March 1, review your usage at https://app.acme.example/{{{account_slug}}}/settings/usage and your plan at https://app.acme.example/{{{account_slug}}}/settings/billing. Current rates are at https://acme.example/pricing.

If your account was created before January 15, 2027, your earlier pricing applies through June 30, 2027. If your account has a contract with Acme, its terms continue unchanged.

If you have questions, contact us at support@acme.example.

Sincerely,
The Acme Team
```

**Why it changed**

- The draft opened with internal billing state ("We haven't applied the other Pro usage charges"). The rewrite opens with the change and its date.
- "Pricing applicable to your account" now names what is billed, and that the credit applies first.
- "Not applied retroactively" is scoped to this usage, since add-on usage was already being billed.
- "Grandfathering" became a test the reader can apply: created before a date, or has a contract.
- An estimated charge per account is the number every recipient wants from a billing change, so it got its own line.
- The draft's pricing page promised usage alerts, but the product didn't have them yet. The rewrite leaves them out instead of sending customers looking for a control that isn't there.

## 4. Retired plan, must switch

**Draft**

```
Hi there,

Your account, {{{account_name}}}, is on Starter. Your current pricing is grandfathered through June 30, 2027.

This is a reminder to move to Pro before the end of June. We recommend moving sooner to access new features available on Pro.

Move to Pro in Billing · View pricing

Questions? Reply to this email.

Thanks,
Team Acme
```

**Rewrite**

```
Subject: Action required: Switch your Acme Starter plan to Pro before July 1, 2027

Hello,

We are contacting you because your account, {{{account_name}}}, is on the Acme Starter plan. Acme has retired Starter. Your Starter pricing continues through June 30, 2027, and Pro replaces it.

Pro costs the same $49 a month as Starter. Starter includes 150,000 API calls a month. Pro includes 50,000 API calls plus a $49 monthly usage credit, which covers about 98,000 more calls at the standard rate of $0.0005 each.

An account admin can switch at https://app.acme.example/{{{account_slug}}}/settings/billing by selecting Switch to Pro. Pro starts that day on a new monthly billing cycle. Acme charges $49 right away, minus a credit for the unused part of your Starter month. Because Starter is retired, you can't switch back.

[To confirm: what happens on July 1, 2027 to accounts that haven't switched.]

If you have questions, contact us at support@acme.example.

Sincerely,
The Acme Team
```

**Why it changed**

- "Grandfathered" became plain language: Starter is retired, and the pricing continues until a stated date.
- The vague "access new features" line is gone, because no Pro-only feature could be named.
- Customers will notice that Pro includes fewer calls than Starter, so the rewrite spells out the 150,000 against 50,000 comparison and how much of the gap the credit covers.
- The switch mechanics come from the product's own confirmation dialog: the immediate charge, the credit for unused time, the new cycle, no way back, and admins only.
- The do-nothing outcome is a visible placeholder and an open item. The email can't go out until someone decides it.
