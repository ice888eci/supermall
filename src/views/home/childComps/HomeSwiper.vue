<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <!-- @load.once 只执行一次 这里生成了四个img -->
        <img :src="item.image" @load.once="swiperLoad" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper/index.js";
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
  data() {
    return {
      /**
       * @isLoad 节流
       * 循环四次并不是循环四次组件
       */
      isLoad: true,
    };
  },
  methods: {
    swiperLoad() {
      if (this.isLoad) {
        this.isLoad = false;
        this.$emit("swiperLoad");
      }
    },
  },
};
</script>
<style  scoped>
</style>