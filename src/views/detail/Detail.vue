<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @toggleNavBar="toggleNavBar"
      :stay-index="stayIndex"
      ref="menus"
    />
    <scroll class="content" ref="scroll" @menuStay="menuStay">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :base-info="goods" />
      <detail-shop-info :shop-info="shopInfo" />
      <detail-goods-info :detail-info="detailInfo" @loadImg="loadImg" />
      <detail-params-info :params-info="paramsInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <main-goods :list="recommend" ref="recommend" />
    </scroll>
    <!-- mixin混入 -->
    <back-top @click.native="backTop" v-show="isTopShow" />
    <detail-botton-bar @add_shop="add_shop" />
  </div>
</template>

<script>
//vuex
import { mapActions } from "vuex";
// utils
import { debounce } from "@/common/utils";
import { busMixins, backTopMixins } from "@/common/mixins";

// network
import {
  getDetail,
  getRecommend,
  GetDetailInfo,
  GetShopInfo,
  GetParamsInfo,
} from "@/network/detail";
// chidren
import DetailNavBar from "@/views/detail/detailComps/DetailNavBar.vue";
import DetailSwiper from "@/views/detail/detailComps/DetailSwiper.vue";
import DetailBaseInfo from "@/views/detail/detailComps/DetailBaseInfo.vue";
import DetailShopInfo from "@/views/detail/detailComps/DetailShopInfo.vue";
import DetailGoodsInfo from "@/views/detail/detailComps/DetailGoodsInfo.vue";
import DetailParamsInfo from "@/views/detail/detailComps/DetailParamsInfo.vue";
import DetailCommentInfo from "@/views/detail/detailComps/DetailCommentInfo.vue";
import DetailBottonBar from "@/views/detail/detailComps/DetailBottonBar.vue";
// common
import Scroll from "@/components/common/scroll/Scroll";
// content
import MainGoods from "@/components/content/MainGoods.vue";

export default {
  name: "detail",
  mixins: [busMixins, backTopMixins],
  components: {
    Scroll,
    getDetail,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    MainGoods,
    DetailBottonBar,
  },
  data() {
    return {
      id: null,
      topImages: null,
      itemInfo: null,
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend: [],
      menuY: [],
      stayIndex: 0,
      refreshY: null,
    };
  },

  created() {
    // 获取详情消息
    this.id = this.$route.params.id;
    getDetail(this.id).then((result) => {
      let rs = result.data.result;
      // 轮播图图片
      this.topImages = rs.itemInfo.topImages;
      // 轮播图内容
      this.goods = new GetDetailInfo(
        rs.itemInfo,
        rs.columns,
        rs.shopInfo.services
      );

      // 卖家信息
      this.shopInfo = new GetShopInfo(rs.shopInfo);
      // 效果图展示
      this.detailInfo = rs.detailInfo;
      // 尺码信息
      this.paramsInfo = new GetParamsInfo(rs.itemParams);
      // 评论信息
      if (rs.rate !== 0) this.commentInfo = rs.rate.list[0];
    });

    // 获取推荐消息
    getRecommend().then((result) => {
      let rs = result.data;
      // 推荐信息
      this.recommend = rs.data.list;
    });

    /**
     * 节流防止频繁获取offsetTop
     * 必须定义成data属性,定义成方法函数会开启多个debounce,每个debounce互不影响
     * @refreshY
     */
    this.refreshY = debounce(
      () => {
        this.menuY = [0].concat(
          this.$refs.params.$el.offsetTop,
          this.$refs.comment.$el.offsetTop,
          this.$refs.recommend.$el.offsetTop
        );
      },
      100,
      false
    );
  },

  // 没设置keep-alive所以需要使用beforeDestroy或
  destroyed() {
    this.$bus.$off("imgLoad", this.busHandle);
  },
  computed: {
    paramsY() {
      return this.$refs.params.$el.offsetTop;
    },
    commentY() {
      return this.$refs.comment.$el.offsetTop;
    },
    recommendY() {
      return this.$refs.recommend.$el.offsetTop;
    },
  },
  methods: {
    ...mapActions(["changeCart"]),
    loadImg() {
      this.$refs.scroll.refresh();
      this.$nextTick(this.refreshY);
    },
    toggleNavBar(index) {
      /**
       * 组件的index和stayIndex同步并发射给组件
       * @menuY 要为负数因为向上滑动
       */
      this.stayIndex = index;
      this.$refs.scroll.scrollTo(0, -this.menuY[this.stayIndex], 500);
    },
    menuStay(position) {
      let positionY = -position.y;
      switch (true) {
        case positionY < this.paramsY:
          /**
           * 通过this.stayIndex父传子实现currentInde统一
           * 也可以直接操作this.$refs.menus.currentIndex
           */
          this.stayIndex = 0;
          break;
        case positionY < this.commentY:
          this.stayIndex = 1;
          break;
        case positionY < this.recommendY:
          this.stayIndex = 2;
          break;
        default:
          this.stayIndex = 3;
          break;
      }
      this.back_top_show(positionY);
    },
    add_shop() {
      const product = {
        iid: this.id,
        desc: this.goods.desc,
        price: this.goods.realPrice,
        title: this.goods.title,
        img: this.topImages[0],
      };

      // this.$store
      //   .dispatch("changeCart", product)
      //   .then((result) => console.log(result));
      this.changeCart(product).then((result) => console.log(result));
    },
  },
};
</script>
<style  scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 11;
  background-color: #fff;
}
.detail-nav-bar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
</style>