<template>
  <div class="tabbar-item" @click="changePath">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    PropPath: String,
    PropColor: String,
  },
  data() {
    return {
      path: this.PropPath,
      color: this.PropColor,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.color } : {};
    },
  },
  methods: {
    changePath() {
      try {
        this.$router.push(this.path);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style  scoped>
.tabbar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 9px;
}

.tabbar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
  text-align: center;
}
</style>