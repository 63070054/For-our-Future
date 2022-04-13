<script setup>
import CardUniversity from "@/components/CardUniversity.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
</script>

<template lang="">
  <div class="container p-3" style="background-color: #f9f7f0">
    <div class="field has-addons has-addons-centered">
      <div class="control" style="width: 60%">
        <input
          class="input"
          type="text"
          placeholder="ค้นหามหาวิทยาลัยที่คุณต้องการ"
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
        <label class="checkbox">
          <input type="checkbox" />
          {{ region }}
        </label>
      </button>
    </div>
    <IconAdd />
    <CardUniversity />
    <CardUniversity />
    <CardUniversity />
  </div>
</template>
<script>
export default {
  data() {
    return {
      regions: [
        "ภาคเหนือ",
        "ภาคตะวันตก",
        "ภาคตะวันออก",
        "ภาคใต้",
        "ภาคอีสาน",
        "ภาคกลาง",
      ],
    };
  },
};
</script>
<style>
.button-checkbox{
  background-color: #114E60;
  color: white;
}

.button-checkbox .checkbox:hover {
  color: white;
}
</style>
