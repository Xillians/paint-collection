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
import type { RegisterBody } from '~/server/api/registerUser';

const role = useCookie('role', { httpOnly: true, secure: true });
const auth = useAuthState();
const router = useRouter();
const loginError = ref<string | null>(null);
const registerError = ref<string | null>(null);

if (auth.value.isLoggedIn) {
  router.push('/');
}

async function logIn(credentials: string) {
  const input: LoginBody = {
    client_id: credentials,
  };
  const res = await $fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
    onResponseError: ({response}) => {
      console.log("Login error", response._data.message);
      loginError.value = response._data.message;
    },
  });
  if (loginError.value) {
    loginError.value = null;
    return;
  }
  role.value = res.body.role;
}
async function registerUser(input: RegisterBody) {
    await $fetch('/api/registerUser ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
      onResponseError: ({response}) => {
        console.log("Register error", response._data.message);
        registerError.value = response._data.message;
      },
    });
    if (registerError.value) {
      console.log("Register error", registerError.value);
      registerError.value = null;
      return;
    }
}

async function onSuccess(response: CredentialResponse) {
  const { credential } = response;
  if(!credential) {
    return;
  }
  try {
    await logIn(credential);
  } catch (error) {
    await registerUser({credential});
    if (registerError.value) {
      return;
    }
  } finally {
    if (!loginError.value) {
      auth.value.isLoggedIn = true;
      router.push('/');
    }
    loginError.value = null;
    registerError.value = null;
  }
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