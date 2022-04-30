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
import axios from "axios";

export default {
  props: ["round"],
  data() {
    return {
      faculty: [],
      backgroundRound: ["#f6c667", "#ff7070", "#9f7bc4", "#6ebf8b", "#88cdff"],
    };
  },
  async mounted() {
    // await this.getFaculty(this.$route.params.uniName);
  },
  methods: {
    // async getFaculty(uniName) {
    //   await axios
    //     .get(`http://localhost:5000/${uniName}/faculty`)
    //     .then((response) => {
    //       this.faculty = response.data.faculty;
    //       console.log(this.faculty[0])
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     });
    // },
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
  transition: 0.3s;
  transition-timing-function: linear;
}
.round:hover .roundColor {
  width: 100%;
}
</style>
