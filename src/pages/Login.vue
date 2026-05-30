<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300"
    :class="isDark
      ? 'bg-[#0e0e11]'
      : 'bg-gradient-to-br from-gray-100 via-gray-50 to-white'"
    style="font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;"
  >

    <!-- Ambient blobs — subtler in light mode -->
    <div
      class="absolute rounded-full filter blur-[80px] pointer-events-none w-[500px] h-[500px] -top-[120px] -left-[100px] animate-[drift_12s_ease-in-out_infinite_alternate] transition-opacity duration-300"
      :class="isDark
        ? 'bg-[radial-gradient(circle,rgba(255,200,80,0.12)_0%,transparent_70%)]'
        : 'bg-[radial-gradient(circle,rgba(245,200,66,0.18)_0%,transparent_70%)]'"
    ></div>
    <div
      class="absolute rounded-full filter blur-[80px] pointer-events-none w-[400px] h-[400px] -bottom-[80px] -right-[60px] animate-[drift_16s_ease-in-out_infinite_alternate-reverse] transition-opacity duration-300"
      :class="isDark
        ? 'bg-[radial-gradient(circle,rgba(80,120,255,0.10)_0%,transparent_70%)]'
        : 'bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)]'"
    ></div>

    <!-- Card -->
    <div
      class="w-full max-w-[440px] border rounded-[20px] flex overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.6)] animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both] z-10 mt-[65px] transition-all duration-300"
      :class="isDark
        ? 'bg-[#18181c] border-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.6)]'
        : 'bg-gray-100   border-gray-200/80 shadow-[0_8px_40px_rgba(0,0,0,0.10)]'"
    >

      <!-- Accent stripe -->
      <div class="w-1 shrink-0 bg-gradient-to-b from-[#f5c842] to-[#e88c2a]"></div>

      <div class="flex-1 p-9 flex flex-col gap-6">

        <!-- Brand -->
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 bg-gradient-to-br from-[#f5c842] to-[#e88c2a] rounded-[8px] grid place-items-center font-bold text-[1.1rem] text-[#0e0e11] tracking-[-0.5px]">E</div>
          <span
            class="text-[0.875rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-300"
            :class="isDark ? 'text-white/50' : 'text-gray-400'"
          >ETEC Store</span>
        </div>

        <!-- Heading -->
        <div class="flex flex-col gap-1">
          <h1
            class="text-[2.2rem] font-bold leading-[1.1] tracking-[-0.03em] m-0 transition-colors duration-300"
            :class="isDark ? 'text-[#f4f4f5]' : 'text-gray-900'"
          >
            Welcome <span class="not-italic text-[#f5c842]">back.</span>
          </h1>
          <p
            class="text-[13.5px] font-normal m-0 mt-0.5 transition-colors duration-300"
            :class="isDark ? 'text-white/35' : 'text-gray-400'"
          >Sign in to continue</p>
        </div>

        <!-- Demo hint -->
        <div
          class="flex items-center gap-2.5 rounded-xl p-3 text-[0.8rem] transition-colors duration-300"
          :class="isDark
            ? 'bg-[#f5c842]/[0.07] border border-[#f5c842]/15 text-white/55'
            : 'bg-amber-50       border border-amber-200/60  text-gray-500'"
        >
          <span class="bg-[#f5c842]/20 text-[#f5c842] text-[0.7rem] font-semibold tracking-[0.06em] uppercase px-1.5 py-0.5 rounded-[5px] shrink-0">Demo</span>
          <span>
            <code
              class="font-mono text-[0.78rem] px-1 py-0.5 rounded border transition-colors duration-300"
              :class="isDark ? 'text-white/75 bg-white/5 border-white/5' : 'text-gray-700 bg-gray-100 border-gray-200'"
            >emilys</code>
            &nbsp;/&nbsp;
            <code
              class="font-mono text-[0.78rem] px-1 py-0.5 rounded border transition-colors duration-300"
              :class="isDark ? 'text-white/75 bg-white/5 border-white/5' : 'text-gray-700 bg-gray-100 border-gray-200'"
            >emilyspass</code>
          </span>
        </div>

        <!-- Form -->
        <form class="flex flex-col gap-4" @submit.prevent="handleLogin">

          <div class="flex flex-col gap-1.5">
            <label
              class="text-[0.75rem] font-semibold tracking-[0.06em] uppercase transition-colors duration-300"
              :class="isDark ? 'text-white/45' : 'text-gray-400'"
            >Username</label>
            <input
              v-model="form.username"
              type="text"
              placeholder="emilys"
              class="w-full px-4 py-3 rounded-xl text-[0.925rem] outline-none transition-all duration-200"
              :class="isDark
                ? 'bg-white/[0.04] border border-white/[0.09] text-[#f4f4f5] placeholder:text-white/20 focus:border-[#f5c842] focus:bg-[#f5c842]/[0.05] focus:shadow-[0_0_0_3px_rgba(245,200,66,0.1)]'
                : 'bg-gray-200/80  border border-gray-300      text-gray-900   placeholder:text-gray-400  focus:border-[#f5c842] focus:bg-amber-50/60           focus:shadow-[0_0_0_3px_rgba(245,200,66,0.12)]'"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              class="text-[0.75rem] font-semibold tracking-[0.06em] uppercase transition-colors duration-300"
              :class="isDark ? 'text-white/45' : 'text-gray-400'"
            >Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-xl text-[0.925rem] outline-none transition-all duration-200"
              :class="isDark
                ? 'bg-white/[0.04] border border-white/[0.09] text-[#f4f4f5] placeholder:text-white/20 focus:border-[#f5c842] focus:bg-[#f5c842]/[0.05] focus:shadow-[0_0_0_3px_rgba(245,200,66,0.1)]'
                : 'bg-gray-200/80  border border-gray-300      text-gray-900   placeholder:text-gray-400  focus:border-[#f5c842] focus:bg-amber-50/60           focus:shadow-[0_0_0_3px_rgba(245,200,66,0.12)]'"
            />
          </div>

          <!-- Error -->
          <div
            v-if="authStore.error"
            class="flex items-center gap-2 rounded-xl p-3 text-[0.825rem]"
            :class="isDark
              ? 'bg-[#f85050]/[0.08] border border-[#f85050]/25 text-[#f87171]'
              : 'bg-red-50            border border-red-200      text-red-600'"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="shrink-0">
              <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 5v3.5M8 11h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            {{ authStore.error }}
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="group flex items-center justify-center gap-2.5 w-full p-3.5 bg-gradient-to-br from-[#f5c842] to-[#e88c2a] border-none rounded-xl text-[#0e0e11] font-bold text-[0.925rem] tracking-[0.01em] cursor-pointer transition-all duration-200 mt-1 relative overflow-hidden disabled:opacity-45 disabled:cursor-not-allowed hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_8px_24px_rgba(245,200,66,0.35)] active:not-disabled:translate-y-0"
            :disabled="authStore.loading"
          >
            <span>{{ authStore.loading ? 'Signing in…' : 'Sign In' }}</span>
            <svg class="shrink-0 transition-transform duration-200 group-hover:not-disabled:translate-x-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.5 9h11M10 5l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </form>

        <!-- Footer -->
        <p
          class="text-center text-[0.825rem] m-0 transition-colors duration-300"
          :class="isDark ? 'text-white/30' : 'text-gray-400'"
        >
          No account?
          <RouterLink to="/register" class="text-[#f5c842] font-semibold no-underline ml-1 transition-opacity hover:opacity-75">
            Create one →
          </RouterLink>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTheme } from '@/composables/useTheme'

const router    = useRouter()
const authStore = useAuthStore()
const form      = reactive({ username: '', password: '' })
const { isDark } = useTheme()

async function handleLogin() {
  const ok = await authStore.login(form)
  if (ok) { window.$toast?.success('Welcome back!'); router.push('/') }
}
</script>

<style scoped>
@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.08); }
}
@keyframes rise {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>