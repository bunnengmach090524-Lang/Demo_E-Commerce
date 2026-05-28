<template>
  <section class="bg-white py-24 px-6">
    <!-- Header -->
    <div class="text-center max-w-xl mx-auto mb-16">
      <span class="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-primary bg-primary/10 border border-primary/25 rounded-full px-4 py-1 mb-5">
        Why Choose Us
      </span>
      <h2 class="font-extrabold text-4xl lg:text-[44px] text-gray-900 leading-tight tracking-tight mb-4">
        Shopping Made Better
      </h2>
      <p class="text-base text-gray-500 leading-relaxed">
        We provide the best shopping experience with quality products and trusted services.
      </p>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
      <div
        v-for="(f, i) in features"
        :key="f.title"
        class="group relative bg-gray-50 border-2 border-transparent rounded-2xl p-9 text-center cursor-default
               transition-all duration-300 ease-out
               hover:-translate-y-2 hover:border-primary/40 hover:shadow-lg hover:bg-white
               animate-fade-up"
        :style="{ animationDelay: `${i * 0.1}s` }"
      >
        <!-- Icon -->
        <div
          class="w-[72px] h-[72px] rounded-[18px] flex items-center justify-center mx-auto mb-6
                 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          :class="f.iconBg"
        >
          <component :is="f.icon" class="w-7 h-7" :class="f.iconColor" />
        </div>

        <!-- Text -->
        <h3 class="font-bold text-lg text-gray-900 mb-2.5 tracking-tight">
          {{ f.title }}
        </h3>
        <p class="text-sm text-gray-500 leading-relaxed">
          {{ f.desc }}
        </p>

        <!-- Bottom accent line on hover -->
        <span
          class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 rounded-full bg-primary
                 transition-all duration-300 group-hover:w-12"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineComponent, h } from 'vue'

const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 28, height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
}

const IconRocket = defineComponent({
  render: () => h('svg', svgProps, [
    h('path', { d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z' }),
    h('path', { d: 'M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' }),
    h('path', { d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0' }),
    h('path', { d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' }),
  ]),
})

const IconShield = defineComponent({
  render: () => h('svg', svgProps, [
    h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }),
    h('polyline', { points: '9 12 11 14 15 10' }),
  ]),
})

const IconHeadset = defineComponent({
  render: () => h('svg', svgProps, [
    h('path', { d: 'M3 18v-6a9 9 0 0 1 18 0v6' }),
    h('path', { d: 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z' }),
  ]),
})

const IconRefresh = defineComponent({
  render: () => h('svg', svgProps, [
    h('polyline', { points: '1 4 1 10 7 10' }),
    h('path', { d: 'M3.51 15a9 9 0 1 0 .49-4.74' }),
  ]),
})

const features = [
  {
    icon: IconRocket,
    title: 'Fast Delivery',
    desc: 'Quick and reliable shipping worldwide with real-time tracking.',
    iconBg: 'bg-yellow-400/15',
    iconColor: 'text-yellow-500',
  },
  {
    icon: IconShield,
    title: 'Secure Payment',
    desc: '100% safe and encrypted payment system you can trust.',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-500',
  },
  {
    icon: IconHeadset,
    title: '24/7 Support',
    desc: 'Friendly customer support available around the clock.',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-500',
  },
  {
    icon: IconRefresh,
    title: 'Easy Returns',
    desc: 'Simple and hassle-free 30-day return policy, no questions.',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-500',
  },
]
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 0.5s ease both;
}
</style>