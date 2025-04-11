<template>
  <header>
    <h1>
      Paint collection
    </h1>
    <button
      v-if="isLoggedIn"
      aria-label="Log out"
      @click="store.logOut"
    >
      Log out
    </button>
  </header>
</template>

<script setup lang="ts">
const store = authStore()
const { isLoggedIn } = storeToRefs(store)
</script>
