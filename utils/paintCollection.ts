// Adds an entry and refreshes the collection list
export async function addEntry(input: AddToCollectionInputBody) {
  await $fetch<Promise<CollectionPaintDetails>>('/api/collection/addCollectionEntry', {
    method: 'POST',
    body: JSON.stringify(input),
    onResponseError: ({ response }) => {
      throw new Error(response._data.message)
    },
  })
  await listCollection()
}

// Deletes an entry and refreshes the collection list
export async function deleteEntry(collectionId: number) {

  await $fetch<Promise<string>>(`/api/collection/${collectionId}/deleteEntry`, {
    method: 'DELETE',
    onResponseError: ({ response }) => {
      throw new Error(response._data.message)
    },
  })
  await listCollection()
}

// Upates an entry and refreshes the collection list
export async function updateEntry(
  collectionId: number,
  input: UpdateCollectionEntryInputBody,
): Promise<void> {
  if (!collectionId) return
  if (!input.paint_id || !input.quantity) return

  await $fetch<Promise<CollectionPaintDetails>>(`/api/collection/${collectionId}/updateCollectionEntry`, {
    method: 'PUT',
    body: JSON.stringify(input),
    onResponseError: ({ response }) => {
      throw new Error(response._data.message)
    },
  })
  await listCollection()
}

// list all paints in the collection
export async function listCollection() {
  const { collection } = useColorState

  const response = await $fetch<Promise<CollectionPaintDetails[]>>('/api/collection/listCollection');
  collection.value = response;
}