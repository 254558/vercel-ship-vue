<template>
  <div class="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none">
    <PixelActor
      v-for="(pos, index) in pyramidPositions"
      :key="index"
      :init-x="pos.x"
      :init-y="pos.y"
      :spawn-delay="pos.delay"  
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PixelActor from './PixelActor.vue'

const pyramidPositions = computed(() => {
  const screenW = window.innerWidth
  const screenH = window.innerHeight

  const centerX = screenW / 2 -170
  const centerY = screenH * 0.004

  const hGap = 70
  const vGap = 65
  const layout = [1, 3, 4, 6] // 4行：1、3、4、6个
  const positions = []

  // 每行出场间隔：600ms
  const rowDelay = [0, 200, 400, 600]

  layout.forEach((count, row) => {
    for (let col = 0; col < count; col++) {
      const offset = ((count - 1) * hGap) / 2
      positions.push({
        x: centerX + (col * hGap) - offset,
        y: centerY + (row * vGap),
        delay: rowDelay[row], // 按行分配延迟
      })
    }
  })

  return positions
})
</script>

<style>
body {
  margin: 0;
  background-color: #000;
  overflow: hidden;
}
</style>