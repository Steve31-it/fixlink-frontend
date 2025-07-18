<template>
  <div class="max-w-2xl mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold text-blue-900 mb-4">Contact Us</h1>
    <p class="text-lg text-gray-700 mb-6">Have a question or need help? Reach out to our Dubai-based support team!</p>
    <form class="bg-blue-50 p-6 rounded-lg shadow mb-6">
      <div class="mb-4">
        <label class="block text-blue-800 mb-1" for="name">Name</label>
        <input class="w-full px-3 py-2 border border-blue-200 rounded" id="name" type="text" placeholder="Your Name" />
      </div>
      <div class="mb-4">
        <label class="block text-blue-800 mb-1" for="email">Email</label>
        <input class="w-full px-3 py-2 border border-blue-200 rounded" id="email" type="email" placeholder="you@email.com" />
      </div>
      <div class="mb-4">
        <label class="block text-blue-800 mb-1" for="message">Message</label>
        <textarea class="w-full px-3 py-2 border border-blue-200 rounded" id="message" rows="4" placeholder="How can we help?"></textarea>
      </div>
      <button type="submit" class="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800">Send Message</button>
    </form>
    <div class="text-gray-700">
      <h2 class="text-xl font-semibold text-blue-800 mb-2">Our Dubai Office</h2>
      <p>Marina Plaza, Dubai Marina, Dubai, UAE</p>
      <p>Phone: +971 4 123 4567</p>
      <p>Email: support@fixlink.ae</p>
    </div>
  </div>
</template>

<script setup>
// No script needed for static contact form
</script> 