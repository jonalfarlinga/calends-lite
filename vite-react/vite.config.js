import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 80,
    watch: {
        usePolling: true,
    },
    base: 'https://calendsliteapi.z13.web.core.windows.net'
  },
})
