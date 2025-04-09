<template>
  <div>
    <label v-if="props.label">{{ props.label }}</label>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  label?: string
}>()
</script>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  label {
    font-weight: bold;
  }
</style>
