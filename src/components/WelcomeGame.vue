<template>
  <modal>
    <section class="h-100 p-5 z-100 bg-body-tertiary border rounded-3 welcome-overlay">

      <h1>Memory Game</h1>
      <div class="row">
        <form action="#">
          <div class="mb-3">
            <label for="name" class="form-label">Your name</label>
            <input type="text" class="form-control form-control-lg" id="name" ref="name" placeholder="Your name" required>

            <button type="button" class="btn btn-success mt-2" @click="setName">Start</button>

          </div>

        </form>
      </div>
    </section>
  </modal>

</template>
  
<script lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user';
import Modal from './Modal.vue'
export default {
  // props: ['asserted', 'failed'],
  emits: ['startGame'],
  components: {
    Modal
  },
  setup(props, { emit }) {
    const name = ref(null);
    const userStore = useUserStore();

    const setName = () => {
      const nameValue = name.value?.value
      if (nameValue != '') {
        console.log("starting game", nameValue)
        userStore.setName(nameValue);
        emit('startGame')

      }

    }
    return {
      name,
      setName
    }
  }
}
</script>
  
<style></style>