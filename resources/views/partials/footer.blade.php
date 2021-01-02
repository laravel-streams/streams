<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
<footer class="bg-black" aria-labelledby="footerHeading">
    <h2 id="footerHeading" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="grid grid-cols-2 gap-8 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Column 1
              </h3>
              
              <ul class="mt-4 space-y-4">
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white">
                    Test
                  </a>
                </li>
              </ul>
            </div>

            <div class="mt-12 md:mt-0">
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Column 2
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white">
                    Test
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Column 3
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white">
                    Test
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Column 4
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white">
                    Test
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-8 xl:mt-0">
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Column 5
          </h3>
          <p class="mt-4 text-base text-gray-300">
            Blurb
          </p>
        </div>
      </div>

      <div class="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
        <div class="flex space-x-6 md:order-2">
          
            <a href="https://www.instagram.com/RyanThePyro/" target="_blank" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">Instagram</span>
                <x-fab-instagram class="h-8"/>
            </a>
  
          <a href="https://twitter.com/Laravel_Streams" target="_blank" class="text-gray-400 hover:text-gray-300">
            <span class="sr-only">Twitter</span>
            <x-fab-twitter class="h-8"/>
          </a>
  
          <a href="https://github.com/laravel-streams" class="text-gray-400 hover:text-gray-300" target="_blank">
            <span class="sr-only">GitHub</span>
            <x-fab-github class="h-8"/>
          </a>
  
        </div>
        <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
          &copy; {{ now()->format('Y') }} You, Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
