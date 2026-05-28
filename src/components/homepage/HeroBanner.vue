<template>
  <section class="min-h-screen bg-white flex flex-col items-center justify-center pt-[68px] overflow-hidden">

    <!-- Top label -->
    <div class="text-center mb-4 animate-fade-up">
      <span class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">New Collection</span>
    </div>

    <!-- Main Heading -->
    <div class="text-center px-6 max-w-4xl mx-auto mb-6 animate-fade-up">
      <h1 class="text-[clamp(2.8rem,7vw,5.5rem)] font-black tracking-tight leading-[1.02] text-gray-900">
        Shop the latest.<br />
        <span class="text-gray-400">Built for you.</span>
      </h1>
    </div>

    <!-- Subtext -->
    <p class="text-center text-lg text-gray-500 max-w-xl mx-auto px-6 mb-10 leading-relaxed animate-fade-up">
      Discover curated essentials with fast checkout, trusted quality, and unbeatable value.
    </p>

    <!-- Buttons -->
    <div class="flex flex-wrap gap-3 justify-center mb-16 animate-fade-up">
      <RouterLink
        to="/products"
        class="px-8 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition-all duration-200"
      >
        Shop now
      </RouterLink>
      <RouterLink
        to="/register"
        class="px-8 py-3 bg-gray-100 text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-200 transition-all duration-200"
      >
        Create account
      </RouterLink>
    </div>

    <!-- Product Thumbnails -->
    <div class="flex gap-4 justify-center px-6 mb-16 animate-fade-up">
      <RouterLink
        v-for="product in previewProducts.slice(0, 5)"
        :key="product.id"
        :to="`/products/${product.id}`"
        class="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </RouterLink>
    </div>

    <!-- Bottom Stats Bar -->
    <div class="w-full border-t border-gray-100">
      <div class="max-w-3xl mx-auto grid grid-cols-3 divide-x divide-gray-100 py-8 px-6 text-center">
        <div class="px-4">
          <p class="text-2xl font-bold text-gray-900">4.9/5</p>
          <p class="text-xs text-gray-400 mt-1">Customer rating</p>
        </div>
        <div class="px-4">
          <p class="text-2xl font-bold text-gray-900">Free</p>
          <p class="text-xs text-gray-400 mt-1">Shipping over $50</p>
        </div>
        <div class="px-4">
          <p class="text-2xl font-bold text-gray-900">100%</p>
          <p class="text-xs text-gray-400 mt-1">Secure checkout</p>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()
const { featuredProducts: previewProducts } = storeToRefs(store)

onMounted(() => {
  if (!previewProducts.value.length) store.fetchFeaturedProducts()
})
</script>