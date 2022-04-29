<script setup>
import CardNews from "@/components/CardNews.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
</script>

<template lang="">
  <div style="background-color: #dbf6e9" class="p-4">
    <div class="field has-addons has-addons-centered">
      <div class="control" style="width: 60%">
        <input
          class="input"
          type="text"
          placeholder="ค้นหามหาวิทยาลัยที่คุณต้องการ"
          v-model="keyword"
        />
      </div>
      <div class="control">
        <a class="button has-text-white" style="background-color: #114e60">
          <i class="fa fa-search"></i>
        </a>
      </div>
    </div>
    <div class="columns is-multiline">
      <div
        class="column is-one-third"
        v-for="news in filterNewes.news"
        :key="news.news_id"
      >
        <CardNews :news_info="news" :category="filterCategory(news.news_id, filterNewes.category)"></CardNews>
      </div>
    </div>
    <router-link to="/news/add"><IconAdd></IconAdd></router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      // variable for input
      keyword: "",
      // variable for loop only
      newses: [],
    };
  },
  computed: {
    filterNewes() {
      let newses = this.newses;
      // newses = newses.filter((news) => {
      //   // let categoriesIncludesKeyword = false;
      //   // let filterCategories = news.category_name.filter((cate) =>
      //   //   cate.includes(this.keyword)
      //   // );
      //   // if (filterCategories.length != 0) {
      //   //   categoriesIncludesKeyword = true;
      //   // }
      //   return (
      //     news.news_title.includes(this.keyword) ||
      //     news.news_desc.includes(this.keyword)
      //     // news.category_name.includes(this.keyword)
      //     // categoriesIncludesKeyword
      //   );
      // });
      return newses;
    },
  },
  mounted() {
    this.getNews();
  },
  methods: {
    getNews() {
      axios.get(`http://localhost:5000/news`)
        .then((response) => {
          this.newses = response.data
          console.log(this.newses.news)
        })
        .catch((error) => {
          alert(error.response.data.message)
        });
    },
    filterCategory(Id, category){
      console.log(Id)
      return category.filter(cat => cat.news_id === Id)
    }
  }
};
</script>

<style lang=""></style>
