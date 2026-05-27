<template>
  <section class="py-24 bg-gray-50">
    <div class="container">
      <!-- Header -->
      <div class="flex items-end justify-between mb-12 gap-6 flex-wrap">
        <div>
          <p class="text-xs font-bold font-display tracking-[0.15em] text-primary uppercase mb-2">Featured</p>
          <h2 class="font-display font-extrabold text-4xl text-gray-900">Featured Products</h2>
        </div>
        <p class="text-gray-500 text-sm max-w-xs text-right">
          Explore our hand-picked products with premium quality and modern design.
        </p>
      </div>

      <!-- Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="bg-white rounded-2xl p-4">
          <div class="skeleton h-48 mb-4 rounded-xl" />
          <div class="skeleton h-3 w-1/2 mb-2 rounded" />
          <div class="skeleton h-5 mb-2 rounded" />
          <div class="skeleton h-3 w-4/5 rounded" />
        </div>
      </div>

      <!-- Products -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="(product, i) in featuredProducts"
          :key="product.id"
          :product="product"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.07}s` }"
        />
      </div>

      <!-- View all -->
      <div class="flex justify-center mt-12">
        <RouterLink
          to="/products"
          class="btn-outline px-10 py-3.5 text-base rounded-xl hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-0.5 transition-all duration-300"
        >
          View All Products →
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/shoppage/ProductCard.vue'

const store = useProductsStore()
const { featuredProducts, loading } = storeToRefs(store)

onMounted(() => { if (!featuredProducts.value.length) store.fetchFeaturedProducts() })
</script>
