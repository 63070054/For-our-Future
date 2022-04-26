<script setup>
import IconAdd from "@/components/icons/IconAdd.vue";
</script>

<template>
  <div>
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
              ชื่อมหาวิทยาลัย
            </p>
            <p class="is-size-2 has-text-centered" style="color: #9ddfd3">
              คณะเทคโนโลยีสารสนเทศ
            </p>
          </div>
        </div>
      </div>
      <div class="content p-2">
        <h1>รอบการสมัครที่ 1</h1>
        <h2 class="mb-6">รายละเอียดรอบการสมัครที่ 1</h2>
        <div class="content m-3" style="background-color: #f6c667">
          <div class="columns is-mobile">
            <div class="column has-text-centered is-size-3">ประเภทรายวิชา</div>
            <div class="column has-text-centered is-size-3">คะแนนที่ใช้</div>
          </div>
          <div class="columns is-mobile">
            <div class="column has-text-centered is-size-4">O-NET ภาษาไทย</div>
            <div class="column has-text-centered is-size-4">30 %</div>
          </div>
        </div>
      </div>
    </div>

    <IconAdd />
  </div>
</template>

<style scoped>
.hero {
  display: block;
}
</style>
