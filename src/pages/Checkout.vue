<template>
  <div class="min-h-screen pt-[100px] pb-16 bg-gray-50">
    <div class="container">
      <h1 class="font-display font-extrabold text-3xl text-gray-900 mb-8">Checkout</h1>
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 flex flex-col gap-6">
          <div class="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 class="font-display font-bold text-lg mb-5">Shipping Information</h2>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label><input type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" /></div>
              <div><label class="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label><input type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" /></div>
              <div class="col-span-2"><label class="block text-sm font-semibold text-gray-700 mb-1.5">Address</label><input type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" /></div>
              <div><label class="block text-sm font-semibold text-gray-700 mb-1.5">City</label><input type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" /></div>
              <div><label class="block text-sm font-semibold text-gray-700 mb-1.5">ZIP Code</label><input type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" /></div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 class="font-display font-bold text-lg mb-5">Payment</h2>
            <div class="flex flex-col gap-4">
              <div><label class="block text-sm font-semibold text-gray-700 mb-1.5">Card Number</label><input type="text" placeholder="1234 5678 9012 3456" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" /></div>
              <div class="grid grid-cols-2 gap-4">
                <div><label class="block text-sm font-semibold text-gray-700 mb-1.5">Expiry</label><input type="text" placeholder="MM/YY" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" /></div>
                <div><label class="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label><input type="text" placeholder="123" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" /></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-gray-100 h-fit sticky top-24">
          <h2 class="font-display font-bold text-lg text-gray-900 mb-5">Order Summary</h2>
          <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between text-sm text-gray-600 mb-2">
            <span class="truncate mr-2">{{ item.title }} × {{ item.quantity }}</span>
            <span class="shrink-0 font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-display font-bold text-xl text-gray-900 pt-4 border-t border-gray-100 mt-4">
            <span>Total</span><span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <button class="btn-primary w-full justify-center py-3.5 mt-6 text-base rounded-xl" @click="placeOrder">
            Place Order →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
const cartStore = useCartStore()
const router = useRouter()
function placeOrder() {
  cartStore.clearCart()
  window.$toast?.success('Order placed successfully! 🎉')
  router.push('/')
}
</script>
