<script setup lang="ts">
  import MemoryBoard from './components/MemoryBoard.vue'
</script>

<template>
  <main class="align-top">
    <memory-board :pairs="6"></memory-board>
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
  vertical-align: top;
}

.memory-board {
  width: 100%;
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}


</style>
