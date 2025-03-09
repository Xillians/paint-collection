<template>
  <div class="grid">
    <div class="input">
      <label for="brand">Brand</label>
      <select v-model="chosenBrand">
        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
          {{ brand.name }}
        </option>
      </select>
    </div>
    <div class="input">
      <label for="color">Color</label>
      <select v-model="chosenPaint">
        <option v-for="paint in filteredPaints" :key="paint.id" :value="paint">
         {{ paint.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue';
import type { PaintBrands, PaintOutputDetails } from '~/server/utils/openapi';

const paints = ref<PaintOutputDetails[]>([]);
const brands = ref<PaintBrands[]>([]);
const chosenBrand = ref('');
const chosenPaint = ref<PaintOutputDetails | null>(null);

const filteredPaints = computed(() => {
  return paints.value.filter((paint) => paint.brand.id === Number(chosenBrand.value));
});


const emit = defineEmits(['update:chosenPaint']);

watch(chosenPaint, (newValue) => {
  emit('update:chosenPaint', newValue);
});

onMounted(async () => {
  try {
    const paintResponse = await fetch('/api/listPaints');
    paints.value = await paintResponse.json();
    const brandResponse = await fetch('/api/listBrands');
    brands.value = await brandResponse.json();
  } catch (error) {
    paints.value = [];
  }
});
</script>

<style scoped>
  h2 {
    margin: 0;
  }
  button {
    width: fit-content;
    align-self: center;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>