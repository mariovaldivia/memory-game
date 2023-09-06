<template>
  <div>
     
            <MemoryCard class="animal-card" v-for="animal in animals" 
                :animal="animal" 
                :key="animal.uuid">
            </MemoryCard>

  </div>
</template>

<script lang="ts">
    import { ref } from 'vue';
    import { getAnimalImages } from '../services/animals';
    import MemoryCard from './MemoryCard.vue';
    export default {
        components: {MemoryCard},
        setup(){
            const animals = ref([]);
            const numberOfPairs = 5;
            getAnimalImages()
                .then((response) => {
                    console.log(response.data)
                    animals.value = response.data.entries.slice(0, numberOfPairs)
                })
            return {
                animals
            }
        }
    }
</script>

<style>

</style>