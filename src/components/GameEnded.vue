<template>
  <modal>
    <section class=" p-5 z-100 bg-body-tertiary border rounded-3 welcome-overlay">

      <h1>Congratulations {{ name }}</h1>

      <div class="row ">
        <div class="col-6">
          <img class="" :src="Trophy" alt="Trophy" />
        </div>

        <div class="col-6 align-middle">
          <div class="vstack gap-3 p-2 align-middle">
            <div class="p-2">{{ asserted }} asserted</div>
            <div class="p-2">{{ failed }} failed</div>
          </div>

        </div>
      </div>

      <div class="hstack gap-2 justify-content-center">
        <div class="p-1">
          <button type="button" class="btn btn-primary m-1" @click="restartGame">
            Play again
          </button>
        </div>

        <div class="p-1">
          <button type="button" class="btn btn-primary m-1" @click="changeUser">
            Change user
          </button>
        </div>

      </div>
    </section>
  </modal>
</template>
  
<script lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user';
import Modal from './Modal.vue'
import Trophy from "../assets/Trophy_Flat_Icon.svg";
export default {
  // props: ['asserted', 'failed'],
  emits: ['startGame'],
  components: {
    Modal
  },
  props: {
    asserted: Number,
    failed: Number
  },
  setup(props, { emit }) {
    const userStore = useUserStore();
    const name = ref(userStore.userName);

    const restartGame = () => {
      emit('startGame')

    }

    const changeUser = () => {
      userStore.setName('')

    }
    return {
      name,
      Trophy,
      restartGame,
      changeUser
    }
  }
}
</script>
  
<style></style>