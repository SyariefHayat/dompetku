import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@layouts': path.resolve(__dirname, 'src/components/Layouts'),
      '@modules': path.resolve(__dirname, 'src/components/Modules'),
    },
  }
})
