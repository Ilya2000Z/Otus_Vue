<template>
  <div class="page cart">
    <h1 class="text-h4 font-weight-bold mb-4">Корзина</h1>
    <v-alert v-if="cartStore.isEmpty" type="info" variant="tonal" class="mb-4">
      Корзина пуста.
      <NuxtLink to="/catalog" class="ms-1">Перейти в каталог</NuxtLink>
    </v-alert>
    <template v-else>
      <v-list class="mb-4">
        <v-list-item
          v-for="item in cartStore.items"
          :key="item.id"
          class="border-b"
          rounded
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ formatPrice(item.price) }} × {{ item.quantity }}
          </v-list-item-subtitle>
          <template #append>
            <v-btn-group density="compact" variant="outlined" class="me-2">
              <v-btn
                icon="mdi-minus"
                size="small"
                @click="cartStore.setQuantity(item.id, item.quantity - 1)"
              />
              <v-btn variant="plain" disabled>{{ item.quantity }}</v-btn>
              <v-btn
                icon="mdi-plus"
                size="small"
                @click="cartStore.setQuantity(item.id, item.quantity + 1)"
              />
            </v-btn-group>
            <v-btn
              color="error"
              variant="text"
              size="small"
              @click="cartStore.removeItem(item.id)"
            >
              Удалить
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
      <p class="text-h6 mb-4">
        Итого: <strong>{{ formatPrice(cartStore.totalPrice) }}</strong>
      </p>
      <v-btn color="error" variant="outlined" @click="cartStore.clear">
        Очистить корзину
      </v-btn>
    </template>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}
</script>
