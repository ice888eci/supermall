# ---SuperMall---
## ---TabBar---
### 路径:
新建`vue.config.js`文件中配置:
```js
module.exports = {
    configureWebpack: {
    // '@':'src'为默认可以不用添加
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'views': '@/views',
                'network': '@/network',
                'router': '@/router',
                'store': '@/store',
            }
        },
    },
}
```
> 导入`CSS`中`"~/assets/img/tabbar/profile.svg"`

> 导入`JS`中`"@/components/common/tabbar/TabBar.vue"`
### 传参：
> 父组件传入自定义参数一定要在子元素上设置属性！！！

> 使用`slot`给带有`name`值的子组件进行绑定,没绑定的则为默认插槽
```html
<tab-bar-item prop-path="/home" prop-color="red">
    <img src="~/assets/img/tabbar/home.svg" slot="item-icon" />
    <img
        src="~/assets/img/tabbar/home_active.svg"
        slot="item-icon-active"
    />
    <div>首页</div>
</tab-bar-item>
``` 
> 传入的插槽会覆盖原有的插槽,所以想要操作判断最好给内部插槽套个`div` 
```html
<template>
  <div class="tabbar-item" @click="changePath">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot></slot></div>
  </div>
</template>
```
> 父传子的参数只能渲染用,要操作还需要赋值到`data`中
```js
  props: {
    PropPath: String,
    PropColor: String,
  },
  data() {
    return {
      path: this.PropPath,
      color: this.PropColor,
    };
  },
```
### 路由：
生成路由：
1. `import Vue from 'vue'` 
2.  `import Router from 'vue-router'`
3.  `Vue.use(Router);`
4.  `export default new Router({})`
> `import`动态模块,把模块封装成函数,路由被调用到才执行函数 
```js
const Home = () => import('@/views/Home.vue');
```
> 父传子路由的跳转路径

> `prop-path="/home"`=>静态,`:prop-path='变量'`=>动态
```html
<tab-bar-item prop-path="/home" prop-color="red" />
```
> 交集匹配当前的动态路由
```js
computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.color } : {};
    },
},
```
点击切换`$router.push(this.path)`路由状态
```js
methods: {
    changePath() {
      try {
        this.$router.push(this.path);
      } catch (error) {
        console.error(error);
      }
    },
  },
```

> 滚动代码
```js
let positionX = -position.y;
      if (this.tabControlTop != 0 && positionX > this.tabControlTop) {
        this.$refs.tabControl.$el.style.position = "fixed";
        this.$refs.tabControl.$el.style.top = positionX + "px";
      } else {
        this.$refs.tabControl.$el.style.position = "relative";
        this.$refs.tabControl.$el.style.top = "0px";
      }
```


