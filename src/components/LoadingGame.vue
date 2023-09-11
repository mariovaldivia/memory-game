<template>
    <div class="d-flex justify-content-center">
        <p aria-hidden="true" class="placeholder-wave">
            <span v-for="n in 12" class="placeholder col-1 card-placeholder" :key="n"></span>
        </p>
    </div>

</template>
  
<script lang="ts">
export default {

}
</script>
  
<style>
p {
    width:100%
}

.card-placeholder {
    width: 150px;
    aspect-ratio: 2/3;
    margin: 0.5em
}
</style>