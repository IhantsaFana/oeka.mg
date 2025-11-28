import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://oeka.mg',
      dynamicRoutes: [
        '/en',
        '/fr',
        '/en/about',
        '/fr/about',
        '/en/projects',
        '/fr/projects',
        '/en/contact',
        '/fr/contact'
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // UI Libraries
          'ui-vendor': ['framer-motion', 'react-helmet-async', 'react-icons'],

          // Firebase (Lourd !)
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],

          // Markdown Editor & Viewer (Lourd !)
          'markdown-vendor': ['react-simplemde-editor', 'easymde', 'react-markdown'],

          // I18n
          'i18n-vendor': ['react-i18next', 'i18next'],
        }
      }
    }
  }
})
