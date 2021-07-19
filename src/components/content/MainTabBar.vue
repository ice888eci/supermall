<template>
  <div id="tabbar">
    <tab-bar>
      <tab-bar-item prop-path="/home" prop-color="red">
        <img src="~/assets/img/tabbar/home.svg" slot="item-icon" />
        <img
          src="~/assets/img/tabbar/home_active.svg"
          slot="item-icon-active"
        />
        <div>首页</div>
      </tab-bar-item>

      <tab-bar-item prop-path="/category" prop-color="red">
        <img src="~/assets/img/tabbar/category.svg" slot="item-icon" />
        <img
          src="~/assets/img/tabbar/category_active.svg"
          slot="item-icon-active"
        />
        <div>分类</div>
      </tab-bar-item>

      <tab-bar-item prop-path="/shopcart" prop-color="red">
        <img src="~/assets/img/tabbar/shopcart.svg" slot="item-icon" />
        <img
          src="~/assets/img/tabbar/shopcart_active.svg"
          slot="item-icon-active"
        />
        <div>购物</div>
      </tab-bar-item>

      <tab-bar-item prop-path="/profile" prop-color="red">
        <img src="~/assets/img/tabbar/profile.svg" slot="item-icon" />
        <img
          src="~/assets/img/tabbar/profile_active.svg"
          slot="item-icon-active"
        />
        <div>我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar.vue";
import TabBarItem from "@/components/common/tabbar/TabBarItem.vue";
export default { components: { TabBar, TabBarItem } };
</script>
<style  scoped>
#tabbar {
  z-index: 20;
}
</style>