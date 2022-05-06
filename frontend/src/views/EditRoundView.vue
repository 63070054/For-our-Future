<template>
  <div
    style="
      background-color: #f9f7f0;
      width: 100%;
      min-height: calc(100vh - 53px);
    "
  >
    <div style="background-color: #de8971; width: 100%; height: 315px">
      <div style="background-color: #0f1123; width: 100%; height: 300px">
        <div
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          "
        >
          <p class="is-size-1 has-text-centered has-text-white">
            {{ this.$route.params.uniName }}
          </p>
          <p class="is-size-2 has-text-centered" style="color: #83cfc1">
            {{ this.$route.params.facName }}
          </p>
        </div>
      </div>
    </div>
    <div class="columns is-centered p-4">
      <div class="column p-1 is-half">
        <div class="field">
          <label class="label is-size-4"
            >ROUND <span class="has-text-danger">*</span></label
          >
          <div class="select is-fullwidth">
            <select v-model="round.round" disabled>
              <option value="1">ROUND 1</option>
              <option value="2">ROUND 2</option>
              <option value="3">ROUND 3</option>
              <option value="4">ROUND 4</option>
              <option value="5">ROUND 5</option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label is-size-4 has-text-left"
              >ROUND DESCIPTION</label
            >
            <textarea
              class="textarea"
              type="text"
              placeholder="ROUND DESCIPTION"
              v-model="round.r_desc"
            ></textarea>
          </div>
        </div>
        <label class="label is-size-4 has-text-left"
          >Require subject score in round (%)
          <span @click="addPercentage" style="cursor: pointer">
            <i class="fa fa-plus"></i>
          </span>
        </label>
        <div
          class="field-body mb-2 columns is-mobile"
          v-for="(item, index) in inputs"
          :key="index"
        >
          <div class="column p-1 is-3">
            <div class="field">
              <div class="select is-fullwidth">
                <select v-model="item.subject" @change="changeSubject(item)">
                  <option
                    v-for="[type, index] in Object.entries(allType)"
                    :key="index"
                  >
                    {{ type }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="column p-1 is-5">
            <div class="field">
              <div class="select is-fullwidth">
                <select v-model="item.type">
                  <option
                    v-for="(value, index) in allType[item.subject]"
                    :key="index"
                  >
                    {{ value }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="column p-1 is-2 pl-0 py-0">
            <div class="field">
              <div class="control">
                <input class="input" type="text" v-model="item.percentage" />
              </div>
            </div>
          </div>
          <div class="column p-1 is-1 py-0 px-0">
            <div class="field">
              <div class="control has-text-centered">
                <button class="button is-danger" type="button">
                  <span class="icon" @click="delDescition(index)">
                    <i class="fas fa-trash-alt fa-2x"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 has-text-centered">
          <button
            class="button is-warning has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold is-fullwidth"
            @click="editRound"
          >
            Edit Round
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      inputs: [],
      allType: {
        onet: [
          "ภาษาไทย",
          "คณิตศาสตร์",
          "สังคมศึกษา",
          "ภาษาอังกฤษ",
          "วิทยาศาสตร์",
        ],
        gat: ["THAI", "ENG"],
        pat: [
          "ความถนัดทางคณิตศาสตร์",
          "ความถนัดทางวิทยาศาสตร์",
          "ความถนัดทางวิศวกรรมศาสตร์",
          "ความถนัดทางสถาปัตยกรรมศาสตร์",
          "ความถนัดทางวิชาชีพครู",
          "ความถนัดทางศิลปกรรมศาสตร์",
          "ฝรั่งเศส",
          "เยอรมัน",
          "ญี่ปุ่น",
          "จีน",
          "อาหรับ",
          "ภาษาบาลี",
        ],
        sub: [
          "ภาษาไทย",
          "สังคมศึกษา",
          "ภาษาอังกฤษ",
          "คณิตศาสตร์ 1",
          "ฟิสิกส์",
          "เคมี",
          "ชีววิทยา",
          "คณิตศาสตร์ 2 (สายศิลป์)",
          "วิทยาศาสตร์ทั่วไป (สายศิลป์)",
        ],
        GPAX: [],
      },
      roundDesc: "",
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
          `http://localhost:5000/${this.$route.params.uniName}/${this.$route.params.facName}/${this.$route.params.round}/edit`
        )
        .then((response) => {
          this.round = response.data.round;
          this.inputs = response.data.round.percentage;
          this.idCounter = this.inputs.length;
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    addPercentage() {
      this.inputs.push({
        subject: "onet",
        type: "ภาษาไทย",
        percentage: 0,
        update: false,
      });
    },
    delDescition(index) {
      this.inputs.splice(index, 1);
    },
    changeSubject(item) {
      item.type = this.allType[item.subject][0];
    },
    async editRound() {
      await axios
        .put(
          `http://localhost:5000/${this.$route.params.uniName}/${this.$route.params.facName}/${this.$route.params.round}/edit`,
          {
            roundPercentage: this.inputs,
            r_id: this.round.r_id,
            r_desc: this.round.r_desc
          }
        )
        .then((response) => {
          this.$router.push(`/${this.$route.params.uniName}/${this.$route.params.facName}/${this.$route.params.round}`)
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
  },
};
</script>
<style></style>
