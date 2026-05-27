<template>
  <div class="min-h-screen pt-[100px] pb-16 bg-gray-50">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
        <RouterLink to="/" class="hover:text-primary transition-colors">Home</RouterLink>
        <span>/</span>
        <RouterLink to="/products" class="hover:text-primary transition-colors">Products</RouterLink>
        <span>/</span>
        <span class="text-gray-900 font-medium truncate max-w-xs">{{ product?.title }}</span>
      </nav>

      <!-- Loading -->
      <div v-if="loading" class="grid lg:grid-cols-2 gap-14">
        <div class="skeleton h-[480px] rounded-2xl" />
        <div class="flex flex-col gap-4">
          <div class="skeleton h-6 w-1/3 rounded" />
          <div class="skeleton h-10 rounded" />
          <div class="skeleton h-4 w-1/2 rounded" />
          <div class="skeleton h-4 rounded" />
          <div class="skeleton h-4 w-4/5 rounded" />
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button class="btn-primary" @click="$router.back()">Go Back</button>
      </div>

      <!-- Product detail -->
      <div v-else-if="product" class="grid lg:grid-cols-2 gap-14 items-start">
        <!-- Gallery -->
        <div class="flex gap-4">
          <!-- Thumbnails -->
          <div class="flex flex-col gap-2.5 w-20">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              class="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border-2 transition-all duration-200"
              :class="activeImg === i ? 'border-primary' : 'border-transparent hover:border-primary/40'"
              @click="activeImg = i"
            >
              <img :src="img" :alt="`Image ${i+1}`" class="w-full h-full object-contain p-2" loading="lazy" />
            </button>
          </div>

          <!-- Main image -->
          <div class="flex-1 relative bg-gray-50 rounded-2xl overflow-hidden min-h-[460px] flex items-center justify-center">
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
                class="max-h-[460px] w-full object-contain p-8"
              />
            </Transition>
            <!-- Arrows -->
            <button
              v-if="product.images?.length > 1"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-soft grid place-items-center text-xl text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
              @click="prevImg"
            >‹</button>
            <button
              v-if="product.images?.length > 1"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-soft grid place-items-center text-xl text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
              @click="nextImg"
            >›</button>
          </div>
        </div>

        <!-- Info panel -->
        <div>
          <!-- Tags -->
          <div class="flex gap-2 mb-4">
            <span class="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1 rounded-full capitalize">
              {{ product.category }}
            </span>
            <span class="badge-green">In Stock</span>
          </div>

          <h1 class="font-display font-black text-3xl text-gray-900 leading-tight mb-4">
            {{ product.title }}
          </h1>

          <!-- Rating -->
          <div class="flex items-center gap-2.5 mb-5">
            <div class="flex gap-0.5">
              <span
                v-for="n in 5"
                :key="n"
                class="text-base"
                :class="n <= Math.round(product.rating) ? 'text-accent' : 'text-gray-200'"
              >★</span>
            </div>
            <span class="text-sm text-gray-400">({{ product.reviews?.length || 120 }} reviews)</span>
          </div>

          <!-- Price -->
          <div class="flex items-center gap-3 mb-2">
            <span class="font-display font-black text-4xl text-gray-900">${{ product.price?.toFixed(2) }}</span>
            <span v-if="product.discountPercentage > 5" class="text-base text-gray-400 line-through">
              ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
            </span>
            <span v-if="product.discountPercentage > 5" class="bg-accent text-dark text-xs font-bold px-2.5 py-1 rounded-full">
              -{{ Math.round(product.discountPercentage) }}% OFF
            </span>
          </div>
          <p class="text-sm text-gray-400 mb-6">{{ product.stock }} items available</p>

          <!-- Description -->
          <div class="mb-6">
            <h3 class="font-display font-bold text-gray-900 mb-2">Description</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Quantity -->
          <div class="mb-6">
            <label class="block font-semibold text-sm text-gray-900 mb-3">Quantity</label>
            <div class="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden w-fit">
              <button
                class="w-11 h-11 flex items-center justify-center text-gray-700 text-xl hover:bg-primary hover:text-white transition-all duration-150"
                @click="qty > 1 && qty--"
              >-</button>
              <span class="px-5 font-display font-bold min-w-[60px] text-center">{{ qty }}</span>
              <button
                class="w-11 h-11 flex items-center justify-center text-gray-700 text-xl hover:bg-primary hover:text-white transition-all duration-150"
                @click="qty < product.stock && qty++"
              >+</button>
            </div>
          </div>

          <!-- CTA buttons -->
          <div class="flex flex-wrap gap-3 mb-6">
            <button
              class="flex-1 min-w-[160px] flex items-center justify-center gap-2 py-4 bg-primary text-white font-display font-bold text-base rounded-xl hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-primary transition-all duration-200"
              @click="addToCart"
            >
              🛒 Add To Cart
            </button>
            <button
              class="px-7 py-4 border-2 border-gray-200 text-gray-900 font-display font-bold text-base rounded-xl hover:border-primary hover:text-primary transition-all duration-200"
              @click="buyNow"
            >
              Buy Now
            </button>
          </div>

          <RouterLink to="/products" class="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all duration-200">
            ← Back to products
          </RouterLink>
        </div>
      </div>

      <!-- Reviews -->
      <div v-if="product?.reviews?.length" class="mt-16 pt-12 border-t border-gray-200">
        <h2 class="font-display font-extrabold text-2xl text-gray-900 mb-7">Customer Reviews</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="review in product.reviews"
            :key="review.reviewerName"
            class="bg-white border border-gray-100 rounded-2xl p-6"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-primary text-white rounded-full grid place-items-center font-bold text-base shrink-0">
                {{ review.reviewerName?.[0] }}
              </div>
              <div class="flex-1 min-w-0">
                <strong class="block text-sm text-gray-900 truncate">{{ review.reviewerName }}</strong>
                <div class="flex gap-0.5">
                  <span v-for="n in 5" :key="n" class="text-xs" :class="n <= review.rating ? 'text-accent' : 'text-gray-200'">★</span>
                </div>
              </div>
              <span class="text-xs text-gray-400 shrink-0">{{ new Date(review.date).toLocaleDateString() }}</span>
            </div>
            <p class="text-sm text-gray-500 leading-relaxed">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()
const cartStore = useCartStore()
const { currentProduct: product, loading, error } = storeToRefs(store)

const activeImg = ref(0)
const qty       = ref(1)

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

onMounted(() => { store.fetchProductById(route.params.id) })
watch(() => route.params.id, id => {
  store.fetchProductById(id)
  activeImg.value = 0
  qty.value = 1
})
</script>
