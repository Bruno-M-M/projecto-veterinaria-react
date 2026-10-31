import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    restoreMocks: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      exclude: ['src/main.jsx', 'src/setupTests.js', '**/*.test.{js,jsx}'],
      thresholds: { statements: 90, branches: 90, functions: 90, lines: 90 },
    },
  },
})
