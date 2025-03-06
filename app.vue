<script setup lang="ts">
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';

 const auth = useAuthState();
 const router = useRouter();

  if (!auth.value.isLoggedIn && router.currentRoute.value.path !== "/login") {
    router.push("/login");
  }
</script>
<template>
  <main>
    <AppHeader />
    <div class="container">
      <NuxtPage />
    </div>
    <AppFooter />
  </main>
</template>

<style>
  @import url("~/assets/css/stylesheet.css");
</style>