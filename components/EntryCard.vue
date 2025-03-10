<template>
  <button @click="() => openDialog(collection.id)" v-for="collection in collection" :key="collection.id" class="entry-card transparent">
    <LabelledField>
      <p>{{ collection.quantity }}x</p>
    </LabelledField>
    <LabelledField label="Brand">
      <p>{{ collection.paint.brand.name }}</p>
    </LabelledField>
    <LabelledField label="Name">
      <p>{{ collection.paint.name }}</p>
    </LabelledField>
    <LabelledField>
      <div :style="{ 
        backgroundColor: collection.paint.color_code,
        height: '20px',
        width: '20px',
      }"></div>
    </LabelledField>
  </button>
  <BaseDialog ref="dialog">
    <template #title>
      Update color
    </template>
    <form>
      <label for="amount">Amount</label>
      <input v-model="amount" type="number" placeholder="Amount" required />
      <ChooseColor @update:chosenPaint="handleChosenPaint" />
      <div class="buttons">
        <button aria-label="update entry" type="submit">Update</button>
        <button aria-label="delete entry" @click="handleDelete">Delete</button>
      </div>
    </form>
  </BaseDialog>
</template>

<script setup lang="ts">
  import type { BaseDialog } from '#components';
  import { ref } from 'vue';
  import type { PaintOutputDetails } from '~/server/utils/openapi';

  const { collection } = useColorState;

  const amount = ref<number | null>(null);
  const color = ref<PaintOutputDetails | null>(null);
  const dialog = ref<InstanceType<typeof BaseDialog> | null>(null);
  const currentCollectionId = ref<number | null>(null);

  function openDialog(id: number) {
    currentCollectionId.value = id;
    dialog.value?.openDialog();
  }
  function handleChosenPaint(chosenPaint: PaintOutputDetails) {
    color.value = chosenPaint;
  }
  async function handleDelete() {
    console.log(currentCollectionId.value);
    if (!currentCollectionId.value) return;
    try {
      await $fetch(`/api/collection/${currentCollectionId.value}/deleteEntry`, {
        method: 'DELETE',
      });
      const response = await $fetch('/api/collection/listCollection');
      collection.value = response;
    } catch (error) {
      console.error(error);
    }
  }

  onMounted(async () => {
    const reponse = await $fetch('/api/collection/listCollection');
    collection.value = reponse;
  });
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
.entry-card {
  display: grid;
  grid-template-columns: 1fr 4fr 4fr 1fr auto;
  align-items: center;
  width: 100%;
  gap: 1rem;
  border-bottom: 1px solid var(--button-background);
  height: fit-content;
}
.buttons {
  display: flex;
  gap: 1rem;
}
</style>