import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import OrderForm from '../components/OrderForm.vue'
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
      path: '/order',
      name: 'Order',
      component: OrderForm,
    },
    {
      path: '/product/new',
      name: 'NewProduct',
      component: ProductFormView,
    },
  ],
})

export default router

