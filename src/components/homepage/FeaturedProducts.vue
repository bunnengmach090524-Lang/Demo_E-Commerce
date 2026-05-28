<template>
  <section class="py-24 bg-white">
    <div class="container">

      <!-- Header -->
      <div class="text-center mb-16">
        <p class="text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-3">Featured</p>
        <h2 class="text-4xl font-black tracking-tight text-gray-900 mb-3">The latest.</h2>
        <p class="text-gray-400 text-base">Take a closer look.</p>
      </div>

      <!-- Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="n in 8" :key="n" class="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
          <div class="w-full aspect-square bg-gray-100 rounded-xl animate-pulse" />
          <div class="h-3 w-16 bg-gray-100 rounded animate-pulse" />
          <div class="h-4 w-32 bg-gray-100 rounded animate-pulse" />
          <div class="h-3 w-20 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <RouterLink
          v-for="(product, i) in featuredProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
          :style="{ animationDelay: `${i * 0.07}s` }"
        >
          <!-- Image area -->
          <div class="relative bg-gray-50 aspect-square flex items-center justify-center p-6">

            <!-- Top left badges -->
            <div class="absolute top-3 left-3 flex flex-col gap-1.5">
              <!-- New badge -->
              <span v-if="i < 2" class="px-2.5 py-1 bg-white text-gray-800 text-[10px] font-bold rounded-full shadow-sm tracking-wide">
                New
              </span>
              <!-- Discount badge -->
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
                class="flex items-center gap-1 px-2.5 py-1 bg-white text-[10px] font-semibold rounded-full shadow-sm"
                :class="product.stock < 10 ? 'text-orange-500' : 'text-green-600'"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="product.stock < 10 ? 'bg-orange-400' : 'bg-green-500'"
                />
                {{ product.stock < 10 ? 'Low Stock' : 'In Stock' }}
              </span>
              <span v-else class="flex items-center gap-1 px-2.5 py-1 bg-white text-[10px] font-semibold text-gray-400 rounded-full shadow-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-gray-300" />
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
            <p class="text-[10px] tracking-widest uppercase text-gray-400">
              {{ product.category }}
            </p>

            <!-- Name -->
            <h3 class="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1">
              {{ product.title }}
            </h3>

            <!-- Rating -->
            <div class="flex items-center gap-1 mb-2">
              <div class="flex">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="text-xs"
                  :class="star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'"
                >★</span>
              </div>
              <span class="text-[10px] text-gray-400">({{ product.rating?.toFixed(2) }})</span>
            </div>

            <!-- Price row -->
            <div class="flex items-center gap-2 mt-auto">
              <span class="text-base font-black text-gray-900">${{ product.price }}</span>
              <span
                v-if="product.discountPercentage >= 10"
                class="text-xs text-gray-400 line-through"
              >
                ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
              </span>
            </div>

            <!-- Add to Cart -->
            <button
              class="mt-3 w-full py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-700 transition-colors duration-200 active:scale-95"
              @click.prevent="handleAddToCart(product)"
            >
              Add to Cart
            </button>

          </div>
        </RouterLink>
      </div>

      <!-- View All -->
      <div class="flex justify-center mt-12">
        <RouterLink
          to="/products"
          class="px-10 py-3 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          View All Products
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const store = useProductsStore()
const cartStore = useCartStore()
const { featuredProducts, loading } = storeToRefs(store)

function handleAddToCart(product) {
  cartStore.addItem(product)
}

onMounted(() => { if (!featuredProducts.value.length) store.fetchFeaturedProducts() })
</script>