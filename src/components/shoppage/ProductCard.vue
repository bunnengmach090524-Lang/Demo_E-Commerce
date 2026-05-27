<template>
  <div
    class="group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-strong hover:border-transparent"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Image area -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-50">
      <RouterLink :to="`/products/${product.id}`">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          loading="lazy"
          class="w-full h-full object-contain p-4 transition-transform duration-500"
          :class="hovered ? 'scale-110' : 'scale-100'"
        />
        <!-- View overlay -->
        <div
          class="absolute inset-0 bg-[#0f0f1a]/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
          :class="hovered ? 'opacity-100' : 'opacity-0'"
        >
          <span class="bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full">
            👁 View
          </span>
        </div>
      </RouterLink>

      <!-- Badges top-left -->
      <div class="absolute top-3 left-3 flex gap-1.5">
        <span class="badge-green">In Stock</span>
        <span v-if="product.discountPercentage > 15" class="badge-accent">
          -{{ Math.round(product.discountPercentage) }}%
        </span>
      </div>

      <!-- Wishlist top-right -->
      <button
        class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full grid place-items-center shadow-soft transition-all duration-200 hover:bg-red-50"
        :class="isWishlisted ? 'text-red-500' : 'text-gray-400'"
        aria-label="Wishlist"
        @click.prevent="toggleWishlist"
      >
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          :class="isWishlisted ? 'fill-red-500 stroke-red-500' : ''">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>

    <!-- Body -->
    <div class="p-5 flex flex-col flex-1">
      <!-- Category -->
      <p class="text-[11px] font-bold tracking-[0.1em] text-primary uppercase mb-1.5">
        {{ product.category?.replace(/-/g, ' ') }}
      </p>

      <!-- Title -->
      <h3 class="font-display font-bold text-sm text-gray-900 leading-snug mb-1.5 line-clamp-2">
        {{ product.title }}
      </h3>

      <!-- Description -->
      <p class="text-xs text-gray-400 leading-relaxed mb-3.5 flex-1 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Price row -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <span class="font-display font-extrabold text-lg text-gray-900">
            ${{ product.price?.toFixed(2) }}
          </span>
          <span v-if="product.discountPercentage > 5" class="text-xs text-gray-400 line-through">
            ${{ originalPrice }}
          </span>
        </div>
        <span class="text-xs text-gray-400">{{ product.stock }} left</span>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <button
          class="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-primary text-white text-sm font-display font-semibold rounded-xl hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-primary transition-all duration-200"
          @click="addToCart"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add to Cart
        </button>
        <RouterLink
          :to="`/products/${product.id}`"
          class="px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-display font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all duration-200"
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

const cartStore   = useCartStore()
const hovered     = ref(false)
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

// Init wishlist state
isWishlisted.value = JSON.parse(localStorage.getItem('wishlist') || '[]').some(i => i.id === props.product.id)
</script>
