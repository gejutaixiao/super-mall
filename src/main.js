import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'

import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false

//安装toast插件
Vue.use(toast)

//解决移动端的300ms延迟

fastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/cache.png')
})

Vue.prototype.$bus = new Vue()

new Vue({
  render: function (h) { return h(App) },
  router,
  store
}).$mount('#app')
