<script setup></script>

<template>
  <div
    style="
      background-color: #f4a3a3;
      width: 100%;
      height: 100%;
      min-height: 100%;
    "
  >
    <div style="background-color: #83cfc1; width: 100%; height: 200px">
      <div
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        "
      >
        <p class="has-text-weight-bold" style="font-size: 65px; color: #0f1123">
          PROFILE
        </p>
      </div>
      <img :src="'http://localhost:5000/' + picture " class="profileImage" />
    </div>
    <div class="columns is-centered column-res">
      <div class="column is-half p-5">
        <div class="columns mt-100-mobile">
          <div class="column">
            <button
              @click="editAble = true"
              class="is-size-6 button is-small is-info has-text-white"
              style="color: #0f1123; width: 100%"
            >
              <i class="fa fa-pen"></i> แก้ไขโปรไฟล์
            </button>
          </div>
          <div class="column" v-if="user && user.type_user == 'student'">
            <router-link :to="{ path: '/profile/ScoreUser' }">
              <button
                class="is-size-6 button is-small has-background-black-ter has-text-white-ter"
                style="width: 100%"
              >
                คะแนนของคุณ
              </button>
            </router-link>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label is-size-6">USERNAME</label>
            <input
              disabled
              v-model="username"
              class="input"
              type="text"
              placeholder="USERNAME"
            />
          </div>
        </div>
        <div class="field-body mb-2">
          <div class="column is-6 p-1">
            <div class="field">
              <div class="control">
                <label class="label is-size-6 has-text-left">E-MAIL</label>
                <input
                  :disabled="!editAble"
                  v-model="email"
                  class="input"
                  type="text"
                  placeholder="E-MAIL"
                />
              </div>
            </div>
          </div>
          <div class="column is-6 p-1">
            <div class="field">
              <div class="control">
                <label class="label is-size-6 has-text-left">PHONE</label>
                <input
                  :disabled="!editAble"
                  v-model="phone"
                  class="input"
                  type="number"
                  placeholder="PHONE"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field-body mb-2">
          <div class="column is-2 mt-auto p-1">
            <div class="field">
              <label class="label is-size-6 has-text-left">SEX</label>

              <div class="select is-fullwidth">
                <select v-model="sex" :disabled="!editAble">
                  <option>male</option>
                  <option>female</option>
                </select>
              </div>
            </div>
          </div>
          <div class="column is-4 p-1">
            <div class="field">
              <div class="control">
                <label class="label is-size-6 has-text-left">FIRST NAME</label>
                <input
                  :disabled="!editAble"
                  v-model="f_name"
                  class="input"
                  type="text"
                  placeholder="FIRST NAME"
                />
              </div>
            </div>
          </div>
          <div class="column is-6 p-1">
            <div class="field">
              <div class="control">
                <label class="label is-size-6 has-text-left">LAST NAME</label>
                <input
                  :disabled="!editAble"
                  v-model="l_name"
                  class="input"
                  type="text"
                  placeholder="LAST NAME"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field-body mb-2">
          <div class="column is-5 p-1">
            <div class="field">
              <div class="control">
                <label class="label is-size-6 has-text-left">BIRTH DATE</label>
                <input
                  :disabled="!editAble"
                  v-model="date"
                  class="input"
                  type="date"
                  placeholder="BIRTH DATE"
                />
              </div>
            </div>
          </div>
          <div class="column is-4 p-1">
            <div class="field">
              <div class="control">
                <label class="label is-size-6 has-text-left">NATIONALITY</label>
                <input
                  :disabled="!editAble"
                  v-model="nationality"
                  class="input"
                  type="text"
                  placeholder="NATIONALITY"
                />
              </div>
            </div>
          </div>
          <div class="column is-3 p-1">
            <div class="field">
              <label class="label is-size-6 has-text-left">BLOOD</label>
              <div class="select is-fullwidth">
                <select v-model="blood" :disabled="!editAble">
                  <option>A</option>
                  <option>B</option>
                  <option>O</option>
                  <option>AB</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="field-body mb-2">
          <div class="field">
            <div class="control">
              <label class="label is-size-6 has-text-left">ADDRESS</label>
              <textarea
                v-model="add"
                class="textarea"
                type="text"
                placeholder="ADDRESS"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="mt-3 has-text-centered" v-if="editAble">
          <button
            @click="saveInfo"
            class="button is-white is-success has-text-centered mx-1"
          >
            บันทึกข้อมูล
          </button>
          <button
            @click="cancelEdit"
            class="button is-white is-danger has-text-centered mx-1"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media only screen and (max-width: 768px) {
  .column-res {
    padding-top: 70px;
  }
}
</style>
<script>
import axios from "@/plugins/axios";
export default {
  props: ["user"],
  data() {
    return {
      editAble: false,
      username: "",
      f_name: "",
      l_name: "",
      email: "",
      phone: "",
      date: "",
      nationality: "",
      blood: "",
      add: "",
      sex: "",
      picture: "",
    };
  },
  async created() {
    await this.setProfile();
  },
  methods: {
    async setProfile() {
      this.username = this.user.username;
      this.f_name = this.user.f_name;
      this.l_name = this.user.l_name;
      this.email = this.user.email;
      this.phone = this.user.phone;
      this.date = this.user.birth_date;
      if(this.user.birth_date) this.date = this.user.birth_date.substring(0, 10);
      this.nationality = this.user.nationality;
      this.blood = this.user.blood_type;
      this.add = this.user.address;
      this.sex = this.user.sex;
      this.picture = this.user.picture;
    },
    cancelEdit() {
      this.editAble = false;
      this.setProfile();
    },
    saveInfo() {
      axios
        .put(`http://localhost:5000/profile`, {
          username: this.username,
          f_name: this.f_name,
          l_name: this.l_name,
          email: this.email,
          phone: this.phone,
          date: this.date,
          nationality: this.nationality,
          blood: this.blood,
          add: this.add,
          sex: this.sex,
        })
        .then((response) => {
          this.editAble = false;
          alert("แก้ไขข้อมูลเสร็จสิ้น");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style scoped>
.profileImage {
  border-radius: 50%;
  width: 215px;
  height: 215px;
  top: 50%;
  left: 75%;
  border: 15px solid #83cfc1;
}

@media only screen and (max-width: 768px) {
  .profileImage {
    top: 70%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .mt-100-mobile {
      margin-top: 100px;
  }
}
</style>
