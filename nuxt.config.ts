// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-vue3-google-signin',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  runtimeConfig: {
    public: {
      googleSignIn: {
        clientId: process.env.GOOGLE_SIGN_IN || '',
      },
    },
  },
  compatibilityDate: '2024-11-01',
})
