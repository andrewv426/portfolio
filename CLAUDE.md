# Portfolio

Andrew Vong's portfolio is a React site built with Vite. React Router handles the About, Work, and Blog pages. Vercel rewrites direct route requests to the app entry point.

- Edit links, work history, projects, and posts in `src/data/site.js`.
- Route views live in `src/pages/`, shared UI in `src/components/`, and site styles in `src/index.css`.
- Static assets live in `public/`. Route setup lives in `src/main.jsx`, and Vercel rewrites live in `vercel.json`.

## One branch and worktree per change

Keep unrelated changes in separate branches and pull requests. Use an existing isolated worktree if it is suitable and contains no unrelated changes. Otherwise, create one from the latest remote `main`:

```sh
git fetch origin
git worktree add -b codex/<name> ../portfolio-<name> origin/main
cd ../portfolio-<name>
npm ci
```

Use a short, descriptive name for the branch. Preserve any in-progress edits in the user's checkout.

## Run and verify

```sh
npm run dev
npm run lint
npm run build
npm run preview
```

- Use `npm run dev` while editing. Use `npm run preview` after building when you need to check the built site locally.
- Run lint and build for changes to the app. For docs-only changes, check the Markdown and any commands or links it references.
- Check affected routes in a browser for UI or navigation changes. Verify desktop and mobile layouts when relevant. For routing changes, check both in-app navigation and a direct visit or refresh.
- Report which checks passed and any relevant checks you could not run.

## Open a pull request

1. Review the diff against `origin/main` and verify it contains only the intended change.
2. Use a short, descriptive commit and PR title, such as `docs: update the PR template` or `fix(blog): keep links working after refresh`.
3. Push the feature branch and open a PR against `main`. Fill in [the PR template](.github/pull_request_template.md) with the actual behavior and checks. Include screenshots or a preview link for visible changes when available.

Leave merging to the user unless they ask you to merge.

## After a pull request closes

Check the PR state with `gh pr view <number> --json state -q .state` or on GitHub. Once it is merged or closed, clean up the feature worktree if it has no uncommitted or unpushed work. Use `git worktree remove <path>` and delete a merged local branch with `git branch -d <branch>`. Preserve any remaining work if Git refuses cleanup.
