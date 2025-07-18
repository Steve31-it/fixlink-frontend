<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Book a Service</h1>
      <p class="text-gray-600">Schedule your service appointment</p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="!service" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Service not found</h3>
      <p class="mt-1 text-sm text-gray-500">The service you're looking for doesn't exist.</p>
      <div class="mt-6">
        <router-link to="/services" class="btn-primary">
          Browse Services
        </router-link>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Service Details -->
      <div class="card">
        <div class="card-header">
          <h2 class="text-xl font-semibold text-gray-900">Service Details</h2>
        </div>
        <div class="card-body">
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900">{{ service.name }}</h3>
              <p class="text-sm text-gray-600">{{ service.category }}</p>
            </div>
            
            <div>
              <p class="text-gray-700">{{ service.description }}</p>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="text-2xl font-bold text-primary-600">${{ service.price }}</p>
                <p class="text-sm text-gray-500">per {{ service.priceType }}</p>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="ml-1 text-sm text-gray-600">
                  {{ service.rating.toFixed(1) }} ({{ service.totalReviews }} reviews)
                </span>
              </div>
            </div>

            <div class="border-t pt-4">
              <h4 class="font-medium text-gray-900 mb-2">Provider</h4>
              <div class="flex items-center">
                <img
                  :src="service.provider.profileImage || '/default-avatar.png'"
                  :alt="service.provider.firstName"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p class="font-medium text-gray-900">
                    {{ service.provider.firstName }} {{ service.provider.lastName }}
                  </p>
                  <p class="text-sm text-gray-600">{{ service.provider.phone }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Form -->
      <div class="card">
        <div class="card-header">
          <h2 class="text-xl font-semibold text-gray-900">Booking Details</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="createBooking" class="space-y-6">
            <!-- Date and Time -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="date" class="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  id="date"
                  v-model="form.scheduledDate"
                  type="date"
                  required
                  :min="minDate"
                  class="input"
                  :class="{ 'border-red-500': errors.scheduledDate }"
                />
                <p v-if="errors.scheduledDate" class="mt-1 text-sm text-red-600">
                  {{ errors.scheduledDate }}
                </p>
              </div>

              <div>
                <label for="time" class="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <input
                  id="time"
                  v-model="form.scheduledTime"
                  type="time"
                  required
                  class="input"
                  :class="{ 'border-red-500': errors.scheduledTime }"
                />
                <p v-if="errors.scheduledTime" class="mt-1 text-sm text-red-600">
                  {{ errors.scheduledTime }}
                </p>
              </div>
            </div>

            <!-- Duration -->
            <div>
              <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">
                Duration (hours) *
              </label>
              <input
                id="duration"
                v-model.number="form.duration"
                type="number"
                min="0.5"
                max="24"
                step="0.5"
                required
                class="input"
                :class="{ 'border-red-500': errors.duration }"
              />
              <p v-if="errors.duration" class="mt-1 text-sm text-red-600">
                {{ errors.duration }}
              </p>
            </div>

            <!-- Location -->
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1">
                Service Address *
              </label>
              <input
                id="address"
                v-model="form.location.address"
                type="text"
                required
                class="input"
                :class="{ 'border-red-500': errors.address }"
                placeholder="Enter your address"
              />
              <p v-if="errors.address" class="mt-1 text-sm text-red-600">
                {{ errors.address }}
              </p>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                class="input"
                placeholder="Describe what you need..."
              ></textarea>
            </div>

            <!-- Special Instructions -->
            <div>
              <label for="specialInstructions" class="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions
              </label>
              <textarea
                id="specialInstructions"
                v-model="form.specialInstructions"
                rows="2"
                class="input"
                placeholder="Any special requirements or instructions..."
              ></textarea>
            </div>

            <!-- Total Amount -->
            <div class="border-t pt-4">
              <div class="flex justify-between items-center">
                <span class="text-lg font-medium text-gray-900">Total Amount:</span>
                <span class="text-2xl font-bold text-primary-600">
                  ${{ totalAmount }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mt-1">
                {{ form.duration || 0 }} hours × ${{ service.price }}/{{ service.priceType }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="submitting"
              class="btn-primary w-full py-3 text-lg font-medium"
            >
              <span v-if="submitting" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Booking...
              </span>
              <span v-else>Book Service</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const service = ref(null)
const loading = ref(true)
const submitting = ref(false)

const form = reactive({
  scheduledDate: '',
  scheduledTime: '',
  duration: 1,
  location: {
    address: '',
    coordinates: [0, 0]
  },
  description: '',
  specialInstructions: ''
})

const errors = reactive({
  scheduledDate: '',
  scheduledTime: '',
  duration: '',
  address: ''
})

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const totalAmount = computed(() => {
  if (!service.value || !form.duration) return 0
  return (service.value.price * form.duration).toFixed(2)
})

const loadService = async () => {
  try {
    const serviceId = route.query.serviceId
    if (!serviceId) {
      toast.error('No service selected')
      router.push('/services')
      return
    }

    const response = await api.get(`/services/${serviceId}`)
    service.value = response.data
  } catch (error) {
    console.error('Error loading service:', error)
    toast.error('Failed to load service details')
    router.push('/services')
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.scheduledDate) {
    errors.scheduledDate = 'Date is required'
  } else {
    const selectedDate = new Date(form.scheduledDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      errors.scheduledDate = 'Date must be in the future'
    }
  }

  if (!form.scheduledTime) {
    errors.scheduledTime = 'Time is required'
  }

  if (!form.duration || form.duration < 0.5) {
    errors.duration = 'Duration must be at least 0.5 hours'
  }

  if (!form.location.address.trim()) {
    errors.address = 'Address is required'
  }

  return !Object.values(errors).some(error => error)
}

const createBooking = async () => {
  if (!validateForm()) return

  submitting.value = true

  try {
    const bookingData = {
      serviceId: service.value._id,
      scheduledDate: form.scheduledDate,
      scheduledTime: form.scheduledTime,
      duration: form.duration,
      location: form.location,
      description: form.description,
      specialInstructions: form.specialInstructions
    }

    const response = await api.post('/bookings', bookingData)
    
    toast.success('Booking created successfully!')
    router.push(`/bookings/${response.data.booking._id}`)
  } catch (error) {
    console.error('Error creating booking:', error)
    const message = error.response?.data?.message || 'Failed to create booking'
    toast.error(message)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadService()
})
</script> 