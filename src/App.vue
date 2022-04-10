<script setup>
import NavBar from '@/components/NavBar.vue'
import CardNews from '@/components/CardNews.vue'
import CardCampNews from './components/CardCampNews.vue'
import CardUniversity from './components/CardUniversity.vue'
import CardRound from '@/components/CardRound.vue'
</script>

<template>

  <NavBar></NavBar>
  <div style="width:700px;">
    <CardCampNews></CardCampNews>
  </div>
  <CardUniversity></CardUniversity>
  <CardNews />
  <CardRound />
  <!-- <RouterView /> -->
  <RouterView />
</template>

<style>
@import '@/assets/base.css';

</style>
