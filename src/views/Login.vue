<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useCustomerStore } from '../stores/customer'
import type { Customer } from '../types'

const router = useRouter()
const route = useRoute()
const customerStore = useCustomerStore()

const schema = yup.object({
  username: yup
    .string()
    .required('Логин обязателен для заполнения')
    .min(3, 'Логин должен содержать минимум 3 символа'),
  password: yup
    .string()
    .required('Пароль обязателен для заполнения')
    .min(4, 'Пароль должен содержать минимум 4 символа'),
  name: yup
    .string()
    .required('Имя обязательно для заполнения')
    .min(2, 'Минимум 2 символа'),
  email: yup
    .string()
    .required('Email обязателен для заполнения')
    .email('Введите корректный email'),
  country: yup.string().required('Страна обязательна'),
  city: yup.string().required('Город обязателен'),
  street: yup.string().required('Улица обязательна'),
  house: yup.string().required('Дом обязателен'),
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [country, countryAttrs] = defineField('country')
const [city, cityAttrs] = defineField('city')
const [street, streetAttrs] = defineField('street')
const [house, houseAttrs] = defineField('house')

const onSubmit = handleSubmit((values) => {
  const customer: Customer = {
    name: values.name,
    email: values.email,
    address: {
      country: values.country,
      city: values.city,
      street: values.street,
      house: values.house,
    },
  }
  customerStore.login(customer)
  const redirect = route.query.redirect as string
  router.push(redirect || '/')
})
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <h1>Вход в систему</h1>
        <p class="login-subtitle">Введите данные для входа и доставки</p>

        <form @submit="onSubmit" class="login-form">
          <div class="form-group">
            <label for="username">Логин *</label>
            <input
              id="username"
              v-model="username"
              v-bind="usernameAttrs"
              type="text"
              placeholder="Введите логин"
              class="form-input"
              :class="{ error: errors.username }"
            />
            <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
          </div>

          <div class="form-group">
            <label for="password">Пароль *</label>
            <input
              id="password"
              v-model="password"
              v-bind="passwordAttrs"
              type="password"
              placeholder="Введите пароль"
              class="form-input"
              :class="{ error: errors.password }"
            />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <div class="form-section-label">Данные покупателя</div>
          <div class="form-group">
            <label for="name">ФИО *</label>
            <input
              id="name"
              v-model="name"
              v-bind="nameAttrs"
              type="text"
              placeholder="Иванов Иван Иванович"
              class="form-input"
              :class="{ error: errors.name }"
            />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
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

          <div class="form-section-label">Адрес</div>
          <div class="form-group">
            <label for="country">Страна *</label>
            <input
              id="country"
              v-model="country"
              v-bind="countryAttrs"
              type="text"
              placeholder="Россия"
              class="form-input"
              :class="{ error: errors.country }"
            />
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

          <button type="submit" class="submit-btn">Войти</button>
        </form>

        <div class="login-footer">
          <button type="button" class="back-link" @click="router.push('/')">
            ← Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.login-card h1 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 2rem;
  text-align: center;
}

.login-subtitle {
  margin: 0 0 2rem 0;
  color: #666;
  text-align: center;
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section-label {
  font-weight: 600;
  color: #667eea;
  margin-top: 0.5rem;
  font-size: 0.95rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.form-input.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.back-link {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
  padding: 0.5rem;
}

.back-link:hover {
  color: #764ba2;
}
</style>
