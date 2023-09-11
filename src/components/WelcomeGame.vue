<template>
  <modal>
    <section class="h-100 p-5 z-100 bg-body-tertiary border rounded-3 welcome-overlay">

      <h1>Memory Game</h1>

      <div class="row">
        <form action="#">
          <div class="mb-3">
            <label for="name" class="form-label">Your name</label>
            <div class="input-group has-validation">
              <input type="text" class="form-control form-control-lg" :class="{ 'is-invalid': nameInvalid }" id="name"
                ref="name" required>
              <div class="invalid-feedback">
                Please enter your name.
              </div>
            </div>

            <button type="button" class="btn btn-success mt-2" @click="setName">
              Start
            </button>

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
    const nameInvalid = ref(false);
    const userStore = useUserStore();

    const setName = () => {
      const nameValue = name.value?.value
      if (nameValue != '') {
        nameInvalid.value = false
        console.log("starting game", nameValue)
        userStore.setName(nameValue);
        emit('startGame')

      } else {
        nameInvalid.value = true
      }

    }
    return {
      name,
      nameInvalid,
      setName
    }
  }
}
</script>
  
<style></style>