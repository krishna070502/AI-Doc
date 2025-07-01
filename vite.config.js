import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AI-Doc/', // GitHub Pages subdirectory
  server: {
    host: '0.0.0.0', // Explicitly listen on all interfaces
    port: 5174,
    strictPort: false, // Allow port fallback if 5174 is busy
    cors: true, // Enable CORS
    hmr: {
      port: 5175, // Different port for HMR to avoid conflicts
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper asset handling for GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
})
