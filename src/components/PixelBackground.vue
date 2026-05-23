<template>
  <div class="w-full h-full relative">
    <canvas ref="canvas" class="w-full h-full" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animationId = null // 用于取消动画

// 预加载所有图片（核心优化）
const sprites = [
  { src: '/src/assets/second/front.webp', x: 100, y: 200, speed: 1, img: null },
  { src: '/src/assets/second/frontLeft.webp', x: 300, y: 350, speed: 1.2, img: null },
  { src: '/src/assets/second/frontRight.webp', x: 500, y: 280, speed: 0.9, img: null },
  { src: '/src/assets/second/back.webp', x: 800, y: 400, speed: 1.1, img: null },
  { src: '/src/assets/second/backLeft.webp', x: 950, y: 220, speed: 0.8, img: null },
  { src: '/src/assets/second/backRight.webp', x: 1100, y: 320, speed: 1.3, img: null },
]

// 预加载图片函数
async function preloadImages() {
  const promises = sprites.map(spr => {
    return new Promise(resolve => {
      const img = new Image()
      img.src = spr.src
      img.onload = () => {
        spr.img = img // 保存到 sprite 对象
        resolve()
      }
    })
  })
  await Promise.all(promises)
}

function startAnim() {
  const c = canvas.value
  c.width = window.innerWidth
  c.height = window.innerHeight
  ctx = c.getContext('2d')

  let time = 0
  function loop() {
    // 清空画布
    ctx.clearRect(0, 0, c.width, c.height)

    // 直接绘制已加载好的图片，不再重复创建
    sprites.forEach((spr, i) => {
      if (!spr.img) return
      const oy = Math.sin(time * spr.speed + i) * 8
      ctx.drawImage(spr.img, spr.x, spr.y + oy, 64, 64)
    })

    time += 0.03
    animationId = requestAnimationFrame(loop)
  }
  loop()
}

// 窗口大小变化重绘 canvas
function resizeCanvas() {
  if (!canvas.value || !ctx) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

onMounted(async () => {
  await preloadImages() // 先加载完所有图片
  startAnim()
  
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  // 组件销毁时停止动画，防止内存泄漏
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>