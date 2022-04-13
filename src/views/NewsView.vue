<script setup>
import CardNews from '@/components/CardNews.vue'
import IconAdd from "@/components/icons/IconAdd.vue";
</script>

<template lang="" >
<div style="background-color:#DBF6E9; min-height: calc(100vh - 3.25rem);" class="p-4">
    <div class="field has-addons has-addons-centered ">
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
    <div class="columns is-centered " >
        <CardNews></CardNews>
        <CardNews></CardNews>
        <CardNews></CardNews>
    </div>
    <IconAdd></IconAdd>
</div>
    
</template>

<style lang="">
    
</style>