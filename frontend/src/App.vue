<script setup>
import NavBar from "@/components/NavBar.vue";
import CardNews from "@/components/CardNews.vue";
import CardCampNews from "./components/CardCampNews.vue";
import CardUniversity from "./components/CardUniversity.vue";
import CardRound from "@/components/CardRound.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AddRoundView from "@/views/AddRoundView.vue";
import EditRoundView from "@/views/EditRoundView.vue";
import ProfileView from "@/views/ProfileView.vue";
import HomeView from "./views/HomeView.vue";
import UniversityView from "./views/UniversityView.vue";
import AddFacultyView from "./views/AddFacultyView.vue";
import FacultyView from "./views/FacultyView.vue";
import NewsView from "./views/NewsView.vue";
import AddNewsView from "./views/AddNewsView.vue";
import AddUniversityView from "./views/AddUniversityView.vue";
import EditUniversityView from "./views/EditUniversityView.vue";
</script>

<template>
  <div>
    <NavBar @sign-out="signout" :user="user"></NavBar>
    <div class="container">
      <RouterView @auth-change="onAuthChange" :user="user" />
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.onAuthChange();
  },
  methods: {
    async getUser() {
      await axios
        .get(`http://localhost:5000/user`)
        .then((response) => {
          this.user = response.data.user;
        })
        .catch((error) => {
          alert(error);
        });
    },
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    signout(){
      this.user = null
      this.$router.push('/login')
    }
  },
};
</script>

<style>
@import "@/assets/base.css";
</style>
