import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // specify name of directory where to build
  base : '/static/',
  build : {
    // gives path to the directory where you'd like to have the build
    outDir : '../server/static',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [react()],
})
