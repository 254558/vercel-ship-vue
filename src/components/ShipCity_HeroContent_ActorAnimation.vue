<template>
  <canvas
    ref="canvasRef"
    class="absolute top-0 left-0 w-full pointer-events-none"
    :style="{ imageRendering: 'pixelated', height: pageHeight + 'px' }"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { AgentManager } from '@/composables/useAgentCanvas'

const canvasRef = ref(null)
const pageHeight = ref(0)
let manager = null

function getPageSize() {
  return {
    w: window.innerWidth,
    h: document.documentElement.scrollHeight,
  }
}

function handleResize() {
  const { w, h } = getPageSize()
  pageHeight.value = h
  if (manager) manager.resize(w, h)
}

onMounted(async () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const { w, h } = getPageSize()
  pageHeight.value = h
  canvas.width = w
  canvas.height = h

  manager = new AgentManager(canvas)
  await manager.init()

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (manager) {
    manager.destroy()
    manager = null
  }
})
</script>
