import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
  ],
  // Make Vite recognize environment variables
  define: {
    'process.env': process.env
  },
  // Configure server for history API fallback
  server: {
    historyApiFallback: true
  },
  // Ensure that built assets work with client-side routing
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
