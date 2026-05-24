<template>
  <template v-if="visible">
    <img
      ref="actorRef"
      :src="bodyImgSrc"
      class="absolute top-0 left-0 h-[250px] w-auto select-none"
      :style="{
        transform: `translate(${x}px, ${y}px)`,
        imageRendering: 'pixelated',
        zIndex: Math.floor(y)
      }"
      draggable="false"
    />
    <img
      v-if="showFace"
      :src="faceImgSrc"
      class="absolute top-0 left-0 h-[250px] w-auto pointer-events-none select-none"
      :style="{
        transform: `translate(${x}px, ${y}px)`,
        imageRendering: 'pixelated',
        zIndex: Math.floor(y) + 1
      }"
      draggable="false"
    />
  </template>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  initX: Number,
  initY: Number,
  spawnDelay: Number,
})

const ASSETS = '/second/'
const FRONT_DIRS = ['front', 'frontLeft', 'frontRight']

const SPRITES = {
  walk: {
    front: 'front.webp', frontLeft: 'frontLeft.webp', frontRight: 'frontRight.webp',
    back: 'back.webp', backLeft: 'backLeft.webp', backRight: 'backRight.webp',
    left: 'left.webp', right: 'right.webp',
  },
  face: {
    front: ['Expresions_Front.webp', 'Expresions_Front_Normal.webp', 'Expresions_Front_Excited.webp', 'Expresions_Front_Confused.webp'],
    frontLeft: ['Expresions_FrontLeft.webp', 'Expresions_FrontLeft_Normal.webp', 'Expresions_FrontLeft_Excited.webp', 'Expresions_FrontLeft_Confused.webp'],
    frontRight: ['Expresions_FrontRight.webp', 'Expresions_FrontRight_Normal.webp', 'Expresions_FrontRight_Excited.webp', 'Expresions_FrontRight_Confused.webp'],
  },
  action: {
    front: ['Isometric_Front_Celebrate.webp', 'Isometric_Front_Thinking.webp', 'Isometric_Front_HighFive.webp', 'Isometric_Front_TypeDance2.webp', 'Isometric_Front_TypeDance3.webp'],
    frontLeft: ['Isometric_FrontLeft_Celebrate.webp', 'Isometric_FrontLeft_HighFive.webp', 'Isometric_FrontLeft_TypeDance.webp', 'Isometric_FrontLeft_TypeDance4.webp'],
    frontRight: ['Isometric_FrontRight_Thinking.webp', 'Isometric_FrontRight_HighFive.webp', 'Isometric_FrontRight_TypeDance.webp', 'Isometric_FrontRight_TypeDance2.webp', 'Isometric_FrontRight_TypeDance3.webp', 'Isometric_FrontRight_TypeDance4.webp'],
    back: ['Isometric_Back_HighFive.webp'],
    backLeft: ['Isometric_BackLeft_HighFive.webp'],
    backRight: ['Isometric_BackRight_HighFive.webp'],
    left: ['Isometric_FrontLeft_Celebrate.webp', 'Isometric_FrontLeft_TypeDance4.webp'],
    right: ['Isometric_FrontRight_Thinking.webp', 'Isometric_FrontRight_TypeDance4.webp'],
  },
  spawn: 'Isometric_Front_AgentSpawn.webp',
}

// ── 工具 ──
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ── 位置与方向 ──
const visible = ref(false)
const actorRef = ref(null)
const x = ref(props.initX)
const y = ref(props.initY)
const dirX = ref(0)
const dirY = ref(0)
const lastMoveDir = ref('front')
const speed = 1.5 + Math.random() * 1.5

const dirType = computed(() => {
  const dx = dirX.value, dy = dirY.value
  if (dx === 0 && dy === 0) return lastMoveDir.value
  if (dx === 0 && dy > 0) return 'front'
  if (dx === 0 && dy < 0) return 'back'
  if (dx < 0 && dy === 0) return 'left'
  if (dx > 0 && dy === 0) return 'right'
  if (dx < 0 && dy > 0) return 'frontLeft'
  if (dx > 0 && dy > 0) return 'frontRight'
  if (dx < 0 && dy < 0) return 'backLeft'
  return 'backRight'
})

function randomizeDir() {
  const dirs = [[0, 1], [0, -1], [-1, 0], [1, 0], [-1, 1], [1, 1], [-1, -1], [1, -1]]
  const [dx, dy] = pick(dirs)
  dirX.value = dx
  dirY.value = dy
  lastMoveDir.value = dirType.value
}

// ── 精灵图与表情 ──
const currentBodySrc = ref('')
const faceSrc = ref('')
const showFace = ref(false)
const timestamp = ref(0)

const bodyImgSrc = computed(() =>
  currentBodySrc.value ? `${ASSETS}${currentBodySrc.value}?v=${timestamp.value}` : ''
)
const faceImgSrc = computed(() =>
  faceSrc.value ? `${ASSETS}${faceSrc.value}` : ''
)

function setBody(src) {
  currentBodySrc.value = src
  timestamp.value = Date.now()
}

function showRandomFace(dir) {
  const list = SPRITES.face[dir] || SPRITES.face.front
  faceSrc.value = pick(list)
  showFace.value = true
  clearTimeout(faceTimer)
  faceTimer = setTimeout(() => { showFace.value = false }, 800 + Math.random() * 1200)
}

function hideFace() {
  showFace.value = false
  clearTimeout(faceTimer)
}

function isDancing() {
  return currentBodySrc.value.includes('TypeDance')
}

// ── 状态机 ──
const state = ref('spawn')
let stateLocked = false
let lastIdleTime = 0
let moveTimer = null
let behaviorTimer = null
let faceTimer = null

function updateWalkSprite() {
  const dir = dirType.value
  setBody(SPRITES.walk[dir])
  if (FRONT_DIRS.includes(dir)) {
    if (Math.random() < 0.08) showRandomFace(dir)
  } else {
    hideFace()
  }
}

function startWalking() {
  clearInterval(moveTimer)
  state.value = 'walking'
  hideFace()
  updateWalkSprite()

  moveTimer = setInterval(() => {
    if (state.value !== 'walking') return
    const el = actorRef.value
    if (!el) return

    const pw = window.innerWidth
    const ph = window.innerHeight
    const w = el.offsetWidth
    const h = el.offsetHeight

    let bounced = false
    if (x.value <= 0) { dirX.value = 1; bounced = true }
    if (x.value >= pw - w) { dirX.value = -1; bounced = true }
    if (y.value <= 0) { dirY.value = 1; bounced = true }
    if (y.value >= ph - h * 1.2) { dirY.value = -1; bounced = true }

    x.value += dirX.value * speed
    y.value += dirY.value * speed
    lastMoveDir.value = dirType.value

    if (bounced) updateWalkSprite()
  }, 40)
}

function startLookAround() {
  if (stateLocked) return
  stateLocked = true

  dirX.value = 0
  dirY.value = 0
  state.value = 'lookAround'

  const dir = pick(FRONT_DIRS)
  lastMoveDir.value = dir
  setBody(SPRITES.walk[dir])
  showRandomFace(dir)

  setTimeout(() => {
    stateLocked = false
    hideFace()
    randomizeDir()
    startWalking()
    startBehaviorLoop()
  }, 1500 + Math.random() * 2000)
}

function startIdle() {
  if (stateLocked) return
  stateLocked = true
  clearInterval(moveTimer)

  const dir = dirType.value
  lastMoveDir.value = dir
  dirX.value = 0
  dirY.value = 0
  state.value = 'idle'

  const acts = SPRITES.action[dir] || []
  if (acts.length > 0) setBody(pick(acts))

  if (!isDancing() && FRONT_DIRS.includes(dir)) {
    showRandomFace(dir)
  } else {
    hideFace()
  }

  setTimeout(() => {
    hideFace()
    randomizeDir()
    stateLocked = false
    startWalking()
  }, 2000 + Math.random() * 2000)
}

function startBehaviorLoop() {
  clearInterval(behaviorTimer)
  behaviorTimer = setInterval(() => {
    const now = Date.now()
    if (state.value === 'walking' && !stateLocked && now - lastIdleTime > 5000 + Math.random() * 5000 && Math.random() > 0.5) {
      lastIdleTime = now
      startIdle()
    }
  }, 1000)
}

// ── 生命周期 ──
onMounted(() => {
  setTimeout(() => {
    visible.value = true
    setBody(SPRITES.spawn)
    state.value = 'spawn'

    setTimeout(() => { startLookAround() }, 1000)
  }, props.spawnDelay)
})

onUnmounted(() => {
  clearInterval(moveTimer)
  clearInterval(behaviorTimer)
  clearTimeout(faceTimer)
})
</script>
