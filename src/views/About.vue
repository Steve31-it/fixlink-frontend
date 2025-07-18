<template>
  <div class="bg-gray-50 min-h-screen py-12 px-2">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 class="text-3xl md:text-4xl font-bold text-center mb-8">About Us</h1>
      <!-- Who we are -->
      <div class="mb-10">
        <h2 class="text-2xl font-semibold text-center mb-4">Who we are</h2>
        <p class="text-gray-700 text-center max-w-2xl mx-auto mb-8">
          FixLink operates a technology-driven, full-stack online services marketplace for quality home and business services across various categories. Our platform enables consumers to easily order services, including cleaning, pest control, plumbing, carpentry, appliance servicing and repair, painting, skincare, hair grooming, and massage therapy. These services are delivered by trained and independent service professionals at the consumers’ convenience. We are focused on enabling delivery of a quality-driven, standardized, and reliable service experience.
        </p>
        <div class="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
          <div class="text-center">
            <div class="text-2xl font-bold">48,000+</div>
            <div class="text-gray-500 text-sm">Active Service Professionals*</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">13 Million+</div>
            <div class="text-gray-500 text-sm">Consumers**</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">59</div>
            <div class="text-gray-500 text-sm">Cities**</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">4</div>
            <div class="text-gray-500 text-sm">Countries**</div>
          </div>
        </div>
        <div class="text-xs text-gray-400 text-center mb-8">
          * For the nine months ended December 31, 2024<br />
          ** As of December 31, 2024
        </div>
      </div>
      <!-- Leadership Team -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-center mb-6">Our Leadership Team</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="member in team" :key="member.name" class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <img :src="member.avatar" :alt="member.name" class="w-20 h-20 rounded-full mb-3 object-cover border-2 border-white shadow" />
            <div class="font-bold text-lg text-center">{{ member.name }}</div>
            <div class="text-gray-600 text-sm text-center mb-2">{{ member.title }}</div>
            <div class="flex gap-2">
              <a v-if="member.linkedin" :href="member.linkedin" target="_blank" rel="noopener" class="text-blue-700 hover:text-blue-900"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg></a>
              <a v-if="member.twitter" :href="member.twitter" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-600"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 00-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 01-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 007.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"/></svg></a>
            </div>
          </div>
        </div>
      </div>
      <!-- Investors -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-center mb-6">Our Investors</h2>
        <div class="flex flex-wrap justify-center items-center gap-8">
          <img v-for="logo in investors" :key="logo" :src="logo" alt="Investor Logo" class="h-10 object-contain" />
        </div>
      </div>
      <div class="text-center mt-8">
        <button class="bg-black text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-gray-900 transition">APPLY NOW</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const team = [
  { name: 'Aye Chan Moe', title: 'CEO & Co-Founder', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', linkedin: '#', twitter: '#' },
  { name: 'Pyae Sone Oo', title: 'CTO & Co-Founder', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', linkedin: '#', twitter: '#' },
  { name: 'Su Su Hlaing', title: 'Chief Marketing Officer', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', linkedin: '#', twitter: '#' },
  { name: 'Myo Min Htet', title: 'Chief Financial Officer', avatar: 'https://randomuser.me/api/portraits/men/68.jpg', linkedin: '#', twitter: '#' },
  { name: 'Hnin Ei Mon', title: 'Chief Operations Officer', avatar: 'https://randomuser.me/api/portraits/women/72.jpg', linkedin: '#', twitter: '#' },
  { name: 'Aung Ko Ko', title: 'VP Engineering', avatar: 'https://randomuser.me/api/portraits/men/76.jpg', linkedin: '#', twitter: '#' },
  { name: 'Thiri Htet', title: 'VP Product', avatar: 'https://randomuser.me/api/portraits/women/77.jpg', linkedin: '#', twitter: '#' },
  { name: 'Zaw Win Htut', title: 'VP Growth', avatar: 'https://randomuser.me/api/portraits/men/78.jpg', linkedin: '#', twitter: '#' },
  { name: 'Ei Mon Kyaing', title: 'Company Secretary', avatar: 'https://randomuser.me/api/portraits/women/79.jpg', linkedin: '#', twitter: '#' },
]
const investors = [
  'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg',
  'https://cdn.worldvectorlogo.com/logos/apple-11.svg',
  'https://cdn.worldvectorlogo.com/logos/netflix-3.svg',
  'https://cdn.worldvectorlogo.com/logos/uber-2.svg',
  'https://cdn.worldvectorlogo.com/logos/airbnb-1.svg',
]
</script> 