<template>
  <div class="page catalog">
    <h1 class="text-h4 font-weight-bold mb-4">Каталог</h1>
    <v-btn-toggle v-model="category" mandatory class="mb-6" density="compact">
      <v-btn
        v-for="cat in categories"
        :key="cat"
        :value="cat"
        size="small"
      >
        {{ cat === 'all' ? 'Все' : cat }}
      </v-btn>
    </v-btn-toggle>
    <v-progress-linear v-if="pending" indeterminate color="primary" class="mb-4" />
    <v-row v-else>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card variant="outlined" class="h-100 d-flex flex-column">
          <v-card-title class="text-subtitle-1">
            <NuxtLink :to="`/catalog/${product.id}`" class="text-decoration-none text-inherit">
              {{ product.title }}
            </NuxtLink>
          </v-card-title>
          <v-card-subtitle class="text-primary font-weight-medium">
            {{ formatPrice(product.price) }}
          </v-card-subtitle>
          <v-spacer />
          <v-card-actions>
            <v-btn
              color="primary"
              variant="flat"
              size="small"
              block
              @click="addToCart(product)"
            >
              В корзину
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useGraphQL'

const category = ref<string>('all')
const categories = ['all', 'tech', 'wear']

const { getProducts } = useGraphQL()
const cartStore = useCartStore()

const { data: products, pending } = await useAsyncData(
  'catalog-products',
  () => getProducts(category.value === 'all' ? undefined : category.value),
  { watch: [category] }
)

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}

function addToCart(product: Product) {
  cartStore.addItem(
    { id: product.id, title: product.title, price: product.price },
    1
  )
}
</script>
