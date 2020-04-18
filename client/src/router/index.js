import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'
import friendList from '../pages/friendList'
import chatRoom from '../pages/chatRoom'
import home from '../pages/home'
import search from '../pages/search'
import mypage from '../pages/mypage'
import detail from '../pages/detail'
import noFound from '../pages/noFound'

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
      component: friendList,
      meta:{
        isShow:true
      }
    },
    {
      path: '/chatRoom',
      name: 'chatRoom',
      component: chatRoom,
      meta:{
        backShow:true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta:{
        isShow:true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta:{
        isShow:true
      }
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: mypage,
      meta:{
        isShow:true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta:{
        isShow:false,
        backShow:true
      }
    },
    {
      path: '/404',
      name: '404',
      component: noFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
