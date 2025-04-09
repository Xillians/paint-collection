<template>
  <div class="entry-list">
    <EntryCard />
    <AddEntryDialog />
  </div>
</template>

<style scoped>
.entry-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
  width: 80%;
}
</style>
