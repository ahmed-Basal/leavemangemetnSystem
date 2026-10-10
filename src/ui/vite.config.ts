import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendTarget = env.VITE_BACKEND_TARGET || 'http://localhost:5178';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      cors: true, // Enable CORS on Vite Dev Server
      proxy: {
        // Forward /api requests to .NET Backend to eliminate browser CORS issues
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
