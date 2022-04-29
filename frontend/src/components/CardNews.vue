<script setup>

</script>

<template>
  <main class="m-3">
    <div class="card has-text-black">
      <router-link :to="`/news/${news_info.news_id}/edit`" style="position:absolute;left: 5px; top: 5px; z-index: 2;">
        <button class="button is-info is-small" type="button">
          <span class="icon">
            <i class="fas fa-pen" style="font-size: 16px;"></i>
          </span>
        </button>
      </router-link>
      <div class="card-image">
        <div class="date is-size-6 has-text-white px-2 py-1 mt-1 mr-1">
          {{ news_info.news_created_date.substr(0, 10) }}
        </div>
        <figure class="image is-5by3">
          <!-- 600*480 -->
          <img :src="`http://localhost:5000/` + news_info.news_picture">
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h1>{{ news_info.news_title }}</h1>
          <p>{{ news_info.news_desc }}</p>
        </div>
      </div>
      <footer class="card-footer tags pb-2">
        <div class="camp is-size-6 has-text-white px-2 py-1 ml-2 mt-2" v-for="(cate, index) in category" :key="index">
          {{ cate.category_name }}
        </div>
      </footer>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  props: ['news_info', 'category'],
  data() {
    return {}
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
</style>