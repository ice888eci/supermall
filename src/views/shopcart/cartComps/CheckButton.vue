<template>
  <div class="item_check">
    <img src="~/assets/img/cart/tick.svg" :class="{ check: isCheck }" />
  </div>
</template>

<script>
export default {
  props: {
    isCheck: Boolean,
  },
};
</script>
<style  scoped>
.item_check img {
  background-color: rgb(206, 201, 201);
  border-radius: 50%;
  margin-top: 50%;
}
.check {
  background-color: red !important;
}
</style>