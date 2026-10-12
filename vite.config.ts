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
  server: {
    host: true,
    port: 5173,
  },
})
