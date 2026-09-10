import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const entry = (p) => fileURLToPath(new URL(p, import.meta.url));

// The theme script has to run before first paint, so it can't be bundled. Rather
// than paste it into every HTML shell and let the copies drift, inject one source
// of truth into every page.
const themeScript = readFileSync(entry('./src/theme-init.js'), 'utf8');
const injectThemeScript = {
  name: 'inject-theme-script',
  transformIndexHtml: () => [
    { tag: 'script', children: themeScript, injectTo: 'head' },
  ],
};

export default defineConfig({
  // This repo is a GitHub *project* site, served from
  // https://brianasingwire.github.io/nexora.github.io/ — so assets need this prefix.
  // If you move to a custom domain (e.g. nexora.io), change this to '/'.
  base: '/nexora.github.io/',
  plugins: [react(), tailwindcss(), injectThemeScript],
  build: {
    rollupOptions: {
      // One HTML entry per page. Each builds to its own directory, which GitHub
      // Pages serves without a trailing-slash redirect or a 404 fallback.
      input: {
        main: entry('./index.html'),
        services: entry('./services/index.html'),
        work: entry('./work/index.html'),
        about: entry('./about/index.html'),
        contact: entry('./contact/index.html'),
      },
    },
  },
});
