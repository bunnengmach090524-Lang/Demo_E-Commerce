<template>
  <div class="min-h-screen pt-[100px] pb-16 bg-gray-50">
    <div class="container px-6">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="font-extrabold text-3xl text-gray-900 tracking-tight">Your Cart</h1>
          <p class="text-sm text-gray-400 mt-1">{{ cartStore.items.length }} item{{ cartStore.items.length !== 1 ? 's' : '' }} in your cart</p>
        </div>
        <button
          v-if="cartStore.items.length"
          @click="cartStore.clearCart()"
          class="text-sm text-gray-400 hover:text-rose-500 transition-colors font-medium"
        >Clear all</button>
      </div>

      <!-- Empty state -->
      <div v-if="cartStore.items.length === 0" class="bg-white rounded-2xl border border-gray-100 py-24 text-center">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg class="w-9 h-9 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
        <h2 class="font-extrabold text-xl text-gray-900 mb-2">Your cart is empty</h2>
        <p class="text-gray-400 text-sm mb-6">Looks like you haven't added anything yet.</p>
        <RouterLink to="/products" class="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm">
          Shop Now
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

      <!-- Cart content -->
      <div v-else class="grid lg:grid-cols-3 gap-6">

        <!-- ── Items list ──────────────────────────────────────────── -->
        <div class="lg:col-span-2 flex flex-col gap-4">
          <div
            v-for="item in cartStore.items" :key="item.id"
            class="group flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-200"
          >
            <div class="w-24 h-24 rounded-xl bg-gray-50 p-2 shrink-0 overflow-hidden">
              <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-contain" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-bold text-gray-900 text-sm leading-snug line-clamp-2">{{ item.title }}</h3>
                <button
                  @click="cartStore.removeItem(item.id)"
                  class="shrink-0 w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 hover:bg-rose-50 hover:text-rose-400 transition-all duration-150"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <p class="text-primary font-extrabold text-lg mt-1">${{ (item.price * item.quantity).toFixed(2) }}</p>
              <p v-if="item.quantity > 1" class="text-xs text-gray-400">${{ item.price.toFixed(2) }} each</p>
              <div class="flex items-center gap-3 mt-3">
                <div class="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all text-lg font-light"
                    @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                  >−</button>
                  <span class="px-4 font-bold text-sm text-gray-800 min-w-[2rem] text-center">{{ item.quantity }}</span>
                  <button
                    class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all text-lg font-light"
                    @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                  >+</button>
                </div>
                <span class="text-xs text-gray-300">In stock</span>
              </div>
            </div>
          </div>

          <!-- Promo code -->
          <div class="bg-white rounded-2xl border border-gray-100 p-5">
            <p class="text-sm font-semibold text-gray-700 mb-3">Promo Code</p>
            <div class="flex gap-2">
              <input
                v-model="promoCode"
                type="text" placeholder="Enter code"
                class="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
                :class="promoApplied ? 'border-emerald-300 bg-emerald-50' : ''"
              />
              <button
                @click="applyPromo"
                class="px-5 py-2.5 bg-gray-900 text-white font-bold text-sm rounded-xl hover:bg-gray-700 transition-colors"
              >Apply</button>
            </div>
            <p v-if="promoApplied" class="text-xs text-emerald-500 font-medium mt-2">✓ Promo code applied — 10% off!</p>
            <p v-if="promoError" class="text-xs text-rose-500 mt-2">{{ promoError }}</p>
          </div>
        </div>

        <!-- ── Order summary ───────────────────────────────────────── -->
        <div class="flex flex-col gap-4">
          <div class="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 class="font-extrabold text-lg text-gray-900 mb-5 tracking-tight">Order Summary</h2>

            <div class="flex flex-col gap-3 text-sm mb-4">
              <div class="flex justify-between text-gray-500">
                <span>Subtotal ({{ cartStore.items.length }} items)</span>
                <span class="font-semibold text-gray-800">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div v-if="promoApplied" class="flex justify-between text-emerald-500">
                <span>Promo (SAVE10)</span>
                <span>−${{ discount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span class="text-emerald-500 font-semibold">Free</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>Tax (10%)</span>
                <span class="font-semibold text-gray-800">${{ tax.toFixed(2) }}</span>
              </div>
            </div>

            <div class="flex justify-between font-extrabold text-xl text-gray-900 pt-4 border-t border-gray-100 mb-6">
              <span>Total</span>
              <span class="text-primary">${{ finalTotal.toFixed(2) }}</span>
            </div>

            <!-- Trust badges -->
            <div class="flex items-center justify-center gap-4 mb-5 py-3 bg-gray-50 rounded-xl">
              <div class="flex items-center gap-1.5 text-xs text-gray-400">
                <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Secure
              </div>
              <div class="flex items-center gap-1.5 text-xs text-gray-400">
                <svg class="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                All cards
              </div>
              <div class="flex items-center gap-1.5 text-xs text-gray-400">
                <svg class="w-3.5 h-3.5 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.74"/></svg>
                Free returns
              </div>
            </div>

            <button
              @click="openCheckout"
              class="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 text-sm"
            >
              Checkout
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Checkout / QR modal ─────────────────────────────────────── -->
    <Transition name="modal">
      <div v-if="showCheckout" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showCheckout = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showCheckout = false" />
        <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md z-10 overflow-hidden">

          <!-- Modal header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 class="font-extrabold text-lg text-gray-900 tracking-tight">Complete Payment</h2>
            <button @click="showCheckout = false" class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Steps -->
          <div class="flex items-center gap-2 px-6 pt-5 mb-5">
            <div
              v-for="(step, i) in checkoutSteps" :key="step"
              class="flex items-center gap-2"
            >
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                :class="checkoutStep > i ? 'bg-emerald-500 text-white' : checkoutStep === i ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'"
              >
                <svg v-if="checkoutStep > i" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="text-xs font-medium" :class="checkoutStep === i ? 'text-gray-900' : 'text-gray-400'">{{ step }}</span>
              <svg v-if="i < checkoutSteps.length - 1" class="w-3 h-3 text-gray-200 mx-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>

          <!-- Step 0: Order review -->
          <div v-if="checkoutStep === 0" class="px-6 pb-6">
            <div class="bg-gray-50 rounded-xl p-4 mb-4 flex flex-col gap-2 max-h-40 overflow-y-auto">
              <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-3">
                <img :src="item.thumbnail" class="w-10 h-10 rounded-lg object-contain bg-white p-1 border border-gray-100" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold text-gray-800 line-clamp-1">{{ item.title }}</p>
                  <p class="text-xs text-gray-400">x{{ item.quantity }}</p>
                </div>
                <p class="text-xs font-bold text-primary">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
            <div class="flex justify-between text-sm font-extrabold text-gray-900 mb-5">
              <span>Total to pay</span>
              <span class="text-primary">${{ finalTotal.toFixed(2) }}</span>
            </div>
            <button @click="checkoutStep = 1" class="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors text-sm">
              Continue to Payment →
            </button>
          </div>

          <!-- Step 1: Choose method -->
          <div v-if="checkoutStep === 1" class="px-6 pb-6">
            <p class="text-sm font-semibold text-gray-700 mb-3">Select payment method</p>
            <div class="flex flex-col gap-2 mb-5">
              <button
                v-for="method in paymentMethods" :key="method.id"
                @click="selectedMethod = method.id"
                class="flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-150 text-left"
                :class="selectedMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'"
              >
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="method.bg">
                  <img v-if="method.img" :src="method.img" class="w-5 h-5" :style="method.filter" />
                  <component v-else :is="method.icon" class="w-5 h-5" :class="method.color" />
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-900">{{ method.name }}</p>
                  <p class="text-xs text-gray-400">{{ method.note }}</p>
                </div>
                <div class="ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all" :class="selectedMethod === method.id ? 'border-primary' : 'border-gray-200'">
                  <div v-if="selectedMethod === method.id" class="w-2 h-2 rounded-full bg-primary" />
                </div>
              </button>
            </div>
            <button @click="checkoutStep = 2" :disabled="!selectedMethod" class="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors text-sm disabled:opacity-40">
              Continue →
            </button>
          </div>

          <!-- Step 2: QR scan -->
          <div v-if="checkoutStep === 2" class="px-6 pb-6 text-center">
            <p class="text-sm text-gray-500 mb-4">Scan the QR code with your banking app to complete the payment.</p>

            <!-- QR display -->
            <div class="relative w-48 h-48 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
              <!-- Stylised QR placeholder -->
              <div class="grid grid-cols-7 gap-[3px] p-3 w-full h-full">
                <div v-for="(cell, i) in qrGrid" :key="i"
                  class="rounded-[2px] transition-colors"
                  :class="cell ? 'bg-gray-900' : 'bg-transparent'"
                />
              </div>
              <!-- Corner markers -->
              <div class="absolute top-3 left-3 w-8 h-8 border-[3px] border-gray-900 rounded-[4px]" />
              <div class="absolute top-3 right-3 w-8 h-8 border-[3px] border-gray-900 rounded-[4px]" />
              <div class="absolute bottom-3 left-3 w-8 h-8 border-[3px] border-gray-900 rounded-[4px]" />
              <!-- Scan line animation -->
              <div class="absolute inset-x-0 h-0.5 bg-primary/60 animate-scan" />
            </div>

            <div class="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 mb-5 inline-block">
              <p class="text-xs text-gray-500 mb-0.5">Amount to pay</p>
              <p class="text-2xl font-extrabold text-primary">${{ finalTotal.toFixed(2) }}</p>
            </div>

            <div class="flex flex-col gap-2">
              <button @click="confirmPayment" class="w-full bg-emerald-500 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-600 transition-colors text-sm">
                I've Completed Payment ✓
              </button>
              <button @click="checkoutStep = 1" class="w-full text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors">
                ← Back
              </button>
            </div>
          </div>

          <!-- Step 3: Success -->
          <div v-if="checkoutStep === 3" class="px-6 pb-8 text-center">
            <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 mt-2">
              <svg class="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 class="font-extrabold text-xl text-gray-900 mb-2">Order Confirmed!</h3>
            <p class="text-sm text-gray-400 mb-1">Order #{{ orderNumber }}</p>
            <p class="text-sm text-gray-500 mb-6">Thank you for your purchase! You'll receive a confirmation email shortly.</p>
            <button
              @click="finishOrder"
              class="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors text-sm"
            >Back to Shop</button>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const router    = useRouter()

/* ── Promo ───────────────────────────────────────────────────────── */
const promoCode    = ref('')
const promoApplied = ref(false)
const promoError   = ref('')
function applyPromo() {
  promoError.value = ''
  if (promoCode.value.trim().toUpperCase() === 'SAVE10') {
    promoApplied.value = true
  } else {
    promoError.value   = 'Invalid promo code'
    promoApplied.value = false
  }
}

/* ── Totals ──────────────────────────────────────────────────────── */
const discount   = computed(() => promoApplied.value ? cartStore.totalPrice * 0.1 : 0)
const tax        = computed(() => (cartStore.totalPrice - discount.value) * 0.1)
const finalTotal = computed(() => cartStore.totalPrice - discount.value + tax.value)

/* ── Checkout modal ──────────────────────────────────────────────── */
const showCheckout  = ref(false)
const checkoutStep  = ref(0)
const selectedMethod = ref('')
const orderNumber   = ref('')
const checkoutSteps = ['Review', 'Payment', 'Scan QR', 'Done']

function openCheckout() { showCheckout.value = true; checkoutStep.value = 0; selectedMethod.value = '' }
function confirmPayment() {
  orderNumber.value = '#' + Math.random().toString(36).slice(2,8).toUpperCase()
  checkoutStep.value = 3
}
function finishOrder() {
  cartStore.clearCart()
  showCheckout.value = false
  router.push('/products')
}

/* ── Payment methods ─────────────────────────────────────────────── */
function svgIcon(paths) {
  return defineComponent({
    render: () => h('svg', { xmlns:'http://www.w3.org/2000/svg', viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':2, 'stroke-linecap':'round', 'stroke-linejoin':'round' },
      paths.map(([tag, attrs]) => h(tag, attrs)))
  })
}
const IconCard = svgIcon([['rect',{x:'1',y:'4',width:'22',height:'16',rx:'2',ry:'2'}],['line',{x1:'1',y1:'10',x2:'23',y2:'10'}]])
const IconBank = svgIcon([['line',{x1:'12',y1:'1',x2:'12',y2:'23'}],['path',{d:'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'}]])

const paymentMethods = [
  {
    id: 'aba',
    name: 'ABA Mobile',
    note: 'Scan QR with ABA app',
    bg: 'bg-blue-50',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googleplay.svg',
    filter: 'filter: invert(30%) sepia(90%) saturate(500%) hue-rotate(200deg)',
    color: '',
  },
  {
    id: 'acleda',
    name: 'ACLEDA Unity',
    note: 'Scan QR with ACLEDA app',
    bg: 'bg-red-50',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googleplay.svg',
    filter: 'filter: invert(20%) sepia(80%) saturate(600%) hue-rotate(340deg)',
    color: '',
  },
  {
    id: 'card',
    name: 'Credit / Debit Card',
    note: 'Visa, Mastercard, JCB',
    bg: 'bg-violet-50',
    icon: IconCard,
    color: 'text-violet-500',
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    note: 'Direct bank transfer',
    bg: 'bg-emerald-50',
    icon: IconBank,
    color: 'text-emerald-500',
  },
]

/* ── QR grid (decorative 7×7 pattern) ───────────────────────────── */
const qrGrid = [
  1,1,1,0,1,0,1,
  1,0,1,1,0,1,1,
  1,1,0,0,1,0,1,
  0,1,1,0,0,1,0,
  1,0,1,1,1,0,1,
  0,1,0,1,0,1,1,
  1,1,1,0,1,1,0,
]
</script>

<style scoped>
@keyframes scan {
  0%   { top: 12px; opacity: 1; }
  50%  { opacity: 0.4; }
  100% { top: calc(100% - 12px); opacity: 1; }
}
.animate-scan { animation: scan 2s ease-in-out infinite alternate; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>