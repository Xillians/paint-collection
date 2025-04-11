<template>
  <button
    v-for="entry in collection"
    :key="entry.id"
    class="entry-card transparent"
    @click="() => dialog?.openDialog(entry.id)"
  >
    <LabelledField>
      <p>{{ entry.quantity }}x</p>
    </LabelledField>
    <LabelledField label="Brand">
      <p>{{ entry.paint.brand.name }}</p>
    </LabelledField>
    <LabelledField label="Name">
      <p>{{ entry.paint.name }}</p>
    </LabelledField>
    <LabelledField>
      <div
        :style="{
          backgroundColor: entry.paint.color_code,
          height: '20px',
          width: '20px',
        }"
      />
    </LabelledField>
  </button>
  <UpdateEntryDialog ref="dialog" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UpdateEntryDialog } from '#components'

const { collection } = useColorState
const dialog = ref<InstanceType<typeof UpdateEntryDialog> | null>(null)

onMounted(async () => {
  await listCollection()
})
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
