<template>
  <!-- Fixed navbar with blur glass effect -->
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-white/97 border-b border-gray-200 shadow-soft'
      : 'bg-white/85 backdrop-blur-md border-b border-transparent'"
  >
    <div class="container">
      <div class="flex items-center gap-8 h-[68px]">

        <!-- ── Logo ── -->
        <RouterLink to="/" class="flex items-center gap-2 font-display font-extrabold text-lg text-gray-900 shrink-0">
          <span class="w-9 h-9 bg-accent text-dark rounded-lg grid place-items-center text-base font-black">E</span>
          <span class="hidden sm:inline">Ecommerce</span>
        </RouterLink>

        <!-- ── Desktop Nav ── -->
        <nav class="hidden lg:flex items-center gap-1 flex-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-500 transition-all duration-200 hover:text-primary hover:bg-primary/7"
            active-class="text-primary bg-primary/7"
          >
            {{ link.label }}
          </RouterLink>

          <!-- Categories dropdown -->
          <div class="relative" @mouseenter="catOpen = true" @mouseleave="catOpen = false">
            <button
              class="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-500 transition-all duration-200 hover:text-primary hover:bg-primary/7 cursor-pointer"
            >
              Categories
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="catOpen ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            <!-- Dropdown panel -->
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-if="catOpen"
                class="absolute top-[calc(100%+8px)] left-0 bg-white border border-gray-100 rounded-2xl p-2 min-w-[200px] shadow-strong z-50"
              >
                <RouterLink
                  v-for="cat in topCategories"
                  :key="cat.slug"
                  :to="`/products?category=${cat.slug}`"
                  class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-gray-700 transition-all duration-150 hover:bg-gray-50 hover:text-primary"
                  @click="catOpen = false"
                >
                  <span class="text-lg">{{ cat.icon }}</span>
                  {{ cat.name }}
                </RouterLink>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- ── Right Actions ── -->
        <div class="flex items-center gap-2 ml-auto">

          <!-- Search -->
          <button
            class="relative w-10 h-10 rounded-xl text-gray-500 grid place-items-center transition-all duration-200 hover:bg-gray-100 hover:text-primary"
            aria-label="Search"
            @click="toggleSearch"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <!-- Wishlist -->
          <RouterLink
            to="/wishlist"
            class="relative w-10 h-10 rounded-xl text-gray-500 grid place-items-center transition-all duration-200 hover:bg-gray-100 hover:text-primary"
            aria-label="Wishlist"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </RouterLink>

          <!-- Cart -->
          <button
            class="relative w-10 h-10 rounded-xl text-gray-500 grid place-items-center transition-all duration-200 hover:bg-gray-100 hover:text-primary"
            aria-label="Cart"
            @click="cartStore.toggleCart()"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute top-1 right-1 w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full grid place-items-center"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- Guest: Login + Register -->
          <template v-if="!authStore.isLoggedIn">
            <RouterLink
              to="/login"
              class="hidden sm:block text-sm font-semibold font-display text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 hover:text-primary"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/register"
              class="btn-accent text-sm py-2 px-4 rounded-lg"
            >
              Register
            </RouterLink>
          </template>

          <!-- Logged in: Avatar dropdown -->
          <template v-else>
            <div class="relative" @mouseenter="userOpen = true" @mouseleave="userOpen = false">
              <button
                class="w-9 h-9 rounded-full overflow-hidden border-2 border-primary bg-primary-light text-white font-bold grid place-items-center transition-all duration-200 hover:shadow-[0_0_0_3px_rgba(79,70,229,0.3)]"
              >
                <img v-if="authStore.user?.image" :src="authStore.user.image" alt="avatar" class="w-full h-full object-cover" />
                <span v-else class="text-sm">{{ authStore.user?.firstName?.[0] }}</span>
              </button>

              <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div
                  v-if="userOpen"
                  class="absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-100 rounded-2xl p-2 min-w-[220px] shadow-strong z-50"
                >
                  <!-- User info -->
                  <div class="px-3.5 py-3 border-b border-gray-100 mb-1">
                    <strong class="block text-sm text-gray-900 font-semibold">{{ authStore.userName }}</strong>
                    <small class="text-gray-400 text-xs">{{ authStore.user?.email }}</small>
                  </div>
                  <RouterLink to="/wishlist" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-all" @click="userOpen = false">
                    ❤️ Wishlist
                  </RouterLink>
                  <RouterLink to="/cart" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-all" @click="userOpen = false">
                    🛒 Cart
                  </RouterLink>
                  <button
                    class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all text-left"
                    @click="handleLogout"
                  >
                    🚪 Logout
                  </button>
                </div>
              </Transition>
            </div>
          </template>

          <!-- Hamburger (mobile) -->
          <button
            class="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 rounded-lg px-2 transition-all duration-200 hover:bg-gray-100"
            aria-label="Menu"
            @click="mobileOpen = !mobileOpen"
          >
            <span
              class="block h-0.5 bg-gray-800 rounded transition-all duration-300 origin-center"
              :class="mobileOpen ? 'translate-y-[7px] rotate-45' : ''"
            />
            <span
              class="block h-0.5 bg-gray-800 rounded transition-all duration-300"
              :class="mobileOpen ? 'opacity-0 scale-x-0' : ''"
            />
            <span
              class="block h-0.5 bg-gray-800 rounded transition-all duration-300 origin-center"
              :class="mobileOpen ? '-translate-y-[7px] -rotate-45' : ''"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- ── Mobile Nav Menu ── -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="mobileOpen"
        class="lg:hidden bg-white border-b border-gray-200 shadow-soft px-4 py-3 flex flex-col gap-1"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-all"
          active-class="bg-primary/7 text-primary"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </RouterLink>

        <!-- Mobile categories -->
        <div class="border-t border-gray-100 mt-1 pt-2">
          <p class="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Categories</p>
          <RouterLink
            v-for="cat in topCategories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-all"
            @click="mobileOpen = false"
          >
            <span>{{ cat.icon }}</span> {{ cat.name }}
          </RouterLink>
        </div>

        <!-- Mobile auth -->
        <div v-if="!authStore.isLoggedIn" class="flex gap-2 pt-2 border-t border-gray-100 mt-1">
          <RouterLink to="/login" class="flex-1 text-center py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all" @click="mobileOpen = false">Login</RouterLink>
          <RouterLink to="/register" class="flex-1 text-center py-2.5 rounded-xl bg-accent text-dark text-sm font-semibold font-display hover:bg-accent-dark transition-all" @click="mobileOpen = false">Register</RouterLink>
        </div>
      </div>
    </Transition>

    <!-- ── Search Overlay ── -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="searchOpen"
        class="absolute top-full left-0 right-0 bg-white border-t border-b border-gray-200 shadow-soft px-4 py-4"
      >
        <div class="container flex items-center gap-3">
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="flex-1 px-4 py-3 border-2 border-primary rounded-xl text-base outline-none font-body"
            @keyup.enter="doSearch"
            @keyup.escape="searchOpen = false"
          />
          <button
            class="px-5 py-3 bg-primary text-white rounded-xl font-semibold font-display transition-all duration-200 hover:bg-primary-dark"
            @click="doSearch"
          >
            Search →
          </button>
          <button
            class="w-10 h-10 grid place-items-center text-gray-400 rounded-lg hover:bg-gray-100 hover:text-red-500 transition-all duration-200"
            @click="searchOpen = false"
          >
            ✕
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const router     = useRouter()
const cartStore  = useCartStore()
const authStore  = useAuthStore()

// State
const isScrolled  = ref(false)
const mobileOpen  = ref(false)
const catOpen     = ref(false)
const userOpen    = ref(false)
const searchOpen  = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

// Nav links
const navLinks = [
  { to: '/',         label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about',    label: 'About' },
  { to: '/contact',  label: 'Contact' },
]

// Category dropdown items
const topCategories = [
  { slug: 'smartphones',     name: 'Smartphones',  icon: '📱' },
  { slug: 'laptops',         name: 'Laptops',       icon: '💻' },
  { slug: 'fragrances',      name: 'Fragrances',    icon: '🌸' },
  { slug: 'furniture',       name: 'Furniture',     icon: '🛋️' },
  { slug: 'tops',            name: 'Fashion',       icon: '👕' },
  { slug: 'home-decoration', name: 'Home Decor',    icon: '🏠' },
]

// Scroll listener
function onScroll() { isScrolled.value = window.scrollY > 50 }
onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// Search
async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}
function doSearch() {
  if (!searchQuery.value.trim()) return
  router.push({ path: '/products', query: { q: searchQuery.value } })
  searchOpen.value = false
  searchQuery.value = ''
  mobileOpen.value = false
}

// Auth
function handleLogout() {
  authStore.logout()
  router.push('/')
  userOpen.value = false
  mobileOpen.value = false
}
</script>
