<template>
  <main>
    <AppHeader />
    <div class="container">
      <NuxtPage />
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const store = authStore()
const { isLoggedIn } = storeToRefs(store)

const router = useRouter()

if (!isLoggedIn.value && router.currentRoute.value.path !== '/login') {
  router.push('/login')
}
</script>

<style>
  @import url("~/assets/css/stylesheet.css");
</style>
