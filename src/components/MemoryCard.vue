<template>
  <div>
    <figure class="flip-box">
      <div class="flip-box-inner" :class="{flip: flip}" >

        <div class="flip-box-front">
          <img class="animal-card-image img-thumbnail" :src="CardBack" alt="" />
        </div>
    
        <div class="flip-box-back">
          <img class="animal-card-image img-thumbnail" :src="animal.url" alt="" />
        </div>
        
      </div>
    </figure>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import CardBack from "../assets/Random_box_Card_back.svg"; 

export default {
  props: ['animal', 'flip'],
  setup(props) {
    return {
      CardBack
    }
  }
}
</script>

<style>

.animal-card{
  margin: 0.5em;
  width: 200px;
  height: 300px;
}

.animal-card-image {
  width: 200px;
  aspect-ratio: 2/3;
  
  object-fit: cover;
  transition: opacity 0.25s ease-in-out;
}

.animal-card:hover {
  opacity: .7;
}

.flip-box {
  background-color: white;
  position: relative;
  /* width: 300px;
  height: 200px; */
  /* border: 1px solid #f1f1f1; */
  /* perspective: 1000px; */
}

.flip-box-inner {
  
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-box .flip-box-inner.flip {
  transform: rotateY(180deg);
}

.flip-box-front, .flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-box-front {
  /* background-color: #bbb; */
  color: black;
}

.flip-box-back {
  /* background-color: #555; */
  color: white;
  transform: rotateY(180deg);
}
</style>
