import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'

Vue.use(Router)
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ],
  linkActiveClass: 'active'
})
// eslint-disable-next-line
const router = new Router()
// router.push('/goods')
