<template>
  <div class="entry-list">
    <EntryCard />
    <button aria-label="add entry" class="transparent">
      <h2>+</h2>
    </button>
  </div>
</template>

<style scoped>
h2 {
  margin: 0;
}
.entry-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
  width: 80%;
}
</style>