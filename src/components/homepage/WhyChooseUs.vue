<template>
  <section class="py-24 bg-white">
    <div class="container">
      <div class="text-center mb-14">
        <p class="text-xs font-bold font-display tracking-[0.15em] text-primary uppercase mb-3">Why Choose Us</p>
        <h2 class="font-display font-extrabold text-4xl text-gray-900 mb-3">Shopping Made Better</h2>
        <p class="text-gray-500">We provide the best shopping experience with quality products and trusted services.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          class="group p-9 bg-gray-50 border-2 border-transparent rounded-2xl text-center transition-all duration-300 hover:border-primary hover:-translate-y-1.5 hover:shadow-strong animate-fade-up"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div
            class="w-[72px] h-[72px] rounded-[20px] grid place-items-center text-4xl mx-auto mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            :class="f.bg"
          >{{ f.icon }}</div>
          <h3 class="font-display font-bold text-lg text-gray-900 mb-2.5">{{ f.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { icon: '🚀', title: 'Fast Delivery',   desc: 'Quick and reliable shipping worldwide.',            bg: 'bg-primary/10' },
  { icon: '🔒', title: 'Secure Payment',  desc: '100% safe and encrypted payment system.',           bg: 'bg-emerald-500/10' },
  { icon: '💬', title: '24/7 Support',    desc: 'Friendly customer support anytime.',                bg: 'bg-accent/15' },
  { icon: '↩️', title: 'Easy Returns',    desc: 'Simple and hassle-free return policy.',             bg: 'bg-red-500/10' },
]
</script>
