import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The app has no client-side router, so disable Vite's SPA history
  // fallback — otherwise it rewrites /admin/ to the root index.html
  // instead of serving public/admin/index.html (the Decap CMS UI).
  appType: 'mpa',
})
