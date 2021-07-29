<template>
  <div>
    <scroll class="cart-list" ref="scroll">
      <cart-item
        v-for="item in $store.state.cartList"
        :key="item.id"
        :item="item"
      />
    </scroll>
  </div>
</template>
<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartItem from "@/views/shopcart/cartComps/CartItem.vue";
export default {
  name: "CartList",
  components: { Scroll, CartItem },

  activated() {
    // 进入时刷新购物车页面
    this.$refs.scroll.refresh();
  },
};
</script>
<style  scoped>
.cart-list {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 100px;
}
</style>