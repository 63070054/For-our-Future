<script setup></script>

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
            ชื่อมหาวิทยาลัย
          </p>
        </div>
      </div>
    </div>
    <div class="columns is-centered p-2">
      <div class="column is-half">
        <div class="field">
          <label class="label is-size-4"
            >FACULTY NAME <span style="color: red">*</span></label
          >
          <input class="input" type="text" />
        </div>
        <div class="field">
          <div class="control">
            <label class="label is-size-4 has-text-left"
              >FACULTY DESCIPTION</label
            >
            <textarea class="textarea" type="text"></textarea>
          </div>
        </div>

        <div class="mt-3 has-text-centered">
          <button
            class="button has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold is-fullwidth"
            style="background-color: #9ddfd3"
          >
            Create Faculty
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
    display: block;
}
</style>
