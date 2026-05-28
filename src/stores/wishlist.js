import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref(JSON.parse(localStorage.getItem('wishlist') || '[]'))

  const totalItems = computed(() => items.value.length)

  function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(items.value))
  }

  function addItem(product) {
    const exists = items.value.find(i => i.id === product.id)
    if (!exists) {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
        rating: product.rating,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
      })
      saveWishlist()
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
    saveWishlist()
  }

  function toggleItem(product) {
    if (isInWishlist(product.id)) removeItem(product.id)
    else addItem(product)
  }

  function isInWishlist(id) {
    return items.value.some(i => i.id === id)
  }

  function clearWishlist() {
    items.value = []
    saveWishlist()
  }

  return {
    items, totalItems,
    addItem, removeItem, toggleItem, isInWishlist, clearWishlist
  }
})