<template>
  <div class="min-h-screen pt-[100px] pb-16 bg-gray-50">
    <div class="container">
      <!-- Search + Sort row -->
      <div class="flex flex-wrap gap-4 items-center mb-6">
        <div class="relative flex-1 min-w-[260px]">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            v-model="localSearch"
            type="text"
            placeholder="Search products..."
            class="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors font-body"
            @keyup.enter="doSearch"
            @input="debouncedSearch"
          />
        </div>
        <select
          v-model="sortValue"
          class="px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm font-body outline-none focus:border-primary transition-colors bg-white cursor-pointer min-w-[160px]"
        >
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <!-- Category filter pills -->
      <div class="flex flex-wrap gap-2 items-center p-5 bg-white rounded-2xl border border-gray-100 mb-6">
        <button
          class="px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200"
          :class="activeCategory === 'all' ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'"
          @click="setCategory('all')"
        >All</button>
        <button
          v-for="cat in filterCategories"
          :key="cat.slug"
          class="px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 whitespace-nowrap"
          :class="activeCategory === cat.slug ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'"
          @click="setCategory(cat.slug)"
        >{{ cat.name }}</button>
      </div>

      <!-- Results info -->
      <div class="flex justify-between items-center mb-6 text-sm text-gray-500">
        <span>Showing <strong class="text-gray-900">{{ products.length }}</strong> products</span>
        <span>Browse our latest collection</span>
      </div>

      <!-- Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="bg-white rounded-2xl p-4">
          <div class="skeleton h-48 mb-3 rounded-xl" />
          <div class="skeleton h-3 w-1/2 mb-2 rounded" />
          <div class="skeleton h-4 mb-2 rounded" />
          <div class="skeleton h-3 w-4/5 rounded" />
        </div>
      </div>

      <!-- Products grid -->
      <div v-else-if="sortedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="(product, i) in sortedProducts"
          :key="product.id"
          :product="product"
          class="animate-fade-up"
          :style="{ animationDelay: `${(i % 8) * 0.05}s` }"
        />
      </div>

      <!-- No results -->
      <div v-else class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="font-display font-bold text-2xl text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-500 mb-6">Try a different search or category</p>
        <button class="btn-primary" @click="resetFilters">Reset Filters</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/shoppage/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()
const { products, loading } = storeToRefs(store)

const localSearch    = ref(route.query.q || '')
const sortValue      = ref('latest')
const activeCategory = ref(route.query.category || 'all')

const filterCategories = [
  { slug: 'smartphones',     name: 'Mobile & Accessories' },
  { slug: 'laptops',         name: 'Computer & Laptop' },
  { slug: 'home-decoration', name: 'Home Electronics' },
  { slug: 'fragrances',      name: 'Gadgets' },
  { slug: 'tops',            name: 'Fashion' },
  { slug: 'furniture',       name: 'Furniture' },
]

const sortedProducts = computed(() => {
  const p = [...products.value]
  if (sortValue.value === 'price-asc')  return p.sort((a, b) => a.price - b.price)
  if (sortValue.value === 'price-desc') return p.sort((a, b) => b.price - a.price)
  if (sortValue.value === 'rating')     return p.sort((a, b) => b.rating - a.rating)
  return p
})

let timer
function debouncedSearch() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    localSearch.value.trim() ? store.searchProducts(localSearch.value) : loadProducts()
  }, 400)
}
function doSearch() {
  if (localSearch.value.trim()) {
    store.searchProducts(localSearch.value)
    router.replace({ query: { q: localSearch.value } })
  }
}
function setCategory(slug) {
  activeCategory.value = slug
  localSearch.value = ''
  slug === 'all' ? store.fetchProducts(20) : store.fetchByCategory(slug, 20)
  router.replace({ query: slug === 'all' ? {} : { category: slug } })
}
function resetFilters() {
  activeCategory.value = 'all'
  localSearch.value = ''
  sortValue.value = 'latest'
  store.fetchProducts(20)
  router.replace({ query: {} })
}
function loadProducts() {
  if (route.query.q) store.searchProducts(route.query.q)
  else if (route.query.category && route.query.category !== 'all') store.fetchByCategory(route.query.category, 20)
  else store.fetchProducts(20)
}

onMounted(loadProducts)
watch(() => route.query, () => {
  localSearch.value = route.query.q || ''
  activeCategory.value = route.query.category || 'all'
  loadProducts()
})
</script>
