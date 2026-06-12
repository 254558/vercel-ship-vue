<template>
  <main class="relative flex flex-col bg-black text-[#EDEDED]">
    <header class="relative z-20 bg-black h-24 flex items-center shrink-0">
      <div class="w-full flex items-center justify-between px-12">
        <nav class="flex items-center gap-8 font-mono uppercase">
          <ShuffleText text="SPEAKERS" />
          <ShuffleText text="SCHEDULE" />
          <ShuffleText text="FAQ" />
        </nav>

        <ShipLogo :city-code="cityCode" />

        <nav class="flex items-center gap-8 font-geist-mono uppercase text-sm tracking-wider">
          <span class="hover:text-white transition-colors cursor-pointer inline-flex">
            GET A TICKET
          </span>
          <ShuffleText text="LOGIN" />
        </nav>
      </div>
    </header>

    <ActorAnimation />
    <div class="relative h-[calc(100dvh-6rem)] flex flex-col shrink-0">
      <HeroContent />
    </div>
    <FeaturedSpeakers />
    <FeaturedSessions />
    <CTA />
    <FAQ />
  </main>
</template>

<script setup>
import { useCityRoute } from '@/composables/useCityRoute'
import ShipLogo from './ShipLogo.vue'
import ShuffleText from './ShipCity_ShuffleText.vue'
import HeroContent from './ShipCity_HeroContent.vue'
import ActorAnimation from './ShipCity_HeroContent_ActorAnimation.vue'
import FeaturedSpeakers from './ShipCity_FeaturedSpeakers.vue'
import FeaturedSessions from './ShipCity_FeaturedSessions.vue'
import CTA from './ShipCity_CTA.vue'
import FAQ from './ShipCity_FAQ.vue'

const { cityCode } = useCityRoute()
</script>
