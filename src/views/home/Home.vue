<template>
  <div id="home">
    <nav-bar id="home-navbar"><div slot="center">蘑菇街</div> </nav-bar>
    <tab-contro
      class="tab-control"
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlP"
      v-show="isControFiexd"
    />
    <!-- :probe-type 动态 -拆分驼峰 -->
    <scroll
      class="home-scroller"
      ref="scroll"
      :probe-type="1"
      :pull-upLoad="true"
      @backTopState="backTopState"
      @dataUpdate="dataUpdate"
    >
      <home-swiper :banners="banners" @swiperLoad="swiperLoad" />
      <home-recommend :recommend="recommend" />
      <future-view />
      <tab-contro
        class="tab-control"
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControlN"
        v-show="!isControFiexd"
      />
      <main-goods :list="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isTopShow"></back-top>
  </div>
</template>

<script>
// utils
import { busMixins, backTopMixins } from "@/common/mixins";
// const
import { NEW, POP, SELL } from "@/common/const";
// common
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
// content
import TabContro from "@/components/content/TabContro.vue";
import MainGoods from "@/components/content/MainGoods.vue";
// import BackTop from "@/components/content/backtop/BackTop.vue";
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
  mixins: [busMixins, backTopMixins],
  data() {
    return {
      TabType: POP,
      banners: null,
      recommend: null,
      isTopShow: false,
      tabControlTop: 0,
      saveTop: 0,
      isControFiexd: false,
      goods: {
        [NEW]: { page: 0, list: [] },
        [POP]: { page: 0, list: [] },
        [SELL]: { page: 0, list: [] },
      },
    };
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
    this.getGoodsData(NEW);
    this.getGoodsData(POP);
    this.getGoodsData(SELL);
  },
  mounted() {},
  //  在当前组件/路由设置了Keep-alive时生效
  activated() {
    // 切换回来刷新一下
    this.$refs.scroll.refresh();
    // scroll.y 向上滑动所以时负值
    this.$refs.scroll.y = this.$refs.scroll.scrollTo(0, this.saveTop, 0);
  },
  // 在离开当前组件/路由设置了Keep-alive时生效
  deactivated() {
    this.saveTop = this.$refs.scroll.getScrollY();
    /**
     * 离开时关闭当前控制$bus防止其他页面链接自己
     */
    this.$bus.$off("imgLoad", this.busHandle);
  },
  // Keep-alive所以不会执行
  beforeDestroy() {
    console.log("home");
  },
  /*   watch: {
    "$store.state.imgLoadNum"(newV) {
      newV % 2 == 0 && this.$refs.scroll.scroll.refresh();
    },
  }, */
  computed: {
    showGoods() {
      return this.goods[this.TabType].list;
    },
  },
  methods: {
    /**
     * @getGoodsData
     * 请求TAB面板的数据|分类拿去
     */
    getGoodsData(type) {
      let page = ++this.goods[type].page;
      GetGoodsData({ type, page }).then((rs) => {
        this.goods[type].list.push(...rs.data.data.list);
        /**
         * @finishPullUp
         * 作用：当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
         */
        this.$refs.scroll.finishPullUp();
        //  console.log("到底了");
        // 到底后重置过finishPullUp 在刷新一次页眉会减少来回切换倒底时加载图片卡顿的情况
        this.$refs.scroll.refresh();
      });
    },

    /**
     * @tabClick
     * 点击切换类型
     */
    tabClick(index) {
      this.TabType = index == 0 ? POP : index == 1 ? NEW : SELL;
      // 同步正反两面tab面板的切换
      this.$refs.tabControlP.toggleIndex(index);
      this.$refs.tabControlN.toggleIndex(index);
    },

    /**
     * @backTop
     * 通过native修饰符监听子组件是否被点击
     * 不加点击图片组件无效
     */

    // 判断是否显示backTop
    backTopState(position) {
      // 大量操控DOM不建议这样写
      let positionY = -position.y;
      if (this.tabControlTop != 0 && positionY > this.tabControlTop) {
        this.isControFiexd = true;
      } else {
        this.isControFiexd = false;
      }
      this.back_top_show(positionY);
    },

    /**
     * 更新list数据
     * @refresh 重新计算高度
     * @finishPullUp 到底了需要重新初始化一下@PullUp
     * 拉到底了会跟新数据
     * 这里使用了组件的方法执行并不知道直接操作了this.$refs.scroll.scroll.finishPullUp();
     */
    dataUpdate() {
      this.getGoodsData(this.TabType);
    },

    /**
     * @swiperLoad
     * ref勾tabControl为了获取
     * swiper加载完毕相应事件初始化tabControlTop的正确高度
     */
    swiperLoad() {
      this.tabControlTop = this.$refs.tabControlN.$el.offsetTop;
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
/* 反面的那个 当重合正面的 会隐藏正面显示反面的 */
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
  z-index: 33;
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