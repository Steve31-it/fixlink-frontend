import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      // This proxy is only used in local development
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  },
  // This makes sure build assets work on root domain
  base: '/'
});
