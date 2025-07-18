<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link
            to="/register"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            create a new account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input mt-1"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Enter your email"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input mt-1"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Enter your password"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <button
              type="button"
              @click="showForgotPassword = true"
              class="font-medium text-primary-600 hover:text-primary-500"
            >
              Forgot your password?
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full py-3 text-base font-medium"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>

      <!-- Forgot Password Modal -->
      <div
        v-if="showForgotPassword"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
        @click="showForgotPassword = false"
      >
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Reset Password</h3>
            <form @submit.prevent="handleForgotPassword">
              <div class="mb-4">
                <label for="reset-email" class="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="reset-email"
                  v-model="resetEmail"
                  type="email"
                  required
                  class="input mt-1"
                  placeholder="Enter your email"
                />
              </div>
              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="showForgotPassword = false"
                  class="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="resetLoading"
                  class="btn-primary"
                >
                  {{ resetLoading ? 'Sending...' : 'Send Reset Link' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const showForgotPassword = ref(false)
const resetEmail = ref('')
const resetLoading = ref(false)

const validateForm = () => {
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return !errors.email && !errors.password
}

const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    await authStore.login({
      email: form.email,
      password: form.password
    })

    toast.success('Welcome back!')
    router.push('/')
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed. Please try again.'
    toast.error(message)
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = async () => {
  if (!resetEmail.value) {
    toast.error('Please enter your email address')
    return
  }

  resetLoading.value = true

  try {
    await authStore.forgotPassword({ email: resetEmail.value })
    toast.success('Password reset link sent to your email')
    showForgotPassword.value = false
    resetEmail.value = ''
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to send reset link'
    toast.error(message)
  } finally {
    resetLoading.value = false
  }
}
</script> 