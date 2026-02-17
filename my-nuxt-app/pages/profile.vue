<template>
  <div class="page profile">
    <h1>Профиль</h1>
    <div class="card">
      <h2>Учебный проект</h2>
      <p>Nuxt 3 — SSR, файловый роутинг, серверные API-маршруты.</p>
      <p>GraphQL — запросы к каталогу через <code>/api/graphql</code>.</p>
      <p>Pinia — состояние корзины (клиент).</p>
      <p class="stats">
        В корзине: <strong>{{ cartStore.totalItems }}</strong> товаров
        на <strong>{{ formatPrice(cartStore.totalPrice) }}</strong>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}
</script>

<style scoped>
.profile h1 {
  margin-bottom: 1rem;
}
.card {
  padding: 1.5rem;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  max-width: 480px;
}
.card h2 {
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
}
.card p {
  color: #a1a1aa;
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
}
.card code {
  background: #27272a;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.875rem;
}
.stats {
  margin-top: 1rem;
  color: #e4e4e7;
}
</style>
