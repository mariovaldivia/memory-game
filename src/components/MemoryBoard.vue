<template>
  <MemoryCard class="animal-card" v-for="(animal, index) in animals" :animal="animal" :index="index" :key="index"
    :flip="isFlipped(index)" @click="flipCard(index)">
  </MemoryCard>
</template>

<script lang="ts">
import { ref, toRaw, onMounted } from 'vue'
import { getAnimalImages } from '../services/animals'
import MemoryCard from './MemoryCard.vue'
import { shuffle } from '../utils/utils'
export default {
  components: { MemoryCard },
  setup() {
    const animals = ref([])
    const numberOfPairs = 5
    const selectedAnimal = ref([])
    onMounted(() => {
      getAnimalImages().then((response) => {
        console.log(response.data)
        // animals.value = shuffle(response.data.entries.map((entry) => {return {
        //   url: entry.fields.image.url,
        //   slug: entry.meta.slug,
        //   uuid: entry.uuid
        // }})).slice(0, numberOfPairs)
        const listOfAnimals = getListOfAnimals(response.data.entries);
        const listPairsOfAnimals = listOfAnimals.flatMap((data) => {
          return [data, data];
        })
        console.log(listPairsOfAnimals)
        animals.value = shuffle(listPairsOfAnimals)
      })

    })

    const flipCard = (index) => {
      // const animalClicked = toRaw(animals.value)[index]
      const { slug } = animals.value[index]

      if (canFlipCard(index)) {
        const animalObj = {
          index: index,
          slug: slug,
          flipped: true
        }
        const currentAnimals = selectedAnimal.value
        selectedAnimal.value = [animalObj, ...toRaw(currentAnimals)]
        console.log(toRaw(selectedAnimal.value))
      }
      // console.log(animalClicked)
    }

    const canFlipCard = (id) => {
      // const animalClicked = toRaw(animals.value)[index]
      const { index, slug } = animals.value[id]
      return selectedAnimal.value.length < 2;

    }

    const isFlipped = (index) => {
      const { flipped } = selectedAnimal.value.find(animal => animal.index == index) ?? false
      return flipped
    }

    const getListOfAnimals = (data) => {
      return shuffle(
        data.map((entry) => {
          return {
            url: entry.fields.image.url,
            slug: entry.meta.slug,
            uuid: entry.meta.uuid
          }
        })).slice(0, numberOfPairs)
    }

    return {
      animals,
      flipCard,
      canFlipCard,
      isFlipped
    }
  }
}
</script>

<style></style>
