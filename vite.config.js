import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// import baseURL from '@/backendAPI.js'
const baseURL = 'http://localhost:8002'
// https://vitejs.dev/config/
export default defineConfig({
// 配置跨域
    server: {
        proxy: {
            '/api': {
                target: baseURL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    },
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
