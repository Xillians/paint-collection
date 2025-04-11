<template>
  <button
    aria-label="add entry"
    class="transparent"
    @click="openDialog"
  >
    <h2>+</h2>
  </button>
  <BaseDialog ref="dialog">
    <template #title>
      Add Entry
    </template>
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <form @submit.prevent="handleAddEntry">
      <label for="amount">Amount</label>
      <input
        v-model="amount"
        type="number"
        placeholder="Amount"
        required
      >
      <ChooseColor @update:chosen-paint="handleChosenPaint" />
      <button type="submit">
        Add entry
      </button>
    </form>
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseDialog from './base/BaseDialog.vue'
import type { PaintOutputDetails } from '~/server/utils/openapi'

const amount = ref<number | null>(null)
const color = ref<PaintOutputDetails | null>(null)
const dialog = ref<InstanceType<typeof BaseDialog> | null>(null)
const error = ref<string | null>(null)

function openDialog() {
  dialog.value?.openDialog()
}
function handleChosenPaint(chosenPaint: PaintOutputDetails) {
  color.value = chosenPaint
}

async function handleAddEntry(event: Event) {
  if (!color.value || !amount.value) return

  try {
    await addEntry({
      paint_id: color.value.id,
      quantity: amount.value,
    })
  }
  catch (e) {
    error.value = String(e)
    return
  }

  dialog.value?.closeDialog(event)
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
