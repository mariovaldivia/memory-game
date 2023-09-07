<template>
  <div>
    Aciertos {{ asserted }}

    Errores {{  failed }}

  </div>
</template>

<script>
export default {
  props: ['asserted', 'failed'],
  setup(props) {
    return {
      
    }
  }
}
</script>

<style>

</style>