<template>
  <div class="wishlist-page">
    <div class="wl-container">

      <!-- Header with animated count badge like cart drawer -->
      <div class="wl-header">
        <div class="wl-title-row">
          <h1 class="wl-title">My Wishlist</h1>
          <transition name="badge-pop">
            <span v-if="items.length" class="wl-count-badge" :key="items.length">
              {{ items.length }}
            </span>
          </transition>
        </div>
        <p v-if="items.length" class="wl-subtitle">
          {{ items.length }} saved {{ items.length === 1 ? 'item' : 'items' }} —
          <span class="wl-total">${{ total.toFixed(2) }} total</span>
        </p>
      </div>

      <!-- Empty state -->
      <div v-if="!items.length" class="wl-empty">
        <div class="wl-empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <h2 class="wl-empty-title">Your wishlist is empty</h2>
        <p class="wl-empty-sub">Save items you love and find them here anytime.</p>
        <RouterLink to="/products" class="wl-btn-primary">Browse Products</RouterLink>
      </div>

      <!-- Toolbar -->
      <div v-if="items.length" class="wl-toolbar">
        <div class="wl-sort-group">
          <button v-for="opt in sortOptions" :key="opt.value"
            class="wl-sort-pill" :class="{ active: sortMode === opt.value }"
            @click="sortMode = opt.value">{{ opt.label }}</button>
        </div>
        <button class="wl-clear-btn" @click="clearAll">Clear all</button>
      </div>

      <!-- Grid -->
      <TransitionGroup v-if="items.length" name="card-list" tag="div" class="wl-grid">
        <div v-for="item in sortedItems" :key="item.id" class="wl-card">
          <div class="wl-card-img">
            <img :src="item.thumbnail" :alt="item.title" />
            <button class="wl-remove" @click="removeItem(item.id)" :aria-label="`Remove ${item.title}`">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <span v-if="item.discountPercentage" class="wl-discount-tag">
              -{{ Math.round(item.discountPercentage) }}%
            </span>
          </div>
          <div class="wl-card-body">
            <p class="wl-card-category">{{ item.category || 'Product' }}</p>
            <h3 class="wl-card-name">{{ item.title }}</h3>
            <div class="wl-card-pricing">
              <span class="wl-card-price">${{ item.price?.toFixed(2) }}</span>
              <span v-if="item.rating" class="wl-card-rating">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {{ item.rating }}
              </span>
            </div>
            <div class="wl-card-actions">
              <button
                class="wl-btn-cart"
                :class="{ 'wl-btn-cart--added': addedItems.has(item.id) }"
                :disabled="addedItems.has(item.id)"
                @click="addToCart(item)"
              >
                <span v-if="addedItems.has(item.id)" class="wl-btn-cart-inner">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Added!
                </span>
                <span v-else class="wl-btn-cart-inner">Add to Cart</span>
              </button>
              <RouterLink :to="`/products/${item.id}`" class="wl-btn-view">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Bottom bar -->
      <div v-if="items.length" class="wl-bottom-bar">
        <div>
          <p class="wl-bottom-label">Wishlist total</p>
          <p class="wl-bottom-amount">${{ total.toFixed(2) }}</p>
        </div>
        <button class="wl-btn-primary" @click="addAllToCart">Add All to Cart &rarr;</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Use store items directly — reactive, synced with navbar badge
const items = computed(() => wishlistStore.items)

// Tracks which item ids are in "added" feedback state
const addedItems = ref(new Set())

const sortOptions = [
  { value: 'added',    label: 'Recent' },
  { value: 'price-lo', label: 'Price low' },
  { value: 'price-hi', label: 'Price high' },
  { value: 'rating',   label: 'Top rated' },
]
const sortMode = ref('added')

const sortedItems = computed(() => {
  const copy = [...items.value]
  if (sortMode.value === 'price-lo') copy.sort((a, b) => a.price - b.price)
  if (sortMode.value === 'price-hi') copy.sort((a, b) => b.price - a.price)
  if (sortMode.value === 'rating')   copy.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  return copy
})

const total = computed(() => items.value.reduce((s, i) => s + (i.price || 0), 0))

function removeItem(id) {
  wishlistStore.removeItem(id)
}

function clearAll() {
  addedItems.value = new Set()
  wishlistStore.clearWishlist()
}

function addToCart(item) {
  cartStore.addItem(item)

  // Show ✓ feedback on this button for 1.5s
  addedItems.value = new Set([...addedItems.value, item.id])
  setTimeout(() => {
    addedItems.value = new Set([...addedItems.value].filter(id => id !== item.id))
  }, 1500)
}

function addAllToCart() {
  items.value.forEach(addToCart)
}
</script>

<style scoped>
/* No font import — inherits the site font exactly like the navbar */

.wishlist-page {
  min-height: 100vh;
  padding: 100px 0 5rem;
  background: #f7f7f8;
}
.wl-container {
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.wl-header { margin-bottom: 2rem; }
.wl-title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 5px; }
.wl-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #111;
  letter-spacing: -.02em;
  line-height: 1;
}

/* Count badge — same dark pill as cart drawer */
.wl-count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  padding: 0 7px;
  background: #111;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
}

/* Bouncy pop like cart icon badge */
.badge-pop-enter-active { transition: transform .32s cubic-bezier(.34,1.56,.64,1), opacity .2s; }
.badge-pop-leave-active { transition: transform .18s ease, opacity .15s; }
.badge-pop-enter-from   { transform: scale(.4); opacity: 0; }
.badge-pop-leave-to     { transform: scale(.4); opacity: 0; }

.wl-subtitle { font-size: 13.5px; color: #999; font-weight: 400; }
.wl-total    { color: #111; font-weight: 700; }

/* Toolbar */
.wl-toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem; }
.wl-sort-group { display: flex; gap: 6px; flex-wrap: wrap; }
.wl-sort-pill {
  font-size: 12.5px; font-weight: 500; font-family: inherit;
  background: #fff; color: #555;
  border: 1px solid #e2e2e2; padding: 5px 14px; border-radius: 999px;
  cursor: pointer; transition: all .15s;
}
.wl-sort-pill:hover  { border-color: #aaa; color: #111; }
.wl-sort-pill.active { background: #111; color: #fff; border-color: #111; }
.wl-clear-btn {
  font-family: inherit; font-size: 12.5px; font-weight: 500;
  background: none; color: #bbb; border: none; cursor: pointer; transition: color .15s;
}
.wl-clear-btn:hover { color: #e53535; }

/* Grid */
.wl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.1rem;
  position: relative;
}
.card-list-enter-active { transition: all .28s ease; }
.card-list-leave-active { transition: all .22s ease; }
.card-list-enter-from   { opacity: 0; transform: scale(.95) translateY(6px); }
.card-list-leave-to     { opacity: 0; transform: scale(.95); }
.card-list-move         { transition: transform .3s ease; }

/* Card */
.wl-card {
  background: #fff; border: 1px solid #eaeaea; border-radius: 16px;
  overflow: hidden; display: flex; flex-direction: column;
  transition: box-shadow .2s, transform .2s;
}
.wl-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,.09); transform: translateY(-3px); }

.wl-card-img {
  position: relative; background: #f5f5f7; height: 175px;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.wl-card-img img {
  width: 72%; height: 72%; object-fit: contain;
  transition: transform .3s ease;
}
.wl-card:hover .wl-card-img img { transform: scale(1.07); }

.wl-remove {
  position: absolute; top: 9px; right: 9px;
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(255,255,255,.93); border: 1px solid #e0e0e0;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #888; opacity: 0;
  transition: opacity .15s, background .15s, color .15s;
}
.wl-card:hover .wl-remove { opacity: 1; }
.wl-remove:hover { background: #111; color: #fff; border-color: #111; }

.wl-discount-tag {
  position: absolute; top: 9px; left: 9px;
  font-size: 10px; font-weight: 700; letter-spacing: .03em;
  background: #111; color: #fff; padding: 3px 8px; border-radius: 6px;
}

.wl-card-body {
  padding: .9rem 1rem 1.05rem;
  display: flex; flex-direction: column; gap: 3px; flex: 1;
}
.wl-card-category {
  font-size: 10px; font-weight: 700; letter-spacing: .09em;
  text-transform: uppercase; color: #bbb;
}
.wl-card-name {
  font-size: .875rem; font-weight: 700; color: #111; line-height: 1.35;
  margin-bottom: 4px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.wl-card-pricing { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.wl-card-price { font-size: 1rem; font-weight: 800; color: #111; letter-spacing: -.01em; }
.wl-card-rating { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; color: #999; }
.wl-card-rating svg { color: #f5a623; }
.wl-card-actions { display: flex; gap: 6px; margin-top: auto; }

.wl-btn-cart {
  flex: 1; font-family: inherit; font-size: 12.5px; font-weight: 700;
  background: #111; color: #fff; border: none; padding: 9px 12px;
  border-radius: 9px; cursor: pointer; transition: background .15s;
}
.wl-btn-cart:hover:not(:disabled) { background: #333; }
.wl-btn-cart--added {
  background: #1a7a4a !important;
  cursor: default;
}
.wl-btn-cart-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.wl-btn-view {
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  border: 1px solid #e0e0e0; border-radius: 9px; color: #aaa;
  text-decoration: none; flex-shrink: 0; transition: all .15s;
}
.wl-btn-view:hover { border-color: #111; color: #111; background: #f5f5f7; }

/* Bottom bar */
.wl-bottom-bar {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 2rem; padding: 1.1rem 1.4rem;
  background: #fff; border: 1px solid #eaeaea; border-radius: 14px;
}
.wl-bottom-label { font-size: 11px; font-weight: 600; color: #bbb; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 2px; }
.wl-bottom-amount { font-size: 1.4rem; font-weight: 800; color: #111; letter-spacing: -.02em; }

/* Primary button */
.wl-btn-primary {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: inherit; font-size: 13.5px; font-weight: 700;
  background: #111; color: #fff; border: none;
  padding: 11px 24px; border-radius: 10px; cursor: pointer;
  text-decoration: none; transition: background .15s;
}
.wl-btn-primary:hover { background: #333; }

/* Empty state */
.wl-empty {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 5rem 2rem;
  background: #fff; border: 1px solid #eaeaea; border-radius: 20px;
}
.wl-empty-icon {
  width: 72px; height: 72px; border-radius: 50%; background: #f5f5f7;
  display: flex; align-items: center; justify-content: center;
  color: #ccc; margin-bottom: 1.25rem;
}
.wl-empty-title { font-size: 1.25rem; font-weight: 800; color: #111; letter-spacing: -.02em; margin-bottom: .4rem; }
.wl-empty-sub   { font-size: 14px; color: #999; margin-bottom: 1.5rem; max-width: 260px; }
</style>