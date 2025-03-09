<template>
  <button @click="openDialog" aria-label="add entry" class="transparent">
    <h2>+</h2>
  </button>
  <BaseDialog ref="dialog">
    <template #title>
      Add Entry
    </template>
    <form @submit.prevent="addEntry">
      <label for="title">Title</label>
      <input v-model="title" type="text" placeholder="Title" required />
      <label for="amount">Amount</label>
      <input v-model="amount" type="number" placeholder="Amount" required />
      <label for="brand">Brand</label>
      <select v-model="chosenBrand">
        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
          {{ brand.name }}
        </option>
      </select>
      <button type="submit">OK</button>
    </form>
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type PaintBrands } from '~/server/utils/openapi';
import BaseDialog from './base/BaseDialog.vue';

const { brands, title, amount, chosenBrand } = useEntryForm();
const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);

function openDialog() {
  dialog.value?.openDialog();
}

function addEntry() {
  console.log("Adding entry");
  console.log({ title: title.value, amount: amount.value, brand: chosenBrand.value });
  dialog.value?.closeDialog(new Event('close'));
}

onMounted(async () => {
  try {
    const response = await fetch('/api/listBrands');
    brands.value = await response.json();
  } catch (error) {
    brands.value = [];
  }
});

function useEntryForm() {
  const brands = ref<PaintBrands[]>([]);
  const title = ref('');
  const amount = ref('');
  const chosenBrand = ref('');

  return { brands, title, amount, chosenBrand };
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