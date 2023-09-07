<template>
    <section>

        <h1>Welcome to Memory Game</h1>
        <div class="row">
            <form action="#">
                <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Your name</label>
                <input type="text" class="form-control form-control-lg" id="name" ref="name" placeholder="Your name">
                
                <button type="button" class="btn btn-primary" @click="setName">Start</button>

            </div>

            </form>
            
            
        </div>
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

        const setName = () => {
            console.log("name", name.value)
            userStore.setName(name.value.value);
            emit('startGame')

        }
      return {
        name,
        setName
      }
    }
  }
  </script>
  
  <style>
  
  </style>