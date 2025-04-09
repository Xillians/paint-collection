<template>
  <dialog ref="dialog">
    <div class="dialog-header">
      <h2>
        <slot name="title">
          Dialog
        </slot>
      </h2>
      <button
        aria-label="close dialog"
        class="transparent"
        @click="closeDialog"
      >
        <h3>✕</h3>
      </button>
    </div>
    <slot />
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref<HTMLDialogElement | null>(null)

function openDialog() {
  if (dialog.value) {
    dialog.value.showModal()
  }
}

function closeDialog(event: Event) {
  event.preventDefault()
  if (dialog.value) {
    dialog.value.close()
  }
}

defineExpose({ openDialog, closeDialog })
</script>

<style scoped>
dialog:not([open]) {
  display: none;
}
button {
  border-radius: 5px;
}
h3 {
  margin: 0;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
