<script setup>
const menusNavbar = {
  0: {
    name: "มหาวิทยาลัย",
    path: "/university",
  },
  1: {
    name: "ข่าวสาร",
    path: "/news",
  },
};
</script>

<template>
  <nav class="navbar px-5" role="navigation" aria-label="main navigation" style="background-color: #114E60;">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1>For our Future</h1>
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
        @click="showNavBar = !showNavBar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navBar" class="navbar-menu" style="background-color: #114E60" :class="{ 'is-active': showNavBar }">
      <div class="navbar-start">
        <router-link :to="`${menu.path}`" class="navbar-item" v-for="(menu, index) in menusNavbar" :key="index">
          {{ menu.name }}
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" v-if="user">
          <a class="navbar-link">
            <img src="../assets/default_profile.jpg" alt="" style="height: 100%; aspect-ratio: 1/1;" />
          </a>

          <div class="navbar-dropdown">
            <router-link to="/profile"><a class="navbar-item"> Profile </a>
            </router-link>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Sign out </a>
          </div>
        </div>
        <div class="navbar-item" v-else>
        <div class="buttons">
          <router-link to="/login" class="button is-light">
            Log in
          </router-link>
        </div>
      </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      showNavBar: false,
    };
  },
  mounted() {
  },
};
</script>

<style scoped>
.navbar-start a {
  color: white;
}

.navbar-brand a {
  color: white;
}
</style>
