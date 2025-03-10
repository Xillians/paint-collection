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
    clientId: '158010152095-f0333sstbfhanaosmkegsf1i21l37m9i.apps.googleusercontent.com'
  },
  devtools: { enabled: true }
})
