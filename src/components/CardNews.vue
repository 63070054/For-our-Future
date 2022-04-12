<script setup>
</script>

<template>
  <main>
    <div class="card has-text-black">
      <div class="card-image">
        <div class="date is-size-6 has-text-white px-2 py-1 mt-1 mr-1">
          วันที่ลงข่าว
        </div>
        <figure class="image is-5by3">
          // 600*480
          <img
            src="https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/02/aharensanwahakarenai_pv2screenshot.png?resize=696%2C392&ssl=1"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h1>ชื่อข่าวสาร</h1>
          <p>รายละเอียดข่าวสาร</p>
        </div>
      </div>
      <footer class="card-footer p-1">
        <div class="camp is-size-6 has-text-white px-2 py-1 mt-1 mr-1">
          ค่าย
        </div>
      </footer>
    </div>
  </main>
</template>

<style scoped>
.card {
  width: 400px;
}
.card-footer {
  background-color: #9ddfd3;
}
.camp {
  background-color: #114e60;
  border-radius: 3px;
}
.date {
  position: absolute;
  z-index: 1;
  right: 0;
  border-radius: 3px;
  background-color: #de8971;
}
</style>