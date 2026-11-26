import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiTarget = process.env.CMS_TARGET || 'http://127.0.0.1:8000';
const laravelProxy = { target: apiTarget, changeOrigin: false };

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5050,
    proxy: {
      '/api': { ...laravelProxy },
      '/admin': { ...laravelProxy },
      '/cms-media': { ...laravelProxy },
      '/cms-editor.js': { ...laravelProxy },
    }
  }
});
