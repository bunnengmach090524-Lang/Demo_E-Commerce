<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none">
      <TransitionGroup
        enter-active-class="transition duration-300"
        enter-from-class="opacity-0 translate-x-10"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 translate-x-10"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl shadow-strong text-sm font-medium pointer-events-auto min-w-[280px] border-l-4"
          :class="borderColor(toast.type)"
        >
          <span>{{ icons[toast.type] }}</span>
          <span class="flex-1 text-gray-800">{{ toast.message }}</span>
          <button
            class="text-gray-400 hover:text-gray-600 text-xs transition-colors"
            @click="remove(toast.id)"
          >✕</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])
const icons  = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' }

function borderColor(type) {
  return {
    success: 'border-emerald-500',
    error:   'border-red-500',
    info:    'border-primary',
    warning: 'border-yellow-500',
  }[type] || 'border-primary'
}

function add(message, type = 'success', duration = 3000) {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  if (duration > 0) setTimeout(() => remove(id), duration)
}
function remove(id) { toasts.value = toasts.value.filter(t => t.id !== id) }

window.$toast = {
  success: m => add(m, 'success'),
  error:   m => add(m, 'error'),
  info:    m => add(m, 'info'),
}
</script>
