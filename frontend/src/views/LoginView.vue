<script setup></script>

<template>
  <div
    class="hero is-fullheight-with-navbar p-3"
    style="justify-content: flex-start; position: relative"
  >
    <div
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <div class="field">
        <label class="label has-text-centered is-size-4"
          >USERNAME
          <input
            v-model="username"
            class="input"
            type="text"
            placeholder="USERNAME"
            style="width: 500px"
          />
        </label>
      </div>
      <div class="field">
        <label class="label has-text-centered is-size-4"
          >PASSWORD
          <input
            v-model="password"
            class="input"
            type="password"
            placeholder="PASSWORD"
            style="width: 500px"
          />
        </label>
      </div>
      <div class="has-text-centered mt-3">
        <router-link to="/register">
          <button class="button is-white has-text-centered is-3 is-size-4 mx-6">
            Create Account
          </button>
        </router-link>
        <button
          @click="signIn"
          class="button is-primary has-text-centered is-3 is-size-4 mx-6"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    signIn() {
      // console.log(this.username)
      // console.log(this.password)
      axios
        .post(`http://localhost:5000/user/login`, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.$emit("auth-change");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log(error)
          alert(error.response.data);
        });
    },
  },
};
</script>
