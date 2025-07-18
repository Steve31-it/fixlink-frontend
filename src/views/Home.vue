<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-5xl mx-auto my-10 px-6 py-12 md:px-12 md:py-16">
      <!-- Hero Section -->
      <section class="flex flex-col md:flex-row items-center gap-12 min-h-[500px] w-full mb-12">
        <!-- Left: Heading, Card, Stats -->
        <div class="flex-1 flex flex-col justify-center items-start h-full">
          <h1 class="text-4xl md:text-5xl font-extrabold mb-8 text-black leading-tight tracking-tight">Home services at your doorstep</h1>
          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-xl mb-8">
            <h2 class="text-2xl font-bold text-black mb-6 tracking-tight">What are you looking for?</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                v-for="cat in categories"
                :key="cat.label"
                @click="goToServices(cat.label)"
                class="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 group focus:outline-none focus:ring-2 focus:ring-black"
                role="button"
                :aria-label="cat.label + ' category'"
                tabindex="0"
              >
                <div class="mb-2 group-hover:scale-110 transition-transform duration-200">
                  <svg v-if="cat.label === 'AC\nRepair'" class="w-8 h-8 text-black mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364l-1.414-1.414M6.05 6.05l-1.414-1.414m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                  <svg v-else-if="cat.label === 'Plumbing'" class="w-8 h-8 text-black mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19.07 4.93a5 5 0 010 7.07l-7.07 7.07a5 5 0 01-7.07-7.07l7.07-7.07a5 5 0 017.07 0z"/><path d="M14.828 9.172a4 4 0 010 5.656"/></svg>
                  <svg v-else-if="cat.label === 'Electrician'" class="w-8 h-8 text-black mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 2 13 9 13 11 22 22 11 15 11 13 2"/></svg>
                  <svg v-else-if="cat.label === 'Cleaning'" class="w-8 h-8 text-black mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M16 11V7a4 4 0 00-8 0v4"/></svg>
                  <svg v-else-if="cat.label === 'Beauty'" class="w-8 h-8 text-black mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="6" rx="3"/><path d="M12 8v8m0 0a4 4 0 01-4 4h8a4 4 0 01-4-4z"/></svg>
                  <svg v-else-if="cat.label === 'Installations'" class="w-8 h-8 text-black mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17l9-9M8 8l8 8"/></svg>
                </div>
                <div class="font-semibold text-black text-base tracking-wide text-center whitespace-pre-line">{{ cat.label }}</div>
              </button>
            </div>
          </div>
          <!-- Stats Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            <div class="bg-white border border-gray-100 rounded-2xl flex flex-col items-center py-10 px-6 transition-shadow duration-200 hover:shadow-2xl">
              <div class="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
                <svg class="w-9 h-9 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
              </div>
              <div class="text-4xl font-extrabold text-black mb-1">4.9</div>
              <div class="text-lg text-gray-500 font-medium">Service Rating</div>
            </div>
            <div class="bg-white border border-gray-100 rounded-2xl flex flex-col items-center py-10 px-6 transition-shadow duration-200 hover:shadow-2xl">
              <div class="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
                <svg class="w-9 h-9 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              </div>
              <div class="text-4xl font-extrabold text-black mb-1">500K+</div>
              <div class="text-lg text-gray-500 font-medium">Customers</div>
            </div>
            <div class="bg-white border border-gray-100 rounded-2xl flex flex-col items-center py-10 px-6 transition-shadow duration-200 hover:shadow-2xl">
              <div class="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
                <svg class="w-9 h-9 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div class="text-4xl font-extrabold text-black mb-1">Fast</div>
              <div class="text-lg text-gray-500 font-medium">Response</div>
            </div>
          </div>
        </div>
        <!-- Right: Hero Image Only -->
        <div class="flex-1 flex flex-col h-full justify-center items-center">
          <div class="w-full h-[32rem] rounded-2xl overflow-hidden">
            <img :src="HeroImg" alt="Hero" class="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <!-- Testimonial Section -->
      <section class="py-12">
        <h2 class="text-3xl font-bold text-black mb-12 tracking-tight text-center">What our customers say</h2>
        <div class="flex flex-col md:flex-row justify-center items-stretch gap-8">
          <div class="relative flex-1 max-w-md mx-auto bg-white border border-gray-200 rounded-2xl px-6 pt-12 pb-8 flex flex-col items-center text-center">
            <div class="absolute -top-10 left-1/2 -translate-x-1/2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 1" class="w-20 h-20 rounded-full border-4 border-white shadow-md" />
            </div>
            <div class="mt-4 font-bold text-lg text-black mb-2">Ayesha K.</div>
            <div class="text-gray-500 text-base font-medium">"Booking a cleaner was so easy and the service was top-notch! Highly recommend FixLink."</div>
          </div>
          <div class="relative flex-1 max-w-md mx-auto bg-white border border-gray-200 rounded-2xl px-6 pt-12 pb-8 flex flex-col items-center text-center">
            <div class="absolute -top-10 left-1/2 -translate-x-1/2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 2" class="w-20 h-20 rounded-full border-4 border-white shadow-md" />
            </div>
            <div class="mt-4 font-bold text-lg text-black mb-2">Mohammed S.</div>
            <div class="text-gray-500 text-base font-medium">"The electrician arrived on time and fixed everything quickly. Great experience!"</div>
          </div>
          <div class="relative flex-1 max-w-md mx-auto bg-white border border-gray-200 rounded-2xl px-6 pt-12 pb-8 flex flex-col items-center text-center">
            <div class="absolute -top-10 left-1/2 -translate-x-1/2">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User 3" class="w-20 h-20 rounded-full border-4 border-white shadow-md" />
            </div>
            <div class="mt-4 font-bold text-lg text-black mb-2">Priya D.</div>
            <div class="text-gray-500 text-base font-medium">"I love how easy it is to book beauty services at home. Will use again!"</div>
          </div>
        </div>
      </section>

      <!-- Promotional Section -->
      <section class="py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-black border border-gray-800 text-white rounded-2xl p-8 flex flex-col items-start justify-between shadow hover:shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 group focus:outline-none focus:ring-2 focus:ring-black">
            <div class="font-bold text-2xl mb-3">Home Cleaning at AED 99</div>
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80" alt="Home Cleaning" class="w-full h-36 object-cover rounded-xl mb-4" />
            <router-link to="/services?category=cleaning" class="bg-black text-white border-2 border-white px-6 py-2 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-200">Book Now</router-link>
          </div>
          <div class="bg-black border border-gray-800 text-white rounded-2xl p-8 flex flex-col items-start justify-between shadow hover:shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 group focus:outline-none focus:ring-2 focus:ring-black">
            <div class="font-bold text-2xl mb-3">Electrician Visit AED 149</div>
            <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80" alt="Electrician" class="w-full h-36 object-cover rounded-xl mb-4" />
            <router-link to="/services?category=electrician" class="bg-black text-white border-2 border-white px-6 py-2 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-200">Book Now</router-link>
          </div>
          <div class="bg-black border border-gray-800 text-white rounded-2xl p-8 flex flex-col items-start justify-between shadow hover:shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 group focus:outline-none focus:ring-2 focus:ring-black">
            <div class="font-bold text-2xl mb-3">Home Painting AED 89</div>
            <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80" alt="Home Painting" class="w-full h-36 object-cover rounded-xl mb-4" />
            <router-link to="/services?category=painting" class="bg-black text-white border-2 border-white px-6 py-2 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-200">Book Now</router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import HeroImg from '../images/Hero.png'
// SVG icon components (black & white only)
const AcIcon = {
  template: `<svg class='w-8 h-8' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364l-1.414-1.414M6.05 6.05l-1.414-1.414m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z'/></svg>`
}
const PlumbingIcon = {
  template: `<svg class='w-8 h-8' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M19.07 4.93a5 5 0 010 7.07l-7.07 7.07a5 5 0 01-7.07-7.07l7.07-7.07a5 5 0 017.07 0z'/><path d='M14.828 9.172a4 4 0 010 5.656'/></svg>`
}
const ElectricianIcon = {
  template: `<svg class='w-8 h-8' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><polygon points='13 2 2 13 9 13 11 22 22 11 15 11 13 2'/></svg>`
}
const CleaningIcon = {
  template: `<svg class='w-8 h-8' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><rect x='3' y='11' width='18' height='10' rx='2'/><path d='M16 11V7a4 4 0 00-8 0v4'/></svg>`
}
const BeautyIcon = {
  template: `<svg class='w-8 h-8' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><rect x='9' y='2' width='6' height='6' rx='3'/><path d='M12 8v8m0 0a4 4 0 01-4 4h8a4 4 0 01-4-4z'/></svg>`
}
const InstallationsIcon = {
  template: `<svg class='w-8 h-8' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M7 17l9-9M8 8l8 8'/></svg>`
}

const categories = [
  { icon: AcIcon, label: 'AC\nRepair' },
  { icon: PlumbingIcon, label: 'Plumbing' },
  { icon: ElectricianIcon, label: 'Electrician' },
  { icon: CleaningIcon, label: 'Cleaning' },
  { icon: BeautyIcon, label: 'Beauty' },
  { icon: InstallationsIcon, label: 'Installations' },
]

const router = useRouter()
const goToServices = (category) => {
  router.push(`/services?category=${category.replace(/\n/g, ' ').toLowerCase()}`)
}
</script> 