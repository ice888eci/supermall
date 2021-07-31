<template>
  <div v-if="Object.keys(currentDetail).length != 0">
    <grid-view>
      <goods-item
        v-for="(item, index) in currentDetail[type].data"
        :key="index"
        :item="item"
      ></goods-item>
    </grid-view>
  </div>
</template>

<script>
import GridView from "@/components/common/gridView/GridView";
import GoodsItem from "@/components/content/goods/GoodsItem";

export default {
  name: "CategoryDetail",
  components: {
    GridView,
    GoodsItem,
  },
  props: {
    contentDetail: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
    },
  },
  watch: {
    /**
     * @contentDetail
     * 传入的数据异步操作所以需要监听赋值
     */
    contentDetail: {
      handler(val) {
        if (Object.entries(val).length != 0) {
          this.currentDetail = val;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      // 不能赋值空 Object.keys不能判断null
      currentDetail: {},
    };
  },
};
</script>
<style  scoped>
</style>