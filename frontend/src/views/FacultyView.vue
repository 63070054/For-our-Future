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
                :value="{
                  facId: fac.fac_id,
                  facName: fac.fac_name,
                  facDesc: fac.fac_desc,
                }"
              >
                {{ fac.fac_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="control" v-if="user && user.type_user == 'admin'">
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
        <div class="control" v-if="user && user.type_user == 'admin'">
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
        <div class="control" v-if="user && user.type_user == 'admin'">
          <button @click="delFaculty" type="button" class="button is-danger">
            <i class="fa fa-trash">&nbsp;คณะ</i>
          </button>
        </div>
      </div>
      <h1 class="title has-text-weight-bold">รายละเอียดคณะ</h1>
      <p class="mb-4">{{ facultySelected.facDesc }}</p>
      <div class="columns is-multiline">
        <div class="column is-6" v-for="round in filterRound" :key="round.r_id">
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
      v-if="user && user.type_user == 'admin'"
      :to="{
        path: `/${this.$route.params.uniName}/${facultySelected.facName}/round/add`,
      }"
    >
      <IconAdd message="รอบการสมัคร" />
    </router-link>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  props: ["user"],
  data() {
    return {
      faculty: [],
      roundInfo: [],
      facultySelected: "",
    };
  },
  async created() {
    await this.getFaculty(this.$route.params.uniName);
    this.facultySelected = {
      facId: this.faculty[0].fac_id,
      facName: this.faculty[0].fac_name,
      facDesc: this.faculty[0].fac_desc,
    };
    await this.getRound();
  },
  methods: {
    async delFaculty() {
      axios
        .delete(
          `http://localhost:5000/${this.$route.params.uniName}/${this.facultySelected.facName}`
        )
        .then((response) => {
          this.faculty = this.faculty.filter(
            (val) => val.fac_id != response.data.facIdDeleted
          );
          if (this.faculty) {
            this.facultySelected = {
              facId: this.faculty[0].fac_id,
              facName: this.faculty[0].fac_name,
              facDesc: this.faculty[0].fac_desc,
            };
          }

          alert("ลบเสร็จสิ้น");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
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
          this.roundInfo = response.data.round;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
  computed: {
    filterRound() {
      const compare = (a, b) => {
        if (a.round < b.round) {
          return -1;
        }
        if (a.round > b.round) {
          return 1;
        }
        return 0;
      };

      return this.roundInfo.sort(compare);
    },
  },
};
</script>
