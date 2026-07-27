import { defineConfig } from 'vite';

// Relative assets make the same build work at a GitHub Pages project subpath.
export default defineConfig({
  base: './',
  test: { environment: 'node' },
});
