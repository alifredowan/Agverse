import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const cmsTarget = process.env.CMS_TARGET || 'http://127.0.0.1:8000';
const cmsProxy = { target: cmsTarget, changeOrigin: false };

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5050,
    proxy: {
      '/api/cms': { ...cmsProxy },
      '/admin': { ...cmsProxy },
      '/cms-media': { ...cmsProxy },
      '/cms-editor.js': { ...cmsProxy },
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  }
});
