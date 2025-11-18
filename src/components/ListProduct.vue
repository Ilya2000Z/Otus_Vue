<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {ProductCard} from "./ProductItem.vue";
import ProductItem from "./ProductItem.vue";

const data = ref([] as Array<ProductCard>)
const pending = ref(false)
async function fetchData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products")
    const result = await response.json()

    data.value = result as ProductCard[]
    pending.value = true
  } catch (error) {
    console.error("Ошибка загрузки данных:", error)
  }
}
onMounted(() => {
   fetchData()
})
</script>
<template>
    <div class="list" v-if="pending">
      <template v-for="product in data" :key="product.id">
        <product-item :product="product"/>
      </template>
    </div>
</template>
<style scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
</style>
