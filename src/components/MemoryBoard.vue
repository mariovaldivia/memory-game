<template>

    <Welcome v-if="!name" @start-game="startGame"></Welcome>

    <GameScore :asserted="numberAsserted" :failed="numberFailed"></GameScore>

    <LoadingGame v-if="loading"></LoadingGame>
    <MemoryCard class="animal-card" v-for="(animal, index) in animals" :animal="animal" :index="index" :key="index"
      :flip="isFlipped(index)" @click="flipCard(index)">
    </MemoryCard>

    <GameEnded v-if="gameEnded" @start-game="startGame"></GameEnded>
</template>

<script lang="ts">
import { ref, reactive, toRaw, onMounted, watch } from 'vue'
import { getAnimalImages } from '../services/animals'
import MemoryCard from './MemoryCard.vue'
import LoadingGame from './LoadingGame.vue'
import Welcome from './Welcome.vue'
import GameScore from './GameScore.vue'
import GameEnded from './GameEnded.vue'
import { shuffle } from '../utils/utils'
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia'

export default {
  components: { 
    MemoryCard, GameScore, LoadingGame, Welcome, GameEnded },
  setup() {
    const animals = ref([])
    const numberOfPairs = 3
    const selectedAnimal = ref([])
    const assertedCards = ref([])
    const numberAsserted = ref(0)
    const numberFailed = ref(0)
    const gameEnded = ref(false)
    const loading = ref(false)

    const userStore = useUserStore();
    const { userName } = storeToRefs(userStore)
    onMounted(() => {
      console.log(userName.value)
      if(userName.value){
        loadGameBoard()
      }

    })

    const loadGameBoard = () => {
      getAnimalImages().then((response) => {
        // console.log(response.data)
        const listOfAnimals = getListOfAnimals(response.data.entries);
        const listPairsOfAnimals = listOfAnimals.flatMap((data) => {
          return [data, data];
        })
        // console.log(listPairsOfAnimals)
        animals.value = shuffle(listPairsOfAnimals)
        loading.value = false
      })
    }
  
    watch(numberAsserted, async(newNumber, oldNumber) => {
      console.log("aciertos", newNumber)
      if(newNumber == numberOfPairs){
        console.log("Ganaste")
        gameEnded.value = true
      }
    })

    watch(userName, async(newValue, oldValue) => {
      console.log("aciertos", newValue)
      if(newValue == ''){
        resetGame()        
      }
    })

    const flipCard = (index) => {
      // const animalClicked = toRaw(animals.value)[index]
      const { slug } = animals.value[index]
      console.log("clicked", index, slug)
      console.log("selected", toRaw(selectedAnimal.value))
      if (!canFlipCard(index) || isFlipped(index)) return

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
        if(equalCards){
          assertedCards.value = [...selected, ...toRaw(assertedCards.value)]
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

    const startGame = () => {
      console.log("starting game")
      loading.value = true
      gameEnded.value = false
      resetGame()
      loadGameBoard()
    }

    const resetGame = () => {
      numberAsserted.value = 0
      numberFailed.value = 0
      cleanSelected()
      animals.value = []
      assertedCards.value = []
      gameEnded.value = false
    }

    console.log(userName)
    return {
      animals,
      flipCard,
      canFlipCard,
      isFlipped,
      numberFailed, 
      numberAsserted,
      loading,
      name: userName,
      startGame,
      gameEnded
    }
  }
}
</script>

<style></style>
