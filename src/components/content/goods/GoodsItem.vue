<template>
  <div class="goods-item">
    <!--v-lazy   代替:src 实现懒加载-->
    <img v-lazy="getImg" @load="imgLoad" @click="goDetail(item)" />
    <div class="goods-info">
      <p>{{ item.title }}</p>
      <span class="price">{{ item.price }}</span>
      <span class="collect">{{ item.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
  computed: {
    getImg() {
      // this.item.img 是Category的图片
      if (this.item.img) return this.item.img;
      // 如果有this.item.show有这层目录说明在首页 或者是详细页眉的图片
      return !!this.item.show ? this.item.show.img : this.item.image;
    },
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("imgLoad");
    },
    goDetail(item) {
      this.$router.push({
        name: "detail",
        params: {
          id: item.iid,
        },
      });
    },
  },
};
</script>
<style  scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 15px;
}

.goods-info {
  font-size: 9px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>