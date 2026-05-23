<!-- components/ShuffleText.vue -->
<template>
  <span
    class="hover:text-white transition-colors cursor-pointer inline-flex"
    @mouseenter="startShuffle"
    @mouseleave="resetShuffle"
  >
    <span v-for="(char, i) in showChars" :key="i">
      {{ char }}
    </span>
  </span>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'

// 接收父组件传入的原始文字
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

// 字符状态
const showChars = ref(props.text.split(''))
const shuffleTimer = ref(null)

// 随机字符池
const charPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// 波浪式洗牌
const startShuffle = () => {
  clearInterval(shuffleTimer.value)
  
  const originArr = props.text.split('')
  const len = originArr.length
  showChars.value = [...originArr]
  
  let ticks = 0
  const FRAME_RATE = 30
  const DELAY_PER_CHAR = 1
  const SHUFFLE_DURATION = 2

  shuffleTimer.value = setInterval(() => {
    let allFinished = true

    const nextChars = showChars.value.map((c, idx) => {
      const startFrame = idx * DELAY_PER_CHAR
      const endFrame = startFrame + SHUFFLE_DURATION

      if (ticks < startFrame) {
        return originArr[idx]
      } else if (ticks >= startFrame && ticks < endFrame) {
        allFinished = false
        return charPool[Math.floor(Math.random() * charPool.length)]
      } else {
        return originArr[idx]
      }
    })

    showChars.value = nextChars
    ticks++

    if (allFinished && ticks > len * DELAY_PER_CHAR + SHUFFLE_DURATION) {
      clearInterval(shuffleTimer.value)
    }
  }, FRAME_RATE)
}

// 重置文字
const resetShuffle = () => {
  clearInterval(shuffleTimer.value)
  showChars.value = props.text.split('')
}

// 销毁定时器
onUnmounted(() => {
  clearInterval(shuffleTimer.value)
})
</script>