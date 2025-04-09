import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    passWithNoTests: true,
    exclude: [
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/utils/openapi/**',
    ],
  }
})
