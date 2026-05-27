import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { UserApi } from '@/api/UserApi'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => user.value ? `${user.value.firstName} ${user.value.lastName}` : '')

  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const data = await UserApi.login(credentials)
      token.value = data.accessToken
      user.value = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        image: data.image,
        username: data.username
      }
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { user, token, loading, error, isLoggedIn, userName, login, logout }
})
