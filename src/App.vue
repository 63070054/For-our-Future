<script setup>
import NavBar from '@/components/NavBar.vue'
import CardNews from '@/components/CardNews.vue'
import CardCampNews from './components/CardCampNews.vue'
import CardUniversity from './components/CardUniversity.vue'
import CardRound from '@/components/CardRound.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AddRoundView from '@/views/AddRoundView.vue'
import EditRoundView from '@/views/EditRoundView.vue'
import HomeView from './views/HomeView.vue'
</script>

<template>

  <NavBar></NavBar>
  <div class="container">
    <RouterView />
  </div>
  
</template>

<style>
@import '@/assets/base.css';

</style>
