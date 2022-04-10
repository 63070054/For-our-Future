<script setup>
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/skyblue";
import "@splidejs/vue-splide/css/sea-green";
</script>

<template>
  <main>
    <Splide
      aria-labelledby="autoplay-example-heading"
      :options="options"
      :has-track="false"
    >
      <div style="position: relative">
        <SplideTrack>
          <SplideSlide v-for="(slide, index) in slides" :key="index">
            <img
              :src="slide"
              style="width: 100%; aspect-ratio: 10/2; background-size: cover"
            />
          </SplideSlide>
        </SplideTrack>

      </div>

      <div class="splide__progress">
        <div class="splide__progress__bar"></div>
      </div>
    </Splide>
    This is homePage
  </main>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        "https://i.pinimg.com/564x/10/7e/32/107e3246dfd43c453256471691e2b072.jpg",
        "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_960_720.jpg",
      ],
      options: {
        rewind: true,
        autoplay: true,
        resetProgress: false,
        // transition duration
        speed: 1 * 1000,
        rewindByDrag: true,
        arrows: false,
        // duration change slide
        interval: 5 * 1000
      },
    };
  },
};
</script>
