<template>
  <div class="goods-list">
    <goods-item
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      class="item"
    >
    </goods-item>
  </div>
</template>

<script>
import GoodsItem from "./goods/GoodsItem";
export default {
  components: { GoodsItem },
  props: {
    list: {
      type: Array,
      require: true,
    },
  },
};
</script>
<style  scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-around;
}

.goods-list .item {
  width: 48%;
}
</style>