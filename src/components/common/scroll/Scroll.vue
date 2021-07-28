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
  props: {
    // 设置成对象就不能不写内容
    probeType: {
      type: Number,
      default() {
        return 1;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      scroll: null,
      saveTop: 0,
    };
  },
  mounted() {
    /**
     * @this.$refs.wrapper
     * 组件会被服用直接查找.wrapper会不知道拿的是谁
     */
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
    });
    /**
     * @scroll
     * 滚动事件
     */
    this.scroll.on("scroll", (postion) => {
      switch (this.$route.name) {
        case "home":
          this.$emit("backTopState", postion);
          break;
        case "detail":
          this.$emit("menuStay", postion);
          break;
      }
    });
    /**
     * @pullingUp
     * 上拉到底触发事件
     */
    this.scroll.on("pullingUp", () => {
      this.$emit("dataUpdate");
    });
  },
  methods: {
    // 第一个参数x轴的距离,第二个参数y轴的距离,第三个参数是延迟时间
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 并且是为了保证this.scroll存在才执行
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll.y;
    },
  },
};
</script>
<style  scoped>
</style>