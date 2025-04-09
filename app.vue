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
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import { useAuthState } from '#imports'

const auth = useAuthState()
const router = useRouter()

if (!auth.value.isLoggedIn && router.currentRoute.value.path !== '/login') {
  router.push('/login')
}
</script>

<style>
  @import url("~/assets/css/stylesheet.css");
</style>
