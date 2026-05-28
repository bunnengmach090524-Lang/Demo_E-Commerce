<template>
  <div class="min-h-screen pt-[100px] pb-16 bg-gray-50">
    <div class="container max-w-5xl mx-auto px-6 py-12">

      <!-- Header -->
      <div class="text-center mb-12">
        <span class="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-primary bg-primary/10 border border-primary/25 rounded-full px-4 py-1 mb-4">
          Contact
        </span>
        <h1 class="font-extrabold text-4xl lg:text-5xl text-gray-900 tracking-tight mb-3">Get in Touch</h1>
        <p class="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          Have a question or need help? We'd love to hear from you. Our team usually responds within 24 hours.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- ── Info cards (left col) ───────────────────────────────── -->
        <div class="flex flex-col gap-4">

          <div
            v-for="info in contactInfo" :key="info.title"
            class="bg-white border border-gray-100 rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :class="info.bg">
              <component :is="info.icon" class="w-5 h-5" :class="info.color" />
            </div>
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{{ info.title }}</p>
            <p class="text-sm font-semibold text-gray-800">{{ info.value }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ info.note }}</p>
          </div>

          <!-- Social row -->
          <div class="bg-white border border-gray-100 rounded-2xl p-5">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Follow Us</p>
            <div class="flex gap-2">
              <a
                v-for="s in socials" :key="s.label" :href="s.href" :aria-label="s.label"
                class="w-9 h-9 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-300 hover:border-primary transition-all duration-200 group"
              >
                <img :src="s.icon" :alt="s.label" class="w-3.5 h-3.5 group-hover:invert transition-all" style="filter: invert(0.4)" />
              </a>
            </div>
          </div>

        </div>

        <!-- ── Contact form (right col) ───────────────────────────── -->
        <div class="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">

          <!-- Success state -->
          <div v-if="sent" class="h-full flex flex-col items-center justify-center text-center py-12">
            <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 class="font-extrabold text-xl text-gray-900 mb-2">Message sent!</h3>
            <p class="text-sm text-gray-500 mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
            <button @click="reset" class="text-sm font-semibold text-primary hover:underline">Send another message</button>
          </div>

          <!-- Form -->
          <div v-else class="flex flex-col gap-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Name <span class="text-rose-400">*</span></label>
                <input
                  v-model="form.name"
                  type="text" placeholder="Your name"
                  class="w-full px-4 py-3 border-2 rounded-xl text-sm outline-none transition-colors"
                  :class="errors.name ? 'border-rose-300 bg-rose-50' : 'border-gray-200 focus:border-primary'"
                />
                <p v-if="errors.name" class="text-xs text-rose-500 mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email <span class="text-rose-400">*</span></label>
                <input
                  v-model="form.email"
                  type="email" placeholder="your@email.com"
                  class="w-full px-4 py-3 border-2 rounded-xl text-sm outline-none transition-colors"
                  :class="errors.email ? 'border-rose-300 bg-rose-50' : 'border-gray-200 focus:border-primary'"
                />
                <p v-if="errors.email" class="text-xs text-rose-500 mt-1">{{ errors.email }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="s in subjects" :key="s"
                  type="button"
                  @click="form.subject = s"
                  class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150"
                  :class="form.subject === s
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-primary/40'"
                >{{ s }}</button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Message <span class="text-rose-400">*</span></label>
              <textarea
                v-model="form.message"
                rows="5" placeholder="How can we help?"
                class="w-full px-4 py-3 border-2 rounded-xl text-sm outline-none transition-colors resize-none"
                :class="errors.message ? 'border-rose-300 bg-rose-50' : 'border-gray-200 focus:border-primary'"
              />
              <div class="flex justify-between mt-1">
                <p v-if="errors.message" class="text-xs text-rose-500">{{ errors.message }}</p>
                <p class="text-xs text-gray-300 ml-auto">{{ form.message.length }} / 500</p>
              </div>
            </div>

            <button
              @click="submit"
              :disabled="loading"
              class="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
              <span>{{ loading ? 'Sending…' : 'Send Message' }}</span>
              <svg v-if="!loading" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineComponent, h } from 'vue'

/* ── Form state ──────────────────────────────────────────────────── */
const sent    = ref(false)
const loading = ref(false)
const form    = reactive({ name: '', email: '', subject: '', message: '' })
const errors  = reactive({ name: '', email: '', message: '' })

const subjects = ['Order Issue', 'Shipping', 'Returns', 'Product Info', 'Other']

function validate() {
  errors.name    = form.name.trim()    ? '' : 'Name is required'
  errors.email   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Valid email required'
  errors.message = form.message.trim() ? '' : 'Message is required'
  return !errors.name && !errors.email && !errors.message
}

function submit() {
  if (!validate()) return
  loading.value = true
  setTimeout(() => { loading.value = false; sent.value = true }, 1500)
}

function reset() {
  sent.value = false
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
  Object.assign(errors, { name: '', email: '', message: '' })
}

/* ── SVG icon helper ─────────────────────────────────────────────── */
function icon(paths) {
  return defineComponent({
    render: () => h('svg', { xmlns:'http://www.w3.org/2000/svg', viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':2, 'stroke-linecap':'round', 'stroke-linejoin':'round' },
      paths.map(([tag, attrs]) => h(tag, attrs)))
  })
}
const IconMail  = icon([['path',{d:'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'}],['polyline',{points:'22,6 12,13 2,6'}]])
const IconPhone = icon([['path',{d:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.17 6.17l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'}]])
const IconClock = icon([['circle',{cx:'12',cy:'12',r:'10'}],['polyline',{points:'12 6 12 12 16 14'}]])

const contactInfo = [
  { icon: IconMail,  title: 'Email',        value: 'support@etec.com',  note: 'We reply within 24h',      bg: 'bg-blue-50',    color: 'text-blue-500' },
  { icon: IconPhone, title: 'Phone',        value: '+855 12 345 678',   note: 'Mon–Fri, 8am – 6pm',       bg: 'bg-emerald-50', color: 'text-emerald-500' },
  { icon: IconClock, title: 'Working Hours',value: '8:00 AM – 6:00 PM', note: 'Monday to Friday',         bg: 'bg-violet-50',  color: 'text-violet-500' },
]

const socials = [
  { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/facebook.svg',  label: 'Facebook',  href: '#' },
  { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg', label: 'Instagram', href: '#' },
  { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/x.svg',         label: 'Twitter',   href: '#' },
  { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tiktok.svg',    label: 'TikTok',    href: '#' },
]
</script>