import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@/components': path.resolve(import.meta.dirname, './components'),
      '@/components/ui/smoothui': path.resolve(import.meta.dirname, './components/ui/smoothui'),
      '@/components/smoothui': path.resolve(import.meta.dirname, './components/ui/smoothui'),
    },
  },
})
