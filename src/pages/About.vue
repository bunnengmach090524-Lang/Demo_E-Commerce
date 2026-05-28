<template>
  <div class="min-h-screen pt-[100px] pb-16 bg-white">

    <!-- ── Hero ──────────────────────────────────────────────────────── -->
    <section class="container max-w-4xl mx-auto text-center py-20 px-6">
      <span class="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-primary bg-primary/10 border border-primary/25 rounded-full px-4 py-1 mb-5">
        About Us
      </span>
      <h1 class="font-extrabold text-5xl lg:text-6xl text-gray-900 leading-tight tracking-tight mb-6">
        We're building the<br />
        <span class="text-primary">future of shopping</span>
      </h1>
      <p class="text-gray-500 text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
        ETEC E-Commerce is a premium ecommerce platform dedicated to providing the best shopping experience
        with curated products, fast shipping, and exceptional customer service.
      </p>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-6 max-w-xl mx-auto">
        <div
          v-for="stat in stats" :key="stat.label"
          class="bg-gray-50 border border-gray-100 rounded-2xl py-6 px-4 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
        >
          <div class="font-black text-4xl text-primary mb-1">{{ stat.value }}</div>
          <div class="text-sm text-gray-500">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- ── Divider ────────────────────────────────────────────────────── -->
    <div class="border-t border-gray-100 max-w-5xl mx-auto" />

    <!-- ── Mission & Image ───────────────────────────────────────────── -->
    <section class="container max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Text -->
      <div>
        <span class="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-primary bg-primary/10 border border-primary/25 rounded-full px-4 py-1 mb-5">
          Our Mission
        </span>
        <h2 class="font-extrabold text-3xl text-gray-900 tracking-tight mb-4">
          Curated quality, delivered fast
        </h2>
        <p class="text-gray-500 leading-relaxed mb-6">
          We handpick every product on our platform to ensure quality you can trust. From electronics to lifestyle goods,
          our team works around the clock to bring you exclusive deals and lightning-fast shipping.
        </p>
        <ul class="flex flex-col gap-3">
          <li v-for="point in missionPoints" :key="point" class="flex items-start gap-3">
            <span class="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg class="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span class="text-sm text-gray-600">{{ point }}</span>
          </li>
        </ul>
      </div>

      <!-- Image upload card (mission image — kept uploadable) -->
      <div
        class="relative group rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
        @click="triggerUpload"
        @dragover.prevent
        @drop.prevent="onDrop"
      >
        <template v-if="!missionImage">
          <svg class="w-10 h-10 text-gray-300 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
          <p class="text-sm text-gray-400 font-medium">Click or drag to upload image</p>
          <p class="text-xs text-gray-300 mt-1">PNG, JPG up to 5MB</p>
        </template>
        <template v-else>
          <img :src="missionImage" alt="Mission" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <span class="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">Change image</span>
          </div>
        </template>
        <input ref="uploadInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
      </div>
    </section>

    <!-- ── Values ────────────────────────────────────────────────────── -->
    <section class="bg-gray-50 border-y border-gray-100 py-16 px-6">
      <div class="container max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-primary bg-primary/10 border border-primary/25 rounded-full px-4 py-1 mb-4">
            Our Values
          </span>
          <h2 class="font-extrabold text-3xl text-gray-900 tracking-tight">What drives us every day</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="v in values" :key="v.title"
            class="bg-white border border-gray-100 rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4" :class="v.bg">
              <component :is="v.icon" class="w-5 h-5" :class="v.color" />
            </div>
            <h3 class="font-bold text-gray-900 mb-1.5">{{ v.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Team ──────────────────────────────────────────────────────── -->
    <section class="container max-w-5xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <span class="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-primary bg-primary/10 border border-primary/25 rounded-full px-4 py-1 mb-4">
          The Team
        </span>
        <h2 class="font-extrabold text-3xl text-gray-900 tracking-tight">People behind the platform</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div
          v-for="(member, i) in team" :key="i"
          class="bg-white border border-gray-100 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200"
        >
          <!-- ✅ Static avatar — no click handler, no upload, no hover overlay -->
          <div class="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 mb-4">
            <img
              v-if="member.avatar"
              :src="member.avatar"
              :alt="member.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-2xl select-none">👤</div>
          </div>

          <h3 class="font-bold text-gray-900 mb-0.5">{{ member.name }}</h3>
          <p class="text-xs text-primary font-medium mb-3">{{ member.role }}</p>
          <p class="text-sm text-gray-500 leading-relaxed">{{ member.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────────── -->
    <section class="container max-w-5xl mx-auto px-6 pb-8">
      <div class="bg-primary rounded-2xl px-8 py-12 text-center">
        <h2 class="font-extrabold text-3xl text-white mb-3 tracking-tight">Ready to start shopping?</h2>
        <p class="text-white/70 mb-8">Join thousands of happy customers and discover our curated collection.</p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <RouterLink to="/products" class="bg-white text-primary font-bold px-7 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-sm">
            Shop Now
          </RouterLink>
          <RouterLink to="/contact" class="bg-white/15 text-white font-bold px-7 py-3 rounded-xl hover:bg-white/25 transition-colors duration-200 text-sm border border-white/20">
            Contact Us
          </RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue'

/* ── Mission image upload (still uploadable) ─────────────────────── */
const missionImage = ref(localStorage.getItem('about_mission_img') || null)
const uploadInput  = ref(null)

function toBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target.result)
    reader.readAsDataURL(file)
  })
}

function triggerUpload() { uploadInput.value?.click() }
async function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const b64 = await toBase64(file)
  missionImage.value = b64
  localStorage.setItem('about_mission_img', b64)
}
async function onDrop(e) {
  const file = e.dataTransfer.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  const b64 = await toBase64(file)
  missionImage.value = b64
  localStorage.setItem('about_mission_img', b64)
}

/* ── Data ────────────────────────────────────────────────────────── */
const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '10K+', label: 'Products' },
  { value: '99%',  label: 'Satisfaction Rate' },
]

const missionPoints = [
  'Handpicked products from trusted suppliers worldwide',
  'Same-day dispatch on orders placed before 3pm',
  'Dedicated support team available 24 hours a day',
  '30-day hassle-free returns, no questions asked',
]

/* ── SVG icon helper ─────────────────────────────────────────────── */
function icon(paths) {
  return defineComponent({
    render: () => h('svg', { xmlns:'http://www.w3.org/2000/svg', viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':2, 'stroke-linecap':'round', 'stroke-linejoin':'round' },
      paths.map(([tag, attrs]) => h(tag, attrs)))
  })
}
const IconHeart   = icon([['path',{d:'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'}]])
const IconZap     = icon([['polygon',{points:'13 2 3 14 12 14 11 22 21 10 12 10 13 2'}]])
const IconShield  = icon([['path',{d:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'}]])
const IconStar    = icon([['polygon',{points:'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'}]])

const values = [
  { icon: IconHeart,  title: 'Customer First',  desc: 'Every decision we make starts with asking how it helps our customers.',  bg: 'bg-rose-50',    color: 'text-rose-500' },
  { icon: IconZap,    title: 'Speed',           desc: 'Fast checkout, fast shipping, fast support — no waiting around.',        bg: 'bg-yellow-50',  color: 'text-yellow-500' },
  { icon: IconShield, title: 'Trust',           desc: 'Secure payments and verified products you can shop with confidence.',    bg: 'bg-emerald-50', color: 'text-emerald-500' },
  { icon: IconStar,   title: 'Quality',         desc: 'We curate only the best — if it doesn\'t meet our bar, it\'s not here.', bg: 'bg-violet-50',  color: 'text-violet-500' },
]

/* ── Team — static avatars, set your image paths directly here ───── */
import BunNengImage from '@/assets/team/BunNengImage.png'
import LenImage from '@/assets/team/LenImage.jpg'
const team = ref([
  {
    name: 'Team Member 01',
    role: 'UI/UX Designer & frontend developer',
    desc: 'Crafts the visual language of the platform — from wireframes to polished interfaces that delight and convert.',
    // ✅ Put your image path here, e.g. '/src/assets/team/member1.jpg'
    avatar: BunNengImage,
  },
  {
    name: 'Team Member 02',
    role: 'Frontend Developer',
    desc: 'Focused on API integration, reusable components, user interaction, and improving performance for a seamless shopping experience.',
    // ✅ Put your image path here, e.g. '/src/assets/team/member2.jpg'
    avatar: LenImage,
  },
])
</script>