<template>
  <div
    class="group bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
  >
    <!-- Image area -->
    <div class="relative bg-gray-50 aspect-square flex items-center justify-center p-6 overflow-hidden">

      <RouterLink :to="`/products/${product.id}`" class="absolute inset-0 z-10" />

      <!-- Top left badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
        <span
          v-if="product.discountPercentage >= 10"
          class="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm"
        >
          -{{ Math.round(product.discountPercentage) }}%
        </span>
      </div>

      <!-- Top right: stock + wishlist -->
      <div class="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-20">
        <!-- Stock -->
        <span
          class="flex items-center gap-1 px-2.5 py-1 bg-white text-[10px] font-semibold rounded-full shadow-sm"
          :class="product.stock < 10 ? 'text-orange-500' : 'text-green-600'"
        >
          <span class="w-1.5 h-1.5 rounded-full" :class="product.stock < 10 ? 'bg-orange-400' : 'bg-green-500'" />
          {{ product.stock < 10 ? 'Low Stock' : 'In Stock' }}
        </span>

        <!-- Wishlist button -->
        <button
          class="w-8 h-8 bg-white rounded-full grid place-items-center shadow-sm hover:bg-red-50 transition-colors duration-200"
          :class="isWishlisted ? 'text-red-500' : 'text-gray-300'"
          aria-label="Wishlist"
          @click.prevent="toggleWishlist"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            :class="isWishlisted ? 'fill-red-500 stroke-red-500' : ''">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <!-- Product image -->
      <img
        :src="product.thumbnail"
        :alt="product.title"
        loading="lazy"
        class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
      />

    </div>

    <!-- Info area -->
    <div class="flex flex-col flex-1 px-5 pt-4 pb-5 gap-1">

      <!-- Category -->
      <p class="text-[10px] tracking-widest uppercase text-gray-400">
        {{ product.category?.replace(/-/g, ' ') }}
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

      <!-- Price -->
      <div class="flex items-center gap-2 mt-auto mb-3">
        <span class="text-base font-black text-gray-900">${{ product.price?.toFixed(2) }}</span>
        <span v-if="product.discountPercentage > 5" class="text-xs text-gray-400 line-through">
          ${{ originalPrice }}
        </span>
        <span class="text-xs text-gray-400 ml-auto">{{ product.stock }} left</span>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <button
          class="flex-1 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-700 transition-colors duration-200 active:scale-95"
          @click="addToCart"
        >
          Add to Cart
        </button>
        <RouterLink
          :to="`/products/${product.id}`"
          class="px-4 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
        >
          View
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps({ product: { type: Object, required: true } })

const cartStore = useCartStore()
const isWishlisted = ref(false)

const originalPrice = computed(() => {
  const d = props.product.discountPercentage || 0
  return (props.product.price / (1 - d / 100)).toFixed(2)
})

function addToCart() {
  cartStore.addItem(props.product)
  window.$toast?.success(`${props.product.title} added to cart!`)
}

function toggleWishlist() {
  isWishlisted.value = !isWishlisted.value
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  if (isWishlisted.value) {
    if (!wishlist.find(i => i.id === props.product.id)) {
      wishlist.push({ id: props.product.id, title: props.product.title, price: props.product.price, thumbnail: props.product.thumbnail })
    }
  } else {
    const idx = wishlist.findIndex(i => i.id === props.product.id)
    if (idx > -1) wishlist.splice(idx, 1)
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist))
}

isWishlisted.value = JSON.parse(localStorage.getItem('wishlist') || '[]').some(i => i.id === props.product.id)
</script>