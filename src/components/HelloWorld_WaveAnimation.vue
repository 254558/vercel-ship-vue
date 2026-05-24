<template>
  <div class="wave-animation-container">
    <canvas ref="canvasRef" class="wave-canvas" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let ctx = null
let imgList = []
let animTimer = null
let currentFrame = 0
let isPlaying = false

// 配置项
const FRAME_COUNT = 16        // 总帧数 1~16
const FRAME_W = 260
const FRAME_H = 190
const FRAME_SPEED = 100
const REST_FRAME = 8          // 静止帧

// 循环配置：播放完1~16后，循环 7 ~ 16
const LOOP_START_FRAME = 10    // 第7张（索引从0开始）
const LOOP_END_FRAME = 15     // 第16张

function getImgSrc(idx) {
  return new URL(`../assets/first/${idx + 1}.png`, import.meta.url).href
}

async function loadImages() {
  try {
    const list = []
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = getImgSrc(i)
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })
      list.push(img)
    }
    imgList = list
  } catch (e) {
    console.error('图片加载失败', e)
  }
}

function drawFrame(idx) {
  if (!ctx || !imgList[idx]) return
  ctx.clearRect(0, 0, FRAME_W, FRAME_H)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(imgList[idx], 0, 0, FRAME_W, FRAME_H)
}

function animate() {
  if (!isPlaying) return

  drawFrame(currentFrame)
  currentFrame++

  // ==============================================
  // 核心逻辑：第一次播完 1~16 后，循环 7~16
  if (currentFrame >= FRAME_COUNT) {
    currentFrame = LOOP_START_FRAME // 跳到第7张开始循环
  }
  // ==============================================

  animTimer = setTimeout(animate, FRAME_SPEED)
}

// 开始播放（从头 1~16 开始）
function startPlay() {
  if (isPlaying) return
  isPlaying = true
  currentFrame = 0
  animate()
}

// 停止播放（回到静止帧）
function stopPlay() {
  isPlaying = false
  clearTimeout(animTimer)
  animTimer = null
  currentFrame = REST_FRAME
  drawFrame(currentFrame)
}

onMounted(async () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = FRAME_W
  canvas.height = FRAME_H
  ctx = canvas.getContext('2d')
  await loadImages()
  drawFrame(REST_FRAME)
})

onUnmounted(() => {
  stopPlay()
  imgList = []
  ctx = null
})

defineExpose({ startPlay, stopPlay })
</script>

<style scoped>
.wave-animation-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.wave-canvas {
  display: block;
  width: 230px;
  height: 210px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>