import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'

import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ['src/']
    })
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'vv-components',
      formats: ['es', 'cjs'],
      fileName: (format) => `vv-components.${format}.js`
    }
  }
}))
