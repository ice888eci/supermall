<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>
<style  scoped>
#tabbar {
  width: 100%;
  display: flex;
  background-color: #f8f9f9;
  position: fixed;
  bottom: 0%;
  left: 0%;
  box-shadow: 0px -3px -3px rgb(100, 100, 0.5);
}
</style>