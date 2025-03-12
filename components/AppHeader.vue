
<template>
  <header>
    <h1>
      Paint collection
    </h1>
    <button v-if="auth.isLoggedIn" @click="logOut" aria-label="Log out">Log out</button>
  </header>
</template>

<script setup lang="ts">
 const auth = useAuthState();

 async function logOut() {
  const router = useRouter();
  auth.value.isLoggedIn = false;
  const session = useCookie('session');
  session.value = null;
  router.push('/login');
 }
</script>
