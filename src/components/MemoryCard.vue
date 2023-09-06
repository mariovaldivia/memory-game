<template>
    <img class="animal-card img-thumbnail" 
        :src="animal.fields.image.url" 
        alt="">
</template>

<script lang="ts">
    import { ref } from 'vue';

    export default {
        props: ['animal'],
        setup(props){
            
            return {
                
            }
        }
    }
</script>

<style>
.animal-card {
    width: 200px;
    aspect-ratio: 2/3;
    margin: 0.5em;
    object-fit: cover;

}
</style>