import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react()],
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
  }

  // Set base path for production builds (GitHub Pages)
  // Use ./ for local builds
  if (command === 'build' && mode !== 'development') {
    config.base = '/AI-Doc/'
  } else if (command === 'build' && mode === 'development') {
    config.base = './'
  }

  return config
})
