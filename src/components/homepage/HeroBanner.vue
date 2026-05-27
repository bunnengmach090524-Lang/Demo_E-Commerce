<template>
  <section class="relative min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] flex items-center overflow-hidden pt-[68px]">
    <!-- Decorative blobs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute w-[500px] h-[500px] bg-primary/15 rounded-full blur-[80px] -top-24 right-48 animate-float" />
      <div class="absolute w-[300px] h-[300px] bg-accent/15 rounded-full blur-[80px] bottom-12 left-24 animate-float" style="animation-delay:-3s;animation-direction:reverse" />
      <!-- Grid overlay -->
      <div class="absolute inset-0 opacity-[0.03]"
        style="background-image:linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px);background-size:40px 40px" />
    </div>

    <div class="container relative z-10 grid lg:grid-cols-2 gap-14 items-center py-20">
      <!-- Left content -->
      <div>
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-white/80 text-sm font-medium backdrop-blur-sm mb-7 animate-fade-up">
          <span class="text-accent">✦</span> Premium storefront experience
        </div>

        <!-- Heading -->
        <h1 class="font-display font-black text-white leading-[1.05] mb-6 animate-fade-up" style="font-size:clamp(2.5rem,5vw,4rem);animation-delay:.1s">
          Shop the latest<br />
          <em class="not-italic text-accent">essentials</em> with<br />
          confidence and speed.
        </h1>

        <!-- Sub -->
        <p class="text-white/60 text-lg leading-relaxed max-w-md mb-9 animate-fade-up" style="animation-delay:.2s">
          Discover featured products, enjoy fast checkout, and explore carefully curated categories tailored for your next purchase.
        </p>

        <!-- Buttons -->
        <div class="flex flex-wrap gap-3 mb-10 animate-fade-up" style="animation-delay:.3s">
          <RouterLink to="/products"
            class="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-dark font-display font-bold rounded-xl text-base hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-accent transition-all duration-300">
            Shop now →
          </RouterLink>
          <RouterLink to="/register"
            class="inline-flex items-center px-7 py-3.5 border-2 border-white/25 rounded-xl text-white font-display font-semibold text-base bg-white/5 hover:bg-white/12 hover:border-white/50 transition-all duration-300">
            Create account
          </RouterLink>
        </div>

        <!-- Feature chips -->
        <div class="flex flex-wrap gap-3 animate-fade-up" style="animation-delay:.4s">
          <div v-for="f in features" :key="f"
            class="flex items-center gap-2 px-4 py-2.5 bg-white/7 border border-white/12 rounded-xl text-white/80 text-sm font-medium backdrop-blur-sm hover:bg-white/12 transition-all duration-200">
            {{ f }}
          </div>
        </div>
      </div>

      <!-- Right card -->
      <div class="hidden lg:block bg-white/7 border border-white/15 backdrop-blur-xl rounded-2xl p-9 text-white animate-fade-up" style="animation-delay:.25s">
        <div class="flex items-center justify-between mb-5">
          <span class="text-[11px] font-bold tracking-[0.15em] text-white/50 uppercase font-display">Featured Drop</span>
          <span class="bg-accent text-dark text-xs font-bold px-3 py-1 rounded-full">New</span>
        </div>

        <h2 class="font-display font-extrabold text-[1.75rem] leading-tight mb-4">
          Everyday essentials,<br />upgraded
        </h2>
        <p class="text-white/60 text-sm leading-relaxed mb-7">
          Browse seasonal favorites, best sellers, and limited-time offers in a clean, modern shopping layout built for real customers.
        </p>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-4 p-5 bg-white/5 rounded-xl mb-4">
          <div>
            <span class="text-xs text-white/50 block mb-1">Customer rating</span>
            <div class="flex items-center gap-2">
              <span class="text-accent text-sm">★★★★★</span>
              <strong class="font-display text-base">4.9/5</strong>
            </div>
          </div>
          <div>
            <span class="text-xs text-white/50 block mb-1">Free shipping</span>
            <strong class="font-display text-base">On orders $50+</strong>
          </div>
        </div>

        <!-- Tags -->
        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="p-3.5 bg-white/5 rounded-xl">
            <span class="text-xs text-white/40 block mb-1">Trending now</span>
            <strong class="text-sm font-semibold">Fashion & accessories</strong>
          </div>
          <div class="p-3.5 bg-white/5 rounded-xl">
            <span class="text-xs text-white/40 block mb-1">Best value</span>
            <strong class="text-sm font-semibold">Everyday deals</strong>
          </div>
        </div>

        <!-- Product thumbnails -->
        <div class="flex gap-2">
          <RouterLink
            v-for="product in previewProducts.slice(0,5)"
            :key="product.id"
            :to="`/products/${product.id}`"
            class="w-[52px] h-[52px] rounded-xl overflow-hidden bg-white/10 border border-white/15 hover:-translate-y-1 hover:border-accent transition-all duration-200"
          >
            <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover" loading="lazy" />
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-[0.1em] uppercase">
      <span>Scroll</span>
      <div class="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()
const { featuredProducts: previewProducts } = storeToRefs(store)

const features = ['🛍️ Curated product picks', '🚀 Fast delivery options', '🔒 Secure checkout']

onMounted(() => { if (!previewProducts.value.length) store.fetchFeaturedProducts() })
</script>
