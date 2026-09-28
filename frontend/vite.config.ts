import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ADD

export default defineConfig({
  plugins: [react(), tailwindcss()], // ADD tailwindcss()
})