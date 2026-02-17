import { storeToRefs } from 'pinia'
import { useCustomerStore } from '../stores/customer'

export const useAuth = () => {
  const store = useCustomerStore()
  const { customer, isAuthenticated } = storeToRefs(store)
  return {
    customer,
    isAuthenticated,
    login: store.login,
    logout: store.logout,
  }
}
