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
        v-for="news in filterNewes"
        :key="news.id"
      >
        <CardNews :news_info="news"></CardNews>
      </div>
    </div>
    <router-link to="/news/add"><IconAdd></IconAdd></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // variable for input
      keyword: "",
      // variable for loop only
      newses: [
        {
          id: 1,
          title: "เป็ดกินไก่หน้าปากซอย",
          description:
            "พบเป็ดกินไก่หน้าปากซอยซึ่ง ไก่จริงๆแล้วคือแมว ที่กำลังกินเป็ดต่างหาก",
          categories: ["ข่าวสด", "ไก่แดกเป็ด หรือเป็ดแดกไก่"],
          createdDate: "2022-04-30",
        },

        {
          id: 2,
          title: "ผู้ร้ายคลั่งทำร้ายเจ้าหน้าที่ เนื่องอยากแดกกะเพราไก่",
          description:
            "พบอดีตผู้ร้ายกลับมาอาละวาดหลังถูกปล่อยตัวได้ 7 วัน คลั่งบุกร้านกะเพราไก่พร้อมทำร้านเจ้าหน้าที่ตำรวจที่มาห้ามเนื่องจากอยากกินกะเพราไก่",
          categories: ["กะเพราไก่", "ข่าวเชี่ยไรไม่รู้"],
          createdDate: "2022-08-30",
        },
      ],
    };
  },
  computed: {
    filterNewes() {
      let newses = this.newses;
      newses = newses.filter((news) => {
        let categoriesIncludesKeyword = false;
        let filterCategories = news.categories.filter((cate) =>
          cate.includes(this.keyword)
        );
        if (filterCategories.length != 0) {
          categoriesIncludesKeyword = true;
        }
        return (
          news.title.includes(this.keyword) ||
          news.description.includes(this.keyword) ||
          categoriesIncludesKeyword
        );
      });
      return newses;
    },
  },
};
</script>

<style lang=""></style>
