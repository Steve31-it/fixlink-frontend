<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Create New Service</h1>
      <p class="text-gray-600">Add a new service to your offerings</p>
    </div>

    <div class="card">
      <div class="card-body">
        <form @submit.prevent="createService" class="space-y-6">
          <!-- Service Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Service Name *
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="input"
              placeholder="e.g., House Cleaning, Plumbing Repair"
            />
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              v-model="form.category"
              required
              class="input"
            >
              <option value="">Select a category</option>
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

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              required
              class="input"
              placeholder="Describe your service in detail..."
            ></textarea>
          </div>

          <!-- Price and Price Type -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                id="price"
                v-model.number="form.price"
                type="number"
                min="0"
                step="0.01"
                required
                class="input"
                placeholder="0.00"
              />
            </div>

            <div>
              <label for="priceType" class="block text-sm font-medium text-gray-700 mb-1">
                Price Type *
              </label>
              <select
                id="priceType"
                v-model="form.priceType"
                required
                class="input"
              >
                <option value="">Select price type</option>
                <option value="hour">Per Hour</option>
                <option value="service">Per Service</option>
                <option value="day">Per Day</option>
              </select>
            </div>
          </div>

          <!-- Duration -->
          <div>
            <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">
              Estimated Duration (hours)
            </label>
            <input
              id="duration"
              v-model.number="form.estimatedDuration"
              type="number"
              min="0.5"
              step="0.5"
              class="input"
              placeholder="2.5"
            />
          </div>

          <!-- Service Area -->
          <div>
            <label for="serviceArea" class="block text-sm font-medium text-gray-700 mb-1">
              Service Area (miles)
            </label>
            <input
              id="serviceArea"
              v-model.number="form.serviceArea"
              type="number"
              min="1"
              class="input"
              placeholder="25"
            />
          </div>

          <!-- Availability -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="availableFrom" class="block text-xs text-gray-600 mb-1">From</label>
                <input
                  id="availableFrom"
                  v-model="form.availability.from"
                  type="time"
                  class="input"
                />
              </div>
              <div>
                <label for="availableTo" class="block text-xs text-gray-600 mb-1">To</label>
                <input
                  id="availableTo"
                  v-model="form.availability.to"
                  type="time"
                  class="input"
                />
              </div>
            </div>
          </div>

          <!-- Days Available -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Days Available
            </label>
            <div class="grid grid-cols-2 gap-2">
              <label v-for="day in daysOfWeek" :key="day.value" class="flex items-center">
                <input
                  :id="day.value"
                  v-model="form.availability.days"
                  :value="day.value"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm text-gray-700">{{ day.label }}</span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4">
            <router-link to="/my-services" class="btn-secondary">
              Cancel
            </router-link>
            <button
              type="submit"
              :disabled="submitting"
              class="btn-primary"
            >
              <span v-if="submitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
              <span v-else>Create Service</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '../services/api'

const router = useRouter()
const toast = useToast()
const submitting = ref(false)

const daysOfWeek = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' }
]

const form = reactive({
  name: '',
  category: '',
  description: '',
  price: '',
  priceType: '',
  estimatedDuration: '',
  serviceArea: '',
  availability: {
    from: '',
    to: '',
    days: []
  }
})

const createService = async () => {
  submitting.value = true

  try {
    const serviceData = {
      ...form,
      isActive: true
    }

    await api.post('/services', serviceData)
    
    toast.success('Service created successfully!')
    router.push('/my-services')
  } catch (error) {
    console.error('Error creating service:', error)
    const message = error.response?.data?.message || 'Failed to create service'
    toast.error(message)
  } finally {
    submitting.value = false
  }
}
</script> 