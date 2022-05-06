<script setup></script>
<template>
  <!-- <div class="has-background-danger p-2" > -->
  <div class="card is-full my-3 mx-2 columns" style="background-color: #83cfc1">
    <div class="card-image column">
      <figure
        class="image image is-1by1"
        style="height: 100%"
      >
        <img :src="`http://localhost:5000/` + news_picture" style="width: 100%; aspect-ratio: 1/1; margin: auto; height: auto; object-fit: cover;">
      </figure>
    </div>
    <div class="column is-four-fifths" style="position: relative">
      <div class="content">
        <div class="is-size-5 has-text-weight-bold">{{ news_title }}</div>
        <div class="textlimit is-size-5">
          {{ news_desc }}
        </div>
      </div>
      <div
        class="subtitle level-right is-size-6 mr-3 mb-3"
        style="position: absolute; bottom: 0px; right: 0px"
      >
        {{ news_created_date.substring(0, 10) }}
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: ["news_title", "news_desc", "news_created_date", "news_picture", "isCamp"],
  data() {
    return {};
  },
};
</script>

<style>
.textlimit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
