<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :base-info="goods"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @loadImg="loadImg" />
      <detail-params-info :params-info="paramsInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <main-goods :list="recommend" />
    </scroll>
  </div>
</template>

<script>
// utils
import { busMixins } from "@/common/mixins";
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
// common
import Scroll from "@/components/common/scroll/Scroll";
// content
import MainGoods from "@/components/content/MainGoods.vue";

export default {
  name: "detail",
  mixins: [busMixins],
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
  },
  data() {
    return {
      topImages: null,
      itemInfo: null,
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend: [],
    };
  },
  created() {
    /**
     * @/detail
     * 获取详情消息
     */
    let id = this.$route.params.id;
    getDetail(id).then((result) => {
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
    /**
     * @recommend
     * 获取推荐消息
     */
    getRecommend().then((result) => {
      let rs = result.data;
      // 推荐信息
      this.recommend = rs.data.list;
    });
  },
  mounted() {},
  // 没设置keep-alive所以需要使用beforeDestroy或
  destroyed() {
    this.$bus.$off("imgLoad", this.busHandle);
  },
  methods: {
    loadImg() {
      this.$refs.scroll.refresh();
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