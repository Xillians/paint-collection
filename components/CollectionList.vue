<template>
  <div class="entry-list">
    <EntryCard />
    <button aria-label="add entry">
      <h2>+</h2>
    </button>
  </div>
</template>

<style scoped>
h2 {
  margin: 0;
}
button {
  background-color: transparent;
  height: fit-content;
  cursor: pointer;
}
button:hover,
button:focus {
  background-color: var(--button-background);
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease-out, border-radius 0.3s ease-out;
}

.entry-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
  width: 80%;
  margin: 0;
}
</style>