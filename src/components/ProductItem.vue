<script setup lang="ts">
    import {ref} from "vue";

    export interface ProductCard{
      id: number,
      title: string,
      price: number,
      description: string,
      category: string,
      image: string,
      rating: {
        rate: number,
        count: number
      }
    }
    const props = defineProps<{
      product: ProductCard
    }>()
    const product = ref(props.product)
</script>
<template>
  <div class="container-card">
    <div class="title">
      {{product.title}}
    </div>
    <div class="description">
      {{product.description}}
    </div>
    <div class="category">
      {{product.category}}
    </div>
    <img :src="product.image"/>
    <div class="rating">
      <div class="stars">
        {{product.rating.rate}}
      </div>
      <div class="count">
        {{product.rating.count}}
      </div>
    </div>
  </div>
</template>
<style scoped>
.container-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
}

.container-card img {
  width: 100%;
  height: 180px;
  object-fit: contain;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.description {
  font-size: 14px;
  color: #555;
}

.category {
  font-size: 13px;
  color: #777;
}

.rating {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.rating .stars {
  font-weight: 600;
}

.rating .count {
  color: #555;
}
</style>
