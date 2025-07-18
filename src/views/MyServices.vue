<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">My Services</h1>
        <p class="text-gray-600">Manage your service offerings</p>
      </div>
      <router-link to="/my-services/new" class="btn-primary">
        Add New Service
      </router-link>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="services.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No services yet</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating your first service.</p>
      <div class="mt-6">
        <router-link to="/my-services/new" class="btn-primary">
          Create Service
        </router-link>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="service in services"
        :key="service._id"
        class="card hover:shadow-lg transition-shadow duration-300"
      >
        <div class="card-body">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ service.name }}</h3>
            <span class="badge-info">{{ service.category }}</span>
          </div>
          
          <p class="text-gray-600 text-sm mb-4">{{ service.description }}</p>
          
          <div class="flex justify-between items-center mb-4">
            <div>
              <span class="text-2xl font-bold text-primary-600">${{ service.price }}</span>
              <span class="text-sm text-gray-500">/{{ service.priceType }}</span>
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span class="text-sm text-gray-600 ml-1">
                {{ service.rating.toFixed(1) }} ({{ service.totalReviews }})
              </span>
            </div>
          </div>
          
          <div class="flex justify-between items-center">
            <span :class="service.isActive ? 'badge-success' : 'badge-danger'">
              {{ service.isActive ? 'Active' : 'Inactive' }}
            </span>
            
            <div class="flex space-x-2">
              <router-link
                :to="`/my-services/${service._id}/edit`"
                class="btn-secondary text-sm"
              >
                Edit
              </router-link>
              <button
                @click="toggleServiceStatus(service)"
                :class="service.isActive ? 'btn-danger' : 'btn-success'"
                class="text-sm"
              >
                {{ service.isActive ? 'Deactivate' : 'Activate' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '../services/api'

const toast = useToast()
const services = ref([])
const loading = ref(true)

const loadServices = async () => {
  try {
    const response = await api.get('/services/my-services')
    services.value = response.data
  } catch (error) {
    console.error('Error loading services:', error)
    toast.error('Failed to load services')
  } finally {
    loading.value = false
  }
}

const toggleServiceStatus = async (service) => {
  try {
    await api.put(`/services/${service._id}/status`, {
      isActive: !service.isActive
    })
    
    service.isActive = !service.isActive
    toast.success(`Service ${service.isActive ? 'activated' : 'deactivated'} successfully`)
  } catch (error) {
    console.error('Error updating service status:', error)
    toast.error('Failed to update service status')
  }
}

onMounted(() => {
  loadServices()
})
</script> 