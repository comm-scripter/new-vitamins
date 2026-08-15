import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The app has no client-side router, so disable Vite's SPA history
  // fallback — otherwise it rewrites /admin/ to the root index.html
  // instead of serving public/admin/index.html (the Decap CMS UI).
  appType: 'mpa',
  // Served at github.io/new-vitamins/ until the custom domain is pointed
  // here, at which point this should go back to '/' and a public/CNAME
  // file should be added. Only applies in CI (GITHUB_ACTIONS) so local
  // dev/preview keep running at the root path.
  base: process.env.GITHUB_ACTIONS ? '/new-vitamins/' : '/',
})
