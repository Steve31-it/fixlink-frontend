<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Find Professional Services</h1>
      <p class="text-gray-600">Discover skilled professionals for all your needs</p>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="md:col-span-2">
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            id="search"
            v-model="filters.search"
            type="text"
            placeholder="Search services..."
            class="input"
            @input="debounceSearch"
          />
        </div>

        <!-- Category Filter -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            v-model="filters.category"
            class="input"
            @change="debounceSearch"
          >
            <option value="">All Categories</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="cleaning">Cleaning</option>
            <option value="gardening">Gardening</option>
            <option value="painting">Painting</option>
            <option value="carpentry">Carpentry</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Price Range -->
        <div>
          <label for="priceRange" class="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select
            id="priceRange"
            v-model="filters.priceRange"
            class="input"
            @change="debounceSearch"
          >
            <option value="">Any Price</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">$200+</option>
          </select>
        </div>
      </div>

      <!-- Additional Filters -->
      <div class="mt-4 flex flex-wrap gap-4">
        <div class="flex items-center">
          <input
            id="rating"
            v-model="filters.minRating"
            type="number"
            min="1"
            max="5"
            step="0.5"
            class="w-20 input mr-2"
            placeholder="4.0"
            @input="debounceSearch"
          />
          <label for="rating" class="text-sm text-gray-700">+ Rating</label>
        </div>

        <div class="flex items-center">
          <input
            id="location"
            v-model="filters.location"
            type="text"
            placeholder="Enter location or use GPS"
            class="input mr-2"
            @input="debounceSearch"
          />
          <button
            @click="getCurrentLocation"
            class="btn-secondary"
            :disabled="locationLoading"
            title="Use current location"
          >
            <svg v-if="locationLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Services Grid -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="services.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No services found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="service in services"
        :key="service._id"
        class="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        @click="viewService(service._id)"
      >
        <!-- Service Image -->
        <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-t-lg">
          <img
            v-if="service.images && service.images.length > 0"
            :src="service.images[0]"
            :alt="service.name"
            class="w-full h-48 object-cover rounded-t-lg"
          />
          <img v-else :src="categoryImages[service.category] || categoryImages.other" :alt="service.name" class="w-full h-48 object-cover rounded-t-lg" />
        </div>

        <!-- Service Info -->
        <div class="card-body">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-gray-900">{{ service.name }}</h3>
            <span class="badge-info">{{ service.category }}</span>
          </div>

          <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ service.description }}</p>

          <!-- Provider Info -->
          <div class="flex items-center mb-4">
            <div v-if="service.provider.profileImage" class="w-8 h-8 rounded-full mr-3 overflow-hidden">
              <img
                :src="service.provider.profileImage"
                :alt="service.provider.firstName"
                class="w-full h-full object-cover"
              />
            </div>
            <div v-else class="w-8 h-8 rounded-full mr-3 bg-gray-100 flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">
                {{ service.provider.firstName }} {{ service.provider.lastName }}
              </p>
              <div class="flex items-center">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="text-sm text-gray-600 ml-1">
                    {{ service.rating.toFixed(1) }} ({{ service.totalReviews }})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Price and Action -->
          <div class="flex justify-between items-center">
            <div>
              <span class="text-2xl font-bold text-primary-600">${{ service.price }}</span>
              <span class="text-sm text-gray-500">/{{ service.priceType }}</span>
            </div>
            <button
              @click.stop="bookService(service)"
              class="btn-primary"
            >
              Book Now
            </button>
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
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '../services/api'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const services = ref([])
const loading = ref(false)
const locationLoading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)

const filters = reactive({
  search: '',
  category: '',
  priceRange: '',
  minRating: '',
  location: ''
})

let searchTimeout = null

const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    loadServices()
  }, 500)
}

const loadServices = async () => {
  loading.value = true
  
  try {
    const params = {
      page: currentPage.value,
      limit: 12
    }

    // Map frontend filters to backend parameters
    if (filters.search) params.search = filters.search
    if (filters.category) params.category = filters.category
    
    // Handle price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-')
      if (min) params.minPrice = min
      if (max && max !== '+') params.maxPrice = max
      // For $200+, we only set minPrice
    }
    
    // Handle rating
    if (filters.minRating) params.rating = filters.minRating
    
    // Handle location
    if (filters.location) params.location = filters.location

    const response = await api.get('/services', { params })
    services.value = response.data.services
    totalPages.value = response.data.totalPages
    currentPage.value = response.data.currentPage
  } catch (error) {
    console.error('Error loading services:', error)
    toast.error('Failed to load services')
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadServices()
  }
}

const viewService = (serviceId) => {
  router.push(`/services/${serviceId}`)
}

const bookService = (service) => {
  if (!localStorage.getItem('token')) {
    toast.error('Please log in to book services')
    router.push('/login')
    return
  }
  router.push(`/bookings/new?serviceId=${service._id}`)
}

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    toast.error('Geolocation is not supported by this browser')
    return
  }

  locationLoading.value = true
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      filters.location = `${longitude},${latitude}`
      loadServices()
      locationLoading.value = false
    },
    (error) => {
      console.error('Error getting location:', error)
      toast.error('Failed to get your location')
      locationLoading.value = false
    }
  )
}

// Watch for filter changes - removed since we're using debounced search for all filters

// Watch for route query changes (for search from navbar)
watch(() => route.query.search, (newSearch) => {
  if (newSearch && newSearch !== filters.search) {
    filters.search = newSearch
  }
}, { immediate: true })

onMounted(() => {
  // Check if there's a search query in the URL
  if (route.query.search) {
    filters.search = route.query.search
  }
  loadServices()
})

const categoryImages = {
  cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
  plumbing: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
  electrical: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
  gardening: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
  painting: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
  carpentry: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
  moving: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
  other: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 