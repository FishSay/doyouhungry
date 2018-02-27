<template>
  <div v-show="showFlag" class="food"></div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    }
  }
</script>

<style>
.food{
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  background: #ffffff;
}
</style>
