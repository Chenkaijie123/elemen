// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

import './common/less/index.less'

Vue.config.productionTip = false
// axios 不能使用Vue.use方法,所以我们要给Vue构造函数添加一个原型方法
// 这样所有Vue组建就都可以使用axios方法
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

router.push('/goods')
