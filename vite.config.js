import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  cacheDir: 'C:/temp/vite-gbg-cache', // Change 'C:' to whichever drive has free space
});