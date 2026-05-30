<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-[#f5f5f7]/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
      : 'bg-[#f5f5f7]/80 dark:bg-gray-900/80 backdrop-blur-2xl'"
  >
    <div class="container">
      <div class="flex items-center h-[64px] gap-8">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 shrink-0">
          <span class="w-8 h-8 bg-black dark:bg-white dark:text-black text-white rounded-xl grid place-items-center text-sm font-black shadow-md">
            E
          </span>
          <span class="hidden sm:inline text-sm font-semibold text-black dark:text-white tracking-tight">
            Ecommerce
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1 flex-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-3.5 py-2 rounded-xl text-sm text-black/60 dark:text-white/60 transition-all duration-200 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08]"
            active-class="text-black dark:text-white bg-black/[0.06] dark:bg-white/[0.10]"
          >
            {{ link.label }}
          </RouterLink>

          <!-- Categories -->
          <div class="relative" @mouseenter="catOpen = true" @mouseleave="catOpen = false">
            <button
              class="flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-all duration-200"
            >
              Categories
              <svg
                class="w-3.5 h-3.5 transition-transform duration-200"
                :class="catOpen ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="catOpen"
                class="absolute top-[calc(100%+8px)] left-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-2xl p-1.5 min-w-[180px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50"
              >
                <RouterLink
                  v-for="cat in topCategories"
                  :key="cat.slug"
                  :to="`/products?category=${cat.slug}`"
                  class="block px-3 py-2 rounded-xl text-sm text-black/60 dark:text-white/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] hover:text-black dark:hover:text-white transition-all duration-200"
                  @click="catOpen = false"
                >
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
            class="w-10 h-10 rounded-xl text-black/55 dark:text-white/60 grid place-items-center hover:bg-black/[0.05] dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200"
            @click="toggleSearch"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <!-- Wishlist -->
          <RouterLink
            to="/wishlist"
            class="relative w-10 h-10 rounded-xl text-black/55 dark:text-white/60 grid place-items-center hover:bg-black/[0.05] dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span
              v-if="wishlistStore.totalItems > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full grid place-items-center"
            >
              {{ wishlistStore.totalItems }}
            </span>
          </RouterLink>

          <!-- Cart -->
          <button
            class="relative w-10 h-10 rounded-xl text-black/55 dark:text-white/60 grid place-items-center hover:bg-black/[0.05] dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200"
            @click="cartStore.toggleCart()"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full grid place-items-center"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- Dark Mode Toggle -->
          <button
            class="w-10 h-10 rounded-xl text-black/55 dark:text-white/60 grid place-items-center hover:bg-black/[0.05] dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleDark"
          >
            <svg v-if="isDark" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg v-else width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>

          <!-- Guest -->
          <template v-if="!authStore.isLoggedIn">
            <RouterLink
              to="/login"
              class="hidden sm:block text-sm text-black/60 dark:text-white/60 px-3.5 py-2 rounded-xl hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-all duration-200"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/register"
              class="px-4 py-2 bg-black dark:bg-white dark:text-black text-white text-sm font-semibold rounded-xl shadow-md hover:bg-black/80 dark:hover:bg-white/80 hover:shadow-lg transition-all duration-200"
            >
              Register
            </RouterLink>
          </template>

          <!-- Avatar -->
          <template v-else>
            <div class="relative" @mouseenter="userOpen = true" @mouseleave="userOpen = false">
              <button class="w-9 h-9 rounded-full overflow-hidden border-2 border-black/10 dark:border-white/20 hover:border-black/30 dark:hover:border-white/40 transition-all duration-200">
                <img v-if="authStore.user?.image" :src="authStore.user.image" alt="avatar" class="w-full h-full object-cover" />
                <span v-else class="w-full h-full bg-black dark:bg-white dark:text-black text-white text-xs font-bold grid place-items-center">
                  {{ authStore.user?.firstName?.[0] }}
                </span>
              </button>

              <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="userOpen"
                  class="absolute top-[calc(100%+10px)] right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-2xl p-1.5 min-w-[220px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50"
                >
                  <div class="px-3 py-2.5 border-b border-black/5 dark:border-white/10 mb-1">
                    <strong class="block text-sm text-black dark:text-white">{{ authStore.userName }}</strong>
                    <small class="text-black/45 dark:text-white/45 text-xs">{{ authStore.user?.email }}</small>
                  </div>
                  <RouterLink to="/wishlist" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-black/60 dark:text-white/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] hover:text-black dark:hover:text-white transition-all duration-200" @click="userOpen = false">❤️ Wishlist</RouterLink>
                  <RouterLink to="/cart" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-black/60 dark:text-white/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] hover:text-black dark:hover:text-white transition-all duration-200" @click="userOpen = false">🛒 Cart</RouterLink>
                  <button class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 text-left" @click="handleLogout">🚪 Logout</button>
                </div>
              </Transition>
            </div>
          </template>

          <!-- Hamburger -->
          <button
            class="lg:hidden w-10 h-10 rounded-xl grid place-items-center hover:bg-black/[0.05] dark:hover:bg-white/10 transition-all duration-200"
            @click="mobileOpen = !mobileOpen"
          >
            <div class="flex flex-col gap-[5px] w-5">
              <span class="block h-0.5 bg-black dark:bg-white rounded transition-all duration-300 origin-center" :class="mobileOpen ? 'translate-y-[7px] rotate-45' : ''" />
              <span class="block h-0.5 bg-black dark:bg-white rounded transition-all duration-300" :class="mobileOpen ? 'opacity-0' : ''" />
              <span class="block h-0.5 bg-black dark:bg-white rounded transition-all duration-300 origin-center" :class="mobileOpen ? '-translate-y-[7px] -rotate-45' : ''" />
            </div>
          </button>

        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="lg:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 shadow-sm px-4 py-3 flex flex-col gap-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-4 py-2.5 rounded-xl text-sm text-black/60 dark:text-white/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] hover:text-black dark:hover:text-white transition-colors"
          active-class="bg-black/[0.06] dark:bg-white/[0.10] text-black dark:text-white"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </RouterLink>
        <div class="border-t border-black/5 dark:border-white/10 mt-1 pt-2">
          <p class="px-4 py-1 text-[10px] font-semibold text-black/30 dark:text-white/30 uppercase tracking-widest">Categories</p>
          <RouterLink
            v-for="cat in topCategories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="block px-4 py-2.5 rounded-xl text-sm text-black/60 dark:text-white/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] hover:text-black dark:hover:text-white transition-colors"
            @click="mobileOpen = false"
          >
            {{ cat.name }}
          </RouterLink>
        </div>
        <div v-if="!authStore.isLoggedIn" class="flex gap-2 pt-2 border-t border-black/5 dark:border-white/10 mt-1">
          <RouterLink to="/login" class="flex-1 text-center py-2.5 rounded-xl border border-black/10 dark:border-white/20 text-sm text-black/70 dark:text-white/70 hover:border-black/30 dark:hover:border-white/40 transition-all" @click="mobileOpen = false">Login</RouterLink>
          <RouterLink to="/register" class="flex-1 text-center py-2.5 rounded-xl bg-black dark:bg-white dark:text-black text-white text-sm font-semibold hover:bg-black/80 dark:hover:bg-white/80 transition-all" @click="mobileOpen = false">Register</RouterLink>
        </div>
      </div>
    </Transition>

    <!-- Search Overlay -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="searchOpen" class="absolute top-full left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 shadow-sm">
        <div class="container py-2">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-black/40 dark:text-white/40 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="flex-1 py-2 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none bg-transparent"
              @keyup.enter="doSearch"
              @keyup.escape="searchOpen = false"
            />
            <button class="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors text-lg leading-none" @click="searchOpen = false">✕</button>
          </div>

          <div v-if="searchQuery.trim() && filteredSuggestions.length" class="border-t border-black/5 dark:border-white/10 mt-2 pt-2 pb-1 flex flex-col">
            <RouterLink
              v-for="p in filteredSuggestions"
              :key="p.id"
              :to="`/products/${p.id}`"
              class="flex items-center gap-3 px-1 py-2 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
              @click="searchOpen = false; searchQuery = ''"
            >
              <img :src="p.thumbnail" :alt="p.title" class="w-9 h-9 rounded-lg object-contain bg-black/[0.03] dark:bg-white/[0.05] p-1 shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-sm text-black dark:text-white font-medium truncate">{{ p.title }}</p>
                <p class="text-xs text-black/40 dark:text-white/40">{{ p.category?.replace(/-/g, ' ') }}</p>
              </div>
              <span class="text-sm font-semibold text-black dark:text-white shrink-0">${{ p.price?.toFixed(2) }}</span>
            </RouterLink>
            <button class="mt-1 text-xs text-blue-500 hover:underline text-left px-1 py-1" @click="doSearch">
              See all results for "{{ searchQuery }}" →
            </button>
          </div>

          <div v-else-if="searchQuery.trim() && !filteredSuggestions.length" class="border-t border-black/5 dark:border-white/10 mt-2 pt-3 pb-2 text-sm text-black/40 dark:text-white/40 px-1">
            No products found for "{{ searchQuery }}"
          </div>
        </div>
      </div>
    </Transition>

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
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const productsStore = useProductsStore()
const { featuredProducts } = storeToRefs(productsStore)
const { isDark, toggleDark } = useTheme()

const isScrolled  = ref(false)
const mobileOpen  = ref(false)
const catOpen     = ref(false)
const userOpen    = ref(false)
const searchOpen  = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const navLinks = [
  { to: '/',         label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about',    label: 'About' },
  { to: '/contact',  label: 'Contact' },
]

const topCategories = [
  { slug: 'smartphones',     name: 'Smartphones' },
  { slug: 'laptops',         name: 'Laptops' },
  { slug: 'fragrances',      name: 'Fragrances' },
  { slug: 'furniture',       name: 'Furniture' },
  { slug: 'tops',            name: 'Fashion' },
  { slug: 'home-decoration', name: 'Home Decor' },
]

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