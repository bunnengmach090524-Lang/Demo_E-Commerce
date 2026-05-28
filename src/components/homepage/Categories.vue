<template>
  <section class="py-24 bg-white">
    <div class="container">
      <!-- Header -->
      <div class="text-center mb-14">
        <p class="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-3">Categories</p>
        <h2 class="font-extrabold text-4xl text-gray-900 mb-3">Shop By Category</h2>
        <p class="text-gray-500">Discover products from our most popular collections.</p>
      </div>

      <!-- Scrollable Row -->
      <div class="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
        <RouterLink
          v-for="(cat, i) in categories"
          :key="cat.slug"
          :to="`/products?category=${cat.slug}`"
          class="group relative flex-none w-72 h-96 rounded-3xl overflow-hidden snap-start cursor-pointer"
        >
          <!-- Background Image -->
          <img
            :src="cat.image"
            :alt="cat.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <!-- Dark overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h3 class="text-white text-2xl font-black mb-3">{{ cat.name }}</h3>
            <span class="inline-block px-6 py-2 bg-white text-gray-900 text-sm font-bold rounded-full group-hover:bg-gray-100 transition-colors duration-200">
              Explore
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    slug: 'smartphones',
    name: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'
  },
  {
    slug: 'laptops',
    name: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80'
  },
  {
    slug: 'tops',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80'
  },
  {
    slug: 'furniture',
    name: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'
  },
  {
    slug: 'home-decoration',
    name: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'
  },
  {
    slug: 'skincare',
    name: 'Skincare',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  },
  {
    slug: 'groceries',
    name: 'Groceries',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80'
  },
]
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>