<template>
  <footer class="bg-[#1a1a2e] text-white/70">
    <!-- Trust bar -->
    <div class="bg-[#16213e] border-b border-white/5">
      <div class="container py-4 flex justify-around flex-wrap gap-3">
        <div v-for="t in trustItems" :key="t.label" class="flex items-center gap-2 text-sm font-medium">
          <span>{{ t.icon }}</span> {{ t.label }}
        </div>
      </div>
    </div>

    <!-- Main grid -->
    <div class="container py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand column -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-9 h-9 bg-accent text-dark rounded-lg grid place-items-center font-black font-display">E</span>
            <span class="text-accent font-display font-extrabold text-xl">ETEC E-Commerce</span>
          </div>
          <p class="text-white/50 text-sm leading-relaxed mb-5">
            Premium ecommerce experience with curated products, fast shipping, and exclusive deals.
          </p>
          <!-- Social -->
          <div class="flex gap-2 mb-5">
            <a v-for="s in socials" :key="s.label" :href="s.href" :aria-label="s.label"
               class="w-10 h-10 bg-white/7 rounded-xl grid place-items-center text-base hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-200">
              {{ s.icon }}
            </a>
          </div>
          <!-- Newsletter -->
          <div class="flex gap-2">
            <input
              v-model="email"
              type="email"
              placeholder="Enter email"
              class="flex-1 px-4 py-2.5 bg-white/7 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-accent transition-colors"
            />
            <button
              class="px-4 py-2.5 bg-accent text-dark font-display font-bold text-sm rounded-xl hover:bg-accent-dark transition-all duration-200"
              @click="subscribe"
            >Join</button>
          </div>
        </div>

        <!-- Link columns -->
        <div v-for="col in linkCols" :key="col.title">
          <h4 class="text-[11px] font-bold font-display tracking-[0.12em] text-white/40 uppercase mb-4">
            {{ col.title }}
          </h4>
          <ul class="flex flex-col gap-2.5">
            <li v-for="link in col.links" :key="link.label">
              <RouterLink
                v-if="link.to"
                :to="link.to"
                class="text-sm text-white/60 hover:text-white hover:pl-1 transition-all duration-200"
              >{{ link.label }}</RouterLink>
              <a v-else href="#" class="text-sm text-white/60 hover:text-white hover:pl-1 transition-all duration-200">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/5">
      <div class="container py-5 flex items-center justify-between flex-wrap gap-3">
        <p class="text-white/30 text-sm">© 2026 NovaCart. All rights reserved.</p>
        <div class="flex gap-5">
          <a v-for="l in ['Privacy','Terms','Support']" :key="l" href="#"
             class="text-sm text-white/30 hover:text-white transition-colors duration-200">{{ l }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
function subscribe() {
  if (email.value) { alert(`Thanks for subscribing with ${email.value}!`); email.value = '' }
}

const trustItems = [
  { icon: '📦', label: 'Free Shipping' },
  { icon: '🔒', label: 'Secure Payment' },
  { icon: '↩️', label: '30-Day Returns' },
  { icon: '⚡', label: 'Fast Delivery' },
]

const socials = [
  { icon: '📘', label: 'Facebook', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' },
  { icon: '▶️', label: 'YouTube', href: '#' },
]

const linkCols = [
  {
    title: '🛒 Shop',
    links: [
      { label: 'New Arrivals', to: '/products' },
      { label: 'Best Sellers', to: '/products?sort=popular' },
      { label: 'Deals', to: '/products?category=sale' },
      { label: 'Gift Cards' },
    ],
  },
  {
    title: '💁 Support',
    links: [
      { label: 'Track Order' },
      { label: 'Shipping' },
      { label: 'Returns' },
      { label: 'FAQ' },
    ],
  },
  {
    title: '🏢 Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers' },
      { label: 'Blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]
</script>
