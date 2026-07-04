import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbitePlugin from "flowbite/plugin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // flowbitePlugin,
    tailwindcss()
  ],
  server:{
    proxy:{
      "/api/": "http://localhost:8080",
      "/uploads/": "http://localhost:8080",
    }
  }
})

