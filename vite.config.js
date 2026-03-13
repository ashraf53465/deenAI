import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/deen-ai/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});
