<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img src="/src/images/FixLink Logo.png" alt="FixLink Admin" class="h-8 w-auto" />
            </div>
            <div class="ml-4">
              <h1 class="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">Welcome, {{ authStore.user?.firstName }}</span>
            <router-link to="/" class="text-sm text-blue-600 hover:text-blue-800">← Back to Site</router-link>
            <button @click="logout" class="text-sm text-red-600 hover:text-red-800">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex pt-16">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 min-h-screen fixed left-0 top-16">
        <nav class="mt-8">
          <div class="px-4 space-y-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="tab.id === 'users'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                <path v-if="tab.id === 'services'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                <path v-if="tab.id === 'bookings'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              {{ tab.name }}
            </button>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 ml-64 p-8">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Users</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
                <p class="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Active Services</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalServices }}</p>
                <p class="text-xs text-green-600">+8% from last month</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalBookings }}</p>
                <p class="text-xs text-green-600">+15% from last month</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Revenue</p>
                <p class="text-2xl font-bold text-gray-900">${{ stats.totalRevenue }}</p>
                <p class="text-xs text-green-600">+22% from last month</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Area -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <!-- Tab Content -->
          <div class="p-6">
            <!-- Users Tab -->
            <div v-if="activeTab === 'users'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-900">User Management</h3>
                <div class="flex space-x-3">
                  <select v-model="userFilters.role" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Roles</option>
                    <option value="customer">Customer</option>
                    <option value="provider">Provider</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button @click="loadUsers" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Refresh</button>
                </div>
              </div>

              <div v-if="loadingUsers" class="flex justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>

              <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10">
                            <div v-if="user.profileImage" class="h-10 w-10 rounded-full overflow-hidden">
                              <img class="h-full w-full object-cover" :src="user.profileImage" :alt="user.firstName" />
                            </div>
                            <div v-else class="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              </svg>
                            </div>
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                              {{ user.firstName }} {{ user.lastName }}
                            </div>
                            <div class="text-sm text-gray-500">{{ user.email }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="{
                          'bg-blue-100 text-blue-800': user.role === 'customer',
                          'bg-green-100 text-green-800': user.role === 'provider',
                          'bg-purple-100 text-purple-800': user.role === 'admin'
                        }">
                          {{ user.role }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                          {{ user.isActive ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ new Date(user.createdAt).toLocaleDateString() }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          @click="toggleUserStatus(user)"
                          :class="user.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
                          class="px-3 py-1 text-white rounded-lg text-xs transition-colors"
                        >
                          {{ user.isActive ? 'Deactivate' : 'Activate' }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Services Tab -->
            <div v-if="activeTab === 'services'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-900">Service Management</h3>
                <button @click="loadServices" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Refresh</button>
              </div>

              <div v-if="loadingServices" class="flex justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="service in services" :key="service._id" class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div class="flex justify-between items-start mb-3">
                    <h4 class="font-semibold text-gray-900">{{ service.name }}</h4>
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ service.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ service.description }}</p>
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-blue-600">${{ service.price }}</span>
                    <button
                      @click="toggleServiceStatus(service)"
                      :class="service.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
                      class="px-3 py-1 text-white rounded-lg text-xs transition-colors"
                    >
                      {{ service.isActive ? 'Deactivate' : 'Activate' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bookings Tab -->
            <div v-if="activeTab === 'bookings'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-900">Booking Management</h3>
                <button @click="loadBookings" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Refresh</button>
              </div>

              <div v-if="loadingBookings" class="flex justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>

              <div v-else class="space-y-4">
                <div v-for="booking in bookings" :key="booking._id" class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h4 class="font-semibold text-gray-900">{{ booking.service.name }}</h4>
                      <p class="text-sm text-gray-600 mt-1">
                        {{ booking.customer.firstName }} {{ booking.customer.lastName }} → 
                        {{ booking.provider.firstName }} {{ booking.provider.lastName }}
                      </p>
                    </div>
                    <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full" :class="getStatusBadgeClass(booking.status)">
                      {{ booking.status }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>{{ new Date(booking.scheduledDate).toLocaleDateString() }} at {{ booking.scheduledTime }}</span>
                    <span class="font-bold text-blue-600">${{ booking.totalAmount }}</span>
                  </div>
                  <div class="flex space-x-3">
                    <button @click="viewBooking(booking._id)" class="px-3 py-1 bg-gray-600 text-white rounded-lg text-xs hover:bg-gray-700 transition-colors">View Details</button>
                    <button v-if="canUpdateStatus(booking)" @click="updateBookingStatus(booking._id, booking.status)" class="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors">
                      {{ getActionButtonText(booking.status) }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const activeTab = ref('users')
const loadingUsers = ref(false)
const loadingServices = ref(false)
const loadingBookings = ref(false)

const stats = reactive({
  totalUsers: 0,
  totalServices: 0,
  totalBookings: 0,
  totalRevenue: 0
})

const users = ref([])
const services = ref([])
const bookings = ref([])

const userFilters = reactive({
  role: ''
})

const tabs = [
  { 
    id: 'users', 
    name: 'Users'
  },
  { 
    id: 'services', 
    name: 'Services'
  },
  { 
    id: 'bookings', 
    name: 'Bookings'
  }
]

const logout = async () => {
  try {
    await authStore.logout()
    toast.success('Logged out successfully')
    router.push('/')
  } catch (error) {
    console.error('Error logging out:', error)
    toast.error('Error logging out')
  }
}

const loadStats = async () => {
  try {
    const response = await api.get('/admin/stats')
    Object.assign(stats, response.data)
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

const loadUsers = async () => {
  loadingUsers.value = true
  try {
    const params = userFilters.role ? { role: userFilters.role } : {}
    const response = await api.get('/admin/users', { params })
    users.value = response.data
  } catch (error) {
    console.error('Error loading users:', error)
    toast.error('Failed to load users')
  } finally {
    loadingUsers.value = false
  }
}

const loadServices = async () => {
  loadingServices.value = true
  try {
    const response = await api.get('/admin/services')
    services.value = response.data
  } catch (error) {
    console.error('Error loading services:', error)
    toast.error('Failed to load services')
  } finally {
    loadingServices.value = false
  }
}

const loadBookings = async () => {
  loadingBookings.value = true
  try {
    const response = await api.get('/admin/bookings')
    bookings.value = response.data
  } catch (error) {
    console.error('Error loading bookings:', error)
    toast.error('Failed to load bookings')
  } finally {
    loadingBookings.value = false
  }
}

const toggleUserStatus = async (user) => {
  try {
    await api.put(`/admin/users/${user._id}/status`, {
      isActive: !user.isActive
    })
    user.isActive = !user.isActive
    toast.success(`User ${user.isActive ? 'activated' : 'deactivated'} successfully`)
  } catch (error) {
    console.error('Error updating user status:', error)
    toast.error('Failed to update user status')
  }
}

const toggleServiceStatus = async (service) => {
  try {
    await api.put(`/admin/services/${service._id}/status`, {
      isActive: !service.isActive
    })
    service.isActive = !service.isActive
    toast.success(`Service ${service.isActive ? 'activated' : 'deactivated'} successfully`)
  } catch (error) {
    console.error('Error updating service status:', error)
    toast.error('Failed to update service status')
  }
}

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const viewBooking = (bookingId) => {
  window.open(`/bookings/${bookingId}`, '_blank')
}

const canUpdateStatus = (booking) => {
  return true
}

const getActionButtonText = (status) => {
  const actions = {
    pending: 'Confirm',
    confirmed: 'Start Work',
    'in-progress': 'Complete'
  }
  return actions[status] || 'Update'
}

const updateBookingStatus = async (bookingId, currentStatus) => {
  let nextStatus = ''
  if (currentStatus === 'pending') nextStatus = 'confirmed'
  else if (currentStatus === 'confirmed') nextStatus = 'in-progress'
  else if (currentStatus === 'in-progress') nextStatus = 'completed'
  else return

  try {
    await api.put(`/bookings/${bookingId}/status`, { status: nextStatus })
    toast.success(`Booking status updated to ${nextStatus}`)
    loadBookings()
  } catch (error) {
    console.error('Error updating booking status:', error)
    toast.error('Failed to update booking status')
  }
}

onMounted(() => {
  loadStats()
  loadUsers()
  loadServices()
  loadBookings()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 