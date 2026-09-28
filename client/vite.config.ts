import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only proxy so the browser calls /api/* on the Vite origin and the
// Express server (default :3001) answers. No keys ever reach the client.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3001' } },
})
