import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Use a relative path for the base URL. This is best practice for Vercel/GitHub Pages
  // deployments to ensure all assets (CSS, JS) are loaded correctly.
  base: './',
  
  plugins: [
    // The official plugin for React support in Vite. 
    // This is what enables JSX file resolution and transformation.
    react(),
  ],

  // Optional: If you were seeing 'too many files' errors, this can help.
  // It ensures the build process doesn't include extraneous files.
  build: {
    outDir: 'dist',
    rollupOptions: {
      // You can define manual chunks here if your build is too large
    }
  },

  // Optional: Server settings for local development
  server: {
    open: true, // Automatically opens the app in the browser
    port: 3000,
  }
});
