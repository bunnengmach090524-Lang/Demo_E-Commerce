<template>
  <div class="min-h-screen pt-[68px] bg-white">

    <!-- Breadcrumb -->
    <div class="border-b border-gray-100">
      <div class="container">
        <nav class="flex items-center gap-2 text-xs text-gray-400 py-3 flex-wrap">
          <RouterLink to="/" class="hover:text-gray-700 transition-colors">Home</RouterLink>
          <span>›</span>
          <RouterLink to="/products" class="hover:text-gray-700 transition-colors">Products</RouterLink>
          <span>›</span>
          <span class="text-gray-900 truncate max-w-xs">{{ product?.title }}</span>
        </nav>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="container py-20 grid lg:grid-cols-2 gap-16">
      <div class="bg-gray-100 rounded-3xl aspect-square animate-pulse" />
      <div class="flex flex-col gap-4 pt-8">
        <div class="h-3 w-20 bg-gray-100 rounded animate-pulse" />
        <div class="h-10 w-3/4 bg-gray-100 rounded animate-pulse" />
        <div class="h-4 w-32 bg-gray-100 rounded animate-pulse" />
        <div class="h-8 w-24 bg-gray-100 rounded animate-pulse" />
        <div class="h-20 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="container py-20 text-center">
      <p class="text-gray-400 mb-6">{{ error }}</p>
      <button class="px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold" @click="$router.back()">Go Back</button>
    </div>

    <!-- Product -->
    <div v-else-if="product" class="container py-16">
      <div class="grid lg:grid-cols-2 gap-16 items-start">

        <!-- LEFT: Gallery -->
        <div class="flex gap-4 lg:sticky lg:top-24">
          <!-- Thumbnails -->
          <div class="flex flex-col gap-2">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              class="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border-2 transition-all duration-200 flex-shrink-0"
              :class="activeImg === i ? 'border-gray-900' : 'border-transparent hover:border-gray-200'"
              @click="activeImg = i"
            >
              <img :src="img" :alt="`Image ${i+1}`" class="w-full h-full object-contain p-1.5" loading="lazy" />
            </button>
          </div>

          <!-- Main image -->
          <div class="flex-1 relative bg-gray-50 rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
            <Transition
              enter-active-class="transition duration-200"
              enter-from-class="opacity-0 scale-[0.97]"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
              mode="out-in"
            >
              <img
                :key="activeImg"
                :src="product.images?.[activeImg]"
                :alt="product.title"
                class="w-4/5 h-4/5 object-contain"
              />
            </Transition>

            <!-- Discount badge -->
            <div v-if="product.discountPercentage >= 10" class="absolute top-4 left-4">
              <span class="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full">
                -{{ Math.round(product.discountPercentage) }}%
              </span>
            </div>

            <!-- Nav arrows -->
            <button
              v-if="product.images?.length > 1"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-sm grid place-items-center text-gray-600 hover:bg-gray-100 transition-all"
              @click="prevImg"
            >‹</button>
            <button
              v-if="product.images?.length > 1"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-sm grid place-items-center text-gray-600 hover:bg-gray-100 transition-all"
              @click="nextImg"
            >›</button>
          </div>
        </div>

        <!-- RIGHT: Info -->
        <div class="pt-2">

          <!-- Category + stock -->
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xs font-semibold tracking-widest uppercase text-gray-400">
              {{ product.category?.replace(/-/g, ' ') }}
            </span>
            <span class="text-gray-300">·</span>
            <span
              class="flex items-center gap-1 text-xs font-semibold"
              :class="product.stock < 10 ? 'text-orange-500' : 'text-green-600'"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="product.stock < 10 ? 'bg-orange-400' : 'bg-green-500'" />
              {{ product.stock < 10 ? 'Only ' + product.stock + ' left' : 'In Stock' }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl font-black tracking-tight text-gray-900 leading-tight mb-4">
            {{ product.title }}
          </h1>

          <!-- Rating -->
          <div class="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
            <div class="flex">
              <span
                v-for="n in 5" :key="n"
                class="text-sm"
                :class="n <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'"
              >★</span>
            </div>
            <span class="text-xs text-blue-500 font-medium">{{ product.reviews?.length || 0 }} Reviews</span>
          </div>

          <!-- Price -->
          <div class="mb-6 pb-6 border-b border-gray-100">
            <div class="flex items-baseline gap-3 mb-1">
              <span class="text-4xl font-black text-gray-900">${{ product.price?.toFixed(2) }}</span>
              <span v-if="product.discountPercentage > 5" class="text-lg text-gray-400 line-through">
                ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
              </span>
            </div>
            <p class="text-xs text-gray-400">
              {{ product.stock }} items available
              <span v-if="product.discountPercentage > 5" class="ml-2 text-red-500 font-semibold">
                Save {{ Math.round(product.discountPercentage) }}%
              </span>
            </p>
          </div>

          <!-- Description -->
          <div class="mb-6 pb-6 border-b border-gray-100">
            <p class="text-sm text-gray-500 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Quantity -->
          <div class="mb-8">
            <p class="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">Quantity</p>
            <div class="inline-flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button
                class="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-light"
                @click="qty > 1 && qty--"
              >−</button>
              <span class="px-6 text-sm font-bold text-gray-900 min-w-[60px] text-center">{{ qty }}</span>
              <button
                class="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-light"
                @click="qty < product.stock && qty++"
              >+</button>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col gap-3 mb-8">
            <button
              class="w-full py-4 bg-gray-900 text-white text-sm font-bold rounded-2xl hover:bg-gray-700 transition-colors duration-200 active:scale-[0.99]"
              @click="addToCart"
            >
              Add to Cart
            </button>
            <button
              class="w-full py-4 bg-blue-500 text-white text-sm font-bold rounded-2xl hover:bg-blue-600 transition-colors duration-200 active:scale-[0.99]"
              @click="buyNow"
            >
              Buy Now
            </button>
          </div>

          <!-- Back link -->
          <RouterLink to="/products" class="text-xs text-blue-500 font-medium hover:underline underline-offset-2">
            ← Back to products
          </RouterLink>

        </div>
      </div>

      <!-- You May Also Like -->
      <div v-if="relatedProducts.length" class="mt-20 pt-16 border-t border-gray-100">
        <div class="flex items-baseline justify-between mb-10">
          <div>
            <p class="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">More to explore</p>
            <h2 class="text-2xl font-black tracking-tight text-gray-900">You May Also Like</h2>
          </div>
          <RouterLink to="/products" class="text-sm text-blue-500 font-medium hover:underline underline-offset-2">
            See all →
          </RouterLink>
        </div>

        <!-- Horizontal scroll on mobile, grid on desktop -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <RouterLink
            v-for="p in relatedProducts"
            :key="p.id"
            :to="`/products/${p.id}`"
            class="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <!-- Image -->
            <div class="bg-gray-50 aspect-square flex items-center justify-center p-5 relative overflow-hidden">
              <img
                :src="p.thumbnail"
                :alt="p.title"
                class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span
                v-if="p.discountPercentage >= 10"
                class="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full"
              >
                -{{ Math.round(p.discountPercentage) }}%
              </span>
            </div>

            <!-- Info -->
            <div class="px-4 pt-3 pb-4 flex flex-col gap-1">
              <p class="text-[10px] tracking-widest uppercase text-gray-400">{{ p.category?.replace(/-/g, ' ') }}</p>
              <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">{{ p.title }}</h3>
              <div class="flex items-center gap-1 mt-0.5">
                <div class="flex">
                  <span v-for="star in 5" :key="star" class="text-xs" :class="star <= Math.round(p.rating) ? 'text-yellow-400' : 'text-gray-200'">★</span>
                </div>
                <span class="text-[10px] text-gray-400">({{ p.rating?.toFixed(1) }})</span>
              </div>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-sm font-black text-gray-900">${{ p.price?.toFixed(2) }}</span>
                <span v-if="p.discountPercentage > 5" class="text-xs text-gray-400 line-through">
                  ${{ (p.price / (1 - p.discountPercentage / 100)).toFixed(2) }}
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Reviews -->
      <div v-if="product?.reviews?.length" class="mt-20 pt-16 border-t border-gray-100">
        <div class="flex items-baseline justify-between mb-10">
          <h2 class="text-2xl font-black tracking-tight text-gray-900">Customer Reviews</h2>
          <span class="text-sm text-gray-400">{{ product.reviews.length }} reviews</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="review in product.reviews"
            :key="review.reviewerName"
            class="bg-gray-50 rounded-2xl p-6"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-gray-900 text-white rounded-full grid place-items-center text-sm font-bold shrink-0">
                  {{ review.reviewerName?.[0] }}
                </div>
                <div>
                  <strong class="block text-sm text-gray-900">{{ review.reviewerName }}</strong>
                  <div class="flex gap-0.5">
                    <span v-for="n in 5" :key="n" class="text-xs" :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-200'">★</span>
                  </div>
                </div>
              </div>
              <span class="text-[10px] text-gray-400">{{ new Date(review.date).toLocaleDateString() }}</span>
            </div>
            <p class="text-sm text-gray-500 leading-relaxed">{{ review.comment }}</p>
          </div>
        </div>
      </div>
      

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()
const cartStore = useCartStore()
const { currentProduct: product, loading, error, featuredProducts } = storeToRefs(store)

const activeImg = ref(0)
const qty = ref(1)

// Related: same category, exclude current, max 4
const relatedProducts = computed(() => {
  if (!product.value || !featuredProducts.value.length) return []
  return featuredProducts.value
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
    .concat(
      featuredProducts.value
        .filter(p => p.category !== product.value.category && p.id !== product.value.id)
        .slice(0, Math.max(0, 4 - featuredProducts.value.filter(p => p.category === product.value.category && p.id !== product.value.id).length))
    )
    .slice(0, 4)
})

function prevImg() {
  activeImg.value = activeImg.value === 0 ? (product.value.images?.length - 1) : activeImg.value - 1
}
function nextImg() {
  activeImg.value = (activeImg.value + 1) % (product.value.images?.length || 1)
}
function addToCart() {
  cartStore.addItem(product.value, qty.value)
  window.$toast?.success(`${product.value.title} added to cart!`)
}
function buyNow() {
  cartStore.addItem(product.value, qty.value)
  router.push('/checkout')
}

onMounted(() => {
  store.fetchProductById(route.params.id)
  if (!featuredProducts.value.length) store.fetchFeaturedProducts()
})
watch(() => route.params.id, id => {
  store.fetchProductById(id)
  activeImg.value = 0
  qty.value = 1
})
</script>