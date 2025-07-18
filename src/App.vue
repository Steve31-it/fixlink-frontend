<template>
  <div id="app" class="min-h-screen bg-white" @click="closeUserMenu">
    <!-- Navigation -->
    <nav v-if="!isAdminRoute" class="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Left: Logo -->
          <router-link to="/" class="flex items-center h-full group">
            <img src="/src/images/FixLink Logo.png" alt="FixLink Logo" class="h-10 w-auto mr-3" />
          </router-link>
          <!-- Center: About/Contact/FAQ + Search -->
          <div class="flex-1 flex flex-col items-center">
            <div class="flex items-center space-x-4">
              <router-link to="/about" class="text-base font-medium text-gray-700 hover:text-black px-3 py-2 rounded transition">About Us</router-link>
              <router-link to="/contact" class="text-base font-medium text-gray-700 hover:text-black px-3 py-2 rounded transition">Contact</router-link>
              <router-link to="/faq" class="text-base font-medium text-gray-700 hover:text-black px-3 py-2 rounded transition">FAQ</router-link>
              <form @submit.prevent="handleSearch" class="flex items-center ml-4">
                <input v-model="searchQuery" @keyup.enter="handleSearch" type="text" placeholder="Search for services..." class="border border-gray-300 rounded-lg px-4 py-2 text-base w-64 focus:outline-none focus:ring-2 focus:ring-black transition bg-white text-black" />
                <button type="button" @click="handleSearch" class="ml-2 p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black" aria-label="Search">
                  <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
              </form>
            </div>
          </div>
          <!-- Right: Icons and Auth -->
          <div class="flex items-center space-x-4 relative">
            <!-- Services Icon (was burger menu) -->
            <router-link to="/services" aria-label="Services" class="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </router-link>
            <!-- Bookings Icon (was cart) -->
            <router-link to="/bookings" class="hover:text-black" title="Bookings" aria-label="Bookings">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </router-link>
            <!-- Notification Icon with dropdown -->
            <button @click="toggleNotifications" class="hover:text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black relative" title="Notifications" aria-label="Notifications">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            </button>
            <div v-if="showNotifications" class="absolute right-0 mt-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div class="p-4 text-gray-700 text-sm">No new notifications</div>
              <button @click="closeNotifications" class="block w-full text-center text-xs text-gray-400 py-2 hover:bg-gray-50 rounded-b-lg">Close</button>
            </div>
            <template v-if="authStore.isAuthenticated">
              <div class="relative">
                <button @click.stop="toggleUserMenu" class="flex items-center hover:text-black" aria-label="Profile">
                  <div v-if="authStore.user?.profileImage" class="h-9 w-9 rounded-full border-2 border-gray-200 overflow-hidden">
                    <img class="h-full w-full object-cover" :src="authStore.user.profileImage" alt="User avatar" />
                  </div>
                  <div v-else class="h-9 w-9 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                    <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <span class="ml-2 text-gray-800 font-semibold hidden md:inline">{{ authStore.user?.firstName }}</span>
                  <svg class="ml-1 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                <!-- User Dropdown Menu -->
                <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div class="py-1">
                    <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</router-link>
                    <router-link v-if="authStore.user?.role === 'admin'" to="/admin" class="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 font-medium">Admin Dashboard</router-link>
                    <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="bg-black text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-900 transition-all duration-150">Login</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main v-if="!isAdminRoute" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view />
    </main>
    
    <!-- Admin content (no wrapper) -->
    <router-view v-if="isAdminRoute" />

    <Footer v-if="!isAdminRoute" />
    <!-- Chatbot -->
    <ChatBot v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useToast } from 'vue-toastification'
import ChatBot from './components/ChatBot.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const showUserMenu = ref(false)
const searchQuery = ref("")
const showNotifications = ref(false)

const isAdminRoute = computed(() => route.name === 'Admin')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to services page with search query
    router.push({
      path: '/services',
      query: { search: searchQuery.value.trim() }
    })
    // Clear search query after navigation
    searchQuery.value = ''
  }
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const closeNotifications = () => {
  showNotifications.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const logout = async () => {
  try {
    await authStore.logout()
    showUserMenu.value = false
    toast.success('Logged out successfully')
  } catch (error) {
    toast.error('Error logging out')
  }
}
</script> 