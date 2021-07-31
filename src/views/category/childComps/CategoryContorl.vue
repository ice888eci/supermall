<template>
  <div class="category-contorl">
    <grid-view :cols="1">
      <tab-contro
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class="contorl"
      />
    </grid-view>
  </div>
</template>

<script>
import TabContro from "@/components/content/TabContro";
import GridView from "@/components/common/gridView/GridView";
export default {
  name: "CategoryContorl",
  components: { TabContro, GridView },
  methods: {
    tabClick(index) {
      let type = index == 0 ? "pop" : index == 1 ? "new" : "sell";
      this.$emit("active_type", type);
    },
  },
};
</script>
<style  scoped>
.contorl {
  position: absolute;
}
</style>