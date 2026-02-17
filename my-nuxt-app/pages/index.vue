<template>
  <div class="page home">
    <h1>Добро пожаловать в Nuxt Shop</h1>
    <p class="lead">
      Учебный проект: Nuxt 3, SSR, GraphQL, Pinia. Каталог товаров, корзина и профиль.
    </p>
    <div class="cards">
      <NuxtLink to="/catalog" class="card">
        <span class="card-title">Каталог</span>
        <span class="card-desc">Товары через GraphQL API</span>
      </NuxtLink>
      <NuxtLink to="/cart" class="card">
        <span class="card-title">Корзина</span>
        <span class="card-desc">{{ cartStore.totalItems }} товаров</span>
      </NuxtLink>
      <NuxtLink to="/profile" class="card">
        <span class="card-title">Профиль</span>
        <span class="card-desc">Настройки и заказы</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem 0;
}
h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.lead {
  color: #a1a1aa;
  margin-bottom: 2rem;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  transition: border-color 0.2s;
}
.card:hover {
  border-color: #a78bfa;
  text-decoration: none;
}
.card-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.card-desc {
  font-size: 0.875rem;
  color: #71717a;
}
</style>
