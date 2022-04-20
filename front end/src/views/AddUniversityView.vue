<script setup></script>

<template>
  <div style="background-color: #f9f7f0" class="hero is-fullheight-with-navbar p-3">

    <form action="localhost:5000/adduni" enctype="multipart/form-data" method="POST">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="field">
            <label class="label is-size-4">UNIVERSITY NAME <span style="color: red">*</span></label>
            <input class="input" type="text" />
          </div>

          <div class="field">
            <label class="label is-size-4">PROVINCE <span style="color: red">*</span></label>
            <div class="select is-fullwidth">
              <select>
                <option>ภาษาไทย</option>
                <option>คณิต</option>
                <option>สังคม</option>
              </select>
            </div>
          </div>

          <div class="field">
            <div class="file is-large is-boxed mt-auto">
              <label class="file-label" style="width: 100%;">
                <input class="file-input" type="file" name="resume" accept="image/png, image/jpeg" />
                <span class="file-cta has-text-centered" style="height: 160px; justify-content: center">
                  <span class="file-icon m-0">
                    <i class="fa fa-plus"></i>
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div class="mt-3 has-text-centered">
            <button class="button has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold is-fullwidth"
              style="background-color: #DE8971">
              Create University
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
</style>
