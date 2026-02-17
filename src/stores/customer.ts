import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Customer } from '../types'

const AUTH_KEY = 'customer'

const loadCustomer = (): Customer | null => {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem(AUTH_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export const useCustomerStore = defineStore('customer', () => {
  const customer = ref<Customer | null>(loadCustomer())

  const isAuthenticated = computed(() => customer.value !== null)

  function login(data: Customer) {
    customer.value = data
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(data))
    }
  }

  function logout() {
    customer.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY)
    }
  }

  return {
    customer,
    isAuthenticated,
    login,
    logout,
  }
})
