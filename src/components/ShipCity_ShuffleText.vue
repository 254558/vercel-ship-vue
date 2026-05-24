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

const props = defineProps({
  text: { type: String, required: true }
})

const showChars = ref(props.text.split(''))
let shuffleTimer = null

const CHAR_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const FRAME_RATE = 30
const DELAY_PER_CHAR = 1
const SHUFFLE_DURATION = 2

function startShuffle() {
  clearInterval(shuffleTimer)

  const originArr = props.text.split('')
  const len = originArr.length
  showChars.value = [...originArr]

  let ticks = 0

  shuffleTimer = setInterval(() => {
    let allFinished = true

    showChars.value = originArr.map((ch, idx) => {
      const startFrame = idx * DELAY_PER_CHAR
      const endFrame = startFrame + SHUFFLE_DURATION

      if (ticks < startFrame) return ch
      if (ticks < endFrame) {
        allFinished = false
        return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)]
      }
      return ch
    })

    ticks++

    if (allFinished && ticks > len * DELAY_PER_CHAR + SHUFFLE_DURATION) {
      clearInterval(shuffleTimer)
    }
  }, FRAME_RATE)
}

function resetShuffle() {
  clearInterval(shuffleTimer)
  showChars.value = props.text.split('')
}

onUnmounted(() => clearInterval(shuffleTimer))
</script>
