import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': 'http://localhost:3000', // Backend server URL
  },
  define: {
    'process.env': process.env, // Inject dotenv variables
  },
})
