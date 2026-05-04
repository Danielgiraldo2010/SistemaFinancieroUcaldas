import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const backendUrl = env.VITE_BACKEND_URL

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      middlewareMode: false,
      proxy: {
        '/api': { target: backendUrl, changeOrigin: true, secure: false },
        '/login': { 
          target: backendUrl, 
          changeOrigin: true, 
          secure: false,
          bypass: (req) => {
            // If it's a GET request to /login, serve index.html (it's a SPA route)
            if (req.method === 'GET') {
              return '/index.html'
            }
          }
        },
        '/register': { 
          target: backendUrl, 
          changeOrigin: true, 
          secure: false,
          bypass: (req) => {
            // If it's a GET request to /register, serve index.html (it's a SPA route)
            if (req.method === 'GET') {
              return '/index.html'
            }
          }
        },
        '/forgotPassword': { 
          target: backendUrl, 
          changeOrigin: true, 
          secure: false,
          bypass: (req) => {
            // If it's a GET request to /forgotPassword, serve index.html (it's a SPA route)
            if (req.method === 'GET') {
              return '/index.html'
            }
          }
        },
        '/refresh': { 
          target: backendUrl, 
          changeOrigin: true, 
          secure: false,
          bypass: (req) => {
            // If it's a GET request to /refresh, serve index.html (it's a SPA route)
            if (req.method === 'GET') {
              return '/index.html'
            }
          }
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor dependencies
            if (id.includes('node_modules/react/')) return 'vendor-react'
            if (id.includes('node_modules/react-dom/')) return 'vendor-react'
            if (id.includes('node_modules/react-router/')) return 'vendor-react'
            
            // Radix UI components
            if (id.includes('node_modules/@radix-ui/')) return 'ui-radix'
            
            // Refine and related
            if (id.includes('node_modules/@refinedev/')) return 'refine'
            
            // Forms
            if (id.includes('node_modules/react-hook-form/') || 
                id.includes('node_modules/@hookform/') ||
                id.includes('node_modules/zod/')) return 'forms'
            
            // Charts
            if (id.includes('node_modules/recharts/')) return 'charts'
            
            // Tables
            if (id.includes('node_modules/@tanstack/react-table/')) return 'table'
            
            // UI utilities
            if (id.includes('node_modules/sonner/') ||
                id.includes('node_modules/cmdk/') ||
                id.includes('node_modules/lucide-react/') ||
                id.includes('node_modules/embla-carousel/')) return 'ui-components'
            
            // Utilities
            if (id.includes('node_modules/clsx/') ||
                id.includes('node_modules/tailwind-merge/') ||
                id.includes('node_modules/class-variance-authority/') ||
                id.includes('node_modules/next-themes/')) return 'utils'
            
            // Misc
            if (id.includes('node_modules/ky/') ||
                id.includes('node_modules/vaul/') ||
                id.includes('node_modules/react-day-picker/') ||
                id.includes('node_modules/react-resizable-panels/') ||
                id.includes('node_modules/input-otp/')) return 'misc'
          },
        },
      },
    },
  }
})
