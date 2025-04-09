<template>
  <div class="grid">
    <div class="input">
      <div class="button-header">
        <label for="brand">Brand</label>
        <button
          class="transparent"
          aria-label="Add new brand"
          type="button"
          @click="handleAddBrand"
        >
          <AkPlus />
        </button>
        <button
          v-if="chosenBrand && role === 'administrator'"
          aria-label="Edit brand"
          type="button"
          class="transparent"
          @click="handleEditBrand"
        >
          <AkEdit />
        </button>
        <button
          v-if="chosenBrand && role === 'administrator'"
          aria-label="Delete brand"
          type="button"
          class="transparent"
          @click="handleDeleteBrand"
        >
          <IcTrash />
        </button>
      </div>
      <select
        v-model="chosenBrand"
        aria-label="choose brand"
      >
        <option
          v-for="brand in brands"
          :key="brand.id"
          :value="brand.id"
          :aria-label="brand.name"
        >
          {{ brand.name }}
        </option>
      </select>
    </div>
    <div class="input">
      <div class="button-header">
        <label for="color">Color</label>
        <button
          class="transparent"
          aria-label="Add new color"
          type="button"
          @click="handleAddPaint"
        >
          <AkPlus />
        </button>
        <button
          v-if="chosenPaint && role === 'administrator'"
          aria-label="Edit color"
          type="button"
          class="transparent"
          @click="handleEditPaint"
        >
          <AkEdit />
        </button>
        <button
          v-if="chosenPaint && role === 'administrator'"
          aria-label="Delete color"
          type="button"
          class="transparent"
          @click="handleDeletePaint"
        >
          <IcTrash />
        </button>
      </div>
      <select
        v-model="chosenPaint"
        aria-label="choose paint color"
      >
        <option
          v-for="paint in filteredPaints"
          :key="paint.id"
          :value="paint"
          :aria-label="paint.name"
        >
          {{ paint.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AkEdit, AkPlus, IcTrash } from '@kalimahapps/vue-icons'
import { jwtDecode } from 'jwt-decode'
import { ref, computed, onMounted, defineEmits } from 'vue'
import type { PaintBrands, PaintOutputDetails } from '~/server/utils/openapi'

const { brands, chosenBrand, handleAddBrand, handleDeleteBrand, handleEditBrand } = useBrand()
const { paints, chosenPaint, handleAddPaint, handleDeletePaint, handleEditPaint } = usePaint()

type claims = {
  role: string
  user_id: number
}
const roleCookie = useCookie('session')
const decodedToken = roleCookie.value ? jwtDecode<claims>(roleCookie.value) : null
const role = ref(decodedToken?.role ?? 'user')

const filteredPaints = computed(() => {
  return paints.value.filter(paint => paint.brand.id === Number(chosenBrand.value))
})

const emit = defineEmits(['update:chosenPaint'])

watch(chosenPaint, (newValue) => {
  emit('update:chosenPaint', newValue)
})

onMounted(async () => {
  try {
    const paintResponse = await fetch('/api/listPaints')
    paints.value = await paintResponse.json()
    paints.value.sort((a, b) => a.name.localeCompare(
      b.name,
      undefined,
      { numeric: true, sensitivity: 'base' },
    ))
    const brandResponse = await $fetch<Promise<PaintBrands[]>>('/api/listBrands')
    brands.value = brandResponse
    brands.value.sort((a, b) => a.name.localeCompare(
      b.name,
      undefined,
      { numeric: true, sensitivity: 'base' },
    ))
  }
  catch {
    paints.value = []
  }
})

function usePaint() {
  const paints = ref<PaintOutputDetails[]>([])
  const chosenPaint = ref<PaintOutputDetails | null>(null)

  function handleAddPaint() {
    // adding a new paint
  }
  function handleDeletePaint() {
    // deleting the paint
  }
  function handleEditPaint() {
    // editing the paint. This should probably open up a sub-component
  }
  return {
    paints,
    chosenPaint,
    handleAddPaint,
    handleDeletePaint,
    handleEditPaint,
  }
}

function useBrand() {
  const brands = ref<PaintBrands[]>([])
  const chosenBrand = ref('')

  function handleAddBrand() {
    // adding a new brand
  }
  function handleDeleteBrand() {
    // deleting the brand
  }
  function handleEditBrand() {
    // editing the brand. This should probably open up a sub-component
  }
  return {
    brands,
    chosenBrand,
    handleAddBrand,
    handleDeleteBrand,
    handleEditBrand,
  }
}
</script>

<style scoped>
  h2 {
    font-size: 12px;
    margin: 0;
  }
  button {
    padding: 0.2em;
    color: var(--text-color);
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
  .button-header {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    gap: 5px;
  }
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
