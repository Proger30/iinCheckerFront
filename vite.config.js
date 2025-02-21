import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	base: "/",
  	plugins: [react()],
	preview: {
		port: 8080,
		strictPort: true,
	},
	server: {
		port: 8080,
		https: false,
		strictPort: true,
		host: false,
		origin: "http://localhost:3000",
		watch: {
			usePolling: true
		}
	}
})
