<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link
            to="/login"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            sign in to your existing account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              I want to
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="form.role = 'customer'"
                :class="[
                  'p-4 border-2 rounded-lg text-center transition-colors duration-200',
                  form.role === 'customer'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                ]"
              >
                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <div class="font-medium">Hire Services</div>
                <div class="text-sm opacity-75">Find professionals</div>
              </button>
              
              <button
                type="button"
                @click="form.role = 'provider'"
                :class="[
                  'p-4 border-2 rounded-lg text-center transition-colors duration-200',
                  form.role === 'provider'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                ]"
              >
                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                </svg>
                <div class="font-medium">Provide Services</div>
                <div class="text-sm opacity-75">Offer your skills</div>
              </button>
            </div>
          </div>

          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="input mt-1"
                :class="{ 'border-red-500': errors.firstName }"
                placeholder="First name"
              />
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
                {{ errors.firstName }}
              </p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="input mt-1"
                :class="{ 'border-red-500': errors.lastName }"
                placeholder="Last name"
              />
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
                {{ errors.lastName }}
              </p>
            </div>
          </div>

          <!-- Email -->
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

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="input mt-1"
              :class="{ 'border-red-500': errors.phone }"
              placeholder="Enter your phone number"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
              {{ errors.phone }}
            </p>
          </div>

          <!-- Password -->
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
              placeholder="Create a password"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="input mt-1"
              :class="{ 'border-red-500': errors.confirmPassword }"
              placeholder="Confirm your password"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Terms -->
          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.agreeToTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <a href="#" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
              and
              <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
            </label>
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
              Creating account...
            </span>
            <span v-else>Create account</span>
          </button>
        </div>
      </form>
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
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'customer',
  agreeToTerms: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required'
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required'
  }

  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
  }

  if (form.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/\s/g, ''))) {
    errors.phone = 'Phone number is invalid'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  if (!form.agreeToTerms) {
    toast.error('Please agree to the terms and conditions')
    return false
  }

  return !Object.values(errors).some(error => error)
}

const handleRegister = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    await authStore.register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: form.role
    })

    toast.success('Account created successfully!')
    
    // Redirect based on role
    if (form.role === 'provider') {
      router.push('/my-services/new')
    } else {
      router.push('/services')
    }
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed. Please try again.'
    toast.error(message)
  } finally {
    loading.value = false
  }
}
</script> 