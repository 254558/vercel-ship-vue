<template>
  <section class="bg-black pt-28 pb-20">
    <div class="mx-auto px-6 md:px-16 ">
      <div class="flex flex-col lg:flex-row lg:justify-between gap-6 mb-10 lg:mb-20">
        <h2 class="text-white font-pixel-circle text-7xl font-medium leading-none">
          Featured speakers
        </h2>
        <a
          href="/ship/london/speakers"
          class="inline-flex items-center gap-3 h-12 px-5 font-mono uppercase border border-white text-white hover:bg-white/10"
        >
          View all speakers
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M9.53 2.22L9 1.69 7.94 2.75l.53.53L12.44 7.25H1v1.5h11.44l-3.97 3.97-.53.53L9 14.31l.53-.53 5.07-5.07c.4-.4.4-1.05 0-1.46L9.53 2.22Z"/>
          </svg>
        </a>
      </div>

      <div class="border border-[#343232c0]">
        <div class="flex divide-x divide-[#343232c0]">
          <div class="flex-1 divide-y divide-[#343232c0]">
            <div
              v-for="(speaker, i) in speakers"
              :key="i"
              class="min-h-[110px] flex items-center pl-8 pr-10 hover:bg-white/5 text-white cursor-pointer group"
              @mouseenter="activeIndex = i"
            >
              <div class="flex-1">
                <p class="font-mono uppercase" :class="activeIndex === i ? 'text-white' : 'text-white/30'">{{ speaker.name }}</p>
                <p class="mt-2 font-mono uppercase" :class="activeIndex === i ? 'text-white' : 'text-gray-400'">{{ speaker.role }}</p>
              </div>
              <div class="flex gap-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg v-if="speaker.linkedin" class="w-4 h-4 text-white" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM5 6.75V13H3V6.75H5ZM5 4.50008C5 5.05554 4.61409 5.5 3.99408 5.5H3.98249C3.38582 5.5 3 5.05554 3 4.50008C3 3.93213 3.39765 3.5 4.00584 3.5C4.61409 3.5 4.98845 3.93213 5 4.50008ZM8.5 13H6.5C6.5 13 6.53178 7.43224 6.50007 6.75H8.5V7.78371C8.5 7.78371 9 6.75 10.5 6.75C12 6.75 13 7.59782 13 9.83107V13H11V10.1103C11 10.1103 11 8.46616 9.7361 8.46616C8.4722 8.46616 8.5 9.93972 8.5 9.93972V13Z"/></svg>
                <svg v-if="speaker.x" class="w-4 h-4 text-white" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"/></svg>
              </div>
            </div>
          </div>

          <div class="relative w-[400px] xl:w-[500px] shrink-0">
            <img
              v-for="(speaker, i) in speakers"
              :key="i"
              :src="speaker.img"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              :class="activeIndex === i ? 'opacity-100' : 'opacity-0'"
              :alt="speaker.name"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)

const speakers = [
  { name: 'Guillermo Rauch', role: 'Founder and CEO, Vercel', img: '/third/g-1.avif', linkedin: true, x: true },
  { name: 'Mike Taylor-Cai', role: 'Product Manager, Google DeepMind', img: '/third/mike_taylor_deepmind.avif', linkedin: true, x: false },
  { name: 'Alex Holt', role: 'Engineering, ElevenLabs', img: '/third/alex-holt.avif', linkedin: true, x: true },
  { name: 'Aydrian Howard', role: 'Developer Advocate, auth0', img: '/third/aydrian_howard_auth0.avif', linkedin: true, x: true },
  { name: 'Michał Pierzchała', role: 'Principal Engineer, Callstack', img: '/third/michaC582_pierzchaC582a_callstack.avif', linkedin: true, x: false },
]
</script>
