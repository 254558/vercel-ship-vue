<template>
  <main class="flex flex-col h-dvh bg-black text-[#EDEDED]">
    <header class="relative z-10 bg-black border-b-[1.8px] border-[#343232c0] h-24 flex items-center">
      <div class="w-full flex items-center relative">
        <span class="font-mono uppercase text-base ml-18">
          Choose your city:
        </span>

        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
          <span class="text-[28px] font-semibold tracking-[-2px]">
            Ship
          </span>
          <ShuffleCode ref="shuffleRef" />
        </div>
      </div>
    </header>

    <nav class="relative z-20 flex-1 overflow-auto">
      <ul class="grid grid-rows-5 h-full w-full group/list">
        <li
          v-for="(city, i) in cityList"
          :key="city.path"
          class="city-item group/item relative"

          :class="{ 'border-b-0': i === cityList.length - 1 }"

          @mouseenter="handleEnter(i, city.code)"
          @mouseleave="handleLeave(i)"
          @click="router.push(city.path)"
        >
          <div class="flex w-full items-center justify-between relative cursor-pointer">
            <span class="city-text">
              {{ city.label }},
              <span :data-ship-date="city.date">{{ city.dateText }}</span>
            </span>

            <span class="ship-icon relative z-50 w-[280px] h-[200px] flex items-center justify-center overflow-visible -translate-y-9">
              <WaveAnimation
                ref="waveRefList"
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
            </span>
          </div>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cityList } from '@/constants/cities'
import ShuffleCode from './HelloWorld_ShuffleCode.vue'
import WaveAnimation from './HelloWorld_WaveAnimation.vue'

const router = useRouter()

const shuffleRef = ref(null)
const waveRefList = ref([])

const handleEnter = (idx, code) => {
  shuffleRef.value?.startShuffle(code)
  waveRefList.value[idx]?.startPlay()
}

const handleLeave = (idx) => {
  shuffleRef.value?.resetShuffle()
  waveRefList.value[idx]?.stopPlay()
}
</script>
