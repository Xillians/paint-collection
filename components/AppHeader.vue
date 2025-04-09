<template>
  <header>
    <h1>
      Paint collection
    </h1>
    <button
      v-if="auth.isLoggedIn"
      aria-label="Log out"
      @click="logOut"
    >
      Log out
    </button>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthState, useCookie } from '#imports'

const auth = useAuthState()

async function logOut() {
  const router = useRouter()
  auth.value.isLoggedIn = false
  const session = useCookie('session')
  session.value = null
  router.push('/login')
}
</script>
