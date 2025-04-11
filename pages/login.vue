<template>
  <GoogleSignInButton
    @success="onSuccess"
    @error="onError"
  />
</template>

<script setup lang="ts">
import type {
  CredentialResponse,
} from 'vue3-google-signin'

const { isLoggedIn, logIn, registerUser } = authStore()
const router = useRouter()
if (isLoggedIn) {
  router.push('/')
}

async function onSuccess(response: CredentialResponse) {
  const { credential } = response
  if (!credential) {
    return
  }
  try {
    await logIn(credential)
  }
  catch {
    try {
      await registerUser(credential)
    }
    catch {
      createError({
        statusCode: 500,
        statusMessage: 'Login failed',
      })
    }
  }
  finally {
    if (!isLoggedIn) {
      createError({
        statusCode: 500,
        statusMessage: 'Login failed',
      })
    }
    router.push('/')
  }
}

async function onError(error: Error) {
  console.error(error)
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
