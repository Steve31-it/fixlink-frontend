<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
      <p class="text-gray-600">Manage your account information</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Profile Info -->
      <div class="lg:col-span-2">
        <div class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Personal Information</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="input"
                  />
                </div>

                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="input"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input"
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="input"
                />
              </div>

              <div v-if="authStore.user?.role === 'provider'">
                <label for="specialization" class="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <input
                  id="specialization"
                  v-model="form.specialization"
                  type="text"
                  class="input"
                  placeholder="e.g., Plumbing, Electrical, Cleaning"
                />
              </div>

              <div v-if="authStore.user?.role === 'provider'">
                <label for="experience" class="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  id="experience"
                  v-model.number="form.experience"
                  type="number"
                  min="0"
                  class="input"
                />
              </div>

              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  v-model="form.address"
                  rows="3"
                  class="input"
                  placeholder="Enter your address"
                ></textarea>
              </div>

              <div class="flex justify-end">
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
                    Updating...
                  </span>
                  <span v-else>Update Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Account Settings -->
      <div class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-900">Account Settings</h3>
          </div>
          <div class="card-body space-y-4">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Role</h4>
              <p class="text-sm text-gray-600 capitalize">{{ authStore.user?.role }}</p>
            </div>

            <div>
              <h4 class="font-medium text-gray-900 mb-2">Member Since</h4>
              <p class="text-sm text-gray-600">
                {{ new Date(authStore.user?.createdAt).toLocaleDateString() }}
              </p>
            </div>

            <div class="border-t pt-4">
              <button
                @click="showChangePassword = true"
                class="btn-secondary w-full"
              >
                Change Password
              </button>
            </div>

            <div class="border-t pt-4">
              <button
                @click="logout"
                class="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-900">Danger Zone</h3>
          </div>
          <div class="card-body">
            <button
              @click="showDeleteAccount = true"
              class="btn-danger w-full"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              type="password"
              required
              class="input"
            />
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              v-model="passwordForm.newPassword"
              type="password"
              required
              class="input"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              v-model="passwordForm.confirmPassword"
              type="password"
              required
              class="input"
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showChangePassword = false"
              class="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="changingPassword"
              class="btn-primary"
            >
              {{ changingPassword ? 'Changing...' : 'Change Password' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div v-if="showDeleteAccount" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-red-600 mb-4">Delete Account</h3>
        <p class="text-gray-600 mb-4">
          This action cannot be undone. All your data will be permanently deleted.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteAccount = false"
            class="btn-secondary"
          >
            Cancel
          </button>
          <button
            @click="deleteAccount"
            :disabled="deletingAccount"
            class="btn-danger"
          >
            {{ deletingAccount ? 'Deleting...' : 'Delete Account' }}
          </button>
        </div>
      </div>
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

const submitting = ref(false)
const changingPassword = ref(false)
const deletingAccount = ref(false)
const showChangePassword = ref(false)
const showDeleteAccount = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialization: '',
  experience: '',
  address: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const loadProfile = () => {
  const user = authStore.user
  if (user) {
    form.firstName = user.firstName || ''
    form.lastName = user.lastName || ''
    form.email = user.email || ''
    form.phone = user.phone || ''
    form.specialization = user.specialization || ''
    form.experience = user.experience || ''
    form.address = user.address || ''
  }
}

const updateProfile = async () => {
  submitting.value = true

  try {
    await api.put('/users/profile', form)
    await authStore.fetchUser()
    toast.success('Profile updated successfully')
  } catch (error) {
    console.error('Error updating profile:', error)
    toast.error('Failed to update profile')
  } finally {
    submitting.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    toast.error('New passwords do not match')
    return
  }

  changingPassword.value = true

  try {
    await api.put('/users/change-password', {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    })
    
    toast.success('Password changed successfully')
    showChangePassword.value = false
    
    // Reset form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (error) {
    console.error('Error changing password:', error)
    toast.error('Failed to change password')
  } finally {
    changingPassword.value = false
  }
}

const deleteAccount = async () => {
  deletingAccount.value = true

  try {
    await api.delete('/users/account')
    authStore.logout()
    toast.success('Account deleted successfully')
    router.push('/')
  } catch (error) {
    console.error('Error deleting account:', error)
    toast.error('Failed to delete account')
  } finally {
    deletingAccount.value = false
    showDeleteAccount.value = false
  }
}

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

onMounted(() => {
  loadProfile()
})
</script> 