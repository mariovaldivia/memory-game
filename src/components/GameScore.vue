<template>
  <div class="row">
    <div class="col">
      {{  userName }}

      <button class="btn btn-primary" @click="changeUser">Cambiar</button>
    </div>
    <div class="col">
      Aciertos
    </div>
    <div class="col">
        {{ asserted }}
    </div>

    <div class="col">
      Errores
    </div>

    <div class="col">
      {{  failed }}
    </div>

  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia'

export default {
  props: ['asserted', 'failed'],
  setup(props) {
    const userStore = useUserStore()
    const { userName } = storeToRefs(userStore)

    function changeUser(){
      userStore.setName('')
    }
    return {
        userName,
        changeUser
    }
  }
}
</script>

<style>

</style>