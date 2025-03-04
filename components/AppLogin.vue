<script setup lang="ts">
import { ref } from 'vue';
const { username, password, login } = useLogin();

function useLogin() {
  const username = ref('')
  const password = ref('')

  async function login() {
    await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
  }

  return {
    username,
    password,
    login,
  }
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