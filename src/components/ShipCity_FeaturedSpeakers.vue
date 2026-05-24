<template>
  <section class="bg-black pt-28 pb-20">
    <div class="mx-auto px-6 md:px-16 w-full">
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

      <div class="border border-gray-700">
        <div class="flex divide-x divide-gray-700">
          <div class="flex-1 divide-y divide-gray-700">
            <div
              v-for="(speaker, i) in speakers"
              :key="i"
              class="min-h-[110px] flex items-center pl-8 pr-10 hover:bg-white/5 text-white cursor-pointer"
              @mouseenter="activeIndex = i"
            >
              <div>
                <p class="font-mono uppercase" :class="activeIndex === i ? 'text-white' : 'text-white/30'">{{ speaker.name }}</p>
                <p class="mt-2 font-mono uppercase" :class="activeIndex === i ? 'text-white' : 'text-gray-400'">{{ speaker.role }}</p>
              </div>
            </div>
          </div>

          <div class="relative w-[400px] xl:w-[500px] shrink-0 hidden md:block">
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
  { name: 'Guillermo Rauch', role: 'Founder and CEO, Vercel', img: '/third/g-1.avif' },
  { name: 'Mike Taylor-Cai', role: 'Product Manager, Google DeepMind', img: '/third/mike_taylor_deepmind.avif' },
  { name: 'Alex Holt', role: 'Engineering, ElevenLabs', img: '/third/alex-holt.avif' },
  { name: 'Aydrian Howard', role: 'Developer Advocate, auth0', img: '/third/aydrian_howard_auth0.avif' },
  { name: 'Michał Pierzchała', role: 'Principal Engineer, Callstack', img: '/third/michaC582_pierzchaC582a_callstack.avif' },
]
</script>
