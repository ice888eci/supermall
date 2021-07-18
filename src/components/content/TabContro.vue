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
  },
};
</script>
<style  scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
  line-height: 40px;
  position: sticky;
  top: 44px;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
  transition: all 0.5s;
}

.active {
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-tint);
}
</style>