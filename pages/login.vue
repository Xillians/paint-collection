<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit" aria-label="Log in button">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthState } from '#imports';
const username = ref('');
const password = ref('');
const auth = useAuthState();
const router = useRouter();

if (auth.value.isLoggedIn) {
  router.push('/');
}
  
async function login() {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username: username.value,
        password: password.value,
      },
    });
    auth.value.isLoggedIn = true;
    router.push('/');
  } catch (error) {
    console.error('Login failed', error);
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
</style>