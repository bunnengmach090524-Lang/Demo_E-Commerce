<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100"
                leave-active-class="transition duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="cartStore.isOpen" class="fixed inset-0 bg-black/50 z-[1100] backdrop-blur-sm" @click="cartStore.toggleCart()" />
    </Transition>

    <!-- Drawer -->
    <Transition enter-active-class="transition duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]"
                enter-from-class="translate-x-full" enter-to-class="translate-x-0"
                leave-active-class="transition duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
                leave-from-class="translate-x-0" leave-to-class="translate-x-full">
      <div v-if="cartStore.isOpen"
        class="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white z-[1200] flex flex-col shadow-2xl">

        <!-- ── Header ─────────────────────────────────────────────── -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <div>
              <h2 class="font-extrabold text-base text-gray-900 leading-none">Your Cart</h2>
              <p class="text-xs text-gray-400 mt-0.5">{{ cartStore.totalItems }} item{{ cartStore.totalItems !== 1 ? 's' : '' }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button v-if="cartStore.items.length"
              @click="cartStore.clearCart()"
              class="text-xs text-gray-400 hover:text-rose-500 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-rose-50">
              Clear all
            </button>
            <button class="w-9 h-9 bg-gray-100 rounded-xl text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-all duration-200"
              @click="cartStore.toggleCart()">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <!-- ── Promo bar ───────────────────────────────────────────── -->
        <div v-if="cartStore.items.length" class="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
          <svg class="w-3.5 h-3.5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <input v-model="promoCode" type="text" placeholder="Promo code (try SAVE10)"
            class="flex-1 bg-transparent text-xs outline-none placeholder-primary/40 text-primary font-medium" />
          <button @click="applyPromo"
            class="text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white px-3 py-1 rounded-lg transition-all duration-150">
            Apply
          </button>
        </div>
        <div v-if="promoApplied" class="px-5 py-1.5 bg-emerald-50 border-b border-emerald-100 text-xs text-emerald-600 font-medium flex items-center gap-1.5">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Promo applied — 10% off your order!
        </div>
        <div v-if="promoError" class="px-5 py-1.5 bg-rose-50 border-b border-rose-100 text-xs text-rose-500 font-medium">
          {{ promoError }}
        </div>

        <!-- ── Empty state ─────────────────────────────────────────── -->
        <div v-if="cartStore.items.length === 0" class="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-1">
            <svg class="w-9 h-9 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <div>
            <p class="font-extrabold text-gray-900 text-lg mb-1">Cart is empty</p>
            <p class="text-gray-400 text-sm">Add some products to get started.</p>
          </div>
          <RouterLink to="/products" class="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm mt-2" @click="cartStore.toggleCart()">
            Shop Now
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </RouterLink>
        </div>

        <!-- ── Items list ──────────────────────────────────────────── -->
        <div v-else class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          <TransitionGroup enter-active-class="transition duration-200" enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0"
                           leave-active-class="transition duration-150 absolute" leave-from-class="opacity-100" leave-to-class="opacity-0 translate-x-4">
            <div v-for="item in cartStore.items" :key="item.id"
              class="group flex gap-3 items-start p-3.5 bg-gray-50 border border-transparent rounded-2xl hover:border-primary/20 hover:bg-white hover:shadow-sm transition-all duration-200">

              <!-- Image -->
              <div class="w-[72px] h-[72px] rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-contain" />
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1 pr-2">{{ item.title }}</p>
                <div class="flex items-baseline gap-1.5 mb-2.5">
                  <p class="font-extrabold text-primary text-sm">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  <p v-if="item.quantity > 1" class="text-xs text-gray-400">${{ item.price.toFixed(2) }} each</p>
                </div>
                <!-- Qty controls -->
                <div class="flex items-center gap-2">
                  <div class="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-150 text-base"
                      @click="cartStore.updateQuantity(item.id, item.quantity - 1)">−</button>
                    <span class="px-3 font-bold text-sm min-w-[28px] text-center text-gray-800">{{ item.quantity }}</span>
                    <button class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-150 text-base"
                      @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
                  </div>
                </div>
              </div>

              <!-- Remove -->
              <button class="w-7 h-7 rounded-lg bg-transparent flex items-center justify-center text-gray-300 hover:bg-rose-50 hover:text-rose-400 transition-all duration-150 mt-0.5 opacity-0 group-hover:opacity-100"
                @click="cartStore.removeItem(item.id)">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </TransitionGroup>
        </div>

        <!-- ── Footer ─────────────────────────────────────────────── -->
        <div v-if="cartStore.items.length" class="border-t border-gray-100 bg-white">

          <!-- Breakdown -->
          <div class="px-5 pt-4 pb-2 flex flex-col gap-1.5">
            <div class="flex justify-between text-xs text-gray-400">
              <span>Subtotal</span><span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div v-if="promoApplied" class="flex justify-between text-xs text-emerald-500">
              <span>Discount (10%)</span><span>−${{ discount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-400">
              <span>Shipping</span><span class="text-emerald-500 font-semibold">Free</span>
            </div>
            <div class="flex justify-between text-xs text-gray-400">
              <span>Tax (10%)</span><span>${{ tax.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Total -->
          <div class="flex justify-between items-center px-5 py-3 border-t border-dashed border-gray-100 mt-1">
            <span class="text-sm font-semibold text-gray-600">Total</span>
            <strong class="text-2xl font-extrabold text-gray-900">${{ finalTotal.toFixed(2) }}</strong>
          </div>

          <!-- Trust badges -->
          <div class="flex items-center justify-around px-5 py-2.5 bg-gray-50 border-t border-gray-100">
            <div class="flex items-center gap-1 text-[11px] text-gray-400">
              <svg class="w-3 h-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Secure
            </div>
            <div class="flex items-center gap-1 text-[11px] text-gray-400">
              <svg class="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              All cards
            </div>
            <div class="flex items-center gap-1 text-[11px] text-gray-400">
              <svg class="w-3 h-3 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.74"/></svg>
              Free returns
            </div>
            <div class="flex items-center gap-1 text-[11px] text-gray-400">
              <svg class="w-3 h-3 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Fast delivery
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col gap-2 px-5 pb-5 pt-3">
            <RouterLink to="/cart"
              class="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 text-sm"
              @click="cartStore.toggleCart()">
              Checkout
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </RouterLink>
            <RouterLink to="/cart"
              class="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 text-sm"
              @click="cartStore.toggleCart()">
              View Full Cart
            </RouterLink>
          </div>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

/* ── Promo ───────────────────────────────────────────────────────── */
const promoCode    = ref('')
const promoApplied = ref(false)
const promoError   = ref('')

function applyPromo() {
  promoError.value = ''
  if (promoCode.value.trim().toUpperCase() === 'SAVE10') {
    promoApplied.value = true
    promoError.value   = ''
  } else {
    promoApplied.value = false
    promoError.value   = 'Invalid promo code. Try SAVE10'
  }
}

/* ── Totals ──────────────────────────────────────────────────────── */
const discount   = computed(() => promoApplied.value ? cartStore.totalPrice * 0.1 : 0)
const tax        = computed(() => (cartStore.totalPrice - discount.value) * 0.1)
const finalTotal = computed(() => cartStore.totalPrice - discount.value + tax.value)
</script>