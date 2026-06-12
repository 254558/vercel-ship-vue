<template>
  <div class="relative h-5">
    <div
      class="absolute border-[1.5px] border-white rounded-sm flex items-center justify-center transition-all duration-200"
      :class="targetText.length === 1 ? 'w-[21px]' : targetText.length === 2 ? 'w-[26px]' : 'w-[32px]'"
    >
      <span class="font-mono uppercase text-xs font-semibold text-white">{{ displayText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { CHAR_POOL, SHUFFLE_CODE_MAX_STEPS, SHUFFLE_CODE_STEP_INTERVAL } from '@/constants/shuffle'

const DEFAULT_TEXT = '26'

const targetText = ref(DEFAULT_TEXT)
const displayText = ref(DEFAULT_TEXT)
let shuffleTimer = null

function randomChars(len) {
  return Array.from({ length: len }, () =>
    CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)]
  ).join('')
}

function startShuffle(finalText) {
  targetText.value = finalText
  let step = 0

  shuffleTimer = setInterval(() => {
    if (step < SHUFFLE_CODE_MAX_STEPS) {
      displayText.value = randomChars(finalText.length)
      step++
    } else {
      displayText.value = finalText
      clearInterval(shuffleTimer)
    }
  }, SHUFFLE_CODE_STEP_INTERVAL)
}

function resetShuffle() {
  clearInterval(shuffleTimer)
  targetText.value = DEFAULT_TEXT
  displayText.value = DEFAULT_TEXT
}

defineExpose({ startShuffle, resetShuffle })

onUnmounted(() => clearInterval(shuffleTimer))
</script>
