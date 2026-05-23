<template>
  <div class="relative w-screen h-full bg-black overflow-hidden">
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
import { computed } from 'vue'
import PixelActor from './PixelActor.vue'

// 计算属性：动态获取屏幕中心，并将 14 人排布为金字塔阵型
const pyramidPositions = computed(() => {
  // 获取当前屏幕可用尺寸
  const screenW = window.innerWidth
  const screenH = window.innerHeight

  // 设定金字塔的中心基准点 (屏幕中上方)
  const centerX = screenW / 2 - 40 // 减去组件宽度的一半
  const centerY = screenH / 3

  // 每一层的间距参数
  const hGap = 70  // 横向间距
  const vGap = 65  // 纵向间距

  // 完美还原图中的 14 人排列分布：每层的个数分别为 [1, 3, 4, 6]
  const layout = [1, 3, 4, 6]
  const positions = []

  layout.forEach((count, row) => {
    for (let col = 0; col < count; col++) {
      // 计算让每一层水平居中
      const offset = ((count - 1) * hGap) / 2
      positions.push({
        x: centerX + (col * hGap) - offset,
        y: centerY + (row * vGap)
      })
    }
  })

  return positions
})
</script>

<style>
/* 确保全屏黑底干净无滚动条 */
body {
  margin: 0;
  background-color: #000;
  overflow: hidden;
}
</style>
