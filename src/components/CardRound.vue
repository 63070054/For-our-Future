<script setup>
</script>

<template>
  <main>
    <div class="columns">
      <div class="column is-6">
        <div class="round">
          <div class="round1"></div>
          <div class="right-side has-background-white has-text-black">
            <h1 class="is-size-3 has-text-centered pt-5">รอบการสมัครที่ 1</h1>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="round">
          <div class="round2"></div>
          <div class="right-side has-background-white has-text-black">
            <h1 class="is-size-3 has-text-centered pt-5">รอบการสมัครที่ 2</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <div class="round">
          <div class="round3"></div>
          <div class="right-side has-background-white has-text-black">
            <h1 class="is-size-3 has-text-centered pt-5">รอบการสมัครที่ 3</h1>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="round">
          <div class="round4"></div>
          <div class="right-side has-background-white has-text-black">
            <h1 class="is-size-3 has-text-centered pt-5">รอบการสมัครที่ 4</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <div class="round">
          <div class="round5"></div>
          <div class="right-side has-background-white has-text-black">
            <h1 class="is-size-3 has-text-centered pt-5">รอบการสมัครที่ 5</h1>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.round {
  position: relative;
}
.right-side {
  width: 100%;
  height: 100px;
}
.right-side h1 {
  z-index: 2;
}
.round1 {
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: #f6c667;
  transition: 0.3s;
  transition-timing-function: linear;
}
.round2 {
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: #FF7070;
  transition: 0.3s;
  transition-timing-function: linear;
}
.round3 {
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: #9F7BC4;
  transition: 0.3s;
  transition-timing-function: linear;
}
.round4 {
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: #6EBF8B;
  transition: 0.3s;
  transition-timing-function: linear;
}
.round5 {
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: #88CDFF;
  transition: 0.3s;
  transition-timing-function: linear;
}

.round:hover .round1 {
  width: 100%;
}
.round:hover .round2 {
  width: 100%;
}
.round:hover .round3 {
  width: 100%;
}
.round:hover .round4 {
  width: 100%;
}
.round:hover .round5 {
  width: 100%;
}
</style>