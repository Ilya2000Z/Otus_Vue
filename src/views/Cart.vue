<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart()

const goToCheckout = () => {
  if (cartItems.value.length > 0) {
    router.push('/checkout')
  }
}
</script>

<template>
  <div class="cart-page">
    <div class="cart-container">
      <h1>Корзина</h1>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Ваша корзина пуста</p>
        <button class="btn-primary" @click="router.push('/')">
          Перейти к покупкам
        </button>
      </div>

      <div v-else>
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
            <img
              :src="item.product.image"
              :alt="item.product.title"
              class="cart-item-image"
            />
            <div class="cart-item-info">
              <h3 class="cart-item-title">{{ item.product.title }}</h3>
              <p class="cart-item-category">{{ item.product.category }}</p>
              <p class="cart-item-price">${{ item.product.price.toFixed(2) }}</p>
            </div>
            <div class="cart-item-controls">
              <div class="quantity-controls">
                <button
                  class="quantity-btn"
                  @click="updateQuantity(item.product.id, item.quantity - 1)"
                >
                  −
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button
                  class="quantity-btn"
                  @click="updateQuantity(item.product.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
              <div class="cart-item-total">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </div>
              <button
                class="remove-btn"
                @click="removeFromCart(item.product.id)"
                title="Удалить"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-row">
            <span>Итого:</span>
            <span class="total-price">${{ totalPrice.toFixed(2) }}</span>
          </div>
          <div class="cart-actions">
            <button class="btn-secondary" @click="clearCart">
              Очистить корзину
            </button>
            <button class="btn-primary" @click="goToCheckout">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem 0;
}

.cart-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cart-container h1 {
  margin-bottom: 2rem;
  color: #333;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.cart-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
}

.cart-item-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem;
}

.cart-item-info {
  flex: 1;
}

.cart-item-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
}

.cart-item-category {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #667eea;
  text-transform: capitalize;
}

.cart-item-price {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.25rem;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: background 0.2s;
}

.quantity-btn:hover {
  background: #e5e7eb;
}

.quantity {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
}

.cart-item-total {
  font-size: 1.2rem;
  font-weight: 700;
  color: #667eea;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.remove-btn:hover {
  background: #fee2e2;
}

.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.total-price {
  font-size: 2rem;
  color: #667eea;
}

.cart-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    text-align: center;
  }

  .cart-item-controls {
    align-items: center;
    width: 100%;
  }

  .cart-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>


