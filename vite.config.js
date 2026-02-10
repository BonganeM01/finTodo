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
  hostname: '0.0.0.0',
  store: './data',
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
  server: { 
    cors: true,
    proxy: {
    '/api': {
      target: `http://${datahubConfig.hostname}:${datahubConfig.port}/data/data/`,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
      configure: (proxy, _options) => {
        proxy.on('proxyReq', (proxyReq, req, _res) => {
          console.log('Proxying: ', req.method, req.url, ': ', `http://${datahubConfig.hostname}:${datahubConfig.port}${proxyReq.path}`)
        })
      },
      secure: false,
    }
  }}
})
