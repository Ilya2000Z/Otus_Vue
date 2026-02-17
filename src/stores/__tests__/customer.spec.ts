import { describe, it, expect, beforeEach } from 'vitest'
import { useCustomerStore } from '../customer'
import type { Customer } from '../../types'

const mockCustomer: Customer = {
  name: 'Иван Иванов',
  email: 'ivan@test.ru',
  address: {
    country: 'Россия',
    city: 'Москва',
    street: 'Ленина',
    house: '1',
  },
}

describe('useCustomerStore', () => {
  let store: ReturnType<typeof useCustomerStore>

  beforeEach(() => {
    store = useCustomerStore()
    store.logout()
  })

  it('изначально не авторизован', () => {
    expect(store.isAuthenticated).toBe(false)
    expect(store.customer).toBeNull()
  })

  it('логин устанавливает покупателя и авторизацию', () => {
    store.login(mockCustomer)
    expect(store.isAuthenticated).toBe(true)
    expect(store.customer).toEqual(mockCustomer)
  })

  it('логин сохраняет данные в localStorage', () => {
    store.login(mockCustomer)
    const raw = globalThis.localStorage.getItem('customer')
    expect(raw).toBeTruthy()
    expect(JSON.parse(raw!)).toEqual(mockCustomer)
  })

  it('logout сбрасывает покупателя', () => {
    store.login(mockCustomer)
    store.logout()
    expect(store.isAuthenticated).toBe(false)
    expect(store.customer).toBeNull()
  })

  it('logout удаляет ключ из localStorage', () => {
    store.login(mockCustomer)
    store.logout()
    expect(globalThis.localStorage.getItem('customer')).toBeNull()
  })
})
