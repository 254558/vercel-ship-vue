<template>
  <div class="wave-animation-container">
    <canvas ref="canvasRef" class="wave-canvas" width="260" height="190" />
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

const FRAME_COUNT = 16
const FRAME_W = 260
const FRAME_H = 190
const FRAME_SPEED = 100
const REST_FRAME = 8

function getImgSrc(idx) {
  return new URL(`../assets/first/${idx + 1}.png`, import.meta.url).href
}

async function loadImages() {
  const list = []
  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new Image()
    img.src = getImgSrc(i)
    await new Promise(resolve => { img.onload = resolve })
    list.push(img)
  }
  imgList = list
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
  if (currentFrame >= FRAME_COUNT) {
    currentFrame = 0
    stopPlay()
    return
  }
  animTimer = setTimeout(animate, FRAME_SPEED)
}

function startPlay() {
  if (isPlaying) return
  isPlaying = true
  currentFrame = 0
  animate()
}

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
  ctx = canvas.getContext('2d')
  await loadImages()
  drawFrame(REST_FRAME)
})

onUnmounted(() => stopPlay())

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
