import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const DataHub = require('macaca-datahub')

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const datahubConfig = {
  port: 5678,
  hostname: '127.0.0.1',
  store: path.join(__dirname, '..', 'data'),
  proxy: {
    '/api': {
      hub: 'sample',
    },
  },
  showBoard: true,
};

const defaultDatahub = new DataHub({
  port: datahubConfig.port,
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'vite-plugin-datahub', 
      configureServer() {
        defaultDatahub.startServer(datahubConfig).then(() => {
          console.log(`DataHub started on http://${datahubConfig.hostname}:${datahubConfig.port}`)
        }).catch(err => {
          console.error('DataHub failed to start:', err)
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: { proxy: {
    '/api': {
      target: `http://${datahubConfig.hostname}:${datahubConfig.port}`,
      changeOrigin: true,
      secure: false,
    }
  }}
})
