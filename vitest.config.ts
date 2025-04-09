import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    passWithNoTests: true,
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.nuxt/',
        'utils/openapi/',
      ],
    },
    exclude: [
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/utils/openapi/**',
    ],
  },
})
