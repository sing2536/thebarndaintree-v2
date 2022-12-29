import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/portal/api': {
        target: 'http://localhost:3007',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/portal\/api/, '')
      }
    }
  },
  cors: {
    origin: 'http://localhost:3007'
  }
})
