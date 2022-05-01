<script setup>
import CardRound from "../components/CardRound.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
</script>
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
        </div>
      </div>
    </div>
    <div class="container my-5" style="width: 80%">
      <div class="field has-addons">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select
              style="width: 100%"
              v-model="facultySelected"
              @change="getRound"
            >
              <option
                v-for="fac in faculty"
                :key="fac.fac_id"
                :value="{ facId: fac.fac_id, facName: fac.fac_name, facDesc: fac.fac_desc }"
              >
                {{ fac.fac_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="control">
          <router-link
            :to="{
              path: `/${this.$route.params.uniName}/${this.facultySelected.facName}/edit`,
            }"
          >
            <button type="submit" class="button is-warning">
              <i class="fa fa-pen">&nbsp;คณะ</i>
            </button>
          </router-link>
        </div>
        <div class="control">
          <router-link
            :to="{
              path: `/${this.$route.params.uniName}/faculty/add`,
            }"
          >
            <button type="submit" class="button is-primary">
              <i class="fa fa-plus">&nbsp;คณะ</i>
            </button>
          </router-link>
        </div>
      </div>
      <h1 class="title has-text-weight-bold">รายละเอียดคณะ</h1>
      <p class="mb-4">{{facultySelected.facDesc}}</p>
      <div class="columns is-multiline">
        <div class="column is-6" v-for="round in round" :key="round.r_id">
          <router-link
            :to="{
              path: `/${this.$route.params.uniName}/${facultySelected.facName}/${round.round}`,
            }"
          >
            <CardRound :round="round.round"></CardRound>
          </router-link>
        </div>
      </div>
    </div>
    <router-link
      :to="{
        path: `/${this.$route.params.uniName}/${facultySelected.facName}/round/add`,
      }"
    >
      <IconAdd message="รอบการสมัคร" />
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      faculty: [],
      round: [],
      facultySelected: "",
    };
  },
  async mounted() {
    await this.getFaculty(this.$route.params.uniName);
    this.facultySelected = {
      facId: this.faculty[0].fac_id,
      facName: this.faculty[0].fac_name,
      facDesc: this.faculty[0].fac_desc,
    };
    await this.getRound();
  },
  methods: {
    async getFaculty(uniName) {
      await axios
        .get(`http://localhost:5000/${uniName}/faculty`)
        .then((response) => {
          this.faculty = response.data.faculty;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    async getRound() {
      await axios
        .get(`http://localhost:5000/${this.facultySelected.facId}/round`)
        .then((response) => {
          this.round = response.data.round;
          console.log(this.round);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
