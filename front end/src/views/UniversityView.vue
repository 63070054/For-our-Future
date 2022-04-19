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
    <router-link to="/university/add"><IconAdd></IconAdd></router-link>
    <CardUniversity
      v-for="uni in filterUniversities"
      :key="uni.id"
      :uni_info="uni"
    />
  </div>
</template>
<script>
export default {
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
      universities: [
        {
          id: 1,
          name: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
          province: "กรุงเทพ",
          region: "ภาคกลาง",
          picture: "",
          editedDate: "2022-04-30",
        },
        {
          id: 2,
          name: "เป็ด",
          province: "สุพรรณบุรี",
          region: "ภาคกลาง",
          picture: "",
          editedDate: "2022-01-30",
        },
      ],
    };
  },
  computed: {
    filterUniversities() {
      let universities = this.universities
      if (this.regionSelected.length != 0) {
        universities = universities.filter((uni) =>
          Object.values(this.regionSelected).includes(uni.region)
        );
      }
      universities = universities.filter(uni => uni.name.includes(this.keyword) || uni.province.includes(this.keyword) || uni.region.includes(this.keyword))
      return universities;
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
