import type { CollectionPaintDetails } from "~/server/utils/openapi";
import { ref } from "vue";


function _useColorState() {
  const collection = ref<CollectionPaintDetails[]>([]);

  return {
    collection,
  };
}

export const useColorState = _useColorState();