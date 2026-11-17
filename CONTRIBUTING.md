# Contributing

## Before you commit

```bash
npm run lint      # ESLint over the whole repo
npm run build     # Vite production build into dist/
```

Both must pass for any change to the app. For docs-only changes, check that the Markdown renders and that the commands and links it mentions still work.

## Commits

```
type(scope): summary in the imperative, 72 characters at most
```

| Type | Use it for |
|---|---|
| `feat` | Something a visitor can now see or do |
| `fix` | A fix for behaviour that was wrong |
| `perf` | Faster or lighter with the same behaviour |
| `refactor` | Restructuring with no behaviour change |
| `test` | Tests or checks only |
| `docs` | Documentation, templates and post drafts that are not yet linked from the site |
| `build` | Vite, ESLint, dependencies, Vercel config, scripts |
| `chore` | Anything else that does not touch the shipped site |

Scopes are optional: `home`, `work`, `blog`, `styles`, `deploy`.

Keep one logical change per commit, and make each commit build on its own. The repository ships a commit message template; turn it on once per clone:

```bash
git config commit.template .gitmessage
```

## Pull requests

The title follows the commit format. The description is filled in from [the template](.github/pull_request_template.md):

- **What this changes** in plain language: what a visitor now sees or can do.
- **Why**, with the issue if there is one.
- **Changes**: a table of files, line counts and the reason each one changed.
- **Visuals** for anything visible: before and after screenshots, desktop and mobile when the layout is affected, or the Vercel preview link.
- **How it was checked**, including what was not checked.

## Where things go

| Change | Place | Check it at |
|---|---|---|
| Bio, links, work history, projects, hackathons, post list | `src/data/site.js` | `/` and `/work` |
| A post's text | `drafts/<slug>.md`, imported as `?raw` in `site.js` | `/blog/<slug>` |
| A page or route | `src/pages/`, registered in `src/main.jsx` | In-app navigation and a direct load |
| Shared UI | `src/components/` | Every page that uses it |
| Styles | `src/index.css` | Desktop and mobile widths |
| Static files, embedded demos | `public/` | The file's own URL and the page that embeds it |
| The Flotion Flow demo | Regenerate with `python3 scripts/export-flotion-demo.py /path/to/Flotion`; never hand-edit `public/demos/flotion-flow.html` | `/demos/flotion-flow.html` and `/blog/flotion` |
| Deploy routing and headers | `vercel.json` | A Vercel preview deployment |

Content belongs in `src/data/site.js` and `drafts/`, so pages and components stay free of copy.
