import { resolve } from 'path';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/,
      input: {
          main: resolve(__dirname, 'src/index.ts'),
      }
    },
    sourcemap: 'inline'
  }
})

