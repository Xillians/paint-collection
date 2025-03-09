<template>
  <button @click="openDialog" aria-label="add entry" class="transparent">
    <h2>+</h2>
  </button>
  <BaseDialog ref="dialog">
    <template #title>
      Add Entry
    </template>
    <form @submit.prevent="addEntry">
      <label for="amount">Amount</label>
      <input v-model="amount" type="number" placeholder="Amount" required />
      <ChooseColor @update:chosenPaint="handleChosenPaint" />
      <button type="submit">Add entry</button>
    </form>
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseDialog from './base/BaseDialog.vue';
import type { PaintOutputDetails } from '~/server/utils/openapi';

const amount = ref<number | null>(null);
const color = ref<PaintOutputDetails | null>(null);
const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);

function openDialog() {
  dialog.value?.openDialog();
}
function handleChosenPaint(chosenPaint: PaintOutputDetails) {
  color.value = chosenPaint;
}

function addEntry() {
  dialog.value?.closeDialog(new Event('close'));
}
</script>

<style scoped>
h2 {
  margin: 0;
}
button.transparent {
  border-radius: 5px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>