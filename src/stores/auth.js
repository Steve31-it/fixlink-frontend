import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      const { token: authToken, user: userData } = response.data
      
      token.value = authToken
      user.value = userData
      
      localStorage.setItem('token', authToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
      
      return response.data
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      const { token: authToken, user: newUser } = response.data
      
      token.value = authToken
      user.value = newUser
      
      localStorage.setItem('token', authToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
      
      return response.data
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (e) {
      // Ignore errors for logout
    }
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    window.location.href = '/login'
  }

  const fetchUser = async () => {
    try {
      if (!token.value) return
      
      const response = await api.get('/auth/me')
      user.value = response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      logout()
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData)
      user.value = response.data.user
      return response.data
    } catch (error) {
      throw error
    }
  }

  const changePassword = async (passwordData) => {
    try {
      const response = await api.put('/auth/change-password', passwordData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Initialize auth state
  const initAuth = async () => {
    if (token.value) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      await fetchUser()
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    changePassword,
    initAuth
  }
}) 