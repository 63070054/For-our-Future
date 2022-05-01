<script setup></script>

<template lang="">
  <div class="circle">
    <i class="fa fa-plus">
      &nbsp;{{message}}
    </i>
  </div>
</template>

<script>
export default {
  props: ['message']
  
};
</script>

<style>
.circle {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  z-index: 5;
  font-size: 24px;
  background-color: white;
  align-items: center;
  justify-content: center;
  display: flex;
  user-select: none;
  cursor: pointer;
  border: 2px solid black;
  padding: 10px;
  border-radius: 10px;
}
</style>
