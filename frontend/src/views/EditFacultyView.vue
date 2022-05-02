<script setup></script>

<template>
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
          <p class="is-size-1 has-text-centered" style="color: #9ddfd3">
            {{ this.$route.params.facName }}
          </p>
        </div>
      </div>
    </div>
    <div class="columns is-centered p-2">
      <div class="column is-half">
        <div class="field">
          <label class="label is-size-4"
            >FACULTY NAME <span style="color: red">*</span></label
          >
          <input v-model="faculty_name" class="input" type="text" />
        </div>
        <div class="field">
          <div class="control">
            <label class="label is-size-4 has-text-left"
              >FACULTY DESCIPTION</label
            >
            <textarea
              v-model="faculty_desc"
              class="textarea"
              type="text"
            ></textarea>
          </div>
        </div>

        <div class="mt-3 has-text-centered">
          <button
            @click="editFaculty"
            class="button has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold is-fullwidth"
            style="background-color: #9ddfd3"
          >
            Edit Faculty
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: block;
}
</style>
<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      faculty_name: "",
      faculty_desc: "",
    };
  },
  mounted() {},
  methods: {
    editFaculty() {
      axios
        .put(
          `http://localhost:5000/${this.$route.params.uniName}/${this.$route.params.facName}/edit`,
          { faculty_name: this.faculty_name, faculty_desc: this.faculty_desc }
        )
        .then((response) => {
          console.log(response.data.message);
          if (response.data.message == "success") {
            this.$router.push(`/${this.$route.params.uniName}/faculty`);
          } else if (response.data.message == "alredyHave") {
            alert("มีคณะนี้อยู่ในมหาวิทยาลัยนี้อยู่แล้ว");
            this.$router.push(`/${this.$route.params.uniName}/faculty`);
          } else {
            alert("เกิดข้อผิดพลาดขึ้น");
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
