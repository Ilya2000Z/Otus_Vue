<template>
  <v-app-bar flat density="compact" class="border-b">
    <v-app-bar-title>
      <NuxtLink to="/" class="text-decoration-none text-inherit font-weight-bold">
        Nuxt Shop
      </NuxtLink>
    </v-app-bar-title>
    <v-spacer />
    <nav class="d-flex align-center gap-2">
      <v-btn to="/" variant="text" size="small">Главная</v-btn>
      <v-btn to="/catalog" variant="text" size="small">Каталог</v-btn>
      <v-badge v-if="cartCount > 0" :content="String(cartCount)" color="primary" location="top end">
        <v-btn to="/cart" variant="text" size="small">Корзина</v-btn>
      </v-badge>
      <v-btn v-else to="/cart" variant="text" size="small">Корзина</v-btn>
      <v-btn to="/profile" variant="text" size="small">Профиль</v-btn>
    </nav>
  </v-app-bar>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
</script>
