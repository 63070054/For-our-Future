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
  <nav class="navbar mx-3" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1>For our Future</h1>
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="showNavBar = !showNavBar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': showNavBar }"
    >
      <div class="navbar-start">
        <router-link
          :to="`${menu.path}`"
          class="navbar-item"
          v-for="(menu, index) in menusNavbar"
          :key="index"
        >
          {{ menu.name }}
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
              alt="Bulma"
            />
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item"> Profile </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Sign out </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showNavBar: false,
    };
  },
};
</script>

<style scoped></style>
