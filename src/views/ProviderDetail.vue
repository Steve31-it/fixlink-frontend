<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="!provider" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Provider not found</h3>
      <p class="mt-1 text-sm text-gray-500">The provider you're looking for doesn't exist.</p>
      <div class="mt-6">
        <router-link to="/providers" class="btn-primary">
          Browse Providers
        </router-link>
      </div>
    </div>

    <div v-else class="space-y-8">
      <!-- Provider Header -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-start space-x-6">
            <img
              :src="provider.profileImage || '/default-avatar.png'"
              :alt="provider.firstName"
              class="w-24 h-24 rounded-full"
            />
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                {{ provider.firstName }} {{ provider.lastName }}
              </h1>
              <p class="text-lg text-gray-600 mb-4">{{ provider.specialization || 'Service Provider' }}</p>
              
              <div class="flex items-center space-x-6">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="ml-1 text-gray-600">
                    {{ provider.rating?.toFixed(1) || 'N/A' }} ({{ provider.totalReviews || 0 }} reviews)
                  </span>
                </div>
                <div class="text-gray-600">
                  {{ provider.experience || 0 }} years experience
                </div>
                <div class="text-gray-600">
                  {{ provider.serviceCount || 0 }} services
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Provider Information -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <!-- About -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-xl font-semibold text-gray-900">About</h2>
            </div>
            <div class="card-body">
              <p class="text-gray-700">
                {{ provider.bio || 'No bio available for this provider.' }}
              </p>
            </div>
          </div>

          <!-- Services -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-xl font-semibold text-gray-900">Services Offered</h2>
            </div>
            <div class="card-body">
              <div v-if="loadingServices" class="flex justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>

              <div v-else-if="services.length === 0" class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No services available</h3>
                <p class="mt-1 text-sm text-gray-500">This provider hasn't added any services yet.</p>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="service in services"
                  :key="service._id"
                  class="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">{{ service.name }}</h3>
                      <p class="text-sm text-gray-600">{{ service.category }}</p>
                    </div>
                    <div class="text-right">
                      <div class="text-lg font-bold text-primary-600">${{ service.price }}</div>
                      <div class="text-sm text-gray-500">per {{ service.priceType }}</div>
                    </div>
                  </div>
                  
                  <p class="text-gray-700 text-sm mb-3">{{ service.description }}</p>
                  
                  <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{{ service.estimatedDuration || 'N/A' }} hours</span>
                      <span>{{ service.serviceArea || 'N/A' }} miles</span>
                    </div>
                    <router-link
                      :to="`/services/${service._id}`"
                      class="btn-primary text-sm"
                    >
                      View Details
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Contact Information -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-lg font-semibold text-gray-900">Contact Information</h3>
            </div>
            <div class="card-body space-y-3">
              <div>
                <h4 class="font-medium text-gray-900">Email</h4>
                <p class="text-sm text-gray-600">{{ provider.email }}</p>
              </div>
              <div v-if="provider.phone">
                <h4 class="font-medium text-gray-900">Phone</h4>
                <p class="text-sm text-gray-600">{{ provider.phone }}</p>
              </div>
              <div v-if="provider.address">
                <h4 class="font-medium text-gray-900">Address</h4>
                <p class="text-sm text-gray-600">{{ provider.address }}</p>
              </div>
            </div>
          </div>

          <!-- Service Area -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-lg font-semibold text-gray-900">Service Area</h3>
            </div>
            <div class="card-body">
              <p class="text-gray-600">{{ provider.serviceArea || 'Not specified' }} miles radius</p>
            </div>
          </div>

          <!-- Member Since -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-lg font-semibold text-gray-900">Member Since</h3>
            </div>
            <div class="card-body">
              <p class="text-gray-600">
                {{ new Date(provider.createdAt).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '../services/api'

const route = useRoute()
const toast = useToast()

const provider = ref(null)
const services = ref([])
const loading = ref(true)
const loadingServices = ref(false)

const loadProvider = async () => {
  try {
    const providerId = route.params.id
    const response = await api.get(`/users/providers/${providerId}`)
    provider.value = response.data
  } catch (error) {
    console.error('Error loading provider:', error)
    toast.error('Failed to load provider details')
  } finally {
    loading.value = false
  }
}

const loadServices = async () => {
  loadingServices.value = true
  try {
    const providerId = route.params.id
    const response = await api.get(`/services`, {
      params: { provider: providerId, isActive: true }
    })
    services.value = response.data.services
  } catch (error) {
    console.error('Error loading services:', error)
    toast.error('Failed to load services')
  } finally {
    loadingServices.value = false
  }
}

onMounted(() => {
  loadProvider()
  loadServices()
})
</script> 