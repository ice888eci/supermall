<template>
  <div class="bottom-menu">
    <check-button
      class="select-all"
      :isCheck="is_check_all"
      @click.native="check_all"
    />
    <span>全选</span>
    <span class="total-price">合计: ¥{{ total_price }}</span>
    <span class="buy-product">去计算({{ check_list }})</span>
  </div>
</template>

<script>
// vuex
import { mapGetters } from "vuex";

import CheckButton from "@/views/shopcart/cartComps/CheckButton.vue";
export default {
  name: "CartButton",
  components: { CheckButton },

  computed: {
    ...mapGetters(["getCartList"]),
    is_check_all() {
      /**
       * 判断是否全选
       */
      return this.getCartList.length
        ? this.getCartList.every((item) => item.check)
        : false;
    },
    total_price() {
      /**
       * 查找选中状态的并统计
       */
      return this.getCartList
        .filter((item) => item.check)
        .reduce((t, item) => t + item.price * item.count, 0)
        .toFixed(2);
    },
    /**
     * 返回选中长度
     */
    check_list() {
      return this.getCartList.filter((item) => item.check).length;
    },
  },
  methods: {
    check_all() {
      /**
       * 不要直接操作this.is_check_all会有bug
       */
      let check = this.is_check_all;
      this.getCartList.forEach((item) => (item.check = !check));
    },
  },
};
</script>
<style  scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 10px;
  color: #888;
  line-height: 38px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;

  float: right;
}
</style>