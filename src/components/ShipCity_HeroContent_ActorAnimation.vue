<template>
  <div class="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none">
    <PixelActor
      v-for="pos in positions"
      :key="pos.id"
      :init-x="pos.x"
      :init-y="pos.y"
      :spawn-delay="pos.delay"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PixelActor from './ShipCity_HeroContent_ActorAnimation_PixelActor.vue'

const LAYOUT = [1, 3, 4, 6]
const H_GAP = 70
const V_GAP = 65
const ROW_DELAY_STEP = 160

const positions = ref([])

onMounted(() => {
  const screenW = window.innerWidth
  const screenH = window.innerHeight

  const centerX = screenW / 2 - 170
  const centerY = screenH * 0.004
  const result = []

  LAYOUT.forEach((count, row) => {
    const offset = ((count - 1) * H_GAP) / 2
    for (let col = 0; col < count; col++) {
      result.push({
        id: `${row}-${col}`,
        x: centerX + col * H_GAP - offset,
        y: centerY + row * V_GAP,
        delay: row * ROW_DELAY_STEP,
      })
    }
  })

  positions.value = result
})
</script>
