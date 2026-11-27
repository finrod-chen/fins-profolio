import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { markdownMeta } from './src/plugins/markdown-meta'

// https://vite.dev/config/
export default defineConfig({
  plugins: [markdownMeta(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Arc's installed blocks are authored for Next.js; map the one
      // Next-only import they use onto a plain <img> shim.
      'next/image': path.resolve(__dirname, './src/shims/next-image.tsx'),
    },
  },
  css: {
    modules: {
      // Stable names ("button__primary") instead of hashes, so the site theme
      // (src/styles/theme.css) can restyle Arc components without editing them.
      // Every *.module.css basename in src is unique, so names cannot collide.
      generateScopedName: (name: string, filename: string) =>
        `${path.basename(filename).replace(/\.module\.css(\?.*)?$/, '')}__${name}`,
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
