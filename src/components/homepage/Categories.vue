<template>
  <section class="py-24 bg-white">
    <div class="container">
      <!-- Header -->
      <div class="text-center mb-14">
        <p class="text-xs font-bold font-display tracking-[0.15em] text-primary uppercase mb-3">Categories</p>
        <h2 class="font-display font-extrabold text-4xl text-gray-900 mb-3">Shop By Category</h2>
        <p class="text-gray-500">Discover products from our most popular collections.</p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        <RouterLink
          v-for="(cat, i) in categories"
          :key="cat.slug"
          :to="`/products?category=${cat.slug}`"
          class="group flex flex-col items-center gap-3 p-6 bg-gray-50 border-2 border-transparent rounded-2xl text-center transition-all duration-300 hover:border-primary hover:-translate-y-1.5 hover:shadow-strong animate-fade-up"
          :style="{ animationDelay: `${i * 0.07}s` }"
        >
          <div class="w-16 h-16 bg-primary/8 rounded-[18px] grid place-items-center transition-all duration-300 group-hover:bg-primary">
            <span class="text-2xl transition-transform duration-300 group-hover:scale-110">{{ cat.icon }}</span>
          </div>
          <span class="font-display font-bold text-sm text-gray-900">{{ cat.name }}</span>
          <span class="text-xs text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 -mt-1">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  { slug: 'smartphones',     name: 'Smartphones',  icon: '📱' },
  { slug: 'laptops',         name: 'Laptops',       icon: '💻' },
  { slug: 'tops',            name: 'Fashion',       icon: '👕' },
  { slug: 'fragrances',      name: 'Fragrances',    icon: '🌸' },
  { slug: 'furniture',       name: 'Furniture',     icon: '🛋️' },
  { slug: 'home-decoration', name: 'Home Decor',    icon: '🏠' },
  { slug: 'skincare',        name: 'Skincare',      icon: '✨' },
  { slug: 'groceries',       name: 'Groceries',     icon: '🛒' },
]
</script>
