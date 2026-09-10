# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing site for Nexora (AI automation / IT solutions), deployed to GitHub Pages from
`https://github.com/Brianasingwire/nexora.github.io`. React 18 + Vite + Tailwind CSS v4.

## Commands

```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

There is **no test suite and no linter configured**. Don't invent commands for them — verify changes with
`npm run dev` and a browser.

Local Node is v20.11, below Vite 7's floor (20.19+), so Vite is pinned to v6. Bumping to Vite 7 requires
upgrading Node first.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds and publishes `dist/` to Pages. This depends on the
repo's **Settings → Pages → Source** being set to "GitHub Actions"; if the site goes stale after a push,
check that setting before debugging the build.

This is a *project* site, not a user site (the owner is `Brianasingwire`, so a user site would need a repo
named `brianasingwire.github.io`). It is therefore served from `/nexora.github.io/`, which is why
`vite.config.js` sets `base`. Moving to a custom domain means changing `base` to `'/'`.

## Architecture

**This is a multi-page app, not an SPA — there is no router.** Each page is a separate HTML entry
declared in `vite.config.js` under `build.rollupOptions.input`, and Vite emits a separate bundle per
page sharing a common vendor chunk:

| Entry | Mounts | URL |
|---|---|---|
| `index.html` | `src/main.jsx` → `App.jsx` | `/` |
| `services/index.html` | `src/services-main.jsx` → `Page` + `Services` | `/services/` |
| `work/index.html` | `src/work-main.jsx` → `Page` + `Work` | `/work/` |
| `about/index.html` | `src/about-main.jsx` → `Page` + `About` | `/about/` |
| `contact/index.html` | `src/contact-main.jsx` → `Page` + `Contact` | `/contact/` |

That choice is deliberate: GitHub Pages serves static files, so real pages give working deep links and
refreshes with no 404 fallback shim, and the contact page doesn't ship the home page's code. Adding a page
means a new HTML shell, an `src/<name>-main.jsx` entry, and a line in `rollupOptions.input` — not a
route table. Every page except home wraps its content in `src/Page.jsx` (nav + main + footer + theme);
home composes its own sections because it has many.

Each HTML shell is thin: meta tags, Google Fonts, the pre-paint theme script, `#root`, and the module
entry. Page components live in `src/`, section components in `src/components/`. Sections are
self-contained: their copy and data live as literals inside their own file.

**All inter-page links come from `src/links.js`**, which builds hrefs from `import.meta.env.BASE_URL`.
Never hand-write a bare `#section` href in a component — it would break when followed from `/contact/`,
and it would break again if `base` changes. `section(id)` resolves to a same-document scroll on the home page
and a navigation-plus-scroll from anywhere else. `#top` is the only home-page anchor left — Services,
Work, About and Contact are all their own pages.

The pre-paint theme script lives in `src/theme-init.js` and is injected into every page's `<head>` by the
`inject-theme-script` plugin in `vite.config.js`. It cannot be bundled — it has to run before first paint,
before the module scripts — so it is read as raw text and inlined. Don't paste copies into the HTML
shells; edit that one file.

### Theming and palette (the part that's easy to break)

The brand color is **Burnt Peach `#E97451`**, used as the page background in light mode.

Runtime colors are plain CSS custom properties (`--ink`, `--paper`, `--signal`, `--signal-soft`,
`--slate`, `--line`) defined under `:root` and `.dark` in `src/index.css`. Tailwind's `@theme` block maps
them onto design tokens, which is what makes the color utilities re-theme automatically — **the codebase
deliberately uses no dark-variant classes**. Opacity modifiers resolve through `color-mix`, so the
variables must hold complete color values, never bare RGB triples.

To add or rename a themed color, edit `:root`, `.dark`, and the `@theme` block.

Burnt Peach is a **mid-tone** (~30% relative luminance), and that constrains everything downstream:

- White on it is 2.97:1 and fails AA. Text on the page must be dark; `--ink` is a deep espresso.
- **There are two accents on purpose.** No single color clears AA on both peach and the dark inverted
  sections, so `--signal` is for use on `--paper` grounds and `--signal-soft` is for use on `--ink`
  grounds. Picking the wrong one produces text that is technically themed but unreadable.
- **Opacity-modified text has a floor.** On peach, tints below roughly 80% drop under 4.5:1. The
  component tree uses 80/85/90 for body copy; going lower reintroduces the contrast failure.

`scratchpad/contrast.mjs` (regenerate if missing) computes WCAG ratios for every pair, including alpha
composites. Run it after any palette change rather than eyeballing.

Because the variables are real colors, they are also valid directly in SVG `fill` / `stroke` attributes —
`PipelineDiagram.jsx` relies on this.

`.dark` and `:root` have equal specificity and both match `<html>`, so `.dark` must stay *after* `:root` in
`index.css` to win.

Tailwind v4 scans markdown as well as source, so utility class names written in docs get compiled into the
stylesheet. `@source not "../*.md"` in `index.css` suppresses that.

Dark mode is applied from two places, and both are needed:
1. A blocking inline script in `index.html`, before the bundle loads, reads `localStorage['nexora-theme']`
   (falling back to `prefers-color-scheme`) and sets the class — this prevents a flash of the wrong theme.
2. `App`'s `useEffect` toggles the class and writes `localStorage` when the user clicks the toggle.
   `App` seeds its `dark` state by *reading the class off the DOM*, so step 1 is the source of truth on load.

## Placeholders to be aware of

The `EDIT GUIDE` comment at the top of `index.html` lists what's still stubbed. Currently unresolved:

- `hello@nexora.io` is a placeholder address.
- "Book a Free Audit" buttons point at the `/contact/` page. Swapping to Calendly is a one-line change
  to `contact` in `src/links.js`.
- The contact form still has **no backend** — `handleSubmit` in `Contact.jsx` only calls
  `setSubmitted(true)` locally. Wiring a form service goes in that function.
- Case studies are marked with `{/* CASE STUDY n */}` comments in `Work.jsx` and need real client details.
