import { ref } from 'vue'
import type { CollectionPaintDetails } from '~/server/utils/openapi'

function _useColorState() {
  const collection = ref<CollectionPaintDetails[]>([])

  return {
    collection,
  }
}

export const useColorState = _useColorState()
