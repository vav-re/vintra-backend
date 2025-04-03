import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vintra-backend-565607878818.us-central1.run.app',
        changeOrigin: true,
        secure: true, // true porque a URL é HTTPS válida
      },
    },
    hmr: {
      clientPort: 443, // necessário para Gitpod
    },
    allowedHosts: 'all', // libera qualquer host (incluindo *.gitpod.io)
  },
})
