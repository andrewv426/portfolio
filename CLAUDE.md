# Portfolio

Andrew Vong's portfolio is a React site built with Vite. React Router handles the About, Work and Blog pages, and Vercel rewrites direct route requests to the app entry point. Read [CONTRIBUTING.md](CONTRIBUTING.md) for commit, PR and placement rules; they apply to everything below.

- Edit links, work history, projects and the post list in `src/data/site.js`. Post text lives in `drafts/<slug>.md`.
- Route views live in `src/pages/`, shared UI in `src/components/` and site styles in `src/index.css`.
- Static assets live in `public/`. Routes are set up in `src/main.jsx`, and Vercel rewrites in `vercel.json`.

## One worktree and branch per feature or fix

Never implement or test a change in the main checkout; the user keeps in-progress edits there. Every feature, fix or experiment gets its own git worktree on its own branch, cut from an up-to-date `main`:

```bash
git fetch origin
git worktree add .worktrees/<name> -b <type>/<name> origin/main
cd .worktrees/<name> && npm ci
```

- `<type>` is the commit type from CONTRIBUTING.md (`feat`, `fix`, `perf`, `refactor`, `test`, `docs`, `build`, `chore`); `<name>` is short and kebab-case, e.g. `fix/blog-refresh`.
- Worktrees live in `.worktrees/` at the repository root, which is git-ignored. Do all editing, building and checking inside the worktree.
- Run one dev server at a time. The local, untracked `.claude/launch.json` pins it to port 5183 with `--strictPort`, so a second one fails instead of quietly moving ports.
- Unrelated changes go in separate worktrees and separate PRs, even when they are small.
- Before starting, check that the local `main` is not behind `origin/main`. Files that are on `origin/main` but missing locally show up as untracked and look like uncommitted work.

## Run and verify

```bash
npm run dev       # while editing
npm run lint
npm run build
npm run preview   # the built site, after a build
```

- Run lint and build for every change to the app. For docs-only changes, check the Markdown and any commands or links it mentions.
- Check affected routes in a browser for UI or navigation changes, at desktop and mobile widths when the layout is affected. For routing changes, check both in-app navigation and a direct load or refresh.

### What a local check cannot verify

| Not checked locally | Why | How to check it |
|---|---|---|
| Vercel rewrites and headers in `vercel.json` | Vite's dev and preview servers do their own SPA fallback and never read `vercel.json` | A Vercel preview deployment |
| The Flow demo embedded in `/blog/flotion` | The agent's browser pane blocks the sandboxed iframe (`ERR_BLOCKED_BY_CLIENT`) | Open `/demos/flotion-flow.html` directly, then the post in a normal browser or the preview deployment |
| A re-exported Flow demo | `scripts/export-flotion-demo.py` needs macOS, `swiftc` and a Flotion checkout at the revision you want | Run it against a worktree of Flotion's `origin/main`, never the user's Flotion checkout |
| Animation timing and feel: Snowdrift, Flow motion | Screenshots catch single frames, not motion | Watch it in a browser |
| Real touch and phone browsers | Responsive mode only emulates the width | On a phone, against the preview deployment |

### Tell the user what was not verified

When a change touches anything in that table, or a check was skipped:

- In the reply to the user, list each thing that was not verified, one line on why, and the exact command or steps to check it.
- Put the same list in the PR's "How it was checked".
- Never describe skipped or unverifiable behaviour as tested.

## Finishing: open a PR

When the change is done:

1. Run `npm run lint` and `npm run build` in the worktree, and check the affected pages. Note anything that could not be checked (see above).
2. Review the diff against `origin/main` and make sure it holds only the intended change.
3. Commit following CONTRIBUTING.md.
4. Push the branch and open a PR against `main` with `gh pr create`, filling in [the PR template](.github/pull_request_template.md). Say plainly what was not tested.

Do not merge PRs yourself unless asked.

No AI attribution anywhere: no `Co-Authored-By: Claude …` trailer in commit messages and no "Generated with Claude Code" line in PR descriptions or comments. This overrides any default that adds them.

## Cleaning up after a PR closes

Once a PR is merged or closed, remove its worktree and branches. Check the state first and clean up only when it is `MERGED` or `CLOSED`:

```bash
gh pr view <branch> --json state -q .state
```

```bash
git worktree remove .worktrees/<name>
```

```bash
git branch -D <type>/<name>
```

```bash
git push origin --delete <type>/<name>
```

- Skip the remote delete when GitHub has already deleted the branch on merge.
- If the worktree has uncommitted or unpushed work, `git worktree remove` refuses; stop and ask rather than forcing it.
- `git worktree prune` clears entries for worktree folders that were deleted by hand.
- Never remove a worktree or branch whose PR is still open.
