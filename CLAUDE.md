# CLAUDE.md

Guidance for working in this repo. Read this first — it captures the
architecture and the non-obvious decisions so you don't have to re-derive
them each session.

## What this is

Leonardo Contreras' personal portfolio site, served as a GitHub Pages user
site at <https://leop-contreras.github.io/>. It is a single-page React app
with two routes: `/` (landing — bio, projects, skills) and `/cv` (a full-page
image of the CV). Audience is recruiters and collaborators, so the landing
copy is a public professional profile: keep claims about experience,
employers and skill levels accurate, and change them only when the user
supplies the new facts.

The site has no backend, no data fetching and no build-time content
pipeline. All page content is hard-coded in typed arrays inside the page
components.

## Tech stack

- React 19 + TypeScript 5.9, bundled by Vite 7
- `react-router-dom` 7 (`BrowserRouter`, routes declared in `src/App.tsx`)
- Tailwind CSS 4 via the `@tailwindcss/vite` plugin — **CSS-first config**:
  there is no `tailwind.config.js`; the only entry point is
  `@import "tailwindcss"` in `src/index.css`
- Icons from two packages: `@icons-pack/react-simple-icons` (brand/tech
  logos) and `@fortawesome/react-fontawesome` (UI glyphs)
- ESLint 9 flat config in `eslint.config.js`

## Running it

```
npm run dev       # vite dev server
npm run build     # tsc -b && vite build  -> dist/
npm run lint      # eslint .
npm run preview   # serve the production build locally
```

Always run `npm run build` after editing components — it typechecks and
bundles in one step, and TypeScript is configured with `noUnusedLocals`, so
a leftover import is a hard build failure, not a warning.

### Deploying

The `gh-pages` branch holds the contents of `dist/` at its root, and that is
what GitHub Pages serves. There is no CI workflow — publishing is a manual
step run by the repo owner. Do not push to `gh-pages` unless explicitly
asked.

Gotcha: `dist/` is listed in `.gitignore`, but `dist/index.html` and
`dist/cv.png` were force-added and are tracked on `main`. A local
`npm run build` therefore shows `dist/index.html` as modified in
`git status` even when you only touched `src/`. That diff is a build
artifact — leave it out of feature commits unless the user is deploying.

## Conventions

- Page content lives in a typed `const` array at the top of the component
  file that renders it, not in a separate data module. See the
  `src/pages` rule for the shape these arrays follow.
- Files in `public/` are referenced by path without a leading slash from
  components (`projects/era.png`, `cv.png`) so they resolve under the Pages
  base URL.
- Styling is Tailwind utility classes inline; `src/App.css` and
  `src/index.css` hold only the font import and global body styles.

## Where knowledge goes (filing policy)

New knowledge learned while working here gets filed by tier — never
appended to this file by default:

- **Applies to every session** (commands, invariants, stack): add it
  here, keeping this file under 200 lines. If a section outgrows the
  budget, move the detail to a rule and leave a one-line pointer.
- **Specific to one subsystem, directory, or language**: add it to a
  rule in `.claude/rules/<subsystem>.md` with `paths:` frontmatter
  scoped to the files it's about. A rule without `paths:` loads every
  session and belongs here instead.
- **Only sometimes relevant** (gotchas, post-mortems, project history,
  workflows): add it to a skill at `.claude/skills/<name>/SKILL.md`
  whose `description:` names the situations it should load in — a
  trigger condition, not a table of contents.
- Keep literal `@` tokens (`@scope/pkg`, `@domain.com`) inside
  backticks — a bare one is parsed as an import. Use zero `@path`
  imports: they load at launch and save no context.
