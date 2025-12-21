
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// @ts-ignore
export default defineConfig({
  plugins: [react()],
  define: {
    // @ts-ignore
    'process.env': process.env
  }
});
