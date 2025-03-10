<template>
  <button @click="openDialog" aria-label="add entry" class="transparent">
    <h2>+</h2>
  </button>
  <BaseDialog ref="dialog">
    <template #title>
      Add Entry
    </template>
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

function openDialog() {
  dialog.value?.openDialog();
}
function handleChosenPaint(chosenPaint: PaintOutputDetails) {
  color.value = chosenPaint;
}

async function handleAddEntry() {
  if (!color.value || !amount.value) return;
  try {
    const input: AddToCollectionInputBody = {
      paint_id: color.value.id,
      quantity: amount.value,
    };
    await $fetch('/api/collection/addCollectionEntry', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    const response = await $fetch('/api/collection/listCollection');
    collection.value = response;
  } catch (error) {
    console.error(error);
  } finally {
    dialog.value?.closeDialog(new Event('close'));
  }
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