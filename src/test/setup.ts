import { beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
  if (typeof globalThis.localStorage !== 'undefined') {
    globalThis.localStorage.clear()
  }
})
