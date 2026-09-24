import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Относительные пути, чтобы ассеты не терялись на GitHub Pages
});