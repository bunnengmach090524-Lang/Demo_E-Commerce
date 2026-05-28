<template>
  <footer class="bg-[#dfe1e6] text-[#1d1d1f] border-t border-black/5">

    <!-- TOP FEATURES -->
    <div class="border-b border-black/5">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div v-for="t in trustItems" :key="t.label" class="flex items-center gap-3 p-3 rounded-2xl
         bg-white/60
         border border-black/5
         hover:bg-white
         hover:border-black/10
         transition-all duration-300">
            <div class="w-11 h-11 rounded-2xl
           bg-gradient-to-b from-white to-black/[0.03]
           border border-black/10
           flex items-center justify-center">
              <component :is="t.icon" :class="t.color" class="w-5 h-5" />
            </div>

            <div>
              <p class="text-sm font-semibold text-[#1d1d1f]">
                {{ t.label }}
              </p>
              <p class="text-xs text-black/50">
                {{ t.desc }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- MAIN -->
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-16">

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-14">

        <!-- BRAND -->
        <div class="lg:col-span-4">

          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-11 h-11 rounded-2xl bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-lg">
              E
            </div>

            <div>
              <h2 class="text-xl font-semibold tracking-tight">
                ETEC Store
              </h2>

              <p class="text-sm text-black/50">
                Premium ecommerce experience
              </p>
            </div>
          </div>

          <p class="text-[15px] leading-7 text-black/60 max-w-md mb-8">
            Discover beautifully designed products with a seamless shopping
            experience inspired by simplicity, elegance, and performance.
          </p>

          <!-- NEWSLETTER -->
          <div class="lg:col-span-4 w-full">
            
            <div class="mb-8 w-full">
              <h4 class="text-sm font-semibold mb-3">Subscribe to updates</h4>
              <div class="grid grid-cols-1 sm:flex sm:flex-row gap-3 w-full">
                <input v-model="email" type="email" placeholder="Email address" class="w-full sm:flex-1 h-12 px-4 rounded-full bg-white border border-black/10 outline-none text-sm box-border" />
                <button @click="subscribe" class="w-full sm:w-auto h-12 px-6 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:opacity-90 transition flex items-center justify-center box-border">Subscribe</button>
              </div>
            </div>

          </div>

          <!-- SOCIAL -->
          <div class="flex items-center gap-3">
            <a v-for="s in socials" :key="s.label" :href="s.href" :aria-label="s.label"
              class="w-10 h-10 rounded-full border border-black/10 bg-white hover:bg-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center">
              <img :src="s.icon" :alt="s.label" class="w-4 h-4 opacity-70" />
            </a>
          </div>

        </div>

        <!-- LINKS -->
        <div class="lg:col-span-8">

          <div class="grid grid-cols-2 md:grid-cols-4 gap-10">

            <div v-for="col in linkCols" :key="col.title">
              <h4 class="text-sm font-semibold text-[#1d1d1f] mb-5">
                {{ col.title }}
              </h4>

              <ul class="space-y-3">

                <li v-for="link in col.links" :key="link.label">
                  <RouterLink v-if="link.to" :to="link.to"
                    class="text-sm text-black/60 hover:text-black transition-colors">
                    {{ link.label }}
                  </RouterLink>

                  <a v-else href="#" class="text-sm text-black/60 hover:text-black transition-colors">
                    {{ link.label }}
                  </a>
                </li>

              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- BOTTOM -->
    <div class="border-t border-black/5">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

        <p class="text-xs text-black/40">
          Copyright © 2026 ETEC Store. All rights reserved.
        </p>

        <div class="flex items-center gap-5 flex-wrap">
          <a v-for="item in bottomLinks" :key="item" href="#"
            class="text-xs text-black/40 hover:text-black transition-colors">
            {{ item }}
          </a>
        </div>

      </div>
    </div>

  </footer>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue'

const email = ref('')

function subscribe() {
  if (!email.value) return

  alert(`Subscribed with ${email.value}`)
  email.value = ''
}

/* ICON HELPER */
function icon(paths) {
  return defineComponent({
    render: () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 1.8,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        paths.map(([tag, attrs]) => h(tag, attrs))
      ),
  })
}

/* ICONS */
const IconPackage = icon([
  ['path', { d: 'M16.5 9.4l-9-5.19' }],
  ['path', { d: 'M3 7l9 5 9-5' }],
  ['path', { d: 'M12 22V12' }],
  ['path', { d: 'M21 16V8' }],
  ['path', { d: 'M3 16V8' }],
])

const IconLock = icon([
  ['rect', { x: '3', y: '11', width: '18', height: '10', rx: '2' }],
  ['path', { d: 'M7 11V8a5 5 0 0 1 10 0v3' }],
])

const IconRefresh = icon([
  ['path', { d: 'M21 2v6h-6' }],
  ['path', { d: 'M3 12a9 9 0 0 1 15-6l3 2' }],
  ['path', { d: 'M3 22v-6h6' }],
])

const IconZap = icon([
  ['polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' }],
])

/* DATA */
const trustItems = [
  {
    icon: IconPackage,
    label: 'Free Shipping',
    desc: 'On orders over $100',
    color: 'text-[#2563eb]'
  },
  {
    icon: IconLock,
    label: 'Secure Payment',
    desc: '100% protected checkout',
    color: 'text-[#059669]'
  },
  {
    icon: IconRefresh,
    label: 'Easy Returns',
    desc: '30-day return policy',
    color: 'text-[#ea580c]'
  },
  {
    icon: IconZap,
    label: 'Fast Delivery',
    desc: 'Quick nationwide shipping',
    color: 'text-[#7c3aed]'
  },
]

const socials = [
  {
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/facebook.svg',
    label: 'Facebook',
    href: '#',
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg',
    label: 'Instagram',
    href: '#',
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/x.svg',
    label: 'Twitter',
    href: '#',
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tiktok.svg',
    label: 'TikTok',
    href: '#',
  },
]

const linkCols = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', to: '/products' },
      { label: 'Best Sellers', to: '/products' },
      { label: 'Accessories', to: '/products' },
      { label: 'Gift Cards' },
    ],
  },

  {
    title: 'Support',
    links: [
      { label: 'Help Center' },
      { label: 'Track Order' },
      { label: 'Shipping' },
      { label: 'Returns' },
    ],
  },

  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers' },
      { label: 'Newsroom' },
      { label: 'Contact', to: '/contact' },
    ],
  },

  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Service' },
      { label: 'Cookies' },
      { label: 'Licenses' },
    ],
  },
]

const bottomLinks = [
  'Privacy',
  'Terms',
  'Cookies',
  'Support',
]
</script>