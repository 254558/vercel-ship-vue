<template>
  <span
    class="hover:text-white transition-colors cursor-pointer inline-flex"
    @mouseenter="startShuffle"
    @mouseleave="resetShuffle"
  >
    <span v-for="(char, i) in showChars" :key="i">{{ char }}</span>
  </span>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { CHAR_POOL, SHUFFLE_TEXT_FRAME_RATE, SHUFFLE_TEXT_DELAY_PER_CHAR, SHUFFLE_TEXT_DURATION } from '@/constants/shuffle'

const props = defineProps({
  text: { type: String, required: true }
})

const showChars = ref(props.text.split(''))
let shuffleTimer = null

function startShuffle() {
  clearInterval(shuffleTimer)

  const originArr = props.text.split('')
  const len = originArr.length
  showChars.value = [...originArr]

  let ticks = 0

  shuffleTimer = setInterval(() => {
    let allFinished = true

    showChars.value = originArr.map((ch, idx) => {
      const startFrame = idx * SHUFFLE_TEXT_DELAY_PER_CHAR
      const endFrame = startFrame + SHUFFLE_TEXT_DURATION

      if (ticks < startFrame) return ch
      if (ticks < endFrame) {
        allFinished = false
        return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)]
      }
      return ch
    })

    ticks++

    if (allFinished && ticks > len * SHUFFLE_TEXT_DELAY_PER_CHAR + SHUFFLE_TEXT_DURATION) {
      clearInterval(shuffleTimer)
    }
  }, SHUFFLE_TEXT_FRAME_RATE)
}

function resetShuffle() {
  clearInterval(shuffleTimer)
  showChars.value = props.text.split('')
}

onUnmounted(() => clearInterval(shuffleTimer))
</script>
