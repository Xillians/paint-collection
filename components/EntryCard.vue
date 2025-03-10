<template>
  <button @click="() => dialog?.openDialog(collection.id)" v-for="collection in collection" :key="collection.id" class="entry-card transparent">
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
  <UpdateEntryDialog ref="dialog" />
</template>

<script setup lang="ts">
  import type { UpdateEntryDialog } from '#components';
  import { ref } from 'vue';

  const { collection } = useColorState;
  const dialog = ref<InstanceType<typeof UpdateEntryDialog> | null>(null);

  onMounted(async () => {
    const reponse = await $fetch('/api/collection/listCollection');
    collection.value = reponse;
  });
</script>

<style scoped>
.entry-card {
  display: grid;
  grid-template-columns: 1fr 4fr 4fr 1fr auto;
  align-items: center;
  width: 100%;
  gap: 1rem;
  border-bottom: 1px solid var(--button-background);
  height: fit-content;
}
</style>