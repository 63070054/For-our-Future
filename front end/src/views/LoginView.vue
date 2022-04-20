<script setup></script>

<template>
  <div class="hero is-fullheight-with-navbar p-3" style="justify-content: flex-start; position: relative;">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <div class="field">
        <label class="label has-text-centered is-size-4"
          >USERNAME
          <input
            class="input"
            type="text"
            placeholder="USERNAME"
            style="width: 500px"
          />
        </label>
      </div>
      <div class="field">
        <label class="label has-text-centered is-size-4"
          >PASSWORD
          <input
            class="input"
            type="text"
            placeholder="PASSWORD"
            style="width: 500px"
          />
        </label>
      </div>
      <div class="has-text-centered mt-3">
        <button class="button is-white has-text-centered is-3 is-size-4 mx-6">
          Create Account
        </button>
        <button class="button is-primary has-text-centered is-3 is-size-4 mx-6">
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
