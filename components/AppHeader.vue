
<template>
  <header>
    <h1>
      Paint collection
    </h1>
    <button v-if="auth.isLoggedIn" @click="logOut">Log out</button>
  </header>
</template>

<script setup lang="ts">
 const auth = useAuthState();

 async function logOut() {
  const router = useRouter();
  try {
    await $fetch('/api/logout', {
      method: 'GET',
    });
    auth.value.isLoggedIn = false;
    router.push('/login');
  } catch (error) {
    console.error('Error logging out', error);
  }
 }
</script>
