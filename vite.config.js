import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './pages/home.htm',
    },
  },
  server: {
    port: 3000,
    open: '/pages/home.htm',
    proxy: {
      '/students': 'http://localhost:5000',
    },
  },
});
