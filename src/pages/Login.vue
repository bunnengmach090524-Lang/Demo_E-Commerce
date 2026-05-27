<template>
  <div class="min-h-screen pt-[68px] bg-gradient-to-br from-gray-50 to-primary/5 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-strong p-8 animate-fade-up">
      <div class="text-center mb-8">
        <div class="w-14 h-14 bg-accent rounded-xl grid place-items-center font-display font-black text-2xl mx-auto mb-4">E</div>
        <h1 class="font-display font-extrabold text-2xl text-gray-900">Welcome back</h1>
        <p class="text-gray-500 text-sm mt-1">Sign in to your account</p>
      </div>

      <div class="bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-6 text-sm text-blue-700">
        <strong>Demo:</strong> username: <code>emilys</code> / password: <code>emilyspass</code>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
          <input
            v-model="form.username"
            type="text"
            placeholder="emilys"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors"
          />
        </div>

        <div v-if="authStore.error" class="text-red-500 text-sm text-center bg-red-50 py-2.5 rounded-xl">
          {{ authStore.error }}
        </div>

        <button
          type="submit"
          class="w-full py-3.5 bg-primary text-white font-display font-bold rounded-xl hover:bg-primary-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        Don't have an account?
        <RouterLink to="/register" class="text-primary font-semibold hover:underline">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = reactive({ username: '', password: '' })

async function handleLogin() {
  const ok = await authStore.login(form)
  if (ok) { window.$toast?.success('Welcome back!'); router.push('/') }
}
</script>
