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
          placeholder="ค้นหาข่าวสารที่คุณต้องการ"
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
        v-for="news in filterNewes"
        :key="news.news_id"
      >
        <CardNews
          :news_info="news"
          :path="`/news/${news.news_id}`"
          :category="news.category_name"
          :user="user"
          @delete-news_category="deleteNews(news)"
        ></CardNews>
      </div>
    </div>
    <router-link to="/news/add" v-if="user && user.type_user == 'admin'"
      ><IconAdd message="ข่าวสาร"></IconAdd
    ></router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['user'],
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
      newses = newses.filter((news) => {
        let categoriesIncludesKeyword = false;
        let filterCategories = news.category_name.filter((cate) =>
          cate.category_name.includes(this.keyword)
        );
        if (filterCategories.length != 0) {
          categoriesIncludesKeyword = true;
        }
        return (
          news.news_title.includes(this.keyword) ||
          news.news_desc.includes(this.keyword) ||
          news.category_name.includes(this.keyword) ||
          categoriesIncludesKeyword
        );
      });
      return newses;
    },
  },
  mounted() {
    this.getNews();
  },
  methods: {
    getNews() {
      axios
        .get(`http://localhost:5000/news`)
        .then((response) => {
          this.newses = response.data.news;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    deleteNews(newsId) {
      let result = confirm("are u sure u want to delete");
      if (result) {
        axios
          .delete(`http://localhost:5000/deleteNews/${newsId.news_id}`)
          .then((response) => {
            this.newses = this.newses.filter(
              (val) => val.news_id != newsId.news_id
            );
            // alert("คุณลบสำเร็จแล้ว")
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
  },
};
</script>

<style lang=""></style>
