<template>
  <div id="category">
    <nav-bar id="category-navbar"><div slot="center">商品分类</div> </nav-bar>

    <scroll class="category-scroller" ref="scroll" :data="[menusDetail]">
      <div class="content">
        <category-menu :menus="menus" @active_item="active_item" id="menu" />
        <div id="tab-content">
          <menu-category :content-category="showSubcategory" />
          <category-contorl @active_type="active_type" />
          <category-detail
            :content-detail="showCategoryDetail"
            ref="detail"
            :type="currentType"
          />
          <!-- :content-detail="123"  -->
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
// common
import { NEW, POP, SELL } from "@/common/const";
// network
import {
  getCategoryMenu,
  getSubcategory,
  getCategoryDetail,
} from "@/network/category";
// childComps
import CategoryMenu from "@/views/category/childComps/CategoryMenu";
import MenuCategory from "@/views/category/childComps/MenuCategory";
import CategoryContorl from "@/views/category/childComps/CategoryContorl";
import CategoryDetail from "@/views/category/childComps/CategoryDetail";
// components/common
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    CategoryMenu,
    MenuCategory,
    CategoryDetail,
    CategoryContorl,
  },
  data() {
    return {
      menus: [],
      currentIndex: -1,
      menusDetail: {},
      currentType: POP,
    };
  },
  created() {
    this._getMenus();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.menusDetail[this.currentIndex].subcategory;
    },

    showCategoryDetail() {
      if (this.currentIndex === -1) return {};
      return this.menusDetail[this.currentIndex].categoryDetail;
    },
  },

  methods: {
    _getMenus() {
      getCategoryMenu().then((rs) => {
        // 获取菜单
        this.menus = rs.data.data.category.list;
        // console.log(this.menus);
        // 初始化子类数据
        for (let i = 0; i < this.menus.length; i++) {
          this.menusDetail[i] = {
            subcategory: {},
            categoryDetail: {
              [NEW]: [],
              [POP]: [],
              [SELL]: [],
            },
          };
        }
        // console.log(this.menusDetail);
        this._getSubcategory(0);
      });
    },
    _getSubcategory(index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);
      let maitKey = this.menus[index].maitKey;
      getSubcategory(maitKey).then((rs) => {
        // console.log(rs.data.data.list);
        this.menusDetail[index].subcategory = rs.data;
        this.menusDetail = { ...this.menusDetail };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      let miniWallkey = this.menus[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then((rs) => {
        this.menusDetail[this.currentIndex].categoryDetail[type] = rs;
        this.menusDetail = { ...this.menusDetail };
      });
    },

    active_item(index) {
      // console.log(index);
      this._getSubcategory(index);
    },
    active_type(type) {
      console.log(type);
      this.currentType = type;
    },
  },

  activated() {
    // console.log("activated");
    this.$refs.scroll.refresh();
  },
};
</script>
<style  scoped>
#category {
  height: 100vh;
}
#category-navbar {
  position: relative;
  left: 0;
  z-index: 10;
  background-color: var(--color-tint);
  color: #fff;
}
.category-scroller {
  overflow: hidden;
  top: 44px;
  bottom: 55px;
  left: 0;
  right: 0;
  position: absolute;
}
.content {
  display: flex;
}
#menu {
  width: 35%;
}
#tab-content {
  top: 0;
  left: 0;
  height: 100%;
  flex: 1;
}
</style>