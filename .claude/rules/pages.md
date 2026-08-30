---
paths:
  - "src/pages/**"
---

# Page components

Each file here is one route or one section of the landing page. `Landing.tsx`
is the route component; `ProjectsSection.tsx` and `SkillsSection.tsx` are
sections it renders, both lazily via `React.lazy` + `Suspense`. Adding a new
landing section means adding a lazy import and a `<Suspense>` block in
`Landing.tsx`, not a new route.

## Content is a typed array at the top of the file

Every section declares its content as a `const` array of a locally-defined
type, directly above the component, and renders it with `.map()`. To change
what the site says, edit that array — do not thread content in as props or
move it to a data module.

- `ProjectsSection.tsx` — `projects: Project[]`. `status` is
  `"Deployed" | "InDev" | "Prototype"` and drives the status dot's color and
  label; an empty `link` renders the same badge without the anchor and
  hover behavior. `image` is a `public/`-relative path.
- `SkillsSection.tsx` — `skills: Skill[]`, split into three columns by
  `type` (`"backend" | "frontend" | "other"`) via `.filter()`. Blank lines
  group the array by type for readability; keep them.
- `Landing.tsx` — `highlightedSkills: Skill[]`, the three logos shown in the
  hero. These are a hand-picked subset and are **not** derived from
  `SkillsSection`'s array; when the featured stack changes, update both.

## Skill entries

`skillLevel` (`beginner` → `intermediate` → `advanced` → `expert`) selects a
FontAwesome thermometer icon and its color; `experience` renders as
`+Nyrs`. Both are claims about a real person — set them from what the user
tells you, never from inference about a technology's popularity.

`icon` is a component from `@icons-pack/react-simple-icons` and `iconColor`
is that brand's official hex, passed as an inline style rather than a
Tailwind class. Before naming an import, confirm the icon exists — the
package's export names are lowercase-after-prefix and not always guessable
(`SiNextdotjs`, `SiTraefikproxy`, `SiSharp` for C#). Check with:

```
ls node_modules/@icons-pack/react-simple-icons/icons | grep -i '^Si<name>'
```

Guessing a name produces a build error, and importing an icon you then
don't use produces one too (`noUnusedLocals`).

## Repeated markup

`SkillsSection.tsx` repeats its badge markup three times (once per column)
and each copy branches on `isLarge` for the hover-reveal vs. always-visible
layout. A styling change to one badge has to be made in all copies. If you
are asked to restructure this file, extracting one `<SkillRow>` component is
the obvious win — but do it as its own change, not as a silent side effect
of a content edit.
