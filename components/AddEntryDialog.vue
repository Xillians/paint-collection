<template>
  <button @click="openDialog" aria-label="add entry" class="transparent">
    <h2>+</h2>
  </button>
  <BaseDialog ref="dialog">
    <template #title>
      Add Entry
    </template>
    <p v-if="error" class="error">{{ error }}</p>
    <form @submit.prevent="handleAddEntry">
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
import type { AddToCollectionInputBody, PaintOutputDetails } from '~/server/utils/openapi';
const { collection } = useColorState;

const amount = ref<number | null>(null);
const color = ref<PaintOutputDetails | null>(null);
const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);
const error = ref<string | null>(null);

function openDialog() {
  dialog.value?.openDialog();
}
function handleChosenPaint(chosenPaint: PaintOutputDetails) {
  color.value = chosenPaint;
}

async function handleAddEntry(event: Event) {
  if (!color.value || !amount.value) return;
  const input: AddToCollectionInputBody = {
    paint_id: color.value.id,
    quantity: amount.value,
  };
  await $fetch('/api/collection/addCollectionEntry', {
    method: 'POST',
    body: JSON.stringify(input),
    onResponseError: ({response}) => {
      error.value = response._data.message;
    },
  });
  const response = await $fetch('/api/collection/listCollection');
  collection.value = response;
  dialog.value?.closeDialog(event);
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
.error {
  color: red;
}
</style>