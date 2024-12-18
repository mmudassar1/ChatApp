import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {

      '/api': {
        target: 'http://localhost:3000', // Ensure this matches your backend server port
        changeOrigin: true,
        secure: false, // Set to false if you're using HTTP
      },
    },
  },
}); 