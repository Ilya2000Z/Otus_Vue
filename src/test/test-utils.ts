import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { mount, type VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'

export function mountWithPlugins(
  component: Component,
  options: { routes?: { path: string; name: string; component: Component }[] } = {}
) {
  const routes = options.routes ?? [
    { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
    { path: '/login', name: 'Login', component: { template: '<div>Login</div>' } },
    { path: '/cart', name: 'Cart', component: { template: '<div>Cart</div>' } },
    { path: '/checkout', name: 'Checkout', component: { template: '<div>Checkout</div>' } },
    { path: '/product/new', name: 'NewProduct', component: { template: '<div>NewProduct</div>' } },
  ]
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })
  const pinia = createPinia()
  return mount(component, {
    global: {
      plugins: [router, pinia],
    },
    ...options,
  }) as VueWrapper
}
