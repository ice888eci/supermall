<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20">
      <div class="item" v-for="(item, index) in list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" />
          <div class="item-text">{{ item.title }}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "@/components/common/gridView/GridView";
export default {
  name: "MenuCategory",
  components: { GridView },
  props: {
    contentCategory: {
      type: Object,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    contentCategory(val) {
      if (Object.keys(val).length !== 0) {
        this.list = val.data.list;
      }
      // console.log(this.list);
    },
  },
};
</script>
<style  scoped>
.panel img {
  width: 100%;
}

.item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>