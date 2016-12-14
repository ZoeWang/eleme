import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import 'common/less/base.less'
import 'common/fonts/style.css'

Vue.use(VueRouter)
Vue.use(VueResource)
const routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller }
]

let router = new VueRouter({
  routes: routes,
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')

router.push('/goods')
