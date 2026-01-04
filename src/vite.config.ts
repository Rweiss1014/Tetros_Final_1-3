import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    // Optimize for Storyline/LMS environments
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for debugging (optional, can disable for production)
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Ensure consistent file naming for easier updates
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Minify for smaller file size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
  },
  // Configure for embedded use in iframes (Storyline web objects)
  base: './',
  server: {
    port: 3000,
    strictPort: false,
  },
  preview: {
    port: 4173,
    strictPort: false,
  },
});
