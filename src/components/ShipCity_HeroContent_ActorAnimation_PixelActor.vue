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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  initX: Number,
  initY: Number,
  spawnDelay: Number,
  speed: { type: Number, default: 0.12 },
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
    front: {
      emote: ['Isometric_Front_Celebrate.webp', 'Isometric_Front_Thinking.webp', 'Isometric_Front_HighFive.webp'],
      dance: ['Isometric_Front_TypeDance2.webp', 'Isometric_Front_TypeDance3.webp'],
    },
    frontLeft: {
      emote: ['Isometric_FrontLeft_Celebrate.webp', 'Isometric_FrontLeft_HighFive.webp'],
      dance: ['Isometric_FrontLeft_TypeDance.webp', 'Isometric_FrontLeft_TypeDance4.webp'],
    },
    frontRight: {
      emote: ['Isometric_FrontRight_Thinking.webp', 'Isometric_FrontRight_HighFive.webp'],
      dance: ['Isometric_FrontRight_TypeDance.webp', 'Isometric_FrontRight_TypeDance2.webp', 'Isometric_FrontRight_TypeDance3.webp', 'Isometric_FrontRight_TypeDance4.webp'],
    },
    back: {
      emote: ['Isometric_Back_HighFive.webp'],
    },
    backLeft: {
      emote: ['Isometric_BackLeft_HighFive.webp'],
    },
    backRight: {
      emote: ['Isometric_BackRight_HighFive.webp'],
    },
    left: {
      emote: ['Isometric_FrontLeft_Celebrate.webp'],
      dance: ['Isometric_FrontLeft_TypeDance4.webp'],
    },
    right: {
      emote: ['Isometric_FrontRight_Thinking.webp'],
      dance: ['Isometric_FrontRight_TypeDance4.webp'],
    },
  },
  spawn: 'Isometric_Front_AgentSpawn.webp',
}

// ── 工具 ──
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ── 精灵图与表情 ──
const currentSpriteKey = ref('')
const currentBodySrc = ref('')
const faceSrc = ref('')
const showFace = ref(false)

const bodyImgSrc = computed(() =>
  currentBodySrc.value ? `${ASSETS}${currentBodySrc.value}` : ''
)
const faceImgSrc = computed(() =>
  faceSrc.value ? `${ASSETS}${faceSrc.value}` : ''
)

function setSprite(key, src) {
  if (currentSpriteKey.value === key) return
  currentSpriteKey.value = key
  currentBodySrc.value = src
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

// ── 位置与方向 ──
const visible = ref(false)
const actorRef = ref(null)
const x = ref(props.initX)
const y = ref(props.initY)
const dirX = ref(0)
const dirY = ref(0)
const lastMoveDir = ref('front')
const isMoving = ref(false)
// px/ms, 0.12 = 120px/s

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

// ── 动画层 ──
const ANIMATION_MAP = {
  spawn: 'spawn',
  lookAround: 'lookAround',
  walking: 'walk',
  idle: 'idle',
}

let idleActionType = ''

function playAnimation(name, dir = dirType.value) {
  switch (name) {
    case 'walk':
      setSprite(`walk_${dir}`, SPRITES.walk[dir])
      if (FRONT_DIRS.includes(dir) && Math.random() < 0.08) showRandomFace(dir)
      else hideFace()
      break
    case 'idle': {
      const actions = SPRITES.action[dir]
      if (actions) {
        const categories = Object.keys(actions)
        const cat = pick(categories)
        idleActionType = cat
        setSprite(`idle_${dir}_${cat}`, pick(actions[cat]))
      } else {
        setSprite(`idle_${dir}_emote`, SPRITES.walk[dir])
        idleActionType = 'emote'
      }
      if (idleActionType !== 'dance' && FRONT_DIRS.includes(dir)) showRandomFace(dir)
      else hideFace()
      break
    }
    case 'lookAround':
      setSprite(`lookAround_${dir}`, SPRITES.walk[dir])
      if (FRONT_DIRS.includes(dir)) showRandomFace(dir)
      else hideFace()
      break
    case 'spawn':
      setSprite('spawn', SPRITES.spawn)
      hideFace()
      break
  }
}

// ── FSM ──
const TRANSITIONS = {
  spawn:      ['lookAround'],
  lookAround: ['walking'],
  walking:    ['idle'],
  idle:       ['walking'],
}

const STATES = {
  spawn: {
    enter() {},
    exit() {},
  },
  lookAround: {
    enter() {
      const dir = pick(FRONT_DIRS)
      lastMoveDir.value = dir
      isMoving.value = false
    },
    exit() {
      hideFace()
    },
  },
  walking: {
    enter() {
      randomizeDir()
      isMoving.value = true
    },
    exit() {
      isMoving.value = false
    },
  },
  idle: {
    enter() {
      const dir = dirType.value
      lastMoveDir.value = dir
      isMoving.value = false
    },
    exit() {
      hideFace()
    },
  },
}

const state = ref('spawn')
let idleTimer = null
let lookAroundTimer = null

function transitionTo(newState) {
  if (!TRANSITIONS[state.value]?.includes(newState)) return
  STATES[state.value].exit()
  state.value = newState
  STATES[newState].enter()
  playAnimation(ANIMATION_MAP[newState])
}

// ── 移动系统 (requestAnimationFrame + deltaTime) ──
let lastFrameTime = 0
let rafId = null
let behaviorTimer = null
let faceTimer = null

function updateMovement(delta) {
  const el = actorRef.value
  if (!el) return

  const pw = window.innerWidth
  const ph = document.documentElement.scrollHeight
  const w = el.offsetWidth
  const h = el.offsetHeight

  let bounced = false
  if (x.value <= 0) { dirX.value = 1; bounced = true }
  if (x.value >= pw - w) { dirX.value = -1; bounced = true }
  if (y.value <= 0) { dirY.value = 1; bounced = true }
  if (y.value >= ph - h * 1.2) { dirY.value = -1; bounced = true }

  x.value += dirX.value * props.speed * delta
  y.value += dirY.value * props.speed * delta
  lastMoveDir.value = dirType.value

  if (bounced) playAnimation('walk')
}

function gameLoop(now) {
  const delta = lastFrameTime ? now - lastFrameTime : 16
  lastFrameTime = now
  if (isMoving.value) updateMovement(delta)
  rafId = requestAnimationFrame(gameLoop)
}

// ── 行为控制 ──
let lastIdleTime = 0

function scheduleWalkFromLookAround() {
  lookAroundTimer = setTimeout(() => {
    transitionTo('walking')
    startBehaviorLoop()
  }, 1500 + Math.random() * 2000)
}

function scheduleWalkFromIdle() {
  idleTimer = setTimeout(() => {
    transitionTo('walking')
  }, 2000 + Math.random() * 2000)
}

function startBehaviorLoop() {
  clearInterval(behaviorTimer)
  behaviorTimer = setInterval(() => {
    const now = Date.now()
    if (state.value === 'walking' && now - lastIdleTime > 5000 + Math.random() * 5000 && Math.random() > 0.5) {
      lastIdleTime = now
      transitionTo('idle')
      scheduleWalkFromIdle()
    }
  }, 1000)
}

// ── 生命周期 ──
onMounted(() => {
  setTimeout(() => {
    visible.value = true
    state.value = 'spawn'
    STATES.spawn.enter()
    playAnimation('spawn')
    rafId = requestAnimationFrame(gameLoop)

    setTimeout(() => {
      transitionTo('lookAround')
      scheduleWalkFromLookAround()
    }, 1000)
  }, props.spawnDelay)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  clearInterval(behaviorTimer)
  clearTimeout(faceTimer)
  clearTimeout(idleTimer)
  clearTimeout(lookAroundTimer)
})
</script>
