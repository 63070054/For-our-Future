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
        <p>{{ round.r_desc }}</p>
        <div class="content p-3 m-3" style="background-color: #f6c667">
          <div class="columns is-mobile">
            <div
              class="column has-text-centered is-size-3"
              style="background-color: #2f4840; color: white"
            >
              ประเภทรายวิชา
            </div>
            <div
              class="column has-text-centered is-size-3"
              style="background-color: #2f4840; color: white"
            >
              คะแนนที่ใช้
            </div>
            <div
              class="column has-text-centered is-size-3"
              style="background-color: #2f4840; color: white"
            >
              คะแนนของคุณ
            </div>
          </div>
          <template v-for="(value, key) in round.percentage">
            <div
              class="columns is-mobile"
              v-for="(percentage, index) in value"
              :key="index"
            >
              <div class="column has-text-centered is-size-4">
                {{ key }} {{ percentage.type }}
              </div>
              <div class="column has-text-centered is-size-4">
                {{ percentage.percentage }} %
              </div>
              <div class="column has-text-centered is-size-4">
                {{calculateAdmissionScore(key, percentage.type, percentage.percentage)}}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["user"],
  data() {
    return {
      round: {},
      admissionScore: 0,
    };
  },
  async mounted() {
    await this.getRound();
    console.log(this.user);
  },
  methods: {
    async getRound() {
      await axios
        .get(
          `http://localhost:5000/${this.$route.params.uniName}/${this.$route.params.facName}/${this.$route.params.round}`
        )
        .then((response) => {
          this.round = response.data.round;
          console.log(this.round);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    calculateAdmissionScore(key, percentageType, percentage) {
      let selectType = this.user.score[key].find(
        (type) => type.type == percentageType
      );
      if (selectType) {
        let calculateScore = percentage * selectType.score / 100
        return `${calculateScore} คะแนน`
      };
      return "คุณไม่ได้กรอกคะแนนค่ะ";
    },
  },
  computed: {
    
  },
};
</script>

<style scoped>
.hero {
  display: block;
}
</style>
