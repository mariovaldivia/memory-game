<template>


    <GameScore :asserted="numberAsserted" :failed="numberFailed"></GameScore>


    <MemoryCard class="animal-card" v-for="(animal, index) in animals" :animal="animal" :index="index" :key="index"
      :flip="isFlipped(index)" @click="flipCard(index)">
    </MemoryCard>

 
</template>

<script lang="ts">
import { ref, reactive, toRaw, onMounted, nextTick } from 'vue'
import { getAnimalImages } from '../services/animals'
import MemoryCard from './MemoryCard.vue'
import GameScore from './GameScore.vue'
import { shuffle } from '../utils/utils'
export default {
  components: { MemoryCard, GameScore },
  setup() {
    const animals = ref([])
    const numberOfPairs = 3
    const selectedAnimal = ref([])
    const assertedCards = ref([])
    const numberAsserted = ref(0)
    const numberFailed = ref(0)
    onMounted(() => {
      getAnimalImages().then((response) => {
        // console.log(response.data)
        const listOfAnimals = getListOfAnimals(response.data.entries);
        const listPairsOfAnimals = listOfAnimals.flatMap((data) => {
          return [data, data];
        })
        // console.log(listPairsOfAnimals)
        animals.value = shuffle(listPairsOfAnimals)
      })

    })

    const flipCard = (index) => {
      // const animalClicked = toRaw(animals.value)[index]
      const { slug } = animals.value[index]
      console.log("clicked", index, slug)
      console.log("selected", toRaw(selectedAnimal.value))
      if (!canFlipCard(index)) return

      const animalObj = {
        index: index,
        slug: slug,
        flipped: true
      }
      const currentAnimals = toRaw(selectedAnimal.value)
      selectedAnimal.value = [animalObj, ...currentAnimals]

      const selected = toRaw(selectedAnimal.value)
      if(selected.length == 2){
        const equalCards = checkEqualCards(selected)
        // console.log("Equal cards", equalCards)
        if(equalCards){
          console.log(selected)
          assertedCards.value = [selected, ...toRaw(assertedCards.value)]
          console.log("Asserted",toRaw(assertedCards.value))
          numberAsserted.value += 1
        }else{
          numberFailed.value += 1
        }

        setTimeout(() => {
          cleanSelected()

        }, 1000)
      }

    }

    const cleanSelected = () => {
        console.log("cleaning selected", selectedAnimal.value.length)
        selectedAnimal.value = []
    }

    const canFlipCard = (id) => {
      // const { index, slug } = toRaw(animals.value)[id]
      const selected = toRaw(selectedAnimal.value)
      return !hasIndexSelected(selected, id) && selected.length < 2;
    }

    const hasIndexSelected = (selectedList: [], index) => {
      // console.log("selected", selectedList)
      if(selectedList.length == 0) return null
      return selectedList.find(card => card.index == index)
    }

    function isFlipped(index){
      
      const selected = hasIndexSelected(selectedAnimal.value, index)
      const asserted = hasIndexSelected(toRaw(assertedCards.value), index)
      // console.log(toRaw(assertedCards.value))
      // console.log(selected, asserted)
      return selected || asserted
    }

    const checkEqualCards = (selectedList) => {
      return selectedList[0].slug == selectedList[1].slug
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
      isFlipped,
      numberFailed, 
      numberAsserted
    }
  }
}
</script>

<style></style>
