import { createRouter, createWebHistory } from 'vue-router'
import { useCustomerStore } from '../stores/customer'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import GraphQLItems from '../views/GraphQLItems.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Checkout from '../views/Checkout.vue'
import Login from '../views/Login.vue'
import ProductFormView from '../views/ProductFormView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/graphql-items',
      name: 'GraphQLItems',
      component: GraphQLItems,
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      props: true,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/product/new',
      name: 'NewProduct',
      component: ProductFormView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const customerStore = useCustomerStore()
  if (to.meta.requiresAuth && !customerStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router

