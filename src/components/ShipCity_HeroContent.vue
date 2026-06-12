<template>
  <section class="relative z-10 flex-1 flex flex-col px-3 pb-15">
    <div class="flex-1" />

    <div class="flex justify-between items-end w-full px-14 mt-auto">
      <div class="flex flex-col justify-end">
        <h1 class="font-pixel-circle text-8xl mb-12 tracking-[-5px]">
          Ship what's next
        </h1>

        <div class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-8 font-mono text-base uppercase text-gray-1000">
            <div class="flex flex-col gap-[0.5px]">
              <span>MAGAZINE</span>
              <span>{{ cityLabel }}</span>
            </div>

            <div class="flex flex-col gap-1">
              <span>{{ cityDateDisplay }}</span>
              <span>{{ countDown }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6 shrink-0 xl:max-w-sm">
        <a
          class="relative overflow-hidden aspect-[--cta-aspect] inline-flex items-center justify-center gap-3 h-28 px-28 font-medium whitespace-nowrap select-none cursor-pointer text-black bg-white transition-colors
          disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale
          focus-visible:outline-2 focus-visible:outline-gray-1000 focus-visible:outline-offset-4
          enabled:hover:bg-[var(--cf-accent-background)]/80
          [&_svg]:size-4 [&_svg]:shrink-0
          [&>span>span]:!text-[36px] [&>span>span]:font-pixel-circle
          [clip-path:polygon(16px_0,calc(100%-16px)_0,calc(100%-16px)_16px,100%_16px,100%_calc(100%-16px),calc(100%-16px)_calc(100%-16px),calc(100%-16px)_100%,16px_100%,16px_calc(100%-16px),0_calc(100%-16px),0_16px,16px_16px)]
          hover:[clip-path:polygon(32px_0,calc(100%-32px)_0,calc(100%-32px)_16px,calc(100%-16px)_16px,calc(100%-16px)_32px,100%_32px,100%_calc(100%-32px),calc(100%-16px)_calc(100%-32px),calc(100%-16px)_calc(100%-16px),calc(100%-32px)_calc(100%-16px),calc(100%-32px)_100%,32px_100%,32px_calc(100%-16px),16px_calc(100%-16px),16px_calc(100%-32px),0_calc(100%-32px),0_32px,16px_32px,16px_16px,32px_16px)]"
        >
          <span class="flex flex-col items-center justify-center gap-1">
            <span class="block text-heading-32 font-normal">
              Get your ticket →
            </span>
          </span>
        </a>

        <p class="font-mono font-normal tracking-normal text-gray-1000 text-copy-16 leading-normal text-left xl:text-center uppercase">
          Already registered?
          <a class="hover:opacity-70 transition-opacity underline underline-offset-2 text-gray-500">Log in</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useCityRoute } from '@/composables/useCityRoute'
import { useCountdown } from '@/composables/useCountdown'
import { CITIES } from '@/constants/cities'

const { citySlug } = useCityRoute()

const cityMeta = computed(() => CITIES[citySlug.value] || CITIES.london)
const cityLabel = computed(() => cityMeta.value.label.toUpperCase())
const cityDateDisplay = computed(() => {
  const d = new Date(cityMeta.value.date)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase()
})

const targetDate = new Date(cityMeta.value.date)
const { countDown } = useCountdown(targetDate)
</script>
