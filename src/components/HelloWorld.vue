<template>
  <main class="flex flex-col h-dvh bg-black text-[#EDEDED]">
    
    <!-- header -->
    <header
      class="relative z-10 bg-black border-b-[1.8px] border-[#343232c0] h-24 flex items-center"
    >
      <div class="w-full flex items-center relative">
        <span class="font-mono uppercase text-base ml-18">
          Choose your city:
        </span>

        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1"
        >
          <span class="text-[28px] font-semibold tracking-[-2px]">
            Ship
          </span>

          <ShuffleCode ref="shuffleRef" />
        </div>
      </div>
    </header>

    <!-- nav -->
    <nav class="relative z-20 flex-1 overflow-auto">
      <ul class="grid grid-rows-5 h-full w-full group/list">
        
        <li
          v-for="(city, i) in cityList"
          :key="city.path"
          class="city-item hover:city-item-hover group/item relative"
          :class="{ 'border-b-0': i === cityList.length - 1 }"
          @mouseenter="handleEnter(i, city.code)"
          @mouseleave="handleLeave(i)"
          @click="goToCity(city.path)"
        >
          <div
            class="flex w-full items-center justify-between relative cursor-pointer"
          >
            <span class="city-text">
              {{ city.label }},
              <span :data-ship-date="city.date">
                {{ city.dateText }}
              </span>
            </span>

            <span
              class="ship-icon relative z-50 w-[280px] h-[200px] flex items-center justify-center overflow-visible -translate-y-9"
            >
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
import ShuffleCode from './HelloWorld_ShuffleCode.vue'
import WaveAnimation from './HelloWorld_WaveAnimation.vue'

const router = useRouter()

const cityList = [
  {
    label: 'London',
    dateText: '06.17',
    date: '2026-06-17',
    path: '/ship/london',
    code: 'LDN'
  },
  {
    label: 'Berlin',
    dateText: '06.25',
    date: '2026-06-25',
    path: '/ship/berlin',
    code: 'BER'
  },
  {
    label: 'New York City',
    dateText: '06.30',
    date: '2026-06-30',
    path: '/ship/nyc',
    code: 'NYC'
  },
  {
    label: 'Sydney',
    dateText: '07.30',
    date: '2026-07-30',
    path: '/ship/sydney',
    code: 'SYD'
  },
  {
    label: 'San Francisco',
    dateText: '10.15',
    date: '2026-10-15',
    path: '/ship/sf',
    code: 'SF'
  }
]

const goToCity = (path) => {
  router.push(path)
}

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

<style scoped>
.city-item {
  border-bottom: 1.8px solid #343232c0;
}

.city-item-hover {
  background-color: rgba(52, 50, 50, 0.2);
}

.ship-icon {
  position: relative;
  z-index: 50;
  overflow: visible;
}

header {
  position: relative;
  z-index: 10;
}
</style>