<template>
  <div>
    <div
      style="background-color: #f9f7f0; width: 100%"
      class="hero is-fullheight-with-navbar"
    >
      <div style="background-color: #de8971; width: 100%; height: 315px">
        <div style="background-color: #0f1123; width: 100%; height: 300px">
          <div
            class="column"
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
            "
          >
            <p class="is-size-1 has-text-centered has-text-white text-round">
              {{ this.$route.params.uniName }}
            </p>
            <p class="is-size-2 has-text-centered text-round" style="color: #9ddfd3">
              {{ this.$route.params.facName }}
            </p>
          </div>
        </div>
      </div>
      <div class="content p-2" style="position: relative">
        <router-link
          :to="`/${this.$route.params.uniName}/${this.$route.params.facName}/${this.$route.params.round}/edit`"
          style="position: absolute; right: 60px; top: 10px; z-index: 2"
          v-if="user && user.type_user == 'admin'"
        >
          <button class="button is-info is-small" type="button">
            <span class="icon">
              <i class="fas fa-pen" style="font-size: 16px"></i>
            </span>
          </button>
        </router-link>
        <button
          v-if="user && user.type_user == 'admin'"
          class="button is-danger is-small"
          type="button"
          style="position: absolute; right: 20px; top: 10px; z-index: 2"
          @click="deleteRound()"
        >
          <span class="icon">
            <i class="fas fa-trash-alt" style="font-size: 16px"></i>
          </span>
        </button>
        <h1>รอบการสมัครที่ {{ this.$route.params.round }}</h1>
        <h2 class="mb-6">
          รายละเอียดรอบการสมัครที่ {{ this.$route.params.round }}
        </h2>
        <p style="word-break: break-all">{{ round.r_desc }}</p>
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
              v-if="user.type_user == 'student' && this.$route.params.round == '4'"
            >
              คะแนนของคุณหลังคำนวณแล้ว
            </div>
            <div
              class="column has-text-centered is-size-3"
              style="background-color: #2f4840; color: white"
              v-else
            >
              คะแนนของคุณ
            </div>
          </div>
          <div class="columns is-mobile" v-if="this.$route.params.round == '4'">
            <div class="column has-text-centered is-size-4">O-NET 5 วิชา</div>
            <div class="column has-text-centered is-size-4">30 %</div>
            <div
              class="column has-text-centered is-size-4 scoreAdmission"
              v-if="user.type_user == 'student'"
            >
              {{ calculateOnetScore() }}
            </div>
          </div>
          <div class="columns is-mobile" v-if="this.$route.params.round == '4'">
            <div class="column has-text-centered is-size-4">GPAX</div>
            <div class="column has-text-centered is-size-4">20 %</div>
            <div
              class="column has-text-centered is-size-4 scoreAdmission"
              v-if="user.type_user == 'student'"
            >
              {{ calculateGpaxScore() }}
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
              <div
                class="column has-text-centered is-size-4 scoreAdmission"
                v-if="user.type_user == 'student'"
              >
                {{
                  calculateAdmissionScore(
                    key,
                    percentage.type,
                    percentage.percentage
                  )
                }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  props: ["user"],
  data() {
    return {
      round: {},
    };
  },
  async created() {
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
        let calculateScore;
        if (this.$route.params.round == "4") {
          calculateScore = percentage * selectType.score;
        } else {
          calculateScore = selectType.score
        }
        this.admissionScore += calculateScore;
        return `${calculateScore} คะแนน`;
      }
      return "คุณไม่ได้กรอกคะแนนค่ะ";
    },
    calculateOnetScore() {
      let score = 0;
      this.user.score.onet.map((onet) => (score += onet.score));
      return `${score * 18} คะแนน`;
    },
    calculateGpaxScore() {
      return `${this.user.u_gpax * 1500} คะแนน`;
    },
    admissionSCore() {
      let test = document.querySelectorAll(".scoreAdmission");
      return test;
    },
    async deleteRound() {
      await axios
        .delete(
          `http://localhost:5000/${this.$route.params.uniName}/${this.$route.params.facName}/${this.$route.params.round}/delete`,
          {
            data: {
              r_id: this.round.r_id,
            }
          }
        )
        .then((response) => {
          this.$router.push(
            `/${this.$route.params.uniName}/faculty`
          );
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

@media screen and (max-width: 1024px) {
  .text-round {
    font-size: 36px !important;
  }
}
</style>
