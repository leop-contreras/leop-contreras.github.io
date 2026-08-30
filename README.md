# leop-contreras.github.io

Leonardo Contreras' personal portfolio site — a React 19 + TypeScript
single-page app built with Vite 7 and Tailwind CSS 4, served as a GitHub
Pages user site at <https://leop-contreras.github.io/>.

Two routes: `/` (bio, projects, skills) and `/cv` (full-page CV image).
No backend, no data fetching — all content is hard-coded in typed arrays
inside the page components under `src/pages/`.

## Local development

```bash
npm install
npm run dev       # vite dev server
npm run build     # tsc -b && vite build  ->  dist/
npm run lint      # eslint .
npm run preview   # serve the production build locally
```

Always run `npm run build` after editing components: it typechecks and
bundles in one step, and TypeScript runs with `noUnusedLocals`, so a
leftover import is a hard build failure rather than a warning.

## How deployment works

There are **two branches with unrelated histories**:

| Branch | Contains | Role |
| --- | --- | --- |
| `main` | source (`src/`, `public/`, config) | what you edit |
| `gh-pages` | the contents of `dist/` **at the repo root** | what GitHub Pages actually serves |

GitHub Pages is configured to serve the root of `gh-pages`. Nothing is
automated — there is no CI workflow, so publishing is a manual step. Pushing
to `main` alone changes nothing on the live site.

Because `gh-pages` holds build output at its root (`index.html`, `assets/`,
`projects/`, `cv.png`, …), you cannot simply merge `main` into it.

## Deploying

Run this from a clean `main` (commit or stash your work first). It builds,
then publishes `dist/` to `gh-pages` through a throwaway
[git worktree](https://git-scm.com/docs/git-worktree), so your main checkout
is never disturbed.

```bash
# 1. Build from the current source
npm run build

# 2. Check out gh-pages into a scratch directory
git fetch origin
git worktree add ../ghp-deploy origin/gh-pages --detach

# 3. Replace its contents with the fresh build
cd ../ghp-deploy
git rm -r --quiet .
cp -r ../leop-contreras.github.io/dist/. .

# 4. Commit and publish
git add -A
git commit -m "Deploy build"
git push origin HEAD:gh-pages

# 5. Clean up
cd ../leop-contreras.github.io
git worktree remove ../ghp-deploy
```

Step 3 deletes-then-copies on purpose: Vite content-hashes its filenames
(`assets/index-CjnEePkB.js`), so a plain copy would leave every previous
build's orphaned bundles behind forever.

The live site updates within a minute or two of the push. Check the
**Actions** tab on GitHub for the `pages build and deployment` run if it
seems slow.

### Deploy checklist

- [ ] `npm run lint` and `npm run build` both pass
- [ ] Source changes are committed and pushed to `main`
- [ ] New images live in `public/` (they get copied into `dist/` by the build)
- [ ] `dist/` looks right via `npm run preview` before publishing
- [ ] `git push origin HEAD:gh-pages` succeeded
- [ ] <https://leop-contreras.github.io/> loads, including `/cv`

## Gotchas

- **`dist/` is gitignored, but two files inside it are tracked on `main`**
  (`dist/index.html` and `dist/cv.png` were force-added long ago). A local
  build therefore shows `dist/index.html` as modified in `git status` even
  when you only touched `src/`. That diff is a build artifact — keep it out
  of feature commits.
- **Assets are referenced without a leading slash** from components
  (`projects/era.png`, `cv.png`, not `/cv.png`) so they resolve correctly
  under the Pages base URL.
- **Client-side routing has no server fallback (known issue).** `/cv` is a
  `BrowserRouter` route, not a real file, and `gh-pages` contains no
  `404.html`. It works in `npm run dev` and when navigated to from the
  landing page, but loading <https://leop-contreras.github.io/cv> directly
  returns a 404. The usual fix is to publish a `404.html` that is a copy of
  `index.html`; until that is done, verify any new route on the live site
  after deploying, not just locally.
- **Tailwind 4 is CSS-first configured.** There is no `tailwind.config.js`;
  the single entry point is `@import "tailwindcss"` in `src/index.css`.

## Rolling back

`gh-pages` keeps every deploy as a commit, so reverting the live site is a
push away:

```bash
git worktree add ../ghp-deploy origin/gh-pages --detach
cd ../ghp-deploy
git reset --hard <good-commit>
git push --force origin HEAD:gh-pages
```
