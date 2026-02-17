import { describe, it, expect, beforeEach } from 'vitest'
import { useAuth } from '../useAuth'
import type { Customer } from '../../types'

const mockCustomer: Customer = {
  name: 'Покупатель',
  email: 'buyer@test.ru',
  address: {
    country: 'Россия',
    city: 'Москва',
    street: 'Тверская',
    house: '1',
  },
}

describe('useAuth', () => {
  beforeEach(async () => {
    const { useCustomerStore } = await import('../../stores/customer')
    useCustomerStore().logout()
  })

  it('до логина isAuthenticated false', () => {
    const { isAuthenticated } = useAuth()
    expect(isAuthenticated.value).toBe(false)
  })

  it('после login isAuthenticated true и customer заполнен', () => {
    const { login, isAuthenticated, customer } = useAuth()
    login(mockCustomer)
    expect(isAuthenticated.value).toBe(true)
    expect(customer.value).toEqual(mockCustomer)
  })

  it('после logout сбрасывает авторизацию', () => {
    const { login, logout, isAuthenticated, customer } = useAuth()
    login(mockCustomer)
    logout()
    expect(isAuthenticated.value).toBe(false)
    expect(customer.value).toBeNull()
  })
})
