import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/app'
import data from '@/page/data'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/data',
      name: 'data/',
      component: index
    },
    {
      path: '/data/:id',
      name: 'data',
      component: data
    }
  ]
})
