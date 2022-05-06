<script setup></script>

<template>
  <div
    style="background-color: #f9f7f0"
    class="hero is-fullheight-with-navbar p-3"
  >
    <!-- <form id="form" action="http://localhost:5000/adduni" enctype="multipart/form-data" method="post"> -->
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="field">
          <label class="label is-size-4"
            >UNIVERSITY NAME <span style="color: red">*</span></label
          >
          <input class="input" type="text" v-model="uname" name="u_name" />
          <div v-if="error" class="has-text-danger">
            <span v-if="v$.uname.$error">กรุณากรอกชื่อมหาวิทยาลัย</span>
          </div>
        </div>

        <div class="field">
          <label class="label is-size-4"
            >PROVINCE <span style="color: red">*</span>
          </label>
          <div class="select is-fullwidth">
            <select v-model="province">
              <option
                v-for="pro in all_province"
                :value="pro.province_id"
                :key="pro.province_id"
              >
                {{ pro.province_name }}
              </option>
            </select>
          </div>
        </div>

        <div class="field">
          <div class="file is-large is-boxed mt-auto">
            <label class="file-label" style="width: 100%">
              <input
                class="file-input"
                type="file"
                name="univer"
                id="univer"
                accept="image/png, image/jpeg"
              />
              <span
                class="file-cta has-text-centered"
                style="height: 160px; justify-content: center"
              >
                <span class="file-icon m-0">
                  <i class="fa fa-plus"></i>
                </span>
              </span>
            </label>
          </div>
        </div>
        <div class="mt-3 has-text-centered">
          <button
            class="button has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold is-fullwidth"
            style="background-color: #de8971"
            type="button"
            @click="adduni"
          >
            Create University
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/plugins/axios";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      uname: "",
      province: 1,
      all_province: [],
      error: false,
    };
  },

  validations() {
    return {
      uname: { required },
    };
  },
  mounted() {
    this.getprovince();
  },
  methods: {
    async adduni() {
      const result = await this.v$.$validate();
      if (!result) {
        this.error = true;
        return;
      }
      this.error = false;

      var formData = new FormData();
      var imagefile = document.querySelector("#univer");
      formData.append("univer", imagefile.files[0]);
      formData.append("uni_name", this.uname);
      formData.append("province", this.province);
      axios
        .post(`http://localhost:5000/adduni`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.message) {
            const result = confirm("มีมหาวิทยาลัยนี้อยู่ในระบบอยู่แล้ว");
            if (result) {
              this.$router.push(`/${response.data.uni_name}/faculty`);
            }
          } else if (response.data.e) {
            alert("มีปัญหาในการเพิ่มข้อมูลมหาวิทยาลัยค่ะ");
          } else {
            this.$router.push(`/university`);
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    getprovince() {
      axios
        .get(`http://localhost:5000/province`)
        .then((response) => {
          this.all_province = response.data.province;
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
  },
};
</script>

<style></style>
