<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import OrderForm from '../components/OrderForm.vue'

const router = useRouter()
const { cartItems, totalPrice } = useCart()

// Проверка, что корзина не пуста
onMounted(() => {
  if (cartItems.value.length === 0) {
    router.push('/cart')
  }
})
</script>

<template>
  <div class="checkout-page">
    <div class="back-button">
      <button class="back-btn" @click="router.push('/cart')">← Назад к корзине</button>
    </div>

    <div class="checkout-container">
      <div class="checkout-content">
        <div class="order-summary">
          <h2>Сводка заказа</h2>
          <div class="summary-items">
            <div
              v-for="item in cartItems"
              :key="item.product.id"
              class="summary-item"
            >
              <div class="summary-item-info">
                <span class="summary-item-name">{{ item.product.title }}</span>
                <span class="summary-item-quantity">× {{ item.quantity }}</span>
              </div>
              <span class="summary-item-price">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </span>
            </div>
          </div>
          <div class="summary-total">
            <span>Итого:</span>
            <span class="total-amount">${{ totalPrice.toFixed(2) }}</span>
          </div>
        </div>

        <div class="order-form-wrapper">
          <OrderForm :hide-back-button="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem 0;
}

.back-button {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 1rem;
}

.back-btn {
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid #667eea;
  border-radius: 8px;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #667eea;
  color: white;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.order-summary {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.order-summary h2 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.summary-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.summary-item-name {
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

.summary-item-quantity {
  font-size: 0.85rem;
  color: #666;
}

.summary-item-price {
  font-weight: 600;
  color: #667eea;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
}

.total-amount {
  font-size: 1.8rem;
  color: #667eea;
}

.order-form-wrapper {
  background: transparent;
}

@media (max-width: 968px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }
}
</style>

