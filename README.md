# Nexora

Marketing site for Nexora — AI automation and IT solutions.

## Develop

```bash
npm install
npm run dev      # local dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages.

This requires **Settings → Pages → Source = "GitHub Actions"** (not "Deploy from a branch").

The site is served from a project path, so `vite.config.js` sets `base: '/nexora.github.io/'`.
If you move to a custom domain, change that to `'/'`.
