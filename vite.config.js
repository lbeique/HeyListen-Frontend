import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5058",
      "/r": {
        target: "http://localhost:5058",
        ws: true,
      },
    },
  },
  plugins: [react()],
  define: {
    global: {},
  },
})
