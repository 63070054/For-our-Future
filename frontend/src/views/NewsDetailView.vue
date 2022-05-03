<script setup>
import CardNews from "@/components/CardNews.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
</script>

<template lang="">
  <div style="background-color: #dbf6e9">
    <div style="width: 100%; height: 315px; background-color: #0f1123">
      <img
        :src="`http://localhost:5000/` + news.news_picture"
        style="
          height: 100%;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        "
      />
    </div>
    <div class="content p-4">
      <div class="tags">
        <div
          class="camp is-size-6 has-text-white px-2 py-1 ml-2"
          v-for="(cate, index) in category"
          :key="index"
        >
          {{ cate.category_name }}
        </div>
      </div>
      <h1>{{ news.news_title }}</h1>
      <p>{{ news.news_desc }}</p>
      <h2>แหล่งอ้างอิง</h2>
      <a v-for="ref in ref" :href="ref.ref_name">{{ ref.ref_name }}<br /></a>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      news: {
        news_picture: "images/news.png",
      },
      category: [],
      ref: [],
    };
  },
  mounted() {
    this.getNews(this.$route.params.newsId);
  },
  methods: {
    getNews(newsId) {
      axios
        .get(`http://localhost:5000/news/${newsId}`)
        .then((response) => {
          this.news = response.data.news[0];
          this.category = response.data.category;
          this.ref = response.data.reference;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style>
.camp {
  background-color: #114e60;
  border-radius: 3px;
}
</style>
