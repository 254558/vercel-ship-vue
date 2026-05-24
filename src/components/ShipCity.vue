<template>
  <main class="relative flex flex-col bg-black text-[#EDEDED]">
    <header class="relative z-20 bg-black h-24 flex items-center shrink-0">
      <div class="w-full flex items-center justify-between px-12">
        <nav class="flex items-center gap-8 font-mono uppercase">
          <ShuffleText text="SPEAKERS" />
          <ShuffleText text="SCHEDULE" />
          <ShuffleText text="FAQ" />
        </nav>

        <div class="flex items-center mr-17 gap-1">
          <span class="text-[28px] font-semibold tracking-[-2px] font-geist-sans text-white">
            Ship
          </span>
          <span
            class="px-0.5 text-xs border-[1.5px] border-white rounded font-mono cursor-pointer tracking-tight font-semibold"
          >
            {{ cityCode }}
          </span>
        </div>

        <nav class="flex items-center gap-8 font-geist-mono uppercase text-sm tracking-wider">
          <span class="hover:text-white transition-colors cursor-pointer inline-flex">
            GET A TICKET
          </span>
          <ShuffleText text="LOGIN" />
        </nav>
      </div>
    </header>

    <div class="relative h-[calc(100dvh-6rem)] flex flex-col shrink-0">
      <ActorAnimation />
      <HeroContent />
    </div>
    <FeaturedSpeakers />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ShuffleText from './ShipCity_ShuffleText.vue'
import HeroContent from './ShipCity_HeroContent.vue'
import ActorAnimation from './ShipCity_HeroContent_ActorAnimation.vue'
import FeaturedSpeakers from './ShipCity_FeaturedSpeakers.vue'

const route = useRoute()
const cityCode = computed(() => route.meta.code || 'LDN')
</script>
