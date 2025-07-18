<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
      <p class="text-gray-600">Manage your service bookings</p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div class="flex flex-wrap gap-4">
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            v-model="filters.status"
            class="input"
            @change="loadBookings"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div class="flex items-end">
          <button
            @click="loadBookings"
            class="btn-primary"
            :disabled="loading"
          >
            {{ loading ? 'Loading...' : 'Refresh' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Bookings List -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="bookings.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ authStore.user?.role === 'customer' ? 'Start by booking a service.' : 'No bookings have been made yet.' }}
      </p>
      <div class="mt-6">
        <router-link
          v-if="authStore.user?.role === 'customer'"
          to="/services"
          class="btn-primary"
        >
          Browse Services
        </router-link>
      </div>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="booking in bookings"
        :key="booking._id"
        class="card hover:shadow-md transition-shadow duration-200"
      >
        <div class="card-body">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ booking.service.name }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ booking.service.category }} • {{ booking.service.description }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="getStatusBadgeClass(booking.status)">
                {{ booking.status }}
              </span>
              <button
                @click="viewBooking(booking._id)"
                class="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p class="text-sm font-medium text-gray-700">Provider</p>
              <p class="text-sm text-gray-900">
                {{ booking.provider.firstName }} {{ booking.provider.lastName }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700">Date & Time</p>
              <p class="text-sm text-gray-900">
                {{ formatDate(booking.scheduledDate) }} at {{ booking.scheduledTime }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700">Total Amount</p>
              <p class="text-lg font-semibold text-primary-600">${{ booking.totalAmount }}</p>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-600">
              <p>Duration: {{ booking.duration }} hours</p>
              <p>Location: {{ booking.location.address }}</p>
            </div>
            
            <div class="flex space-x-2">
              <button
                v-if="canCancelBooking(booking)"
                @click="cancelBooking(booking._id)"
                class="btn-danger text-sm"
              >
                Cancel
              </button>
              
              <button
                v-if="canUpdateStatus(booking)"
                @click="updateBookingStatus(booking._id)"
                class="btn-primary text-sm"
              >
                {{ getActionButtonText(booking.status) }}
              </button>
            </div>
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'
import api from '../services/api'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const bookings = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)

const filters = reactive({
  status: ''
})

const loadBookings = async () => {
  loading.value = true
  
  try {
    const params = {
      page: currentPage.value,
      limit: 10,
      ...filters
    }

    // Remove empty filters
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key]
    })

    const response = await api.get('/bookings', { params })
    bookings.value = response.data.bookings
    totalPages.value = response.data.totalPages
    currentPage.value = response.data.currentPage
  } catch (error) {
    console.error('Error loading bookings:', error)
    toast.error('Failed to load bookings')
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadBookings()
  }
}

const viewBooking = (bookingId) => {
  router.push(`/bookings/${bookingId}`)
}

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'badge-warning',
    confirmed: 'badge-info',
    'in-progress': 'badge-info',
    completed: 'badge-success',
    cancelled: 'badge-danger',
    rejected: 'badge-danger'
  }
  return `badge ${classes[status] || 'badge-info'}`
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const canCancelBooking = (booking) => {
  if (authStore.user?.role === 'admin') return true
  
  const isCustomer = authStore.user?.role === 'customer'
  const isProvider = authStore.user?.role === 'provider'
  
  if (isCustomer) {
    return booking.status === 'pending' || booking.status === 'confirmed'
  }
  
  if (isProvider) {
    return booking.status === 'pending'
  }
  
  return false
}

const canUpdateStatus = (booking) => {
  if (authStore.user?.role === 'admin') return true
  
  const isProvider = authStore.user?.role === 'provider'
  
  if (isProvider) {
    return ['pending', 'confirmed', 'in-progress'].includes(booking.status)
  }
  
  return false
}

const getActionButtonText = (status) => {
  const actions = {
    pending: 'Confirm',
    confirmed: 'Start Work',
    'in-progress': 'Complete'
  }
  return actions[status] || 'Update'
}

const cancelBooking = async (bookingId) => {
  try {
    await api.put(`/bookings/${bookingId}/status`, {
      status: 'cancelled',
      cancellationReason: 'Cancelled by user'
    })
    
    toast.success('Booking cancelled successfully')
    loadBookings()
  } catch (error) {
    console.error('Error cancelling booking:', error)
    toast.error('Failed to cancel booking')
  }
}

const updateBookingStatus = async (bookingId) => {
  // This would typically open a modal or navigate to a status update page
  router.push(`/bookings/${bookingId}`)
}

onMounted(() => {
  loadBookings()
})
</script> 