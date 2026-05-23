<template>
  <div class="w-full h-full absolute inset-0 pointer-events-none"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let basisModule = null
let animInstances = []

// 动画素材路径
const animSources = [
  '/assets/second/front.webp',
  '/assets/second/frontLeft.webp',
  '/assets/second/frontRight.webp',
  '/assets/second/back.webp',
  '/assets/second/backLeft.webp',
  '/assets/second/backRight.webp'
]

// 初始化Basis解码器
const initBasis = async () => {
  if (!window.BASIS) return
  basisModule = await window.BASIS()
  loadAllAnim()
}

// 加载并驱动动画
const loadAllAnim = () => {
  animSources.forEach(src => {
    // 此处对接纹理解码、画布渲染、帧动画循环逻辑
    console.log('加载动画资源：', src)
  })
}

onMounted(() => {
  initBasis()
})

onUnmounted(() => {
  animInstances = []
})
</script>