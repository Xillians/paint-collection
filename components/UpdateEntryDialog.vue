<template>
  <BaseDialog ref="dialog">
    <template #title>
      Update color
    </template>
    <p v-if="error">
      {{ error }}
    </p>
    <form @submit.prevent="">
      <label for="amount">Amount</label>
      <input
        v-model="amount"
        type="number"
        placeholder="Amount"
        required
      >
      <ChooseColor @update:chosen-paint="handleChosenPaint" />
      <div class="buttons">
        <button
          aria-label="update entry"
          type="submit"
          @click="handleUpdate"
        >
          Update
        </button>
        <button
          aria-label="delete entry"
          type="submit"
          @click="handleDelete"
        >
          Delete
        </button>
      </div>
    </form>
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BaseDialog } from '#components'
import type { PaintOutputDetails } from '~/server/utils/openapi'
import { deleteEntry, updateEntry } from '#imports'

const amount = ref<number | null>(null)
const color = ref<PaintOutputDetails | null>(null)
const dialog = ref<InstanceType<typeof BaseDialog> | null>(null)
const currentCollectionId = ref<number | null>(null)
const error = ref<string | null>(null)

function openDialog(id: number) {
  currentCollectionId.value = id
  dialog.value?.openDialog()
}

function handleChosenPaint(chosenPaint: PaintOutputDetails) {
  color.value = chosenPaint
}

async function handleDelete(event: Event) {
  if (!currentCollectionId.value) return

  try {
    await deleteEntry(currentCollectionId.value)
  }
  catch (e) {
    error.value = String(e)
    return
  }

  dialog.value?.closeDialog(event)
}

async function handleUpdate(event: Event) {
  if (!currentCollectionId.value || !amount.value || !color.value) return

  try {
    await updateEntry(currentCollectionId.value, {
      quantity: amount.value,
      paint_id: color.value.id,
    })
  }
  catch (e) {
    error.value = String(e)
    return
  }

  dialog.value?.closeDialog(event)
}

defineExpose({ openDialog })
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
