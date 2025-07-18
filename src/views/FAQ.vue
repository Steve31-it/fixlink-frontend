<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p class="text-lg text-gray-600">Find answers to common questions about FixLink</p>
      </div>

      <!-- How FixLink Works Section -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 class="text-3xl font-bold text-center mb-8">How FixLink Works?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-2xl font-bold">1</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Get verified customer requests</h3>
            <p class="text-gray-600">Get connected with customers looking for your service</p>
          </div>
          
          <!-- Step 2 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-2xl font-bold">2</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Send quotes</h3>
            <p class="text-gray-600">Reply to customer leads that match your interests and qualifications</p>
          </div>
          
          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-2xl font-bold">3</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Chat and get hired</h3>
            <p class="text-gray-600">Chat with the customers, finalise the quotes and get hired</p>
          </div>
        </div>
        <div class="text-center mt-8">
          <a href="#" class="text-black font-medium hover:underline">Know More</a>
        </div>
      </div>

      <!-- FAQ Accordion -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-center mb-8">Common Questions</h2>
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-lg">
            <button 
              @click="toggleFAQ(index)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
            >
              <span class="font-medium text-gray-900">{{ faq.question }}</span>
              <svg 
                class="w-5 h-5 text-gray-500 transform transition-transform"
                :class="{ 'rotate-180': faq.isOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="faq.isOpen" class="px-6 pb-4">
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: "How do I book a service on FixLink?",
    answer: "Simply search for the service you need, browse through available providers, read reviews, and click 'Book Now' to schedule your appointment. You can also chat with providers to discuss specific requirements.",
    isOpen: false
  },
  {
    question: "How are service providers verified?",
    answer: "All our service providers go through a rigorous verification process including background checks, skill assessments, and customer feedback reviews to ensure quality and reliability.",
    isOpen: false
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "We have a 100% satisfaction guarantee. If you're not happy with the service, contact our support team within 24 hours and we'll work to resolve the issue or provide a refund.",
    isOpen: false
  },
  {
    question: "How do I become a service provider?",
    answer: "To become a service provider, register on our platform, complete your profile with relevant experience and certifications, and pass our verification process. Once approved, you can start receiving customer requests.",
    isOpen: false
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards, debit cards, digital wallets, and bank transfers. All payments are processed securely through our platform.",
    isOpen: false
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule your booking up to 2 hours before the scheduled time. Cancellations within 2 hours may incur a small fee.",
    isOpen: false
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our customer support team through the chat feature on our website, email us at support@fixlink.com, or call us at 1-800-FIXLINK during business hours.",
    isOpen: false
  },
  {
    question: "Are the service providers insured?",
    answer: "Yes, all our verified service providers carry appropriate insurance coverage to protect both themselves and our customers during service delivery.",
    isOpen: false
  }
])

const toggleFAQ = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script> 