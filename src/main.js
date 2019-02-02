import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import './common/css/base.css'
import './common/css/iconfont.css'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('./common/imgs/lazy.png')
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
