<template>
  <button v-for="collection in collectionList" :key="collection.id" class="entry-card">
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CollectionPaintDetails } from '~/server/utils/openapi';
  const collectionList = ref<CollectionPaintDetails[]>([]);

  onMounted(() => {
    fetchCollectionList();
  });

  async function fetchCollectionList() {
    const response = await $fetch('/api/listCollection');
    collectionList.value = response;
  }
  </script>

<style scoped>
.entry-card {
  display: grid;
  grid-template-columns: 1fr 4fr 4fr 1fr auto;
  align-items: center;
  width: 100%;
  gap: 1rem;
  border-bottom: 1px solid #ccc;
  height: fit-content;
}
button {
  background-color: transparent;
  border-radius: 0;
  border: none;
  color: var(--sunglo);
  height: fit-content;
  cursor: pointer;
  transition: background-color 0.3s ease-out, border-radius 0.3s ease-out;
}
button:hover,
button:focus {
  background-color: var(--tea);
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease-out, border-radius 0.3s ease-out;
}
</style>