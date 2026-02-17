<template>
  <header class="header">
    <NuxtLink to="/" class="logo">Nuxt Shop</NuxtLink>
    <nav class="nav">
      <NuxtLink to="/" class="nav-link">Главная</NuxtLink>
      <NuxtLink to="/catalog" class="nav-link">Каталог</NuxtLink>
      <NuxtLink to="/cart" class="nav-link">
        Корзина
        <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
      </NuxtLink>
      <NuxtLink to="/profile" class="nav-link">Профиль</NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #18181b;
  border-bottom: 1px solid #27272a;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: #e4e4e7;
}
.logo:hover {
  text-decoration: none;
  color: #a78bfa;
}
.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.nav-link {
  position: relative;
  color: #a1a1aa;
  font-size: 0.9375rem;
}
.nav-link:hover,
.nav-link.router-link-active {
  color: #e4e4e7;
}
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  margin-left: 0.25rem;
  background: #a78bfa;
  color: #0f0f12;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
