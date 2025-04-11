import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
  features: {
    stylistic: true,
    typescript: true,
  },
  rules: {
    semi: ['error', 'always'],
  },
})
