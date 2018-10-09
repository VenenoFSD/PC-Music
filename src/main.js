import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/base.css';
import './common/css/iconfont.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
