<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in title"
      :key="index"
      @click="itemClick(index)"
    >
      <span :class="{ active: current == index }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.current = index;
      this.$emit("tabClick", index);
    },
    toggleIndex(index) {
      this.current = index;
    },
  },
};
</script>
<style  scoped>
.tab-control {
  width: 100%;
  display: flex;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
  line-height: 40px;
  position: absolute;
  z-index: 22;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item p {
  padding: 5px;
  transition: all 0.5s;
}

.active {
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-tint);
}
</style>