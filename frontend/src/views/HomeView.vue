<script setup>
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/skyblue";
import "@splidejs/vue-splide/css/sea-green";
import CardCampNews from "../components/CardCampNews.vue";
import CardRecommendUniversity from "../components/CardRecommendUniversity.vue";
</script>

<template>
  <main style="background-color: #dbf6e9">
    <div style="min-height: calc(100vh - 3.25rem)">
      <Splide
        class="px-5 pt-5"
        aria-labelledby="autoplay-example-heading"
        :options="options"
        :has-track="false"
      >
        <div style="position: relative">
          <SplideTrack>
            <SplideSlide
              v-for="(slide, index) in slides"
              :key="index"
              style="background-color: #0a1822"
            >
              <router-link :to="{ path: '/news/' + slide.news_id }">
                <div style="position: relative; height: 100%; width: 100%">
                  <img
                    :src="`http://localhost:5000/` + slide.news_picture"
                    style="
                      height: 100%;
                      object-fit: cover;
                      position: relative;
                      left: 50%;
                      transform: translateX(-50%);
                      opacity: 0.2;
                    "
                  />
                  <div
                    class="content"
                    style="
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                  >
                    <h1 style="color: white;">
                      {{ slide.news_title }}
                    </h1>
                  </div>
                </div>
              </router-link>
            </SplideSlide>
          </SplideTrack>
        </div>

        <div class="splide__progress">
          <div class="splide__progress__bar"></div>
        </div>
      </Splide>
      <div class="columns px-6">
        <div class="column is-half">
          <h1 class="title has-text-weight-bold">ค่ายกิจกรรมที่แนะนำ</h1>
          <div
            class="container px-3 py-1 has-background-white-bis has-text-black"
          >
            <div v-for="camp in recommendCamps" :key="camp.category_no">
              <router-link :to="{ path: '/news/' + camp.news_id }">
                <CardCampNews
                  :news_title="camp.news_title"
                  :news_desc="camp.news_desc"
                  :news_created_date="camp.news_created_date"
                  :news_picture="camp.news_picture"
                ></CardCampNews>
              </router-link>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="container pb-3 mt-4" style="background-color: #de8971">
            <h1 class="py-3 title has-text-weight-bold has-text-centered">
              Recommend University
            </h1>
           <div v-for="uni in recommendUniversities" :key="uni.uni_id">
              <router-link :to="{ path: `/${uni.uni_name}/faculty` }">
                <CardRecommendUniversity
                  :uni_name="uni.uni_name"
                  :uni_created_date="uni.u_created_date"
                  :uni_picture="uni.file_path"
                ></CardRecommendUniversity>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      slides: [],
      options: {
        rewind: true,
        autoplay: true,
        resetProgress: false,
        // transition duration
        speed: 1 * 1000,
        rewindByDrag: true,
        arrows: false,
        // duration change slide
        interval: 5 * 1000,
      },
      recommendCamps: [],
      recommendUniversities: [],
    };
  },
  async mounted() {
    await this.getLatestNews();
    await this.getRecommendCamps();
    await this.getRecommendUniversities();
  },
  methods: {
    async getLatestNews() {
      await axios
        .get(`http://localhost:5000/latestNews`)
        .then((response) => {
          this.slides = response.data.news;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    async getRecommendCamps() {
      await axios
        .get(`http://localhost:5000/recommendCamps`)
        .then((response) => {
          this.recommendCamps = response.data.recommendCamps;
          console.log(response.data.recommendCamps);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    async getRecommendUniversities() {
      await axios
        .get(`http://localhost:5000/recommendUniversities`)
        .then((response) => {
          this.recommendUniversities = response.data.recommendUniversities;
          console.log(response.data.recommendUniversities)
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
