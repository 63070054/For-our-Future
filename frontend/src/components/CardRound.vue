<script setup></script>

<template>
  <div class="round">
    <div
      class="roundColor"
      :style="{ 'background-color': backgroundRound[round - 1] }"
    ></div>
    <div class="right-side has-background-white has-text-black">
      <h1 class="is-size-3 has-text-centered pt-5">
        รอบการสมัครที่ {{ round }}
      </h1>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  props: ["round"],
  data() {
    return {
      faculty: [],
      backgroundRound: ["#f6c667", "#ff7070", "#9f7bc4", "#6ebf8b", "#88cdff"],
    };
  },
};
</script>

<style scoped>
.round {
  position: relative;
  width: 100%;
}
.right-side {
  width: 100%;
  height: 100px;
}
.right-side h1 {
  z-index: 2;
}
.roundColor {
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  transition: 0.1s;
  transition-timing-function: linear;
}
.round:hover .roundColor {
  width: 100%;
}
</style>
