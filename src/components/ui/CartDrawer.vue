<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="cartStore.isOpen"
        class="fixed inset-0 bg-black/50 z-[1100] backdrop-blur-sm"
        @click="cartStore.toggleCart()"
      />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="cartStore.isOpen"
        class="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white z-[1200] flex flex-col shadow-[−8px_0_48px_rgba(0,0,0,0.12)]"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 class="font-display font-extrabold text-lg text-gray-900">
            Your Cart
            <span class="text-primary">({{ cartStore.totalItems }})</span>
          </h2>
          <button
            class="w-9 h-9 bg-gray-100 rounded-lg text-gray-500 grid place-items-center hover:bg-gray-200 hover:text-gray-900 transition-all duration-200"
            @click="cartStore.toggleCart()"
          >
            ✕
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="cartStore.items.length === 0" class="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <span class="text-6xl">🛒</span>
          <p class="text-gray-500 text-lg font-medium">Your cart is empty</p>
          <RouterLink
            to="/products"
            class="btn-primary mt-2"
            @click="cartStore.toggleCart()"
          >
            Shop Now
          </RouterLink>
        </div>

        <!-- Items list -->
        <div v-else class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          <TransitionGroup
            enter-active-class="transition duration-200"
            enter-from-class="opacity-0 translate-x-4"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0 translate-x-4"
          >
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex gap-3 items-start p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200"
            >
              <!-- Product image -->
              <img
                :src="item.thumbnail"
                :alt="item.title"
                class="w-[72px] h-[72px] object-contain rounded-lg bg-white p-1 shrink-0"
              />

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1">
                  {{ item.title }}
                </p>
                <p class="font-display font-bold text-primary text-sm mb-2">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </p>

                <!-- Qty controls -->
                <div class="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden w-fit">
                  <button
                    class="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-all duration-150 text-base"
                    @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                  >−</button>
                  <span class="px-3 font-semibold text-sm min-w-[30px] text-center">{{ item.quantity }}</span>
                  <button
                    class="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-all duration-150 text-base"
                    @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                  >+</button>
                </div>
              </div>

              <!-- Remove -->
              <button
                class="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 text-base mt-0.5"
                @click="cartStore.removeItem(item.id)"
              >🗑</button>
            </div>
          </TransitionGroup>
        </div>

        <!-- Footer -->
        <div v-if="cartStore.items.length > 0" class="p-5 border-t border-gray-100 flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 font-medium">Total:</span>
            <strong class="font-display text-2xl font-extrabold text-gray-900">
              ${{ cartStore.totalPrice.toFixed(2) }}
            </strong>
          </div>
          <RouterLink
            to="/checkout"
            class="btn-primary justify-center py-3.5 text-base rounded-xl"
            @click="cartStore.toggleCart()"
          >
            Checkout →
          </RouterLink>
          <RouterLink
            to="/cart"
            class="btn-outline justify-center py-3 text-sm rounded-xl"
            @click="cartStore.toggleCart()"
          >
            View Full Cart
          </RouterLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>
