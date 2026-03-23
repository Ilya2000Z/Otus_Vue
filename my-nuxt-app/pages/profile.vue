<template>
  <div class="page profile">
    <h1 class="text-h4 font-weight-bold mb-4">Профиль</h1>
    <v-card variant="outlined" class="pa-4" max-width="480">
      <v-card-title class="text-h6">Учебный проект</v-card-title>
      <v-card-text class="text-body-2 text-medium-emphasis">
        <p class="mb-2">Nuxt 3 — SSR, файловый роутинг, серверные API-маршруты.</p>
        <p class="mb-2">GraphQL — запросы к каталогу через <code class="bg-grey-lighten-2 pa-1 rounded">/api/graphql</code>.</p>
        <p class="mb-2">Pinia — состояние корзины (клиент).</p>
        <p class="mt-4 text-high-emphasis">
          В корзине: <strong>{{ cartStore.totalItems }}</strong> товаров
          на <strong>{{ formatPrice(cartStore.totalPrice) }}</strong>.
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}
</script>
