<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthState } from '#imports';

const { isLoggedIn } = useAuthState();
const router = useRouter();
const { username, password, login } = useLogin();

if (isLoggedIn.value) {
  router.push('/');
}

function useLogin() {
  const username = ref('');
  const password = ref('');
  
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
      router.push('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return {
    username,
    password,
    login,
  };
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
</style>