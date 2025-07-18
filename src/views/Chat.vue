<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Chat Support</h1>
      <p class="text-gray-600">Get help from our support team</p>
    </div>

    <div class="card h-96">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">Support Chat</h2>
      </div>
      <div class="card-body flex flex-col h-full">
        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto mb-4 space-y-4" ref="messagesContainer">
          <div v-if="loading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>

          <div v-else-if="messages.length === 0" class="text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
            <p class="mt-1 text-sm text-gray-500">Start a conversation with our support team.</p>
          </div>

          <div v-else>
            <div
              v-for="message in messages"
              :key="message._id"
              :class="[
                'flex',
                message.sender === authStore.user?._id ? 'justify-end' : 'justify-start'
              ]"
            >
              <div
                :class="[
                  'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
                  message.sender === authStore.user?._id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                ]"
              >
                <p class="text-sm">{{ message.content }}</p>
                <p class="text-xs mt-1 opacity-75">
                  {{ new Date(message.createdAt).toLocaleTimeString() }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t pt-4">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="input flex-1"
              :disabled="sending"
            />
            <button
              type="submit"
              :disabled="!newMessage.trim() || sending"
              class="btn-primary"
            >
              <span v-if="sending" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
              <span v-else>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'
import api from '../services/api'

const authStore = useAuthStore()
const toast = useToast()

const messages = ref([])
const newMessage = ref('')
const loading = ref(true)
const sending = ref(false)
const messagesContainer = ref(null)

const loadMessages = async () => {
  try {
    const response = await api.get('/chat/messages')
    messages.value = response.data
  } catch (error) {
    console.error('Error loading messages:', error)
    toast.error('Failed to load messages')
  } finally {
    loading.value = false
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  sending.value = true
  const messageContent = newMessage.value
  newMessage.value = ''

  try {
    const response = await api.post('/chat/messages', {
      content: messageContent
    })
    
    messages.value.push(response.data.message)
    await scrollToBottom()
  } catch (error) {
    console.error('Error sending message:', error)
    toast.error('Failed to send message')
    newMessage.value = messageContent // Restore the message if it failed
  } finally {
    sending.value = false
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Auto-scroll when new messages are added
watch(messages, () => {
  scrollToBottom()
}, { deep: true })

onMounted(() => {
  loadMessages()
})
</script> 