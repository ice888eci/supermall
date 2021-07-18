<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <img :src="item.image" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";
export default {
  components: { Swiper, SwiperItem },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
      require: true,
    },
  },
};
</script>
<style  scoped>
</style>