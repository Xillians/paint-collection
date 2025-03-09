import type { AddToCollectionInputBody, CollectionPaintDetails, ListPaintCollectionOutputBody } from "~/server/utils/openapi";
import { ref } from "vue";

export function useColorState() {
  const colors = ref<CollectionPaintDetails[]>([]);

  async function updateList() {
    try {
      const response: CollectionPaintDetails[] = await $fetch('/api/listCollection');
      colors.value = response;
    } catch (error) {
      console.error('Failed to fetch colors', error);
    }
  }
  async function addEntry(input: AddToCollectionInputBody) {
    try {
      const response: CollectionPaintDetails[] = await $fetch('/api/collection/addCollectionEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      colors.value = response;
    } catch (error) {
      console.error('Failed to fetch colors', error);
    }
  }
  async function updateEntry(id: string, input: ListPaintCollectionOutputBody) {
    try {
      const response: CollectionPaintDetails[] = await $fetch(
        `/api/collection/${id}/updateCollectionEntry`,
        {
          method: 'PUT',
          body: JSON.stringify({ input })
        }
      );
      colors.value = response;
    } catch (error) {
      console.error('Failed to fetch colors', error);
    }
  }

  return {
    colors,
    updateList,
    addEntry,
    updateEntry
  };
}