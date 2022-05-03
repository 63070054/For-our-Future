<script setup>
import CardUniversity from "@/components/CardUniversity.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
</script>

<template lang="">
  <div class="container p-4" style="background-color: #f9f7f0">
    <div class="field has-addons has-addons-centered">
      <div class="control" style="width: 60%">
        <input
          class="input"
          type="text"
          placeholder="ค้นหามหาวิทยาลัยที่คุณต้องการ"
          v-model="keyword"
        />
      </div>
      <div class="control">
        <a class="button has-text-white" style="background-color: #114e60">
          <i class="fa fa-search"></i>
        </a>
      </div>
    </div>

    <div class="columns is-centered">
      <button
        class="m-2 button-checkbox is-size-6"
        v-for="(region, index) in regions"
        :key="index"
      >
        <label class="checkbox" :for="region">
          <input
            :id="region"
            type="checkbox"
            v-model="regionSelected"
            :value="region"
          />
          {{ region }}
        </label>
      </button>
    </div>
    <router-link to="/university/add" v-if="user && user.type_user == 'admin'">
      <IconAdd message="มหาวิทยาลัย" />
    </router-link>
    <CardUniversity
      v-for="uni in filterUniversities"
      :key="uni.id"
      :uni_info="uni"
      :user="user"
      @delete-university="deleteUniversity(uni)"
    />
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["user"],
  data() {
    return {
      // variable for input
      regionSelected: [],
      keyword: "",
      // variable for loop only
      regions: [
        "ภาคเหนือ",
        "ภาคตะวันตก",
        "ภาคตะวันออก",
        "ภาคใต้",
        "ภาคอีสาน",
        "ภาคกลาง",
      ],
      universities: [],
    };
  },
  computed: {
    filterUniversities() {
      let universities = this.universities;

      if (this.regionSelected.length != 0) {
        universities = universities.filter((uni) =>
          Object.values(this.regionSelected).includes(uni.region_name)
        );
      }
      universities = universities.filter(
        (uni) =>
          uni.uni_name.includes(this.keyword) ||
          uni.province_name.includes(this.keyword) ||
          uni.region_name.includes(this.keyword)
      );
      return universities;
    },
  },
  mounted() {
    this.getuniversity();
  },
  methods: {
    getuniversity() {
      axios
        .get(`http://localhost:5000/university`)
        .then((response) => {
          this.universities = response.data;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    deleteUniversity(uni) {
      let result = confirm("are u sure u want to delete");
      if (result) {
        axios
          .delete(`http://localhost:5000/deleteUniversity/${uni.uni_id}`)
          .then((response) => {
            this.universities = this.universities.filter(
              (val) => val.uni_id != uni.uni_id
            );
            alert("คุณลบสำเร็จแล้ว");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
  },
};
</script>
<style>
.button-checkbox {
  background-color: #114e60;
  color: white;
}

.button-checkbox .checkbox:hover {
  color: white;
}
</style>
