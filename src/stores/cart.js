import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart') || '[]'))
  const isOpen = ref(false)

  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function addItem(product, quantity = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity,
        stock: product.stock
      })
    }
    saveCart()
    isOpen.value = true
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
    saveCart()
  }

  function updateQuantity(id, quantity) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      if (quantity <= 0) removeItem(id)
      else item.quantity = quantity
      saveCart()
    }
  }

  function clearCart() {
    items.value = []
    saveCart()
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  return {
    items, isOpen, totalItems, totalPrice,
    addItem, removeItem, updateQuantity, clearCart, toggleCart
  }
})
