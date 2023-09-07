<template>
    <section>

        <h1>YOU WIN</h1>
        <div class="row">
                   
        </div>
        <button type="button" class="btn btn-primary" @click="restartGame">
            Restart game
        </button>
    </section>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue'
  import { useUserStore } from '../stores/user';
  export default {
    // props: ['asserted', 'failed'],
    emits: ['startGame'],
    setup(props, {emit}) {
        const name = ref(null);
        const userStore = useUserStore();

        const restartGame = () => {
            emit('startGame')

        }
      return {
        name,
        restartGame
      }
    }
  }
  </script>
  
  <style>
  
  </style>