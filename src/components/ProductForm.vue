<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import type { ProductFormData } from '../types'

const emit = defineEmits<{
  productCreated: [product: ProductFormData]
}>()

const schema = yup.object({
  title: yup
    .string()
    .required('Название товара обязательно для заполнения')
    .min(3, 'Название должно содержать минимум 3 символа'),
  price: yup
    .number()
    .required('Цена обязательна для заполнения')
    .positive('Цена должна быть положительным числом')
    .typeError('Цена должна быть числом'),
  description: yup
    .string()
    .required('Описание обязательно для заполнения')
    .min(10, 'Описание должно содержать минимум 10 символов'),
  category: yup.string().required('Категория обязательна для заполнения'),
  image: yup
    .string()
    .required('URL изображения обязателен для заполнения')
    .url('Введите корректный URL'),
})

const { defineField, handleSubmit, errors, resetForm } = useForm<ProductFormData>({
  validationSchema: schema,
})

const [title, titleAttrs] = defineField('title')
const [price, priceAttrs] = defineField('price')
const [description, descriptionAttrs] = defineField('description')
const [category, categoryAttrs] = defineField('category')
const [image, imageAttrs] = defineField('image')

const categories = [
  "men's clothing",
  "women's clothing",
  'electronics',
  'jewelery',
]

const onSubmit = handleSubmit((values) => {
  emit('productCreated', values)
  resetForm()
  alert('Товар успешно создан!')
})

const showPreview = ref(false)
</script>

<template>
  <div class="product-form-container">
    <form @submit="onSubmit" class="product-form">
      <h2>Создание нового товара</h2>

      <div class="form-group">
        <label for="title">Название товара *</label>
        <input
          id="title"
          v-model="title"
          v-bind="titleAttrs"
          type="text"
          placeholder="Название товара"
          class="form-input"
          :class="{ error: errors.title }"
        />
        <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="price">Цена ($) *</label>
          <input
            id="price"
            v-model.number="price"
            v-bind="priceAttrs"
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            class="form-input"
            :class="{ error: errors.price }"
          />
          <span v-if="errors.price" class="error-message">{{ errors.price }}</span>
        </div>

        <div class="form-group">
          <label for="category">Категория *</label>
          <select
            id="category"
            v-model="category"
            v-bind="categoryAttrs"
            class="form-input"
            :class="{ error: errors.category }"
          >
            <option value="">Выберите категорию</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
          <span v-if="errors.category" class="error-message">{{ errors.category }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Описание *</label>
        <textarea
          id="description"
          v-model="description"
          v-bind="descriptionAttrs"
          placeholder="Описание товара"
          rows="4"
          class="form-input"
          :class="{ error: errors.description }"
        ></textarea>
        <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
      </div>

      <div class="form-group">
        <label for="image">URL изображения *</label>
        <input
          id="image"
          v-model="image"
          v-bind="imageAttrs"
          type="url"
          placeholder="https://example.com/image.jpg"
          class="form-input"
          :class="{ error: errors.image }"
        />
        <span v-if="errors.image" class="error-message">{{ errors.image }}</span>
        <label class="checkbox-label" style="margin-top: 0.5rem">
          <input v-model="showPreview" type="checkbox" class="checkbox" />
          <span>Показать превью изображения</span>
        </label>
      </div>

      <div v-if="showPreview && image && !errors.image" class="image-preview">
        <img :src="image" alt="Preview" @error="showPreview = false" />
      </div>

      <button type="submit" class="submit-btn">Создать товар</button>
    </form>
  </div>
</template>

<style scoped>
.product-form-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.product-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-form h2 {
  margin: 0 0 2rem 0;
  color: #333;
  font-size: 2rem;
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
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.form-input.error {
  border-color: #ef4444;
}

textarea.form-input {
  resize: vertical;
  min-height: 100px;
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

.image-preview {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
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

  .product-form {
    padding: 1rem;
  }
}
</style>

