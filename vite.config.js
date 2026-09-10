import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // This repo is a GitHub *project* site, served from
  // https://brianasingwire.github.io/nexora.github.io/ — so assets need this prefix.
  // If you move to a custom domain (e.g. nexora.io), change this to '/'.
  base: '/nexora.github.io/',
  plugins: [react(), tailwindcss()],
});
