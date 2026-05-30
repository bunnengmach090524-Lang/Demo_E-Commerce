<template>
  <section class="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
    <div class="container">

      <!-- Header -->
      <div class="text-center mb-16">
        <p class="text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 dark:text-gray-500 mb-3">Featured</p>
        <h2 class="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-3">The latest.</h2>
        <p class="text-gray-400 dark:text-gray-500 text-base">Take a closer look.</p>
      </div>

      <!-- Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="n in 8" :key="n" class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 flex flex-col gap-3">
          <div class="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          <div class="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          <div class="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          <div class="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <RouterLink
          v-for="(product, i) in featuredProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
          :style="{ animationDelay: `${i * 0.07}s` }"
        >
          <!-- Image area -->
          <div class="relative bg-gray-50 dark:bg-gray-800 aspect-square flex items-center justify-center p-6">

            <!-- Top left badges -->
            <div class="absolute top-3 left-3 flex flex-col gap-1.5">
              <span v-if="i < 2" class="px-2.5 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-[10px] font-bold rounded-full shadow-sm tracking-wide">
                New
              </span>
              <span
                v-if="product.discountPercentage >= 10"
                class="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm"
              >
                -{{ Math.round(product.discountPercentage) }}%
              </span>
            </div>

            <!-- In Stock badge top right -->
            <div class="absolute top-3 right-3">
              <span
                v-if="product.stock > 0"
                class="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-gray-700 text-[10px] font-semibold rounded-full shadow-sm"
                :class="product.stock < 10 ? 'text-orange-500' : 'text-green-600 dark:text-green-400'"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="product.stock < 10 ? 'bg-orange-400' : 'bg-green-500'" />
                {{ product.stock < 10 ? 'Low Stock' : 'In Stock' }}
              </span>
              <span v-else class="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-gray-700 text-[10px] font-semibold text-gray-400 rounded-full shadow-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-500" />
                Sold Out
              </span>
            </div>

            <!-- Product image -->
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <!-- Info area -->
          <div class="flex flex-col flex-1 px-5 pt-4 pb-5 gap-1">

            <!-- Category -->
            <p class="text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-500">
              {{ product.category }}
            </p>

            <!-- Name -->
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-1">
              {{ product.title }}
            </h3>

            <!-- Rating -->
            <div class="flex items-center gap-1 mb-2">
              <div class="flex">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="text-xs"
                  :class="star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700'"
                >★</span>
              </div>
              <span class="text-[10px] text-gray-400 dark:text-gray-500">({{ product.rating?.toFixed(2) }})</span>
            </div>

            <!-- Price row -->
            <div class="flex items-center gap-2 mt-auto">
              <span class="text-base font-black text-gray-900 dark:text-white">${{ product.price }}</span>
              <span v-if="product.discountPercentage >= 10" class="text-xs text-gray-400 dark:text-gray-500 line-through">
                ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
              </span>
            </div>

            <!-- Add to Cart button -->
            <button
              class="mt-3 w-full py-2.5 text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5"
              :class="addedItems.has(product.id)
                ? 'bg-green-600 dark:bg-green-500 text-white cursor-default'
                : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100'"
              :disabled="addedItems.has(product.id)"
              @click.prevent="handleAddToCart(product)"
            >
              <!-- Added state -->
              <template v-if="addedItems.has(product.id)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Added!
              </template>
              <!-- Default state -->
              <template v-else>
                Add to Cart
              </template>
            </button>

          </div>
        </RouterLink>
      </div>

      <!-- View All -->
      <div class="flex justify-center mt-12">
        <RouterLink
          to="/products"
          class="px-10 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        >
          View All Products
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const store     = useProductsStore()
const cartStore = useCartStore()
const { featuredProducts, loading } = storeToRefs(store)

// Tracks which product ids are in "Added!" state
const addedItems = ref(new Set())

function handleAddToCart(product) {
  if (addedItems.value.has(product.id)) return  // prevent double-click

  cartStore.addItem(product)

  // Show green "Added!" for 1.5s then reset
  addedItems.value = new Set([...addedItems.value, product.id])
  setTimeout(() => {
    addedItems.value = new Set([...addedItems.value].filter(id => id !== product.id))
  }, 1500)
}

onMounted(() => {
  if (!featuredProducts.value.length) store.fetchFeaturedProducts()
})
</script>