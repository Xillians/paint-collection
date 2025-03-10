<template>
  <GoogleSignInButton 
    @success="onSuccess" 
    @error="onError" 
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthState } from '#imports';
import {
  type CredentialResponse,
} from "vue3-google-signin";
import type { LoginBody } from '~/server/api/login';


const auth = useAuthState();
const router = useRouter();
const loginError = ref<string | null>(null);

if (auth.value.isLoggedIn) {
  router.push('/');
}

async function onSuccess(response: CredentialResponse) {
  const { credential } = response;
  if(!credential) {
    return;
  }
  const input: LoginBody = {
    client_id: credential,
  };

  await $fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
    onResponseError: (response) => {
      loginError.value = response.error?.toString() || 'Login failed';
    },
  });
  if (loginError.value) {
    return;
  }
  auth.value.isLoggedIn = true;
  loginError.value = null;
  router.push('/');
}

async function onError(error: any) {
  console.error(error);
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