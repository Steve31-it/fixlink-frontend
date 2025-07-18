<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat button -->
    <button
      v-if="!isOpen"
      @click="openChat"
      class="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
    </button>

    <!-- Chat window -->
    <div
      v-if="isOpen"
      class="bg-white rounded-lg shadow-xl border border-gray-200 w-80 h-96 flex flex-col"
    >
      <!-- Chat header -->
      <div class="bg-primary-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 class="font-semibold">FixLink Assistant</h3>
        <button
          @click="closeChat"
          class="text-white hover:text-gray-200 transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Chat messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'flex',
            message.isBot ? 'justify-start' : 'justify-end'
          ]"
        >
          <div
            :class="[
              'max-w-xs px-3 py-2 rounded-lg',
              message.isBot
                ? 'bg-gray-100 text-gray-800'
                : 'bg-primary-600 text-white'
            ]"
          >
            <p class="text-sm">{{ message.text }}</p>
            <p class="text-xs opacity-70 mt-1">
              {{ formatTime(message.timestamp) }}
            </p>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat input -->
      <div class="p-4 border-t border-gray-200">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 input text-sm"
            :disabled="isTyping"
          />
          <button
            type="submit"
            :disabled="!newMessage.trim() || isTyping"
            class="btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const isOpen = ref(false)
const messages = ref([])
const newMessage = ref('')
const isTyping = ref(false)
const sessionId = ref(null)

const openChat = () => {
  isOpen.value = true
  if (messages.value.length === 0) {
    addBotMessage('Hello! Welcome to FixLink. How can I help you today?')
  }
}

const closeChat = () => {
  isOpen.value = false
}

const addMessage = (text, isBot = false) => {
  messages.value.push({
    text,
    isBot,
    timestamp: new Date()
  })
}

const addBotMessage = (text) => {
  addMessage(text, true)
}

const addUserMessage = (text) => {
  addMessage(text, false)
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || isTyping.value) return

  const userMessage = newMessage.value.trim()
  addUserMessage(userMessage)
  newMessage.value = ''
  isTyping.value = true

  try {
    const response = await api.post('/chat/bot', {
      message: userMessage,
      sessionId: sessionId.value
    })

    // Simulate typing delay
    setTimeout(() => {
      addBotMessage(response.data.message)
      isTyping.value = false
    }, 1000)

    if (!sessionId.value) {
      sessionId.value = response.data.sessionId
    }
  } catch (error) {
    console.error('Error sending message:', error)
    addBotMessage('Sorry, I\'m having trouble responding right now. Please try again later.')
    isTyping.value = false
  }
}

onMounted(() => {
  // Generate session ID
  sessionId.value = Date.now().toString()
})
</script> 