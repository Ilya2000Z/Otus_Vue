<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { orderService } from '../services/api'
import type { OrderFormData } from '../types'

const router = useRouter()
const showNotification = ref(false)

const schema = yup.object({
  fio: yup
    .string()
    .required('ФИО обязательно для заполнения')
    .min(3, 'ФИО должно содержать минимум 3 символа'),
  email: yup
    .string()
    .required('Email обязателен для заполнения')
    .email('Введите корректный email'),
  birthDate: yup
    .string()
    .required('Дата рождения обязательна для заполнения')
    .test('age', 'Вы должны быть старше 18 лет', function (value) {
      if (!value) return false
      const birthDate = new Date(value)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18
      }
      return age >= 18
    }),
  needAddress: yup.boolean(),
  city: yup.string().when('needAddress', {
    is: true,
    then: (schema) => schema.required('Город обязателен для заполнения'),
    otherwise: (schema) => schema.notRequired(),
  }),
  street: yup.string().when('needAddress', {
    is: true,
    then: (schema) => schema.required('Улица обязательна для заполнения'),
    otherwise: (schema) => schema.notRequired(),
  }),
  house: yup.string().when('needAddress', {
    is: true,
    then: (schema) => schema.required('Дом обязателен для заполнения'),
    otherwise: (schema) => schema.notRequired(),
  }),
  country: yup.string().required('Страна обязательна для заполнения'),
  cardNumber: yup
    .string()
    .required('Номер карты обязателен для заполнения')
    .matches(/^\d{16}$/, 'Номер карты должен содержать 16 цифр'),
  cardExpiry: yup
    .string()
    .required('Срок действия обязателен для заполнения')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Формат: MM/YY'),
  cardCvv: yup
    .string()
    .required('CVV обязателен для заполнения')
    .matches(/^\d{3}$/, 'CVV должен содержать 3 цифры'),
  agreeToTerms: yup
    .boolean()
    .required('Необходимо согласие с правилами обработки заказа')
    .oneOf([true], 'Необходимо согласие с правилами обработки заказа'),
})

const { defineField, handleSubmit, errors } = useForm<OrderFormData>({
  validationSchema: schema,
})

const [fio, fioAttrs] = defineField('fio')
const [email, emailAttrs] = defineField('email')
const [birthDate, birthDateAttrs] = defineField('birthDate')
const [needAddress] = defineField('needAddress', false)
const [city, cityAttrs] = defineField('city')
const [street, streetAttrs] = defineField('street')
const [house, houseAttrs] = defineField('house')
const [country, countryAttrs] = defineField('country')
const [cardNumber, cardNumberAttrs] = defineField('cardNumber')
const [cardExpiry, cardExpiryAttrs] = defineField('cardExpiry')
const [cardCvv, cardCvvAttrs] = defineField('cardCvv')
const [agreeToTerms, agreeToTermsAttrs] = defineField('agreeToTerms', false)

// Форматирование срока действия карты
const formatCardExpiry = (value: string) => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
  }
  return cleaned
}

const handleCardExpiryInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  cardExpiry.value = formatCardExpiry(target.value)
}

const handleCardNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  cardNumber.value = target.value.replace(/\D/g, '').slice(0, 16)
}

const handleCardCvvInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  cardCvv.value = target.value.replace(/\D/g, '').slice(0, 3)
}

const onSubmit = handleSubmit(async (values) => {
  try {
    await orderService.submitOrder(values)
    showNotification.value = true
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error) {
    console.error('Ошибка отправки заказа:', error)
    alert('Произошла ошибка при отправке заказа')
  }
})

const countries = [
  'Россия',
  'Беларусь',
  'Казахстан',
  'США',
  'Германия',
  'Франция',
  'Великобритания',
]
</script>

<template>
  <div class="order-form-container">
    <div class="back-button">
      <button type="button" class="back-btn" @click="router.push('/')">
        ← Назад к товарам
      </button>
    </div>

    <div v-if="showNotification" class="notification success">
      Заказ успешно оформлен! Перенаправление на главную страницу...
    </div>

    <form @submit="onSubmit" class="order-form">
      <h2>Оформление заказа</h2>

      <div class="form-section">
        <h3>Данные пользователя</h3>

        <div class="form-group">
          <label for="fio">ФИО *</label>
          <input
            id="fio"
            v-model="fio"
            v-bind="fioAttrs"
            type="text"
            placeholder="Иванов Иван Иванович"
            class="form-input"
            :class="{ error: errors.fio }"
          />
          <span v-if="errors.fio" class="error-message">{{ errors.fio }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input
            id="email"
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            placeholder="example@mail.com"
            class="form-input"
            :class="{ error: errors.email }"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="birthDate">Дата рождения *</label>
          <input
            id="birthDate"
            v-model="birthDate"
            v-bind="birthDateAttrs"
            type="date"
            class="form-input"
            :class="{ error: errors.birthDate }"
          />
          <span v-if="errors.birthDate" class="error-message">{{ errors.birthDate }}</span>
        </div>
      </div>

      <div class="form-section">
        <h3>Адрес доставки</h3>

        <div class="form-group">
          <label class="checkbox-label">
            <input
              v-model="needAddress"
              type="checkbox"
              class="checkbox"
            />
            <span>Ввести адрес доставки</span>
          </label>
        </div>

        <template v-if="needAddress">
          <div class="form-group">
            <label for="country">Страна *</label>
            <select
              id="country"
              v-model="country"
              v-bind="countryAttrs"
              class="form-input"
              :class="{ error: errors.country }"
            >
              <option value="">Выберите страну</option>
              <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
            </select>
            <span v-if="errors.country" class="error-message">{{ errors.country }}</span>
          </div>

          <div class="form-group">
            <label for="city">Город *</label>
            <input
              id="city"
              v-model="city"
              v-bind="cityAttrs"
              type="text"
              placeholder="Москва"
              class="form-input"
              :class="{ error: errors.city }"
            />
            <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
          </div>

          <div class="form-group">
            <label for="street">Улица *</label>
            <input
              id="street"
              v-model="street"
              v-bind="streetAttrs"
              type="text"
              placeholder="Ленина"
              class="form-input"
              :class="{ error: errors.street }"
            />
            <span v-if="errors.street" class="error-message">{{ errors.street }}</span>
          </div>

          <div class="form-group">
            <label for="house">Дом *</label>
            <input
              id="house"
              v-model="house"
              v-bind="houseAttrs"
              type="text"
              placeholder="10"
              class="form-input"
              :class="{ error: errors.house }"
            />
            <span v-if="errors.house" class="error-message">{{ errors.house }}</span>
          </div>
        </template>
      </div>

      <div class="form-section">
        <h3>Данные карты для оплаты</h3>

        <div class="form-group">
          <label for="cardNumber">Номер карты *</label>
          <input
            id="cardNumber"
            v-model="cardNumber"
            v-bind="cardNumberAttrs"
            type="text"
            placeholder="1234567890123456"
            maxlength="16"
            class="form-input"
            :class="{ error: errors.cardNumber }"
            @input="handleCardNumberInput"
          />
          <span v-if="errors.cardNumber" class="error-message">{{ errors.cardNumber }}</span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="cardExpiry">Срок действия (MM/YY) *</label>
            <input
              id="cardExpiry"
              v-model="cardExpiry"
              v-bind="cardExpiryAttrs"
              type="text"
              placeholder="12/25"
              maxlength="5"
              class="form-input"
              :class="{ error: errors.cardExpiry }"
              @input="handleCardExpiryInput"
            />
            <span v-if="errors.cardExpiry" class="error-message">{{ errors.cardExpiry }}</span>
          </div>

          <div class="form-group">
            <label for="cardCvv">CVV *</label>
            <input
              id="cardCvv"
              v-model="cardCvv"
              v-bind="cardCvvAttrs"
              type="text"
              placeholder="123"
              maxlength="3"
              class="form-input"
              :class="{ error: errors.cardCvv }"
              @input="handleCardCvvInput"
            />
            <span v-if="errors.cardCvv" class="error-message">{{ errors.cardCvv }}</span>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-group">
          <label class="checkbox-label">
            <input
              v-model="agreeToTerms"
              v-bind="agreeToTermsAttrs"
              type="checkbox"
              class="checkbox"
              :class="{ error: errors.agreeToTerms }"
            />
            <span>Я согласен с правилами обработки заказа *</span>
          </label>
          <span v-if="errors.agreeToTerms" class="error-message">{{ errors.agreeToTerms }}</span>
        </div>
      </div>

      <button type="submit" class="submit-btn">Оформить заказ</button>
    </form>
  </div>
</template>

<style scoped>
.order-form-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 2rem;
}

.back-button {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 2rem;
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

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background: #10b981;
  color: white;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.order-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.order-form h2 {
  margin: 0 0 2rem 0;
  color: #333;
  font-size: 2rem;
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h3 {
  margin: 0 0 1.5rem 0;
  color: #667eea;
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.form-input.error {
  border-color: #ef4444;
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  color: #ef4444;
  font-size: 0.875rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: normal;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .order-form {
    padding: 1rem;
  }
}
</style>

