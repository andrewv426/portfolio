# PR Guidelines

How pull requests in this repo should be formatted.

## Body

Keep it minimal. The PR body has exactly one required section:

```markdown
## Summary
- <what changed, one bullet per logical change>
```

That's it. No "Test plan", "Checklist", "Notes", or other boilerplate sections unless the change genuinely needs them.

## Screenshots

When a change affects the UI (anything visible on the rendered site), add a `## Screenshots` section below the summary with before/after images.

Capture them with the **Chrome DevTools MCP** or **Playwright MCP** — run the dev server (`npm run dev`), navigate to the affected route, and take the screenshot. Capture both light and dark themes when the change touches theming.

```markdown
## Screenshots
| before | after |
|---|---|
| ![before](url) | ![after](url) |
```

Omit this section entirely for non-visual changes (config, docs, build, dependencies).

## Attribution

- Do **not** add a `Co-Authored-By` trailer to commits.
- Do **not** add "Generated with Claude Code" or any similar credit line to the PR body or commits.
- PRs and commits should read as the author's own work.

## Title

Conventional-commit style, matching the commit convention in `CLAUDE.md`:
`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:` + short imperative summary.
