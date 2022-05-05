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
            <div class="field-body mb-2 columns is-mobile">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" value="เกรดเฉลี่ย 6 เทอม" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 m-0 p-1">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="gpax" class="input" type="number"
                      @input="limitGpax(4)">
                    <input v-else :disabled="!editScore" v-model="editGpax" class="input" type="number"
                      @input="limitGpax(4)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <label class="label is-size-4 has-text-left">O-NET</label>
            <div class="field-body mb-2 columns is-mobile" v-for="(score, subject, index) in onet" :key="index">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" :value="score.type" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 m-0 p-1">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="score.score" class="input" type="number"
                      >
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
            <div class="field-body mb-2 columns is-mobile" v-for="(score, subject, index) in sub9" :key="index">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" :value="score.type" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 m-0 p-1">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="score.score" class="input" type="number"
                      >
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
            <div class="field-body mb-2 columns is-mobile" v-for="(score, subject, index) in gat" :key="index">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" :value="score.type" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 m-0 p-1">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="score.score" class="input" type="number"
                    @input="limit(score, 150)"
                      >
                    <input v-else :disabled="!editScore" v-model="score.editScore" class="input" type="number"
                      @input="limit(score, 150)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column ">
            <label class="label is-size-4 has-text-left">PAT</label>
            <div class="field-body mb-2 columns is-mobile" v-for="(score, subject, index) in pat" :key="index">
              <div class="column is-9 py-0 pl-0">
                <div class="field">
                  <input class="input" :value="score.type" type="text" disabled />
                </div>
              </div>
              <div class="column is-3 m-0 p-1">
                <div class="field">
                  <div class="control">
                    <input v-if="!editScore" :disabled="!editScore" v-model="score.score" class="input" type="number"
                      >
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
            <button class="button is-info has-text-white" @click="editScore = true"> แก้ไขคะแนนของคุณ</button>
          </div>
          <div class="column" v-else>
            <button class="button is-success has-text-white" @click="saveScore"> บันทึกคะแนนของคุณ </button>
            <button class="button is-danger has-text-white" @click="editScore = false"> ยกเลิก </button>

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
  props: ['user']
  , data() {
    return {
      editScore: false,
      gpax: 0,
      editGpax: 0,
      onet: {
      },
      gat: {
      },
      pat: {
      },
      sub9: {
      }
    };
  },

  mounted() {
    this.gpax = this.user.u_gpax
    this.editGpax = this.user.editGpax
    this.onet = [...this.user.score.onet]
    this.gat = [...this.user.score.gat]
    this.pat = [...this.user.score.pat]
    this.sub9 = [...this.user.score.sub]
    console.log(this.user)
  },
  methods: {
    saveScore() {
      axios.put(`http://localhost:5000/profile/scoreUser`, {
        'gpax': this.editGpax,
        'onet': this.onet,
        'gat': this.gat,
        'pat': this.pat,
        'sub9': this.sub9
      })
        .then((response) => {
          console.log(response.data.message)
          alert("แก้ไขข้อมูลเสร็จสิ้น")
          this.$router.push('/profile')
      this.editScore = false
        })
        .catch((error) => {
          alert(error.response.data.message)
        });
    },
    limit(score, maxScore) {
      if (score.editScore < 0) {
        score.editScore = 0
      }
      if (score.editScore > maxScore) {
        score.editScore = maxScore
      }
    },
    limitGpax(maxScore){
      if(this.editGpax < 0){
        this.editGpax = 0
      }
      if(this.editGpax > 4){
        this.editGpax = 4
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