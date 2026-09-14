import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const entry = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  // This repo is a GitHub *project* site, served from
  // https://brianasingwire.github.io/nexora.github.io/ — so assets need this prefix.
  // If you move to a custom domain (e.g. nexora.io), change this to '/'.
  base: '/nexora.github.io/',
  plugins: [react(), tailwindcss()],
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
