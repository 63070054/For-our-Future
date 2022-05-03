<script setup>
</script>

<template>
  <div style="
      background-color: #f9f7f0;
      width: 100%;
      min-height: calc(100vh - 53px);
    ">
    <div class="columns m-0">
      <div class="column">
        <div class="columns">
          <div class="column">
            <label class="label is-size-4 has-text-left">GPAX</label>
            <div class="field-body mb-2">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" value="เกรดเฉลี่ย 6 เทอม" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 pl-0 py-0">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="gpax" class="input" type="number"
                      @input="limit(score, 100)">
                      <input v-else :disabled="!editScore" v-model="editGpax" class="input" type="number"
                      @input="limit(score, 100)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <label class="label is-size-4 has-text-left">O-NET</label>
            <div class="field-body mb-2" v-for="(score, subject, index) in onet" :key="index">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" :value="subject" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 pl-0 py-0">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="score.score" class="input" type="number"
                      @input="limit(score, 100)">
                      <input v-else :disabled="!editScore" v-model="score.editScore" class="input" type="number"
                      @input="limit(score, 100)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <label class="label is-size-4 has-text-left">9 วิชาสามัญ</label>
            <div class="field-body mb-2" v-for="(score, subject, index) in sub9" :key="index">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" :value="subject" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 pl-0 py-0">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="score.score" class="input" type="number"
                      @input="limit(score, 100)">
                      <input v-else :disabled="!editScore" v-model="score.editScore" class="input" type="number"
                      @input="limit(score, 100)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column">
            <label class="label is-size-4 has-text-left">GAT</label>
            <div class="field-body mb-2" v-for="(score, subject, index) in gat" :key="index">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" :value="subject" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 pl-0 py-0">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="score.score" class="input" type="number"
                      @input="limit(score, 100)">
                      <input v-else :disabled="!editScore" v-model="score.editScore" class="input" type="number"
                      @input="limit(score, 100)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column ">
            <label class="label is-size-4 has-text-left">PAT</label>
            <div class="field-body mb-2" v-for="(score, subject, index) in pat" :key="index">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" :value="subject" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 pl-0 py-0">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="score.score" class="input" type="number"
                      @input="limit(score, 100)">
                      <input v-else :disabled="!editScore" v-model="score.editScore" class="input" type="number"
                      @input="limit(score, 100)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column" v-if="!editScore">
            <button class="button" @click="editScore = true"> แก้ไขคะแนนของคุณ</button>
          </div>
          <div class="column" v-else>
            <button class="button" @click="saveScore"> บันทึกคะแนนของคุณ </button>
            <button class="button" @click="editScore = false"> ยกเลิก </button>

          </div>
        </div>
      </div>

    </div>

  </div>

</template>
<style>
</style>
<script>
import axios from '@/plugins/axios'

export default {
  data() {
    return {
      editScore: false,
      gpax: 0,
      editGpax: 0,
      onet: {
        "ภาษาไทย": { score: 0, editScore: 0 },
        "คณิตศาสตร์": { score: 0, editScore: 0 },
        "สังคมศึกษา": { score: 0, editScore: 0 },
        "ภาษาอังกฤษ": { score: 0, editScore: 0 },
        "วิทยาศาสตร์": { score: 0, editScore: 0 }
      },
      gat: {
        "THAI": { score: 0, editScore: 0 },
        "ENG": { score: 0, editScore: 0 }
      },
      pat: {
        "ความถนัดทางคณิตศาสตร์": { score: 0, editScore: 0 },
        "ความถนัดทางวิทยาศาสตร์": { score: 0, editScore: 0 },
        "ความถนัดทางวิศวกรรมศาสตร์": { score: 0, editScore: 0 },
        "ความถนัดทางสถาปัตยกรรมศาสตร์": { score: 0, editScore: 0 },
        "ความถนัดทางวิชาชีพครู": { score: 0, editScore: 0 },
        "ความถนัดทางศิลปกรรมศาสตร์": { score: 0, editScore: 0 },
        "ฝรั่งเศส": { score: 0, editScore: 0 },
        "เยอรมัน": { score: 0, editScore: 0 },
        "ญี่ปุ่น": { score: 0, editScore: 0 },
        "จีน": { score: 0, editScore: 0 },
        "อาหรับ": { score: 0, editScore: 0 },
        "ภาษาบาลี": { score: 0, editScore: 0 },
      },
      sub9: {
        "ภาษาไทย": { score: 0, editScore: 0 },
        "สังคมศึกษา": { score: 0, editScore: 0 },
        "ภาษาอังกฤษ": { score: 0, editScore: 0 },
        "คณิตศาสตร์ 1": { score: 0, editScore: 0 },
        "ฟิสิกส์": { score: 0, editScore: 0 },
        "เคมี": { score: 0, editScore: 0 },
        "ชีววิทยา": { score: 0, editScore: 0 },
        "คณิตศาสตร์ 2 (สายศิลป์)": { score: 0, editScore: 0 },
        "วิทยาศาสตร์ทั่วไป (สายศิลป์)": { score: 0, editScore: 0 },
      }
    };
  },

  mounted() {
  },
  methods: {
    getScore(){
      
    },
    saveScore() {

    },
    limit(score, maxScore) {
      if (score.score < 0) {
        score.score = 0
      }
      if (score.score > maxScore) {
        score.score = maxScore
      }
    }
  },
};
</script>

<style scoped>
.input[disabled] {
  background-color: white !important;
  border-color: #f5f5f5 !important;
  box-shadow: none !important;
  color: black !important;
}
</style>