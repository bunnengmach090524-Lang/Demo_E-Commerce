import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ProductApi } from '@/api/ProductApi'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const featuredProducts = ref([])
  const currentProduct = ref(null)
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const total = ref(0)
  const searchQuery = ref('')
  const activeCategory = ref('all')
  const sortOrder = ref('latest')

  // Mapped categories with icons for the homepage
  const categoryIcons = {
    'smartphones': '📱',
    'laptops': '💻',
    'fragrances': '🌸',
    'skincare': '✨',
    'groceries': '🛒',
    'home-decoration': '🏠',
    'furniture': '🛋️',
    'tops': '👕',
    'womens-dresses': '👗',
    'womens-shoes': '👠',
    'mens-shirts': '👔',
    'mens-shoes': '👟',
    'mens-watches': '⌚',
    'womens-watches': '⌚',
    'womens-bags': '👜',
    'womens-jewellery': '💍',
    'sunglasses': '🕶️',
    'automotive': '🚗',
    'motorcycle': '🏍️',
    'lighting': '💡'
  }

  const displayCategories = computed(() => {
    const featured = ['smartphones', 'laptops', 'furniture', 'tops', 'fragrances', 'home-decoration']
    return categories.value
      .filter(c => featured.includes(c.slug))
      .map(c => ({
        ...c,
        icon: categoryIcons[c.slug] || '📦',
        label: c.name
      }))
  })

  async function fetchProducts(limit = 20, skip = 0) {
    loading.value = true
    error.value = null
    try {
      const data = await ProductApi.getAll(limit, skip)
      products.value = data.products
      total.value = data.total
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchFeaturedProducts() {
    loading.value = true
    try {
      const data = await ProductApi.getAll(8, 0)
      featuredProducts.value = data.products
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id) {
    loading.value = true
    error.value = null
    currentProduct.value = null
    try {
      const data = await ProductApi.getById(id)
      currentProduct.value = data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchByCategory(category, limit = 20, skip = 0) {
    loading.value = true
    error.value = null
    try {
      const data = await ProductApi.getByCategory(category, limit, skip)
      products.value = data.products
      total.value = data.total
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function searchProducts(query) {
    loading.value = true
    error.value = null
    searchQuery.value = query
    try {
      const data = await ProductApi.search(query)
      products.value = data.products
      total.value = data.total
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const data = await ProductApi.getCategories()
      categories.value = data
    } catch (e) {
      console.error('Failed to load categories', e)
    }
  }

  return {
    products, featuredProducts, currentProduct, categories,
    loading, error, total, searchQuery, activeCategory, sortOrder,
    displayCategories,
    fetchProducts, fetchFeaturedProducts, fetchProductById,
    fetchByCategory, searchProducts, fetchCategories
  }
})
