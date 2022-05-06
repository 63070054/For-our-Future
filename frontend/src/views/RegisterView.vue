<script setup></script>

<template>
  <div class="columns is-centered">
    <div class="column is-half" style="padding: 1.2rem">
      <div class="field">
        <div class="control">
          <label class="label is-size-5"
            >USERNAME <span class="has-text-danger">*</span></label
          >
          <input
            class="input"
            type="text"
            v-model="username"
            placeholder="USERNAME"
          />
        </div>
      </div>
      <div class="field-body mb-2">
        <div class="column is-6 pl-0 py-0">
          <div class="field">
            <div class="control">
              <label class="label is-size-5 has-text-left"
                >PASSWORD <span class="has-text-danger">*</span></label
              >
              <input
                class="input"
                type="password"
                v-model="password"
                placeholder="PASSWORD"
              />
            </div>
          </div>
        </div>
        <div class="column is-6 pr-0 py-0">
          <div class="field">
            <div class="control">
              <label class="label is-size-5 has-text-left"
                >CONFIRM PASSWORD <span class="has-text-danger">*</span></label
              >
              <input
                class="input"
                type="password"
                v-model="confirm_password"
                placeholder="CONFIRM PASSWORD"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field-body mb-2">
        <div class="column is-6 pl-0 py-0">
          <div class="field">
            <div class="control">
              <label class="label is-size-5 has-text-left">E-MAIL</label>
              <input
                class="input"
                type="text"
                v-model="email"
                placeholder="E-MAIL"
              />
            </div>
          </div>
        </div>
        <div class="column is-6 pr-0 py-0">
          <div class="field">
            <div class="control">
              <label class="label is-size-5 has-text-left">PHONE</label>
              <input
                class="input"
                type="text"
                v-model="phone"
                placeholder="PHONE"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field-body mb-2">
        <div class="column is-6 py-0 pl-0">
          <div class="field">
            <div class="control">
              <label class="label is-size-5 has-text-left"
                >FIRST NAME <span class="has-text-danger">*</span></label
              >
              <input
                class="input"
                type="text"
                v-model="f_name"
                placeholder="FIRST NAME"
              />
            </div>
          </div>
        </div>
        <div class="column is-4 pr-0 py-0">
          <div class="field">
            <div class="control">
              <label class="label is-size-5 has-text-left"
                >LAST NAME <span class="has-text-danger">*</span></label
              >
              <input
                class="input"
                type="text"
                v-model="l_name"
                placeholder="LAST NAME"
              />
            </div>
          </div>
        </div>
        <div class="column is-2 pr-0 py-0">
          <div class="field">
            <div class="control">
              <label class="label is-size-5 has-text-left"
                >SEX <span class="has-text-danger">*</span></label
              >
              <div class="select">
                <select v-model="sex">
                  <option>male</option>
                  <option>female</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body mb-2">
        <div class="column is-5 py-0 pl-0">
          <div class="field">
            <div class="control">
              <label class="label is-size-5 has-text-left">BIRTH DATE<span class="has-text-danger"> *</span></label>
              <input
                class="input"
                type="date"
                v-model="birthDate"
                placeholder="BIRTH DATE"
              />
            </div>
          </div>
        </div>
        <div class="column is-4 py-0 pl-0">
          <div class="field">
            <div class="control">
              <label class="label is-size-5 has-text-left">NATIONALITY</label>
              <input
                class="input"
                type="text"
                v-model="nationality"
                placeholder="NATIONALITY"
              />
            </div>
          </div>
        </div>
        <div class="column is-3 py-0 pr-0">
          <div class="field">
            <label class="label is-size-5 has-text-left">BLOOD</label>
            <div class="select is-fullwidth">
              <select v-model="blood">
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
            <label class="label is-size-5 has-text-left">ADDRESS</label>
            <textarea
              class="textarea"
              type="text"
              placeholder="ADDRESS"
              v-model="address"
            ></textarea>
          </div>
        </div>
        <div class="file is-large is-boxed mt-auto">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              id="imageUser"
              name="imageUser"
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
          class="button is-primary has-text-black has-text-centered is-3 is-size-5 has-text-weight-bold is-fullwidth"
          @click="register"
        >
          Create Account
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      phone: "",
      f_name: "",
      l_name: "",
      sex: "male",
      birthDate: null,
      nationality: "",
      blood: "A",
      address: "",
    };
  },
  methods: {
    async register() {
      var formData = new FormData();
      var imagefile = document.querySelector("#imageUser");
      formData.append("imageUser", imagefile.files[0]);
      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("confirm_password", this.confirm_password);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("f_name", this.f_name);
      formData.append("l_name", this.l_name);
      formData.append("sex", this.sex);
      formData.append("birthDate", this.birthDate);
      formData.append("nationality", this.nationality);
      formData.append("blood", this.blood);
      formData.append("address", this.address);

      await axios
        .post(`http://localhost:5000/user/register`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          //   this.universities = response.data
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
  },
};
</script>
<style></style>
