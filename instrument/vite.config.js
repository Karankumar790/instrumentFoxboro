import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
    chunkSizeWarningLimit: 1000 ,
    outDir: 'dist',  // Ensure that the output directory is 'dist'
  }
})
