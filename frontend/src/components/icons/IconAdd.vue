<script setup></script>

<template lang="">
  <div class="circle">
    <i class="fa fa-plus"></i>
  </div>
</template>

<style>
.circle {
  border-radius: 100%;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  z-index: 5;
  height: 64px;
  width: 64px;
  font-size: 24px;
  background-color: white;
  align-items: center;
  justify-content: center;
  display: flex;
  user-select: none;
  cursor: pointer;
  border: 2px solid black;
}
</style>
