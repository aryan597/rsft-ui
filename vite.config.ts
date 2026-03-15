import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 10000, 
    proxy: {
      '/rsftapi/talent_analyse': {
        target: 'https://rsft-gateway-d22q.onrender.com',
        changeOrigin: true,
        secure:false
      },
    },
  },
  base: '/rsft-ui/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
