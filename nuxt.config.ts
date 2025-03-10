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
  googleSignIn: {
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  },
  devtools: { enabled: true }
})
