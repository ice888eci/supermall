<template>
  <div id="app">
    <main-tab-bar />
    <!-- 路由切换保存 -->
    <!-- 根据组件name 来排除detail -->
    <keep-alive exclude="detail"> <router-view /></keep-alive>
  </div>
</template>

<script>
import MainTabBar from "./components/content/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import url("./assets/css/base.css");
</style>
