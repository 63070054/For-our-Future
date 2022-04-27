<script setup></script>

<template>
  <div style="background-color: #f9f7f0" class="hero is-fullheight-with-navbar p-3">
    <div class="columns is-centered">
      <div class="column is-half">
        <form action="localhost:5000/EditUni">
          <div class="field">
            <label class="label is-size-4">UNIVERSITY NAME <span style="color: red">*</span></label>
            <input class="input" type="text" v-model="univerName">
          </div>

          <div class="field">
            <label class="label is-size-4">PROVINCE <span style="color: red">*</span></label>
            <div class="select is-fullwidth">
              <select v-model="province">
                <option value="1">กรุงเทพ</option>
                <option value="2">อยุธยา</option>
                <option value="3">สระบุรี</option>
              </select>
            </div>
          </div>

          <div class="field">
            <div class="file is-large is-boxed mt-auto">
              <label class="file-label" style="width: 100%;">
                <input class="file-input" type="file" name="resume" id="resume" accept="image/png, image/jpeg" />
                <span class="file-cta has-text-centered" style="height: 160px; justify-content: center">
                  <span class="file-icon m-0">
                    <i class="fa fa-plus"></i>
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div class="mt-3 has-text-centered">
            <button class="button has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold is-fullwidth"
              style="background-color: #DE8971" type="button" @click="edituni">
              Edit University
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      univerName: "",
      province: "",
      oldname: ""
    };
  },
  mounted() {
    this.getuniversity(this.$route.params.uniName)
  },
  methods: {
    getuniversity(uniName) {
      axios.get(`http://localhost:5000/${uniName}/edit`)
        .then((response) => {
          // this.univer = response.data
          // console.log(response.data[0].uni_id)
          this.univerName = response.data[0].uni_name
          this.oldname = response.data[0].uni_name
          this.province = response.data[0].province_id
        })
        .catch((error) => {
          alert(error.response.data.message)
        });
    },
    edituni() {
      var formData = new FormData();
      var imagefile = document.querySelector('#resume');
      formData.append("resume", imagefile.files[0]);
      formData.append('uni_name', this.univerName);
      formData.append('province', this.province);
      formData.append('oldname', this.oldname);
      axios.put(`http://localhost:5000/edituni`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          // console.log(response.data.message)
          if (response.data.message) {
            const result = confirm("มีมหาวิทยาลัยนี้อยู่ในระบบอยู่แล้ว")
            if (result) {
              this.$router.push(`/${response.data.uni_name}/faculty`)
            }
          }
          else {
            console.log('แก้ไขแล้ว')
            this.$router.push(`/university`)
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
        });
    }
  }
}

</script>
<style>
</style>
