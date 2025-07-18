<template>
  <footer class="bg-gray-50 text-gray-800 pt-10 pb-4 border-t border-gray-200 mt-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
        <!-- Logo and Company -->
        <div class="mb-8 md:mb-0 flex flex-col items-start">
          <div class="flex items-center mb-6">
            <img :src="FixLinkLogo" alt="FixLink Logo" class="h-10 w-auto mr-2" />
          </div>
          <div>
            <h3 class="font-semibold mb-2">Company</h3>
            <ul class="space-y-1 text-gray-600">
              <li><router-link to="/about" class="hover:underline">About us</router-link></li>
              <li><a href="#" class="hover:underline">Investor Relations</a></li>
              <li><a href="#" class="hover:underline">Terms & conditions</a></li>
              <li><a href="#" class="hover:underline">Privacy policy</a></li>
              <li><a href="#" class="hover:underline">Anti-discrimination policy</a></li>
              <li><a href="#" class="hover:underline">ESG Impact</a></li>
              <li><a href="#" class="hover:underline">Careers</a></li>
            </ul>
          </div>
        </div>
        <!-- For customers -->
        <div class="mb-8 md:mb-0">
          <h3 class="font-semibold mb-2">For customers</h3>
          <ul class="space-y-1 text-gray-600">
            <li><a href="#" class="hover:underline">FL reviews</a></li>
            <li><a href="#" class="hover:underline">Categories near you</a></li>
            <li><router-link to="/contact" class="hover:underline">Contact us</router-link></li>
          </ul>
        </div>
        <!-- For professionals -->
        <div class="mb-8 md:mb-0">
          <h3 class="font-semibold mb-2">For professionals</h3>
          <ul class="space-y-1 text-gray-600">
            <li><a href="#" class="hover:underline">Register as a professional</a></li>
          </ul>
        </div>
        <!-- Social links and app badges -->
        <div class="flex flex-col items-start md:items-end">
          <h3 class="font-semibold mb-2">Social links</h3>
          <div class="flex space-x-3 mb-4">
            <a href="#" aria-label="Twitter" class="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.01-4.52 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.56 4.32-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.56 1.74 2.18 3 4.1 3.04A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.95 2.03c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" class="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" class="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" class="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><line x1="16" y1="11" x2="16" y2="16"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
            </a>
          </div>
          <div class="flex flex-col space-y-2">
            <a href="#" class="block">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" class="h-10" />
            </a>
            <a href="#" class="block">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-10" />
            </a>
          </div>
        </div>
      </div>
      <hr class="my-8 border-gray-200" />
      <div class="text-xs text-gray-500 text-center">
        * As on December 31, 2024<br />
        &copy; Copyright 2025 FixLink Technologies Ltd. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
import FixLinkLogo from '../images/FixLink Logo.png'
</script> 