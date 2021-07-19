<template>
  <div id="home">
    <nav-bar id="home-navbar"><div slot="center">蘑菇街</div> </nav-bar>

    <!-- <tab-contro :title="title" @tabClick="tabClick" class="home-tab-control" /> -->
    <scroll class="home-scroller">
      <home-swiper :banners="banners" />
      <home-recommend :recommend="recommend" />
      <future-view />
      <tab-contro
        class="tab-control"
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <main-goods :list="showGoods" />
    </scroll>
  </div>
</template>

<script>
// common
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
// content
import TabContro from "@/components/content/TabContro.vue";
import MainGoods from "@/components/content/MainGoods.vue";
// network
import { GetMultidata, GetGoodsData } from "@/network/home";
// chidren
import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";
import HomeRecommend from "@/views/home/childComps/HomeRecommend.vue";
import FutureView from "@/views/home/childComps/FutureView.vue";

export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FutureView,
    TabContro,
    MainGoods,
    Scroll,
  },
  data() {
    return {
      TabType: "pop",
      banners: null,
      recommend: null,
      // title: ["流行", "新款", "精选"],
      goods: {
        new: { page: 0, list: [] },
        pop: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.TabType].list;
    },
  },
  created() {
    /**
     * 请求home的banner和recommend
     * @GetMultidata
     */
    GetMultidata().then((rs) => {
      this.banners = rs.data.data.banner.list;
      this.recommend = rs.data.data.recommend.list;
    });
    this.getGoodsData("new");
    this.getGoodsData("pop");
    this.getGoodsData("sell");
    // console.log(this.goods.new.list);
  },
  methods: {
    /**
     * 点击事件区域
     */
    tabClick(index) {
      this.TabType = index == 0 ? "pop" : index == 1 ? "new" : "sell";
    },

    /**
     * @getGoodsData
     * 请求TAB面板的数据|分类拿去
     */
    getGoodsData(type) {
      let page = ++this.goods[type].page;
      GetGoodsData({ type, page }).then((rs) => {
        this.goods[type].list.push(...rs.data.data.list);
      });
    },
  },
};
</script>
<style  scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
#home-navbar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.home-tab-control {
  position: relative;
  top: 44px;
  z-index: 9;
}
.home-scroller {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
</style>