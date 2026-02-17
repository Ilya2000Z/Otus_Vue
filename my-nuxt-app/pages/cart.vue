<template>
  <div class="page cart">
    <h1>Корзина</h1>
    <div v-if="cartStore.isEmpty" class="empty">
      Корзина пуста. <NuxtLink to="/catalog">Перейти в каталог</NuxtLink>
    </div>
    <template v-else>
      <ul class="cart-list">
        <li v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <div class="item-info">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-price">{{ formatPrice(item.price) }} × {{ item.quantity }}</span>
          </div>
          <div class="item-actions">
            <button type="button" class="btn-qty" @click="cartStore.setQuantity(item.id, item.quantity - 1)">
              −
            </button>
            <span class="qty">{{ item.quantity }}</span>
            <button type="button" class="btn-qty" @click="cartStore.setQuantity(item.id, item.quantity + 1)">
              +
            </button>
            <button type="button" class="btn-remove" @click="cartStore.removeItem(item.id)">
              Удалить
            </button>
          </div>
        </li>
      </ul>
      <div class="total">
        Итого: <strong>{{ formatPrice(cartStore.totalPrice) }}</strong>
      </div>
      <button type="button" class="btn-clear" @click="cartStore.clear">Очистить корзину</button>
    </template>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}
</script>

<style scoped>
.cart h1 {
  margin-bottom: 1rem;
}
.empty {
  color: #a1a1aa;
}
.cart-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  margin-bottom: 0.5rem;
}
.item-info {
  display: flex;
  flex-direction: column;
}
.item-title {
  font-weight: 600;
}
.item-price {
  font-size: 0.875rem;
  color: #71717a;
}
.item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-qty {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #27272a;
  border: none;
  border-radius: 6px;
  color: #e4e4e7;
  cursor: pointer;
  font-size: 1.125rem;
}
.btn-qty:hover {
  background: #3f3f46;
}
.qty {
  min-width: 1.5rem;
  text-align: center;
}
.btn-remove {
  padding: 0.35rem 0.75rem;
  background: transparent;
  border: 1px solid #3f3f46;
  border-radius: 6px;
  color: #a1a1aa;
  cursor: pointer;
  font-size: 0.8125rem;
  margin-left: 0.5rem;
}
.btn-remove:hover {
  color: #f87171;
  border-color: #f87171;
}
.total {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.btn-clear {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  color: #a1a1aa;
  cursor: pointer;
}
.btn-clear:hover {
  color: #f87171;
  border-color: #f87171;
}
</style>
