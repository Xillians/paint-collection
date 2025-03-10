<template>
  <BaseDialog ref="dialog">
    <template #title>
      Update color
    </template>
    <p v-if="error">{{ error }}</p>
    <form>
      <label for="amount">Amount</label>
      <input v-model="amount" type="number" placeholder="Amount" required />
      <ChooseColor @update:chosenPaint="handleChosenPaint" />
      <div class="buttons">
        <button aria-label="update entry" @click="handleUpdate">Update</button>
        <button aria-label="delete entry" @click="handleDelete">Delete</button>
      </div>
    </form>
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PaintOutputDetails, UpdateCollectionEntryInputBody } from '~/server/utils/openapi';
import type { BaseDialog } from '#components';

const amount = ref<number | null>(null);
const color = ref<PaintOutputDetails | null>(null);
const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);
const currentCollectionId = ref<number | null>(null);
const error = ref<string | null>(null);
const { collection } = useColorState;

function openDialog(id: number) {
  currentCollectionId.value = id;
  dialog.value?.openDialog();
}

function handleChosenPaint(chosenPaint: PaintOutputDetails) {
  color.value = chosenPaint;
}

async function handleDelete(event: Event) {
  if (!currentCollectionId.value) return;

  await $fetch(`/api/collection/${currentCollectionId.value}/deleteEntry`, {
    method: 'DELETE',
    onResponseError: ({ response }) => {
      error.value = response._data.message;
    },
  });

  const response = await $fetch('/api/collection/listCollection');
  collection.value = response;

  dialog.value?.closeDialog(event);
}

async function handleUpdate(event: Event) {
  if (!currentCollectionId.value || !amount.value || !color.value) return;

  const input: UpdateCollectionEntryInputBody = {
    quantity: amount.value,
    paint_id: color.value.id,
  };
  await $fetch(`/api/collection/${currentCollectionId.value}/updateCollectionEntry`, {
    method: 'PUT',
    body: JSON.stringify(input),
    onResponseError: ({ response }) => {
      error.value = response._data.message;
    },
  });

  const updatedCollection = await $fetch('/api/collection/listCollection');
  collection.value = updatedCollection;

  dialog.value?.closeDialog(event);
}

defineExpose({ openDialog });
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
.buttons {
  display: flex;
  gap: 1rem;
}
</style>