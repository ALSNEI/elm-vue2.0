// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-Router'//引入路由
import VueResource from 'vue-Resource'//引入数据请求模块

Vue.use(VueRouter);//全局使用路由
Vue.use(VueResource);//全局使用数据请求

import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import './common/stylus/index.styl';

// const routes = [
//   { path: '/goods', component: goods },
//   { path: '/ratings', component: ratings },
//   { path: '/seller', component: seller }
// ]//设置路由页面
// /* eslint-disable no-new */
// const router = new VueRouter({
//   routes // （缩写）相当于 routes: routes
// })//建立新的路由对象,必须在设置路由页面后,否则子页面不显示.也可以合为一体
const router = new VueRouter({
  linkActiveClass:'active',
  routes:[
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]
})

router.push("goods");

new Vue({
  el: '#app',
  router:router,//设置路由的挂载点
  template: '<App/>',
  components: { App }
})
