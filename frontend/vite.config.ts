import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Navegador abra automaticamente
    port: 5173 // Ou qualquer outra porta que quiser
  }
})
