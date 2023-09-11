<template>
  <welcome-game v-if="!name" @start-game="startGame"></welcome-game>

  <GameScore :asserted="numberAsserted" :failed="numberFailed" :loaded="!loading"></GameScore>

  <section class="card shadow-sm container">
    <div class="game d-flex justify-content-center">
      <memory-card class="animal-card" v-for="(animal, index) in animals" :animal="animal" :index="index" :key="index"
        :flip="isFlipped(index)" @click="flipCard(index)">
      </memory-card>

      <loading-game v-if="loading"></loading-game>
    </div>
  </section>

  <game-ended v-if="gameEnded" :asserted="numberAsserted" :failed="numberFailed" @start-game="startGame"></game-ended>
</template>

<script lang="ts">
import { ref, toRaw, onMounted, watch } from 'vue'
import { getAnimalImages } from '../services/animals'
import MemoryCard from './MemoryCard.vue'
import LoadingGame from './LoadingGame.vue'
import WelcomeGame from './WelcomeGame.vue'
import GameScore from './GameScore.vue'
import GameEnded from './GameEnded.vue'
import { shuffle } from '../utils/utils'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'

export default {
  props:{
    pairs: Number
  },
  components: {
    MemoryCard,
    GameScore,
    LoadingGame,
    WelcomeGame,
    GameEnded
  },
  setup(props) {
    const animals = ref([])
    const selectedAnimal = ref([])
    const assertedCards = ref([])
    const numberAsserted = ref(0)
    const numberFailed = ref(0)
    const gameEnded = ref(false)
    const loading = ref(true)

    const userStore = useUserStore()
    const { userName } = storeToRefs(userStore)
    onMounted(() => {
      console.log(userName.value)
      if (userName.value) {
        loadGameBoard()
      }
    })

    const loadGameBoard = () => {
      getAnimalImages().then((response) => {
        const listOfAnimals = getListOfAnimals(response.data.entries)
        const listPairsOfAnimals = listOfAnimals.flatMap((data) => {
          return [data, data]
        })
        animals.value = shuffle(listPairsOfAnimals)
        loading.value = false
      })
    }

    watch(numberAsserted, async (newNumber, oldNumber) => {
      if (newNumber == props.pairs) {
        gameEnded.value = true
      }
    })

    watch(userName, async (newValue, oldValue) => {      
      if (newValue == '') {
        resetGame()
        loading.value = true
      }
    })

    const flipCard = (index) => {
      const { slug } = animals.value[index]

      if (!canFlipCard(index) || isFlipped(index)) return

      const animalObj = {
        index: index,
        slug: slug,
        flipped: true
      }
      const currentAnimals = toRaw(selectedAnimal.value)
      selectedAnimal.value = [animalObj, ...currentAnimals]

      const selected = toRaw(selectedAnimal.value)
      if (selected.length == 2) {
        const equalCards = checkEqualCards(selected)
        if (equalCards) {
          assertedCards.value = [...selected, ...toRaw(assertedCards.value)]
          numberAsserted.value++
        } else {
          numberFailed.value++
        }

        setTimeout(() => {
          cleanSelected()
        }, 1000)
      }
    }

    const cleanSelected = () => {
      selectedAnimal.value = []
    }

    const canFlipCard = (id: Number) => {
      const selected = toRaw(selectedAnimal.value)
      return !hasIndexSelected(selected, id) && selected.length < 2
    }

    const hasIndexSelected = (selectedList: [], index: Number) => {
      if (selectedList.length == 0) return null
      return selectedList.find((card) => card.index == index)
    }

    function isFlipped(index: Number) {
      const selected = hasIndexSelected(selectedAnimal.value, index)
      const asserted = hasIndexSelected(toRaw(assertedCards.value), index)
      return selected || asserted
    }

    const checkEqualCards = (selectedList: []) => {
      if(selectedList.length != 2) return false
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
        })
      ).slice(0, props.pairs)
    }

    const startGame = () => {
      console.log('starting game')
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

<style>
.game {
  clear: both;
  width: 100%;
  display: flex;
  gap: 0.2em;
  place-items: flex-start;
  flex-wrap: wrap;
  padding: 1.5rem
}
</style>
