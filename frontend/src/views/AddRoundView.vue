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
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="field">
          <label class="label is-size-4"
            >ROUND <span class="has-text-danger">*</span></label
          >
          <div class="select is-fullwidth">
            <select v-model="round">
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
              v-model="roundDesc"
            ></textarea>
          </div>
        </div>
        <label class="label is-size-4 has-text-left"
          >Require subject score in round (%)
          <span @click="addPercentage" style="cursor: pointer">
            <i class="fa fa-plus"></i>
          </span>
        </label>
        <div class="field-body mb-2" v-for="item in inputs" :key="item.id">
          <div class="column is-3 py-0 pl-0 pr-2">
            <div class="field">
              <div class="select is-fullwidth">
                <select v-model="item.type" @change="changeSubject(item)">
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
          <div class="column is-6 py-0 pl-0">
            <div class="field">
              <div class="select is-fullwidth">
                <select v-model="item.subject">
                  <option
                    v-for="(value, index) in allType[item.type]"
                    :key="index"
                  >
                    {{ value }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="column is-2 pl-0 py-0">
            <div class="field">
              <div class="control">
                <input class="input" type="text" v-model="item.percent" />
              </div>
            </div>
          </div>
          <div class="column is-1 py-0 px-0">
            <div class="field">
              <div class="control has-text-centered">
                <button class="button is-danger" type="button">
                  <span class="icon" @click="delDescition(item)">
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
            @click="createRound"
          >
            Create Round
          </button>
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
      inputs: [],
      idCounter: 0,
      allType: {
        "O-NET": [
          "ภาษาไทย",
          "คณิตศาสตร์",
          "สังคมศึกษา",
          "ภาษาอังกฤษ",
          "วิทยาศาสตร์",
          "สุขศึกษาพลศึกษา",
          "ศิลปะ",
          "การงานอาชีพและเทคโนโลยี",
        ],
        GAT: ["THAI", "ENG"],
        PAT: [
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
        "9 วิชาสามัญ": [
            "ภาษาไทย",
            "สังคมศึกษา",
            "ภาษาอังกฤษ",
            "คณิตศาสตร์ 1",
            "ฟิสิกส์",
            "เคมี",
            "ชีววิทยา",
            "คณิตศาสตร์ 2 (สายศิลป์)",
            "วิทยาศาสตร์ทั่วไป (สายศิลป์)",
        ]
      },
      roundDesc: "",
      round: 1,
    };
  },
  created() {
    this.idCounter = this.inputs.length;
  },
  methods: {
    addPercentage() {
      this.idCounter += 1;
      this.inputs.push({
        id: this.idCounter,
        type: "O-NET",
        subject: "ภาษาไทย",
        percent: 0,
      });
    },
    delDescition(item) {
      let index = this.inputs.findIndex((val) => val.id === item.id);
      this.inputs.splice(index, 1);
    },
    changeSubject(item) {
      item.subject = this.allType[item.type][0];
    },
    async createRound() {
      await axios
        .post(`http://localhost:5000/${this.$route.params.uniName}/${this.$route.params.facName}/round/add`, {
          round: this.round,
          round_desc: this.roundDesc,
          roundPercentage: this.inputs,
        })
        .then((response) => {
          if (response.data.isDuplicate) {
            let result = confirm(
              "มีข้อมูล ีรอบการสมัคร นี้อยู่แล้วค่ะ คลิก 'OK' เพื่อไปดูรายละเอียดข้อมูลรอบการสมัครค่ะ"
            );
            if (result) {
              this.$router.push(
                `/${this.$route.params.uniName}/${this.$route.params.facName}/${response.data.round}`
              );
            } else {
              this.$router.push(`/${this.$route.params.uniName}/faculty`);
            }
          } else {
            this.$router.push(`/${this.$route.params.uniName}/faculty`);
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
<style></style>
