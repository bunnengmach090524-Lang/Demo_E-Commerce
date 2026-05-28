<template>
  <footer class="bg-[#1a1a2e] text-white/70">

    <!-- Trust bar -->
    <div class="bg-[#16213e] border-b border-white/5">
      <div class="container py-4 flex justify-around flex-wrap gap-3">
        <div v-for="t in trustItems" :key="t.label" class="flex items-center gap-2 text-sm font-medium text-white/70">
          <component :is="t.icon" class="w-4 h-4" />
          {{ t.label }}
        </div>
      </div>
    </div>

    <!-- Main grid -->
    <div class="container py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Brand column -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-9 h-9 bg-accent text-dark rounded-lg grid place-items-center font-black text-base">E</span>
            <span class="text-accent font-extrabold text-xl">ETEC E-Commerce</span>
          </div>
          <p class="text-white/50 text-sm leading-relaxed mb-5">
            Premium ecommerce experience with curated products, fast shipping, and exclusive deals.
          </p>

          <!-- Socials -->
          <div class="flex gap-2 mb-5">
            <a
              v-for="s in socials" :key="s.label" :href="s.href" :aria-label="s.label"
              class="w-10 h-10 bg-white/7 rounded-xl grid place-items-center hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-200"
            >
              <img :src="s.icon" :alt="s.label" class="w-4 h-4" style="filter: invert(1) opacity(0.6)" />
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
              class="px-4 py-2.5 bg-accent text-dark font-bold text-sm rounded-xl hover:bg-accent-dark transition-all duration-200"
              @click="subscribe"
            >Join</button>
          </div>
        </div>

        <!-- Link columns -->
        <div v-for="col in linkCols" :key="col.title">
          <div class="flex items-center gap-1.5 mb-4">
            <component :is="col.icon" class="w-3.5 h-3.5 text-white/30" />
            <h4 class="text-[11px] font-bold tracking-[0.12em] text-white/40 uppercase">{{ col.title }}</h4>
          </div>
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
        <p class="text-white/30 text-sm">© 2026 ETEC E-Commerce. All rights reserved.</p>
        <div class="flex gap-5">
          <a v-for="l in ['Privacy', 'Terms', 'Support']" :key="l" href="#"
             class="text-sm text-white/30 hover:text-white transition-colors duration-200">{{ l }}</a>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue'

const email = ref('')
function subscribe() {
  if (email.value) { alert(`Thanks for subscribing with ${email.value}!`); email.value = '' }
}

/* ── SVG helpers ─────────────────────────────────────────────────── */
function icon(paths) {
  return defineComponent({
    render: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24',
      fill: 'none', stroke: 'currentColor',
      'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    }, paths.map(([tag, attrs]) => h(tag, attrs)))
  })
}

/* ── Trust bar icons ─────────────────────────────────────────────── */
const IconPackage   = icon([['path',{d:'M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'}],['polyline',{points:'3.27 6.96 12 12.01 20.73 6.96'}],['line',{x1:'12',y1:'22.08',x2:'12',y2:'12'}]])
const IconLock      = icon([['rect',{x:'3',y:'11',width:'18',height:'11',rx:'2',ry:'2'}],['path',{d:'M7 11V7a5 5 0 0 1 10 0v4'}]])
const IconRefreshCw = icon([['polyline',{points:'1 4 1 10 7 10'}],['path',{d:'M3.51 15a9 9 0 1 0 .49-4.74'}]])
const IconZap       = icon([['polygon',{points:'13 2 3 14 12 14 11 22 21 10 12 10 13 2'}]])

/* ── Social icons (Simple Icons CDN) ─────────────────────────────── */

/* ── Column icons ────────────────────────────────────────────────── */
const IconShoppingBag = icon([['path',{d:'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'}],['line',{x1:'3',y1:'6',x2:'21',y2:'6'}],['path',{d:'M16 10a4 4 0 0 1-8 0'}]])
const IconHeadphones  = icon([['path',{d:'M3 18v-6a9 9 0 0 1 18 0v6'}],['path',{d:'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z'}]])
const IconBuilding    = icon([['rect',{x:'3',y:'3',width:'18',height:'18',rx:'2'}],['path',{d:'M3 9h18M9 21V9'}]])

const trustItems = [
  { icon: IconPackage,   label: 'Free Shipping' },
  { icon: IconLock,      label: 'Secure Payment' },
  { icon: IconRefreshCw, label: '30-Day Returns' },
  { icon: IconZap,       label: 'Fast Delivery' },
]

const socials = [
  { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/facebook.svg',  label: 'Facebook',  href: '#' },
  { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg', label: 'Instagram', href: '#' },
  { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/x.svg',         label: 'Twitter',   href: '#' },
  { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg',  label: 'LinkedIn',  href: '#' },
  { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tiktok.svg',    label: 'TikTok',    href: '#' },
]

const linkCols = [
  {
    title: 'Shop', icon: IconShoppingBag,
    links: [
      { label: 'New Arrivals', to: '/products' },
      { label: 'Best Sellers', to: '/products?sort=popular' },
      { label: 'Deals',        to: '/products?category=sale' },
      { label: 'Gift Cards' },
    ],
  },
  {
    title: 'Support', icon: IconHeadphones,
    links: [
      { label: 'Track Order' },
      { label: 'Shipping' },
      { label: 'Returns' },
      { label: 'FAQ' },
    ],
  },
  {
    title: 'Company', icon: IconBuilding,
    links: [
      { label: 'About',   to: '/about' },
      { label: 'Careers' },
      { label: 'Blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]
</script>