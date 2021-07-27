<template>
  <div>
    <nav-bar>
      <div class="left" slot="left" @click="back">
        <img src="~/assets/img/common/back.svg" alt="back" />
      </div>
      <ul class="center" slot="center">
        <li
          v-for="(item, index) in title"
          v-text="item"
          :key="item"
          :class="{ active: index == currentIndex }"
          @click="toggleNavBar(index)"
        />
      </ul>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    toggleNavBar(index) {
      this.currentIndex = index;
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style  scoped>
.left {
  margin-top: 5px;
}
.center {
  display: flex;
}
.center li {
  list-style: none;
  flex: 1;
  font-size: 10px;
}
.active {
  color: red;
}
</style>