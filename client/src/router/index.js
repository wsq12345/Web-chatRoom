import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'
import friendList from '../pages/friendList'
import chartRoom from '../pages/chartRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/friendList',
      name: 'friendList',
      component: friendList
    },
    {
      path: '/chartRoom',
      name: 'chartRoom',
      component: chartRoom
    }
  ]
})
