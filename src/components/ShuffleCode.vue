<!-- components/ShuffleCode.vue -->
<template>
  <div class="relative h-5">
    <div
      class="absolute left-0 top-0 h-5 border border-white rounded-sm flex items-center justify-center px-[4px] transition-all duration-200"
      :class="targetText.length === 1 ? 'w-[21px]' : targetText.length === 2 ? 'w-[26px]' : 'w-[32px]'"
    >
      <span class="font-mono uppercase text-xs font-semibold text-white">{{ displayText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

// 默认显示 26
const targetText = ref('26')
const displayText = ref('26')
let shuffleTimer = null

// 随机大写字母
const getRandomChar = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return letters[Math.floor(Math.random() * letters.length)]
}

// 生成对应长度的随机字符串
const getRandomByLength = (len) => {
  return Array(len).fill(0).map(() => getRandomChar()).join('')
}

// 开始洗牌
const startShuffle = (finalText) => {
  clearInterval(shuffleTimer)
  targetText.value = finalText
  const len = finalText.length
  let step = 0
  const maxStep = 12

  shuffleTimer = setInterval(() => {
    if (step < maxStep) {
      displayText.value = getRandomByLength(len)
      step++
    } else {
      displayText.value = finalText
      clearInterval(shuffleTimer)
    }
  }, 35)
}

// 重置回 26
const resetShuffle = () => {
  clearInterval(shuffleTimer)
  targetText.value = '26'
  displayText.value = '26'
}

// 暴露方法给父组件调用
defineExpose({
  startShuffle,
  resetShuffle
})

// 清理定时器
onUnmounted(() => clearInterval(shuffleTimer))
</script>