import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/common/toast/index'
Vue.use(toast)

// 解决移动端点击延迟300毫秒
import fastClick from 'fastclick'
fastClick.attach(document.body);

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require("assets/img/load/load.jpg"),//加载时站位
});

Vue.config.productionTip = false
// 全局实例化$bus事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
