export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

export interface OrderFormData {
  fio: string
  email: string
  birthDate: string
  city: string
  street: string
  house: string
  country: string
  cardNumber: string
  cardExpiry: string
  cardCvv: string
  agreeToTerms: boolean
  needAddress: boolean
}

export interface ProductFormData {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export interface SearchFilters {
  query: string
  minPrice: number | null
  maxPrice: number | null
}

export interface CustomerAddress {
  country: string
  city: string
  street: string
  house: string
}

export interface Customer {
  name: string
  email: string
  address: CustomerAddress
}

