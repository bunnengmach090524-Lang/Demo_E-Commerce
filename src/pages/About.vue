<template>
  <div class="min-h-screen pt-[100px] pb-16">
    <div class="container max-w-3xl mx-auto text-center py-20">
      <p class="text-xs font-bold font-display tracking-widest text-primary uppercase mb-4">About Us</p>
      <h1 class="font-display font-extrabold text-5xl text-gray-900 mb-6">We're building the future of shopping</h1>
      <p class="text-gray-500 text-lg leading-relaxed mb-12">NovaCart is a premium ecommerce platform dedicated to providing the best shopping experience with curated products, fast shipping, and exceptional customer service.</p>
      <div class="grid grid-cols-3 gap-8">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="font-display font-black text-4xl text-primary mb-2">{{ stat.value }}</div>
          <div class="text-sm text-gray-500">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '10K+', label: 'Products' },
  { value: '99%', label: 'Satisfaction Rate' },
]
</script>
