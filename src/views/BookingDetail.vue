<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
    
    <div v-else-if="!booking" class="text-center py-12">
      <h2 class="text-2xl font-bold text-gray-900">Booking not found</h2>
      <router-link to="/bookings" class="btn-primary mt-4">Back to Bookings</router-link>
    </div>
    
    <div v-else class="card">
      <div class="card-header">
        <h1 class="text-2xl font-bold text-gray-900">Booking Details</h1>
      </div>
      <div class="card-body space-y-4">
        <p><strong>Booking ID:</strong> {{ booking._id }}</p>
        <p><strong>Status:</strong> {{ booking.status }}</p>
        <p><strong>Service:</strong> {{ booking.service?.name }}</p>
        <p><strong>Customer:</strong> {{ booking.customer?.firstName }} {{ booking.customer?.lastName }}</p>
        <p><strong>Provider:</strong> {{ booking.provider?.firstName }} {{ booking.provider?.lastName }}</p>
        <p><strong>Date & Time:</strong> {{ booking.scheduledDate }} at {{ booking.scheduledTime }}</p>
        <p><strong>Location:</strong> {{ booking.location?.address }}</p>
        <p><strong>Total Amount:</strong> ${{ booking.totalAmount }}</p>
        <div class="flex space-x-2 mt-4">
          <button
            v-if="canUpdateStatus"
            @click="updateBookingStatus"
            class="btn-primary"
          >
            {{ getActionButtonText(booking.status) }}
          </button>
          <button
            v-if="canCancel"
            @click="cancelBooking"
            class="btn-danger"
          >
            Cancel Booking
          </button>
        </div>
        <router-link to="/bookings" class="btn-secondary mt-4">Back to Bookings</router-link>
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

const booking = ref(null)
const loading = ref(true)

const loadBooking = async () => {
  try {
    const response = await api.get(`/bookings/${route.params.id}`)
    booking.value = response.data
  } catch (error) {
    console.error('Error loading booking:', error)
  } finally {
    loading.value = false
  }
}

const canUpdateStatus = computed(() => {
  if (!booking.value) return false
  const role = authStore.user?.role
  if (role === 'admin') return ['pending', 'confirmed', 'in-progress'].includes(booking.value.status)
  if (role === 'provider') return ['pending', 'confirmed', 'in-progress'].includes(booking.value.status)
  return false
})

const canCancel = computed(() => {
  if (!booking.value) return false
  const role = authStore.user?.role
  if (role === 'admin') return true
  if (role === 'customer') return ['pending', 'confirmed'].includes(booking.value.status)
  if (role === 'provider') return booking.value.status === 'pending'
  return false
})

const getActionButtonText = (status) => {
  const actions = {
    pending: 'Confirm',
    confirmed: 'Start Work',
    'in-progress': 'Complete'
  }
  return actions[status] || 'Update'
}

const updateBookingStatus = async () => {
  if (!booking.value) return
  let nextStatus = ''
  if (booking.value.status === 'pending') nextStatus = 'confirmed'
  else if (booking.value.status === 'confirmed') nextStatus = 'in-progress'
  else if (booking.value.status === 'in-progress') nextStatus = 'completed'
  else return

  try {
    await api.put(`/bookings/${booking.value._id}/status`, { status: nextStatus })
    toast.success(`Booking status updated to ${nextStatus}`)
    await loadBooking()
  } catch (error) {
    console.error('Error updating booking status:', error)
    toast.error('Failed to update booking status')
  }
}

const cancelBooking = async () => {
  if (!booking.value) return
  try {
    await api.put(`/bookings/${booking.value._id}/status`, {
      status: 'cancelled',
      cancellationReason: 'Cancelled by admin'
    })
    toast.success('Booking cancelled successfully')
    await loadBooking()
  } catch (error) {
    console.error('Error cancelling booking:', error)
    toast.error('Failed to cancel booking')
  }
}

onMounted(() => {
  loadBooking()
})
</script> 