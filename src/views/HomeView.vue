<script setup>
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/skyblue";
import "@splidejs/vue-splide/css/sea-green";
import CardCampNews from "../components/CardCampNews.vue";
</script>

<template>
  <main style="background-color: #DBF6E9">
    <div style=" min-height: calc(100vh - 3.25rem);">
      <Splide class="px-5 pt-5" aria-labelledby="autoplay-example-heading" :options="options" :has-track="false">
        <div style="position: relative;">
          <SplideTrack>
            <SplideSlide v-for="(slide, index) in slides" :key="index">
              <img :src="slide" style="width: 100%; aspect-ratio: 10/2; background-size: cover" />
            </SplideSlide>
          </SplideTrack>

        </div>

        <div class="splide__progress">
          <div class="splide__progress__bar"></div>
        </div>
      </Splide>
      <div class="columns px-6">
        <div class="column is-half ">
          <h1 class="title has-text-weight-bold">ค่ายกิจกรรมที่แนะนำ</h1>
          <div class="container px-3 py-1 has-background-white-bis has-text-black">
            <CardCampNews></CardCampNews>
            <CardCampNews></CardCampNews>
            <CardCampNews></CardCampNews>
            <div class="level-right">
              <a>อ่านเพิ่มเติม</a>
            </div>
          </div>
        </div>
        <div class="column is-half ">
          <div class="container pb-3 mt-4" style="background-color:#DE8971; ">
            <h1 class="py-3 title has-text-weight-bold has-text-centered">Top 5 University</h1>
            <div class="mx-5 my-5" style="background-color:#F9F7F0; height:50px"></div>
            <div class="mx-5 my-5" style="background-color:#F9F7F0; height:50px"></div>
            <div class="mx-5 my-5" style="background-color:#F9F7F0; height:50px"></div>
            <div class="mx-5 my-5" style="background-color:#F9F7F0; height:50px"></div>
            <div class="mx-5 my-5" style="background-color:#F9F7F0; height:50px"></div>
          </div>
        </div>
      </div>
    </div>
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
