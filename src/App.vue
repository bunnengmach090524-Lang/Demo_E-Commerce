<template>
  <div
    id="app-root"
    class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300"
  >
    <Navbar />
    <main class="bg-white dark:bg-gray-950 transition-colors duration-300">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
    <CartDrawer />
    <ToastContainer />
  </div>
</template>

<script setup>
import Navbar         from '@/components/ui/Navbar.vue'
import Footer         from '@/components/ui/Footer.vue'
import CartDrawer     from '@/components/ui/CartDrawer.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>