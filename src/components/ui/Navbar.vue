<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="isScrolled
    ? 'bg-[#f5f5f7]/95 backdrop-blur-2xl border-b border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
    : 'bg-[#f5f5f7]/80 backdrop-blur-2xl'">
    <div class="container">
      <div class="flex items-center h-[64px] gap-8">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 shrink-0">
          <span class="w-8 h-8 bg-black text-white rounded-xl grid place-items-center text-sm font-black shadow-md">
            E
          </span>

          <span class="hidden sm:inline text-sm font-semibold text-black tracking-tight">
            Ecommerce
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1 flex-1">

          <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
            class="px-3.5 py-2 rounded-xl text-sm text-black/60 transition-all duration-200 hover:text-black hover:bg-black/[0.04]"
            active-class="text-black bg-black/[0.06]">
            {{ link.label }}
          </RouterLink>

          <!-- Categories -->
          <div class="relative" @mouseenter="catOpen = true" @mouseleave="catOpen = false">
            <button
              class="flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm text-black/60 hover:text-black hover:bg-black/[0.04] transition-all duration-200">
              Categories

              <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="catOpen ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <Transition enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
              leave-to-class="opacity-0 -translate-y-1">
              <div v-if="catOpen"
                class="absolute top-[calc(100%+8px)] left-0 bg-white/90 backdrop-blur-2xl border border-black/5 rounded-2xl p-1.5 min-w-[180px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50">
                <RouterLink v-for="cat in topCategories" :key="cat.slug" :to="`/products?category=${cat.slug}`"
                  class="block px-3 py-2 rounded-xl text-sm text-black/60 hover:bg-black/[0.04] hover:text-black transition-all duration-200"
                  @click="catOpen = false">
                  {{ cat.name }}
                </RouterLink>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-1 ml-auto">

          <!-- Search -->
          <button
            class="w-10 h-10 rounded-xl text-black/55 grid place-items-center hover:bg-black/[0.05] hover:text-black transition-all duration-200"
            @click="toggleSearch">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <!-- Wishlist -->
          <RouterLink to="/wishlist"
            class="relative w-10 h-10 rounded-xl text-black/55 grid place-items-center hover:bg-black/[0.05] hover:text-black transition-all duration-200">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            <span v-if="wishlistStore.totalItems > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full grid place-items-center">
              {{ wishlistStore.totalItems }}
            </span>
          </RouterLink>

          <!-- Cart -->
          <button
            class="relative w-10 h-10 rounded-xl text-black/55 grid place-items-center hover:bg-black/[0.05] hover:text-black transition-all duration-200"
            @click="cartStore.toggleCart()">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            <span v-if="cartStore.totalItems > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full grid place-items-center">
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- Guest -->
          <template v-if="!authStore.isLoggedIn">

            <RouterLink to="/login"
              class="hidden sm:block text-sm text-black/60 px-3.5 py-2 rounded-xl hover:text-black hover:bg-black/[0.04] transition-all duration-200">
              Login
            </RouterLink>

            <RouterLink to="/register"
              class="px-4 py-2 bg-black text-white text-sm font-semibold rounded-xl shadow-md hover:bg-black/80 hover:shadow-lg transition-all duration-200">
              Register
            </RouterLink>

          </template>

          <!-- Avatar -->
          <template v-else>

            <div class="relative" @mouseenter="userOpen = true" @mouseleave="userOpen = false">

              <button
                class="w-9 h-9 rounded-full overflow-hidden border-2 border-black/10 hover:border-black/30 transition-all duration-200">
                <img v-if="authStore.user?.image" :src="authStore.user.image" alt="avatar"
                  class="w-full h-full object-cover" />

                <span v-else class="w-full h-full bg-black text-white text-xs font-bold grid place-items-center">
                  {{ authStore.user?.firstName?.[0] }}
                </span>
              </button>

              <Transition enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="userOpen"
                  class="absolute top-[calc(100%+10px)] right-0 bg-white/90 backdrop-blur-2xl border border-black/5 rounded-2xl p-1.5 min-w-[220px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50">
                  <div class="px-3 py-2.5 border-b border-black/5 mb-1">
                    <strong class="block text-sm text-black">
                      {{ authStore.userName }}
                    </strong>

                    <small class="text-black/45 text-xs">
                      {{ authStore.user?.email }}
                    </small>
                  </div>

                  <RouterLink to="/wishlist"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-black/60 hover:bg-black/[0.04] hover:text-black transition-all duration-200"
                    @click="userOpen = false">
                    ❤️ Wishlist
                  </RouterLink>

                  <RouterLink to="/cart"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-black/60 hover:bg-black/[0.04] hover:text-black transition-all duration-200"
                    @click="userOpen = false">
                    🛒 Cart
                  </RouterLink>

                  <button
                    class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all duration-200 text-left"
                    @click="handleLogout">
                    🚪 Logout
                  </button>
                </div>
              </Transition>
            </div>
          </template>

          <!-- Hamburger -->
          <button
            class="lg:hidden w-10 h-10 rounded-xl grid place-items-center hover:bg-black/[0.05] transition-all duration-200"
            @click="mobileOpen = !mobileOpen">
            <div class="flex flex-col gap-[5px] w-5">
              <span class="block h-0.5 bg-black rounded transition-all duration-300 origin-center"
                :class="mobileOpen ? 'translate-y-[7px] rotate-45' : ''" />
              <span class="block h-0.5 bg-black rounded transition-all duration-300"
                :class="mobileOpen ? 'opacity-0' : ''" />
              <span class="block h-0.5 bg-black rounded transition-all duration-300 origin-center"
                :class="mobileOpen ? '-translate-y-[7px] -rotate-45' : ''" />
            </div>
          </button>

        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useWishlistStore } from '@/stores/wishlist'
import { useProductsStore } from '@/stores/products'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const productsStore = useProductsStore()
const { featuredProducts } = storeToRefs(productsStore)

const isScrolled = ref(false)
const mobileOpen = ref(false)
const catOpen = ref(false)
const userOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const topCategories = [
  { slug: 'smartphones', name: 'Smartphones' },
  { slug: 'laptops', name: 'Laptops' },
  { slug: 'fragrances', name: 'Fragrances' },
  { slug: 'furniture', name: 'Furniture' },
  { slug: 'tops', name: 'Fashion' },
  { slug: 'home-decoration', name: 'Home Decor' },
]

// Live search suggestions — filter featuredProducts by title
const filteredSuggestions = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return featuredProducts.value
    .filter(p => p.title?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
    .slice(0, 6)
})

function onScroll() { isScrolled.value = window.scrollY > 50 }
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  if (!featuredProducts.value.length) productsStore.fetchFeaturedProducts()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) { await nextTick(); searchInput.value?.focus() }
}
function doSearch() {
  if (!searchQuery.value.trim()) return
  router.push({ path: '/products', query: { q: searchQuery.value } })
  searchOpen.value = false
  searchQuery.value = ''
  mobileOpen.value = false
}
function handleLogout() {
  authStore.logout()
  router.push('/')
  userOpen.value = false
  mobileOpen.value = false
}
</script>