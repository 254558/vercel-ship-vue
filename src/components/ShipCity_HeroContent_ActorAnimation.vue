<template>
  <div class="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none">
    <!-- 循环渲染 14 个单独的像素人实例 -->
    <PixelActor
      v-for="(pos, index) in pyramidPositions"
      :key="index"
      :initX="pos.x"
      :initY="pos.y"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PixelActor from './PixelActor.vue'

const pyramidPositions = ref([])

function buildPositions() {
  const screenW = window.innerWidth
  const screenH = window.innerHeight

  // 金字塔中心基准点：水平居中，垂直方向 25% 处
  const centerX = screenW / 2
  const centerY = screenH * 0.25

  const hGap = 70
  const vGap = 65
  const layout = [1, 3, 4, 6]
  const positions = []

  layout.forEach((count, row) => {
    for (let col = 0; col < count; col++) {
      const offset = ((count - 1) * hGap) / 2
      positions.push({
        x: centerX + (col * hGap) - offset,
        y: centerY + (row * vGap)
      })
    }
  })

  pyramidPositions.value = positions
}

onMounted(buildPositions)
</script>

<style>
/* 确保全屏黑底干净无滚动条 */
body {
  margin: 0;
  background-color: #000;
  overflow: hidden;
}
</style>
