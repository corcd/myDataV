// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VCharts from 'v-charts'
import ElementUI from 'element-ui'
import Vcomp from './components/index'
import Axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.scss'

Vue.use(VCharts)
Vue.use(ElementUI)
Vue.use(Vcomp)

Vue.prototype.$axios = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
