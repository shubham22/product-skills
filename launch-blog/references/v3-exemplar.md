# User-approved launch blog pattern

The user preferred the third iteration of a launch blog for an access-control feature. Company and product names are placeholders. The following excerpts are a style reference, not current API or product documentation. Verify any product facts anew when writing a new post.

## Opening from v3

> You connect an agent to Gmail, ask for a morning briefing, and get a useful summary. But should that agent also be able to send messages or delete email? It needs access to your inbox, not every action Gmail supports.
>
> Those choices become harder to manage as you add agents. Repeating access rules in application code creates more places to review and update. A prompt can tell an agent not to send email, but the system executing the call needs to enforce that rule.
>
> Today, we’re introducing Access Policies, reusable app and action permissions in Acme. Define a policy in the dashboard, then pass its ID when you start agent runs in the same project. Acme enforces the policy on every action in those runs, so you can manage access without repeating its rules in each application.

The opening makes the access problem tangible before naming the feature. It explains the gap without unsupported statistics, customer names, or claims that the entire industry faces the same problem. The announcement identifies the feature, its project scope, its use, and its value.

## Walkthrough voice

> Let’s build a daily briefing assistant that reads email and Hacker News. We open Access Policies in our project, choose New policy, and name it “daily briefing assistant.” We select Gmail and Hacker News, then set the default access to Read only.

Use “we” to bring the reader through the example. The app choices serve the use case: Gmail for an inbox briefing, Hacker News for news. A research-agent label with unexplained inbox access weakened earlier drafts.

The v3 walkthrough then shows a saved policy and one short request starting an agent run with its policy ID. It explains project scope and the need for connected accounts without expanding into an API reference.

## Evidence rather than a promise

> We ask the assistant, “Summarize my latest email and the top Hacker News story.” It reads the email, retrieves the leading story, and produces a briefing. The calls succeed under the policy.
>
> Next, we ask it to send the briefing to a test address. The agent tries to send it through the same run. Acme rejects the call with HTTP 400 because Gmail is read-only. No email is sent.

The recording supports these statements. Do not copy the status code, error slug, behavior, or claim of a successful test into another post without evidence. An assistant’s verbal refusal alone is not proof of server-side enforcement.

## Visual treatment in v3

- A short GIF uses cropped recording excerpts to show app selection, access settings, and the saved policy. Small chapter labels explain the sequence.
- A saved-policy screenshot makes the resulting policy and its ID visible.
- A second GIF compares genuine allowed and rejected API response excerpts, with labels and timed emphasis. It is labeled as excerpts, not presented as an uninterrupted recording.
- The first GIF frames remain informative when a document viewer does not animate them. Standalone GIF files accompany the document for publishing.

The approved draft was about 500 prose words and three Word pages with code and visuals. That is a calibration example, not a universal page limit.

## Preferences learned from revisions

Prefer a concrete opening to “Organizations building AI agents need…”. Keep the announcement after the problem. Use “we” rather than “I” in a team-authored walkthrough. Keep active sentences and avoid overexplaining. Add a real configuration-screen view rather than only terminal output. Use concise captions and visuals that establish the result.

## Public style references

- [Introducing Kiro](https://kiro.dev/blog/introducing-kiro/) — opens with a recognizable developer experience, explains the gap, then introduces the product and a practical example. It uses both “I” and “we”; the preference for consistent “we” is this user’s editorial choice.
- [Introducing Amazon Bedrock AgentCore](https://aws.amazon.com/blogs/aws/introducing-amazon-bedrock-agentcore-securely-deploy-and-operate-ai-agents-at-any-scale/) — moves from developer context and production challenges to the announcement and a hands-on walkthrough.
- [Introducing queryable object metadata for Amazon S3 buckets](https://aws.amazon.com/blogs/aws/introducing-queryable-object-metadata-for-amazon-s3-buckets-preview/) — explains the need and current burden before introducing the capability, followed by commands and results.

Use these sources as inspiration for structure. Do not borrow their wording, claims, availability, pricing, or promotional adjectives.
