// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   // let user = JSON.parse(sessionStorage.getItem('user'));
//   let user=sessionStorage.getItem('user');
//   if (!user && to.path != '/login') { //用户没登录强制转到登录界面
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
