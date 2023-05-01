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
    rollupOptions: {
      output:{
          manualChunks(id) {
              if (id.includes('node_modules')) {
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
          }
      }
  }
  },
  plugins: [react()],
})
