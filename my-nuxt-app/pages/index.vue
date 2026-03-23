<template>
  <div class="page home text-center py-8">
    <h1 class="text-h4 font-weight-bold mb-2">Добро пожаловать в Nuxt Shop</h1>
    <p class="text-body-1 text-medium-emphasis mb-8">
      Учебный проект: Nuxt 3, SSR, GraphQL, Pinia. Каталог товаров, корзина и профиль.
    </p>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card :to="'/catalog'" variant="tonal" class="pa-4 text-center" hover>
          <v-card-title class="text-h6">Каталог</v-card-title>
          <v-card-subtitle>Товары через GraphQL API</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card :to="'/cart'" variant="tonal" class="pa-4 text-center" hover>
          <v-card-title class="text-h6">Корзина</v-card-title>
          <v-card-subtitle>{{ cartStore.totalItems }} товаров</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card :to="'/profile'" variant="tonal" class="pa-4 text-center" hover>
          <v-card-title class="text-h6">Профиль</v-card-title>
          <v-card-subtitle>Настройки и заказы</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
</script>
