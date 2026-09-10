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

`index.html` is a thin shell: meta tags, Google Fonts, a pre-paint theme script, `#root`, and the module
entry. Everything else lives in `src/` — `main.jsx` mounts `App.jsx`, which composes one component per page
section from `src/components/` in render order. Sections are self-contained: their copy and data live as
literals inside their own file, not in shared config.

### Theming (the part that's easy to break)

Runtime colors are plain CSS custom properties (`--ink`, `--paper`, `--signal`, `--slate`, `--line`) defined
under `:root` and `.dark` in `src/index.css`. Tailwind's `@theme` block maps them onto design tokens
(`--color-ink: var(--ink)`), which is what makes `bg-ink`, `text-ink/70`, `border-ink/10` re-theme
automatically — **the codebase deliberately uses no `dark:` variants**. Opacity modifiers resolve through
`color-mix`, so the variables must hold complete color values (`rgb(18 21 27)`), never bare RGB triples.

To add or rename a themed color, edit `:root`, `.dark`, and the `@theme` block.

Because the variables are real colors, `var(--ink)` is also valid directly in SVG `fill` / `stroke`
attributes — `PipelineDiagram.jsx` relies on this.

`.dark` and `:root` have equal specificity and both match `<html>`, so `.dark` must stay *after* `:root` in
`index.css` to win.

Dark mode is applied from two places, and both are needed:
1. A blocking inline script in `index.html`, before the bundle loads, reads `localStorage['nexora-theme']`
   (falling back to `prefers-color-scheme`) and sets the class — this prevents a flash of the wrong theme.
2. `App`'s `useEffect` toggles the class and writes `localStorage` when the user clicks the toggle.
   `App` seeds its `dark` state by *reading the class off the DOM*, so step 1 is the source of truth on load.

## Placeholders to be aware of

The `EDIT GUIDE` comment at the top of `index.html` lists what's still stubbed. Currently unresolved:

- `hello@nexora.io` is a placeholder address.
- "Book a Free Audit" buttons point at `#contact`, pending a real booking link.
- The contact form has **no backend** — `handleSubmit` only calls `setSubmitted(true)` locally. Wiring a
  form service goes in that function.
- Case studies are marked with `{/* CASE STUDY n */}` comments in `Work.jsx` and need real client details.
