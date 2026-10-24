# Product skills

Agent skills for product work: design docs, launch posts, customer notices, one-to-one email, discoverable code, and behavioral tests. Each skill is a folder with a `SKILL.md` that tells the agent when to use the skill and how to do the work well. Claude Code and Codex both load skills in this format.

## Skills

| Skill | What it does |
|---|---|
| [technical-writer](technical-writer/SKILL.md) | Writes design docs, Amazon-style decision narratives, architecture-options docs, and case studies, with rendered diagrams and Word output. |
| [launch-blog](launch-blog/SKILL.md) | Writes short feature launch posts with a concrete problem, a clear announcement, a hands-on walkthrough, and evidence in screenshots or GIFs. |
| [customer-notification](customer-notification/SKILL.md) | Writes customer emails about pricing changes, plan limits, billing, plan retirements, deprecations, and incidents to the standard of AWS service notifications. |
| [email-writer](email-writer/SKILL.md) | Drafts short cold emails based on Lavender's reply-rate research, plus replies, declines, and referrals in your own voice. It never sends a message you haven't approved. |
| [behavioral-tests](behavioral-tests/SKILL.md) | Writes and reviews tests that prove observable behavior instead of implementation details, using real databases and services in place of mocks. |
| [write-discoverable-code](write-discoverable-code/SKILL.md) | Sets naming and comment rules so agents and people can find code with plain-text search. |

## Install

Clone the repository, then link the skills into your agent's skills folder. Links keep every agent on the same copy, so a `git pull` updates all of them.

```bash
git clone https://github.com/shubham22/product-skills.git ~/product-skills
```

Claude Code reads personal skills from `~/.claude/skills`.

```bash
mkdir -p ~/.claude/skills && for s in ~/product-skills/*/; do ln -s "${s%/}" ~/.claude/skills/; done
```

Codex reads personal skills from `~/.agents/skills`.

```bash
mkdir -p ~/.agents/skills && for s in ~/product-skills/*/; do ln -s "${s%/}" ~/.agents/skills/; done
```

To install one skill, link only its folder, such as `ln -s ~/product-skills/email-writer ~/.claude/skills/email-writer`. To share a skill with everyone working in one repository, copy its folder into that repository's `.claude/skills` or `.agents/skills` folder.

## Use

The agent picks a skill on its own when your request matches the skill's description. "Reply to this recruiter and say no" matches email-writer, and "write up the two options for the team" matches technical-writer. To be sure a skill loads, name it in your request.

## Requirements

Most skills need only the agent. technical-writer also uses Node.js and `npx` to render Mermaid diagrams, the `docx` npm package to build Word files, and Google Chrome to preview Word files on a machine without Word.

## Keep team-specific notes private

The skills here stay generic so anyone can use them. To add your team's details, such as internal service names, fixture paths, or wiki links, put them in a `references/private/` folder inside the skill. Git ignores every `private/` folder, so these notes stay on your machine. behavioral-tests reads its `references/private/` folder first when the folder exists.

## Credits

- The cold-email rules in email-writer adapt [Lavender](https://www.lavender.ai)'s research. The reply-rate percentages are Lavender's findings.
- launch-blog takes its structure from the [AWS News Blog](https://aws.amazon.com/blogs/aws/) and [Kiro's launch post](https://kiro.dev/blog/introducing-kiro/).
- technical-writer follows Amazon's narrative-memo style, and customer-notification follows the style of AWS service notifications.
