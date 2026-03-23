<template>
  <div class="page product-detail">
    <v-progress-linear v-if="pending" indeterminate color="primary" class="mb-4" />
    <template v-else-if="product">
      <v-btn :to="'/catalog'" variant="text" size="small" class="mb-4" prepend-icon="mdi-arrow-left">
        Каталог
      </v-btn>
      <v-card variant="outlined" class="pa-4">
        <v-card-title class="text-h5">{{ product.title }}</v-card-title>
        <v-card-subtitle class="text-h6 text-primary mt-2">
          {{ formatPrice(product.price) }}
        </v-card-subtitle>
        <v-card-text v-if="product.description" class="text-medium-emphasis mt-2">
          {{ product.description }}
        </v-card-text>
        <v-card-text class="text-caption text-disabled">
          Категория: {{ product.category }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="flat" @click="addToCart">
            В корзину
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
    <v-alert v-else type="warning" variant="tonal" class="mt-4">
      Товар не найден
    </v-alert>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id as string)

const { getProduct } = useGraphQL()
const cartStore = useCartStore()

const { data: product, pending } = await useAsyncData(
  () => `product-${id.value}`,
  () => getProduct(id.value)
)

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}

function addToCart() {
  if (product.value) {
    cartStore.addItem(
      { id: product.value.id, title: product.value.title, price: product.value.price },
      1
    )
  }
}
</script>
