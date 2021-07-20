<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
// network
import { getDetail } from "@/network/detail";
// chidren
import DetailNavBar from "@/views/detail/detailComps/DetailNavBar.vue";
import DetailSwiper from "@/views/detail/detailComps/DetailSwiper.vue";

export default {
  name: "detail",
  components: {
    getDetail,
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      topImages: null,
      itemInfo: null,
    };
  },
  created() {
    let id = this.$route.params.id;
    getDetail(id)
      .then((result) => {
        console.log(result.data.result);
        let { itemInfo } = result.data.result;

        this.topImages = result.data.result.itemInfo.topImages;
      })
      .catch((error) => console.log(error));
  },
  destroyed() {},
};
</script>
<style  scoped>
</style>