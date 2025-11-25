<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

const schema = yup.object({
  username: yup
    .string()
    .required('Логин обязателен для заполнения')
    .min(3, 'Логин должен содержать минимум 3 символа'),
  password: yup
    .string()
    .required('Пароль обязателен для заполнения')
    .min(4, 'Пароль должен содержать минимум 4 символа'),
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(() => {
  login()
  const redirect = route.query.redirect as string
  router.push(redirect || '/product/new')
})
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <h1>Вход в систему</h1>
        <p class="login-subtitle">Войдите для доступа к панели администратора</p>

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

          <button type="submit" class="submit-btn">Войти</button>
        </form>

        <div class="login-footer">
          <button class="back-link" @click="router.push('/')">
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

