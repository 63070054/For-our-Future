<script setup>

</script>

<template>
  <main class="m-3">
    <router-link :to="`/news/${news_info.news_id}/edit`" style="position:absolute;left: 5px; top: 5px; z-index: 2;">
      <button class="button is-info is-small" type="button">
        <span class="icon">
          <i class="fas fa-pen" style="font-size: 16px;"></i>
        </span>
      </button>
    </router-link>
    <button class="button is-danger is-small" type="button"
      style="position:absolute; left: 45px; top: 5px; z-index: 10;" @click="deleteNews(news_info)">
      <span class="icon">
        <i class="fas fa-trash-alt" style="font-size: 16px;"></i>
      </span>
    </button>
    <router-link :to="{ path: path }">
      <div class="card has-text-black">
        <div class="card-image">
          <div class="date is-size-6 has-text-white px-2 py-1 mt-1 mr-1">
            {{ news_info.news_created_date.substr(0, 10) }}
          </div>
          <figure class="image is-5by3">
            <!-- 600*480 -->
            <img :src="`http://localhost:5000/` + news_info.news_picture" style="object-fit: cover;
    object-position: top center;">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <h1>{{ news_info.news_title }}</h1>
            <p class="news_desc">{{ news_info.news_desc }}</p>
          </div>
        </div>
        <footer class="card-footer tags pb-2">
          <div class="camp is-size-6 has-text-white px-2 py-1 ml-2 mt-2" v-for="(cate, index) in category" :key="index">
            {{ cate.category_name }}
          </div>
        </footer>
      </div>
    </router-link>
  </main>
</template>

<script>

export default {
  props: ['news_info', 'category', 'path'],
  data() {
    return {}
  },
  methods: {
    deleteNews(news) {
      this.$emit("delete-news_category");
    },
  }
}
</script>

<style scoped>
.card {
  width: 400px;
}

.card-footer {
  background-color: #9ddfd3;
}

.camp {
  background-color: #114e60;
  border-radius: 3px;
}

.date {
  position: absolute;
  z-index: 1;
  right: 0;
  border-radius: 3px;
  background-color: #de8971;
}

.news_desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>