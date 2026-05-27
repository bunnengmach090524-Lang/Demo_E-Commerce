<template>
  <div class="min-h-screen pt-[100px] pb-16 bg-gray-50">
    <div class="container">
      <h1 class="font-display font-extrabold text-3xl text-gray-900 mb-8">Your Cart</h1>

      <div v-if="cartStore.items.length === 0" class="text-center py-20 bg-white rounded-2xl">
        <div class="text-7xl mb-4">🛒</div>
        <h2 class="font-display font-bold text-2xl text-gray-900 mb-2">Your cart is empty</h2>
        <p class="text-gray-500 mb-6">Add some products to get started</p>
        <RouterLink to="/products" class="btn-primary">Shop Now</RouterLink>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Items -->
        <div class="lg:col-span-2 flex flex-col gap-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-soft transition-all duration-200"
          >
            <img :src="item.thumbnail" :alt="item.title" class="w-24 h-24 object-contain rounded-xl bg-gray-50 p-2 shrink-0" />
            <div class="flex-1 min-w-0">
              <h3 class="font-display font-bold text-gray-900 mb-1 line-clamp-2">{{ item.title }}</h3>
              <p class="text-primary font-bold text-lg mb-3">${{ (item.price * item.quantity).toFixed(2) }}</p>
              <div class="flex items-center gap-3">
                <div class="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <button class="w-9 h-9 grid place-items-center hover:bg-primary hover:text-white transition-all" @click="cartStore.updateQuantity(item.id, item.quantity - 1)">−</button>
                  <span class="px-4 font-semibold text-sm">{{ item.quantity }}</span>
                  <button class="w-9 h-9 grid place-items-center hover:bg-primary hover:text-white transition-all" @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
                </div>
                <button class="text-sm text-red-400 hover:text-red-600 font-medium transition-colors" @click="cartStore.removeItem(item.id)">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="bg-white rounded-2xl p-6 border border-gray-100 h-fit sticky top-24">
          <h2 class="font-display font-bold text-lg text-gray-900 mb-5">Order Summary</h2>
          <div class="flex justify-between text-sm text-gray-500 mb-2"><span>Subtotal</span><span>${{ cartStore.totalPrice.toFixed(2) }}</span></div>
          <div class="flex justify-between text-sm text-gray-500 mb-4"><span>Shipping</span><span class="text-emerald-500 font-medium">Free</span></div>
          <div class="flex justify-between font-display font-bold text-lg text-gray-900 pt-4 border-t border-gray-100">
            <span>Total</span><span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <RouterLink to="/checkout" class="btn-primary w-full justify-center py-3.5 mt-6 text-base rounded-xl">
            Checkout →
          </RouterLink>
          <button class="w-full text-center text-sm text-gray-400 hover:text-red-500 mt-3 transition-colors" @click="cartStore.clearCart()">Clear cart</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>
