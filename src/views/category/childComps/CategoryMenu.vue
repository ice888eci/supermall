<template>
  <div id="tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        v-for="(item, index) in menus"
        :key="index"
        @click="active_item(index)"
        :class="{ active: current == index }"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryMenu",
  props: {
    menus: Array,
  },
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    active_item(index) {
      this.current = index;
      this.$emit("active_item", index);
    },
  },
};
</script>
<style  scoped>
#tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>