<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    /**
     * @this.$refs.wrapper
     * 组件会被服用直接查找.wrapper会不知道拿的是谁
     */
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 2,
      pullUpLoad: true,
      click: true,
    });
    this.scroll.on("scroll", function () {
      // console.log(1);
    });
    this.scroll.on("pullingUp", function () {});
  },
  methods: {},
};
</script>
<style  scoped>
</style>