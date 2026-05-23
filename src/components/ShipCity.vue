<template>
  <main class="relative flex flex-col h-dvh bg-black text-[#EDEDED] overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div v-for="(item, idx) in sprites" :key="idx" class="absolute w-16 h-16 bg-contain bg-no-repeat"
        :style="{ left: item.x + 'px', top: item.y + item.floatY + 'px', backgroundImage: `url(${item.img})` }"></div>
    </div>

    <header class="relative z-10 bg-black border-b-[1.8px] border-[#343232c0] h-24 flex items-center">
      <div class="w-full flex items-center justify-between px-12">
        <nav class="flex items-center gap-8 font-mono uppercase">
          <ShuffleText text="SPEAKERS" />
          <ShuffleText text="SCHEDULE" />
          <ShuffleText text="FAQ" />
        </nav>

        <div class="flex items-center gap-1">
          <span class="text-[28px] font-semibold tracking-[-2px] font-geist-sans text-white">
            Ship
          </span>
          <span
            class="px-0.5 text-xs border-[1.5px] border-white rounded font-mono cursor-pointer tracking-tight font-semibold">
            LDN
          </span>
        </div>

        <nav class="flex items-center gap-8 font-geist-mono uppercase text-sm tracking-wider">
          <span class="hover:text-white transition-colors cursor-pointer inline-flex">
            GET A TICKET
          </span>
          <!-- 直接使用组件 -->
          <ShuffleText text="LOGIN" />
        </nav>
      </div>
    </header>

    <section class="relative z-10 flex-1 flex flex-col justify-end pb-24 px-12">
      <div class="max-w-4xl">
        <h1 class="city-text mb-6">
          Ship what's next
        </h1>
        <div class="flex flex-wrap items-center gap-8 font-geist-mono text-xs uppercase text-gray-400">
          <div class="flex flex-col gap-1">
            <span>MAGAZINE</span>
            <span>LONDON</span>
          </div>
          <div class="flex flex-col gap-1">
            <span>JUNE 17</span>
            <span>{{ countDown }}</span>
          </div>
        </div>
      </div>
      <div class="absolute right-12 bottom-24 flex flex-col items-center gap-4">
        <button
          class="px-12 py-4 bg-white text-black font-geist-mono text-xl uppercase tracking-wide hover:bg-gray-200 transition-colors"
          style="clip-path: polygon(0 20%, 4% 0, 96% 0, 100% 20%, 100% 80%, 96% 100%, 4% 100%, 0 80%);">
          Get your ticket →
        </button>
        <p class="text-gray-400 font-geist-mono text-xs uppercase tracking-wider">
          ALREADY REGISTERED? <a href="#login" class="text-white hover:underline">LOG IN</a>
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ShuffleText from './ShuffleText.vue'

const countDown = ref('00D.00H.00M.00S')
const sprites = ref([])
let animId, timer

// 像素小人动画
const imgUrl = new URL('@/assets/second/front.webp', import.meta.url).href
function initSprite() {
  const list = []
  for (let i = 0; i < 8; i++) {
    list.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 300 + 150,
      floatY: 0,
      img: imgUrl
    })
  }
  sprites.value = list
}
function animate() {
  sprites.value.forEach(item => {
    item.floatY = Math.sin(Date.now() * 0.003) * 4
  })
  animId = requestAnimationFrame(animate)
}

// 倒计时逻辑
function updateTime() {
  const diff = new Date('2026-06-17') - new Date()
  if (diff <= 0) return countDown.value = '00D.00H.00M.00S'
  const d = Math.floor(diff / 86400000)
  const h = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0')
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
  countDown.value = `${d}D.${h}H.${m}M.${s}S`
}

onMounted(() => {
  initSprite()
  animate()
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  clearInterval(timer)
})
</script>