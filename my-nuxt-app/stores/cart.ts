export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addItem(product: { id: string; title: string; price: number }, quantity = 1) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
        })
      }
    },
    removeItem(id: string) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    setQuantity(id: string, quantity: number) {
      const item = this.items.find((i) => i.id === id)
      if (item) {
        if (quantity <= 0) this.removeItem(id)
        else item.quantity = quantity
      }
    },
    clear() {
      this.items = []
    },
  },
})
