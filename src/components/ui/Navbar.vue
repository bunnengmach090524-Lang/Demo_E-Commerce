<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800'
      : 'bg-white/80  dark:bg-gray-950/80 backdrop-blur-sm'"
  >
    <div class="container">
      <div class="flex items-center h-[64px] gap-8">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 shrink-0">
          <span class="w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg grid place-items-center text-sm font-black">E</span>
          <span class="hidden sm:inline text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Ecommerce</span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1 flex-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-3.5 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            active-class="text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
          >
            {{ link.label }}
          </RouterLink>

          <!-- Categories dropdown -->
          <div class="relative" @mouseenter="catOpen = true" @mouseleave="catOpen = false">
            <button class="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              Categories
              <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="catOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6"/>
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
              <div v-if="catOpen" class="absolute top-[calc(100%+6px)] left-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-1.5 min-w-[170px] shadow-lg dark:shadow-black/40 z-50">
                <RouterLink
                  v-for="cat in topCategories"
                  :key="cat.slug"
                  :to="`/products?category=${cat.slug}`"
                  class="block px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
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
            class="w-9 h-9 rounded-xl grid place-items-center transition-colors duration-200 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            @click="toggleSearch"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <!-- Wishlist -->
          <RouterLink
            to="/wishlist"
            class="relative w-9 h-9 rounded-xl grid place-items-center transition-colors duration-200 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span v-if="wishlistStore.totalItems > 0" class="absolute top-1 right-1 w-4 h-4 bg-[#ff6b6b] text-white text-[9px] font-bold rounded-full grid place-items-center">
              {{ wishlistStore.totalItems }}
            </span>
          </RouterLink>

          <!-- Cart -->
          <button
            class="relative w-9 h-9 rounded-xl grid place-items-center transition-colors duration-200 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            @click="cartStore.toggleCart()"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span v-if="cartStore.totalItems > 0" class="absolute top-1 right-1 w-4 h-4 bg-[#ff6b6b] text-white text-[9px] font-bold rounded-full grid place-items-center">
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- Dark / Light Toggle -->
          <button
            class="w-9 h-9 rounded-xl grid place-items-center transition-colors duration-200 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleDark"
          >
            <!-- Sun: shown in dark mode -->
            <svg v-if="isDark" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1"  x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1"  y1="12" x2="3"  y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <!-- Moon: shown in light mode -->
            <svg v-else width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>

          <!-- Guest -->
          <template v-if="!authStore.isLoggedIn">
            <RouterLink to="/login" class="hidden sm:block text-sm text-gray-500 dark:text-gray-400 px-3.5 py-2 rounded-lg hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              Login
            </RouterLink>
            <RouterLink to="/register" class="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-200">
              Register
            </RouterLink>
          </template>

          <!-- Logged in -->
          <template v-else>
            <div class="relative" @mouseenter="userOpen = true" @mouseleave="userOpen = false">
              <button class="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200">
                <img v-if="authStore.user?.image" :src="authStore.user.image" alt="avatar" class="w-full h-full object-cover" />
                <span v-else class="w-full h-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold grid place-items-center flex">{{ authStore.user?.firstName?.[0] }}</span>
              </button>
              <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-if="userOpen" class="absolute top-[calc(100%+8px)] right-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-1.5 min-w-[210px] shadow-lg dark:shadow-black/40 z-50">
                  <div class="px-3 py-2.5 border-b border-gray-100 dark:border-gray-700 mb-1">
                    <strong class="block text-sm text-gray-900 dark:text-gray-100">{{ authStore.userName }}</strong>
                    <small class="text-gray-400 dark:text-gray-500 text-xs">{{ authStore.user?.email }}</small>
                  </div>
                  <RouterLink to="/wishlist" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" @click="userOpen = false">❤️ Wishlist</RouterLink>
                  <RouterLink to="/cart"     class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" @click="userOpen = false">🛒 Cart</RouterLink>
                  <button class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors text-left" @click="handleLogout">🚪 Logout</button>
                </div>
              </Transition>
            </div>
          </template>

          <!-- Hamburger -->
          <button
            class="lg:hidden w-9 h-9 rounded-xl grid place-items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            @click="mobileOpen = !mobileOpen"
          >
            <div class="flex flex-col gap-[5px] w-5">
              <span class="block h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-300 origin-center" :class="mobileOpen ? 'translate-y-[7px] rotate-45' : ''" />
              <span class="block h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-300"                :class="mobileOpen ? 'opacity-0' : ''" />
              <span class="block h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-300 origin-center" :class="mobileOpen ? '-translate-y-[7px] -rotate-45' : ''" />
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
      <div v-if="mobileOpen" class="lg:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm px-4 py-3 flex flex-col gap-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          active-class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </RouterLink>

        <div class="border-t border-gray-100 dark:border-gray-800 mt-1 pt-2">
          <p class="px-4 py-1 text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Categories</p>
          <RouterLink
            v-for="cat in topCategories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="block px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            @click="mobileOpen = false"
          >
            {{ cat.name }}
          </RouterLink>
        </div>

        <!-- Mobile dark toggle -->
        <div class="border-t border-gray-100 dark:border-gray-800 mt-1 pt-2">
          <button
            class="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            @click="toggleDark"
          >
            <svg v-if="isDark" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg v-else width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            {{ isDark ? 'Light mode' : 'Dark mode' }}
          </button>
        </div>

        <div v-if="!authStore.isLoggedIn" class="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800 mt-1">
          <RouterLink to="/login"    class="flex-1 text-center py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-all" @click="mobileOpen = false">Login</RouterLink>
          <RouterLink to="/register" class="flex-1 text-center py-2.5 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-300 transition-all" @click="mobileOpen = false">Register</RouterLink>
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
      <div v-if="searchOpen" class="absolute top-full left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div class="container py-2">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="flex-1 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none bg-transparent"
              @keyup.enter="doSearch"
              @keyup.escape="searchOpen = false"
            />
            <button class="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-lg leading-none" @click="searchOpen = false">✕</button>
          </div>

          <div v-if="searchQuery.trim() && filteredSuggestions.length" class="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2 pb-1 flex flex-col">
            <RouterLink
              v-for="p in filteredSuggestions"
              :key="p.id"
              :to="`/products/${p.id}`"
              class="flex items-center gap-3 px-1 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              @click="searchOpen = false; searchQuery = ''"
            >
              <img :src="p.thumbnail" :alt="p.title" class="w-9 h-9 rounded-lg object-contain bg-gray-100 dark:bg-gray-800 p-1 shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900 dark:text-gray-100 font-medium truncate">{{ p.title }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">{{ p.category?.replace(/-/g, ' ') }}</p>
              </div>
              <span class="text-sm font-semibold text-gray-900 dark:text-gray-100 shrink-0">${{ p.price?.toFixed(2) }}</span>
            </RouterLink>
            <button class="mt-1 text-xs text-blue-500 hover:underline text-left px-1 py-1" @click="doSearch">
              See all results for "{{ searchQuery }}" →
            </button>
          </div>

          <div v-else-if="searchQuery.trim() && !filteredSuggestions.length" class="border-t border-gray-100 dark:border-gray-800 mt-2 pt-3 pb-2 text-sm text-gray-400 dark:text-gray-600 px-1">
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
import { useCartStore }     from '@/stores/cart'
import { useAuthStore }     from '@/stores/auth'
import { useWishlistStore } from '@/stores/wishlist'
import { useProductsStore } from '@/stores/products'
import { useTheme }         from '@/composables/useTheme'

const theme = useTheme()
const router        = useRouter()
const cartStore     = useCartStore()
const authStore     = useAuthStore()
const wishlistStore = useWishlistStore()
const productsStore = useProductsStore()
const { featuredProducts } = storeToRefs(productsStore)

const isScrolled  = ref(false)
const mobileOpen  = ref(false)
const catOpen     = ref(false)
const userOpen    = ref(false)
const searchOpen  = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const isDark      = ref(false)

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
}

function toggleDark() {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const navLinks = [
  { to: '/',         label: 'Home'     },
  { to: '/products', label: 'Products' },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
]

const topCategories = [
  { slug: 'smartphones',     name: 'Smartphones' },
  { slug: 'laptops',         name: 'Laptops'     },
  { slug: 'fragrances',      name: 'Fragrances'  },
  { slug: 'furniture',       name: 'Furniture'   },
  { slug: 'tops',            name: 'Fashion'     },
  { slug: 'home-decoration', name: 'Home Decor'  },
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

  const saved = localStorage.getItem('theme')
  isDark.value = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(isDark.value)
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))

async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) { await nextTick(); searchInput.value?.focus() }
}

function doSearch() {
  if (!searchQuery.value.trim()) return
  router.push({ path: '/products', query: { q: searchQuery.value } })
  searchOpen.value  = false
  searchQuery.value = ''
  mobileOpen.value  = false
}

function handleLogout() {
  authStore.logout()
  router.push('/')
  userOpen.value   = false
  mobileOpen.value = false
}
</script>