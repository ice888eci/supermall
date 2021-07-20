<template>
  <div>
    <swiper class="swiper-item">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <!-- @load.once 只执行一次这里生成了四个img -->
        <img :src="item" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper/index.js";
export default {
  components: { Swiper, SwiperItem },
  props: {
    topImages: {
      type: Array,
      require: true,
    },
  },
};
</script>
<style  scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
  object-fit: cover;
}
.swiper-item img {
  width: 100%;
}
</style>