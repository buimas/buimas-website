import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // react-helmet-async ships as CommonJS; bundle it into the SSR build
  // so the prerender step can import it without an ESM/CJS error.
  ssr: { noExternal: ['react-helmet-async'] },
})