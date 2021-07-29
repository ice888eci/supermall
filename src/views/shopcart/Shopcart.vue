<template>
  <div id="shop-cart">
    <nav-bar id="cart-nav"
      ><div slot="center">购物车({{ getCartLength }})</div></nav-bar
    >
    <cart-list />
    <cart-button />
  </div>
</template>

<script>
// vuex
import { mapGetters } from "vuex";
// common
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "@/views/shopcart/cartComps/CartList.vue";
import CartButton from "@/views/shopcart/cartComps/CartButton.vue";

export default {
  name: "Shopcart",
  components: { NavBar, CartList, CartButton },

  computed: {
    ...mapGetters(["getCartLength", "getCartList"]),
  },
};
</script>
<style  scoped>
#cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
</style>