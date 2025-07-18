<!-- src/views/ServiceDetail.vue -->
<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Service Details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Header -->
        <div class="card">
          <div class="card-body">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ service.name }}</h1>
                <p class="text-lg text-gray-600">{{ service.category }}</p>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-primary-600">${{ service.price }}</div>
                <div class="text-sm text-gray-500">per {{ service.priceType }}</div>
              </div>
            </div>

            <div class="flex items-center space-x-4 mb-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="ml-1 text-sm text-gray-600">
                  {{ service.rating.toFixed(1) }} ({{ service.totalReviews }} reviews)
                </span>
              </div>
              <span :class="service.isActive ? 'badge-success' : 'badge-danger'">
                {{ service.isActive ? 'Available' : 'Unavailable' }}
              </span>
            </div>

            <p class="text-gray-700 text-lg">{{ service.description }}</p>
          </div>
        </div>

        <!-- Provider Information -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">About the Provider</h2>
          </div>
          <div class="card-body">
            <div class="flex items-center mb-4">
              <img
                :src="service.provider.profileImage || '/default-avatar.png'"
                :alt="service.provider.firstName"
                class="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ service.provider.firstName }} {{ service.provider.lastName }}
                </h3>
                <p class="text-gray-600">{{ service.provider.specialization || 'Service Provider' }}</p>
                <p class="text-sm text-gray-500">
                  {{ service.provider.experience || 0 }} years of experience
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Contact Information</h4>
                <p class="text-sm text-gray-600">{{ service.provider.email }}</p>
                <p class="text-sm text-gray-600">{{ service.provider.phone }}</p>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Service Area</h4>
                <p class="text-sm text-gray-600">{{ service.serviceArea || 'Not specified' }} miles</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Details -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Service Details</h2>
          </div>
          <div class="card-body">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Duration</h4>
                <p class="text-gray-600">{{ service.estimatedDuration || 'Not specified' }} hours</p>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Availability</h4>
                <p class="text-gray-600">
                  {{ service.availability?.from || 'Not specified' }} - {{ service.availability?.to || 'Not specified' }}
                </p>
              </div>
              <div v-if="service.availability?.days?.length">
                <h4 class="font-medium text-gray-900 mb-2">Available Days</h4>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="day in service.availability.days"
                    :key="day"
                    class="badge-info text-xs capitalize"
                  >
                    {{ day }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Card -->
      <div class="lg:col-span-1">
        <div class="card sticky top-8">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Book This Service</h2>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-700">Price per {{ service.priceType }}:</span>
                <span class="font-semibold text-gray-900">${{ service.price }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-gray-700">Estimated duration:</span>
                <span class="text-gray-900">{{ service.estimatedDuration || 'Not specified' }} hours</span>
              </div>

              <div class="border-t pt-4">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-lg font-medium text-gray-900">Total (estimated):</span>
                  <span class="text-2xl font-bold text-primary-600">${{ estimatedTotal }}</span>
                </div>

                <button
                  v-if="authStore.isAuthenticated && authStore.user?.role === 'customer'"
                  @click="bookService"
                  :disabled="!service.isActive"
                  class="btn-primary w-full py-3 text-lg font-medium"
                >
                  Book Now
                </button>

                <div v-else-if="!authStore.isAuthenticated" class="space-y-3">
                  <p class="text-sm text-gray-600 text-center">Please log in to book this service</p>
                  <router-link to="/login" class="btn-primary w-full">
                    Login to Book
                  </router-link>
                </div>

                <div v-else class="text-center">
                  <p class="text-sm text-gray-600">Only customers can book services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const service = ref(null)
const loading = ref(true)

const estimatedTotal = computed(() => {
  if (!service.value || !service.value.price || !service.value.estimatedDuration) {
    return service.value?.price || 0
  }
  return (service.value.price * service.value.estimatedDuration).toFixed(2)
})

const loadService = async () => {
  try {
    const serviceId = route.params.id
    const response = await api.get(`/services/${serviceId}`)
    service.value = response.data
  } catch (error) {
    console.error('Error loading service:', error)
    toast.error('Failed to load service details')
  } finally {
    loading.value = false
  }
}

const bookService = () => {
  router.push({
    path: '/bookings/new',
    query: { serviceId: service.value._id }
  })
}

onMounted(() => {
  loadService()
})
</script>
