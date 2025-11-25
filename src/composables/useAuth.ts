import { ref, computed } from 'vue'

const isAuthenticated = ref(false)

// Проверка авторизации при загрузке
if (typeof window !== 'undefined') {
  const authStatus = localStorage.getItem('isAuthenticated')
  isAuthenticated.value = authStatus === 'true'
}

export const useAuth = () => {
  const login = () => {
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
  }

  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    login,
    logout,
  }
}

