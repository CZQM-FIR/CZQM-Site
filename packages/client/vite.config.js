import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3500',
        changeOrigin: true,
      },
      '/files': {
        target: 'http://localhost:3500',
        changeOrigin: true,
      },
    },
  },

  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      plugins: [
        replace({
          delimiters: ['(?<!\\.)(?<!3500)\\/', ''],
            'api': 'https://czqm.ca/api',
            'files': 'https://czqm.ca/files',
        })
      ]
    }
  }
});
