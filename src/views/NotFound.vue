<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-primary-600">404</h1>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p class="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div class="space-y-4">
        <router-link
          to="/"
          class="btn-primary w-full"
        >
          Go Back Home
        </router-link>
        
        <button
          @click="goBack"
          class="btn-secondary w-full"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script> 