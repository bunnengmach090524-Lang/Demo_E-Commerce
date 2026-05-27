<template>
  <div class="min-h-screen pt-[100px] pb-16 bg-gray-50">
    <div class="container">
      <h1 class="font-display font-extrabold text-3xl text-gray-900 mb-8">My Wishlist</h1>
      <div v-if="!items.length" class="text-center py-20 bg-white rounded-2xl">
        <div class="text-7xl mb-4">❤️</div>
        <h2 class="font-display font-bold text-2xl text-gray-900 mb-2">Your wishlist is empty</h2>
        <RouterLink to="/products" class="btn-primary mt-4 inline-flex">Browse Products</RouterLink>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="item in items" :key="item.id" class="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
          <img :src="item.thumbnail" :alt="item.title" class="w-full h-40 object-contain" />
          <h3 class="font-display font-bold text-sm text-gray-900 line-clamp-2">{{ item.title }}</h3>
          <p class="text-primary font-bold">${{ item.price?.toFixed(2) }}</p>
          <RouterLink :to="`/products/${item.id}`" class="btn-primary justify-center text-sm py-2.5 rounded-xl">View Product</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const items = ref(JSON.parse(localStorage.getItem('wishlist') || '[]'))
</script>
