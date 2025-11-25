<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { totalItems } = useCart()
const { isAuthenticated, logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/')
}

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <nav class="navigation">
    <div class="nav-container">
      <div class="nav-brand" @click="router.push('/')">
        🛍️ Интернет-магазин
      </div>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link" :class="{ active: isActive('/') }">
          Главная
        </router-link>
        <router-link to="/cart" class="nav-link" :class="{ active: isActive('/cart') }">
          Корзина
          <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
        </router-link>
        <router-link
          v-if="isAuthenticated"
          to="/product/new"
          class="nav-link"
          :class="{ active: isActive('/product/new') }"
        >
          Добавить товар
        </router-link>
        <router-link
          v-if="!isAuthenticated"
          to="/login"
          class="nav-link"
          :class="{ active: isActive('/login') }"
        >
          Войти
        </router-link>
        <button
          v-if="isAuthenticated"
          class="nav-link logout-btn"
          @click="handleLogout"
        >
          Выйти
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-brand:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover {
  background: #f5f5f5;
  color: #667eea;
}

.nav-link.active {
  color: #667eea;
  background: #f0f0ff;
}

.cart-badge {
  background: #667eea;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>

