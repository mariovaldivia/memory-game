<script setup lang="ts">
import MemoryBoard from './components/MemoryBoard.vue'
</script>

<template>
  <main>
    <MemoryBoard></MemoryBoard>
  </main>

</template>

<style scoped>
header {
  line-height: 1.5;
}


main {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

.memory-board {
  width: 100%;
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
