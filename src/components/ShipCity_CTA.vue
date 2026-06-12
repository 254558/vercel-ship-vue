<template>
  <div class="col-span-full relative flex items-center mt-40 justify-center">
    <div class="aspect-[40/10] w-[65vw]">
      <router-link
        :to="`/ship/${citySlug}/register`"
        class="overflow-hidden whitespace-nowrap select-none inline-flex items-center justify-center cursor-pointer px-5 relative h-auto aspect-[40/10] w-[65vw] gap-[3%] text-[calc(24px+(96-24)*((100vw-375px)/(1920-375)))] text-center normal-case no-underline font-medium tracking-[-0.06em] [&>svg]:h-auto! [&>svg]:w-[6%]! font-pixel-circle text-black [-webkit-text-stroke:0.02rem_currentColor] bg-white hover:bg-white [clip-path:polygon(16px_0,calc(100%-16px)_0,calc(100%-16px)_16px,100%_16px,100%_calc(100%-16px),calc(100%-16px)_calc(100%-16px),calc(100%-16px)_100%,16px_100%,16px_calc(100%-16px),0_calc(100%-16px),0_16px,16px_16px)] hover:[clip-path:polygon(96px_0,calc(100%-96px)_0,calc(100%-96px)_16px,calc(100%-48px)_16px,calc(100%-48px)_32px,calc(100%-32px)_32px,calc(100%-32px)_48px,calc(100%-16px)_48px,calc(100%-16px)_80px,calc(100%-16px)_96px,100%_96px,100%_calc(100%-96px),calc(100%-16px)_calc(100%-96px),calc(100%-16px)_calc(100%-80px),calc(100%-16px)_calc(100%-48px),calc(100%-32px)_calc(100%-48px),calc(100%-32px)_calc(100%-32px),calc(100%-48px)_calc(100%-32px),calc(100%-48px)_calc(100%-16px),calc(100%-96px)_calc(100%-16px),calc(100%-96px)_100%,96px_100%,96px_calc(100%-16px),48px_calc(100%-16px),48px_calc(100%-32px),32px_calc(100%-32px),32px_calc(100%-48px),16px_calc(100%-48px),16px_calc(100%-80px),16px_calc(100%-96px),0_calc(100%-96px),0_96px,16px_96px,16px_80px,16px_48px,32px_48px,32px_32px,48px_32px,48px_16px,96px_16px)]"
      >
        <span class="inline-flex items-center gap-[0.12em]">Get your ticket<span aria-hidden="true">→</span></span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCityRoute } from '@/composables/useCityRoute'

const { citySlug } = useCityRoute()
</script>
