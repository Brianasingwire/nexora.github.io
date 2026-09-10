# Nexora

Marketing site for Nexora — AI automation and IT solutions.

## Develop

```bash
npm install
npm run dev      # local dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

## Pages

Each page is its own HTML entry, declared in `vite.config.js`:

| File | URL |
|---|---|
| `index.html` | `/` |
| `services/index.html` | `/services/` |
| `work/index.html` | `/work/` |
| `about/index.html` | `/about/` |
| `contact/index.html` | `/contact/` |

Links between pages come from `src/links.js` so they resolve correctly under the project
base path. Add a page by creating its HTML shell, an `src/<name>-main.jsx` entry, and a line
in `rollupOptions.input`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages.

This requires **Settings → Pages → Source = "GitHub Actions"** (not "Deploy from a branch").

The site is served from a project path, so `vite.config.js` sets `base: '/nexora.github.io/'`.
If you move to a custom domain, change that to `'/'`.
