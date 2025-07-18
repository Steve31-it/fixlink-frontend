<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Service Providers</h1>
      <p class="text-gray-600">Find trusted professionals for your needs</p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div class="flex flex-wrap gap-4">
        <div>
          <label for="specialization" class="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
          <select
            id="specialization"
            v-model="filters.specialization"
            class="input"
            @change="loadProviders"
          >
            <option value="">All Specializations</option>
            <option value="cleaning">Cleaning</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="carpentry">Carpentry</option>
            <option value="landscaping">Landscaping</option>
            <option value="painting">Painting</option>
            <option value="moving">Moving</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            id="sort"
            v-model="filters.sort"
            class="input"
            @change="loadProviders"
          >
            <option value="rating">Rating</option>
            <option value="experience">Experience</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div class="flex items-end">
          <button
            @click="loadProviders"
            class="btn-primary"
            :disabled="loading"
          >
            {{ loading ? 'Loading...' : 'Refresh' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Providers List -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="providers.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No providers found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your filters or check back later.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="provider in providers"
        :key="provider._id"
        class="card hover:shadow-lg transition-shadow duration-300"
      >
        <div class="card-body">
          <div class="flex items-center mb-4">
            <img
              :src="provider.profileImage || '/default-avatar.png'"
              :alt="provider.firstName"
              class="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ provider.firstName }} {{ provider.lastName }}
              </h3>
              <p class="text-sm text-gray-600">{{ provider.specialization || 'Service Provider' }}</p>
            </div>
          </div>

          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Experience:</span>
              <span class="text-sm font-medium text-gray-900">{{ provider.experience || 0 }} years</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Rating:</span>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="ml-1 text-sm text-gray-900">
                  {{ provider.rating?.toFixed(1) || 'N/A' }} ({{ provider.totalReviews || 0 }})
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Services:</span>
              <span class="text-sm font-medium text-gray-900">{{ provider.serviceCount || 0 }}</span>
            </div>
          </div>

          <div class="flex space-x-2">
            <router-link
              :to="`/providers/${provider._id}`"
              class="btn-primary flex-1 text-center"
            >
              View Profile
            </router-link>
            <router-link
              :to="`/services?provider=${provider._id}`"
              class="btn-secondary flex-1 text-center"
            >
              View Services
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <span class="text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '../services/api'

const toast = useToast()

const providers = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)

const filters = reactive({
  specialization: '',
  sort: 'rating'
})

const loadProviders = async () => {
  loading.value = true
  
  try {
    const params = {
      page: currentPage.value,
      limit: 12,
      ...filters
    }

    // Remove empty filters
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key]
    })

    const response = await api.get('/users/providers', { params })
    providers.value = response.data.providers
    totalPages.value = response.data.totalPages
    currentPage.value = response.data.currentPage
  } catch (error) {
    console.error('Error loading providers:', error)
    toast.error('Failed to load providers')
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadProviders()
  }
}

onMounted(() => {
  loadProviders()
})
</script> 