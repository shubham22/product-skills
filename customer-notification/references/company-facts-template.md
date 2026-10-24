# Company facts for customer notifications

Copy this template once per company or campaign, fill it in, and save it where the team keeps working docs. It holds the facts that every notification in a set reuses, so each email starts from the same verified ground. Date every fact you record, and re-verify anything older than the current campaign before quoting it.

## Sources of truth

| What | Where | How to check |
|---|---|---|
| Plans, prices, limits | <public pricing page URL> | <fetch the live page, ask for exact rows> |
| Terms, grandfathering, contract rules | <terms page or internal doc> | |
| Product pages and the copy at the moment of action | <app URL, or repository and path> | <UI walkthrough, or read-only code search> |
| Decisions not yet public | <chat channels, decision docs, tickets> | |

## Plans

| Plan | Price | What stops or is billed at the limit | Notes (retired, grandfathered, switch rules) |
|---|---|---|---|
| | | | |

## Links

Record one account-specific pattern per destination. Note any shortcut link that redirects based on the session, so nobody uses it in an email.

| Purpose | URL pattern with merge fields |
|---|---|
| Upgrade or switch | |
| Usage | |
| Public pricing | |

## Conventions

- **Plan names:** <exact names, and names never to use>
- **Wording rules:** <for example, "limit" where usage stops, "included" where usage past the amount is billed>
- **Merge field syntax and prefix:** <for example, `{{{campaign_field}}}`>
- **Contact:** <one address for every email in the set, and whether anyone watches replies>
- **Sign-off:** <for example, "Sincerely, The <Company> Team">
- **Time zone for effective dates:** <for example, UTC>

## Known traps

Note every place where a public page, the product, and internal plans disagree. Examples include features a pricing page promises that the product lacks, two rates for the same thing, links that land on the wrong account, and outcomes not yet decided.

- <date>: <trap and what to do about it>

## Working documents

- <link to the doc that holds the current set of notifications>
