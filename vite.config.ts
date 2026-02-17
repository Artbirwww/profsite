import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [react(), svgr()],

    base: '/',

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    build: {
        target: 'esnext',
        outDir: 'build',
    },

    server: {
        port: 3000,
        open: true,
        host: true,
        // прокси для API-запросов
        proxy: {
            '/api': {
                target: 'http://176.119.16.111:8082',
                changeOrigin: true,
                secure: false,
                configure: (proxy, _options) => {
                    proxy.on('error', (err, _req, _res) => {
                        console.log('proxy error', err);
                    })
                    proxy.on('proxyReq', (proxyReq, req, _res) => {
                        console.log('Sending Request to the Target:', req.method, req.url);
                    })
                    proxy.on('proxyRes', (proxyRes, req, _res) => {
                        console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                    })
                },
            },
        },
    },
})