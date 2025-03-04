<script setup lang="ts">
 const { isLoggedIn } = useAuthState();
 const router = useRouter();

  if (!isLoggedIn.value && router.currentRoute.value.path !== "/login") {
    router.push("/login");
  }
</script>
<template>
  <main>
    <NuxtPage />
  </main>
</template>

<style>
  @import url("~/assets/css/stylesheet.css");
</style>