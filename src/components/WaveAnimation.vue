<template>
  <div class="wave-animation-container">
    <canvas
      ref="canvasRef"
      class="wave-canvas"
      width="260"
      height="190"
    ></canvas>
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

const frameCount = 16
const frameW = 260
const frameH = 190
const speed = 100

const frameSequence = Array.from({ length: 16 }, (_, i) => i)

function getImgSrc(idx) {
  return new URL(`../assets/first/${idx + 1}.png`, import.meta.url).href
}

async function loadImages() {
  const list = []
  for (let i = 0; i < frameCount; i++) {
    const img = new Image()
    img.src = getImgSrc(i)
    await new Promise(resolve => { img.onload = resolve })
    list.push(img)
  }
  imgList = list
}

function drawFrame(idx) {
  if (!ctx || !imgList[idx]) return
  ctx.clearRect(0, 0, frameW, frameH)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(imgList[idx], 0, 0, frameW, frameH)
}

function animate() {
  if (!isPlaying) return
  drawFrame(currentFrame)
  currentFrame++
  if (currentFrame >= frameCount) {
    currentFrame = 0
    stopPlay()
    return
  }
  animTimer = setTimeout(animate, speed)
}

const startPlay = () => {
  if (isPlaying) return
  isPlaying = true
  currentFrame = 0
  animate()
}

const stopPlay = () => {
  isPlaying = false
  clearTimeout(animTimer)
  animTimer = null
  currentFrame = 8
  drawFrame(currentFrame)
}

onMounted(async () => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  await loadImages()
  drawFrame(8)
})

onUnmounted(() => {
  stopPlay()
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