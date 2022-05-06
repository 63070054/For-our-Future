<script setup></script>
<template>
  <!-- <div class="has-background-danger p-2" > -->
  <div class="card is-full my-3 mx-2 columns" style="background-color: white">
    <div class="card-image column">
      <figure
        class="image image is-1by1"
        style="height: 100%"
      >
        <img :src="`http://localhost:5000/` + uni_picture" style="width: 100%; aspect-ratio: 1/1; margin: auto; height: auto; object-fit: contain;">
      </figure>
    </div>
    <div class="column is-four-fifths" style="position: relative">
      <div class="content">
        <div class="is-size-5 has-text-weight-bold">{{ uni_name }}</div>
      </div>
      <div
        class="subtitle level-right is-size-6 mr-3 mb-3"
        style="position: absolute; bottom: 0px; right: 0px"
      >
        {{ uni_created_date.substring(0, 10) }}
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: ["uni_name", "uni_created_date", "uni_picture"],
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
