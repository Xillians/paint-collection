// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  modules: [
    'nuxt-vue3-google-signin',
  ],
  runtimeConfig: {
    public: {
      googleSignIn: {
        clientId: process.env.GOOGLE_SIGN_IN || ''
      }
    }
  },

  devtools: { enabled: true }
})
