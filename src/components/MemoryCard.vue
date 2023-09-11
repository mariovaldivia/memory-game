<template>
    <button class="flip-box" :aria-label="cardLabel">
      <div class="flip-box-inner" :class="{ flip: flip }">

        <div class="flip-box-front">
          <img class="animal-card-image img-thumbnail" :src="CardBack" :alt="cardLabel" />
        </div>

        <div class="flip-box-back">
          <img class="animal-card-image img-thumbnail" :src="animal.url" :alt="animal.slug" />
        </div>

      </div>
    </button>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import CardBack from "../assets/Random_box_Card_back.svg";

export default {
  props: ['animal', 'flip', 'index'],
  setup(props) {
    const cardLabel = computed(() => {
        return `Card ${props.index + 1} ${props.flip ? props.animal.slug : ''}`
    })
    return {
      CardBack,
      cardLabel
    }
  }
}
</script>

<style>
  .animal-card {
    margin: 0.5em;
    width: 150px;
    height: 220px;
  }

  .animal-card-image {
    width: 150px;
    aspect-ratio: 2/3;
    object-fit: cover;
    transition: opacity 0.25s ease-in-out;
  }

  .animal-card:hover {
    opacity: .7;
  }

  button.flip-box {
    background-color: white;
    position: relative;
    border: none
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

  .flip-box-front,
  .flip-box-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .flip-box-front {
    color: black;
  }

  .flip-box-back {
    color: white;
    transform: rotateY(180deg);
  }

  @media (max-width: 576px) {
    .animal-card {
      margin: 0.1em;
      width: 100px;
      height: 150px;
    }
  }
</style>
