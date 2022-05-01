<template>
  <div>
    <div
      style="background-color: #f9f7f0; width: 100%"
      class="hero is-fullheight-with-navbar"
    >
      <div style="background-color: #de8971; width: 100%; height: 315px">
        <div style="background-color: #0f1123; width: 100%; height: 300px">
          <div
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
          >
            <p class="is-size-1 has-text-centered has-text-white">
              {{ this.$route.params.uniName }}
            </p>
            <p class="is-size-2 has-text-centered" style="color: #9ddfd3">
              {{ this.$route.params.facName }}
            </p>
          </div>
        </div>
      </div>
      <div class="content p-2">
        <h1>รอบการสมัครที่ {{ this.$route.params.round }}</h1>
        <h2 class="mb-6">
          รายละเอียดรอบการสมัครที่ {{ this.$route.params.round }}
        </h2>
        <p></p>
        <div class="content m-3" style="background-color: #f6c667">
          <div class="columns is-mobile">
            <div class="column has-text-centered is-size-3">ประเภทรายวิชา</div>
            <div class="column has-text-centered is-size-3">คะแนนที่ใช้</div>
          </div>
          <div class="columns is-mobile">
            <div class="column has-text-centered is-size-4">O-NET ภาษาไทย</div>
            <div class="column has-text-centered is-size-4">30 %</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      round: {},
      options: {
        rewind: true,
        autoplay: true,
        resetProgress: false,
        // transition duration
        speed: 1 * 1000,
        rewindByDrag: true,
        arrows: false,
        // duration change slide
        interval: 5 * 1000,
      },
      recommendCamps: [],
      recommendUniversities: [],
    };
  },
  async mounted() {
    console.log(this);
    await this.getRound();
  },
  methods: {
    async getRound() {
      await axios
        .get(
          `http://localhost:5000/${this.$route.params.uniName}/${this.$route.params.facName}/${this.$route.params.round}`
        )
        .then((response) => {
          this.round = response.data.round;
          console.log(this.round)
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style scoped>
.hero {
  display: block;
}
</style>
