import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) return 'three-vendor'
          if (id.includes('node_modules/gsap') || id.includes('@gsap') || id.includes('node_modules/lenis')) return 'gsap-vendor'
          if (id.includes('node_modules/react') || id.includes('react-dom') || id.includes('react-router')) return 'react-vendor'
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
