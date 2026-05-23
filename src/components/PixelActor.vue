<template>
  <!-- 身体 -->
  <img
    ref="actorRef"
    :src="bodyImgSrc"
    class="absolute h-[250px] w-auto transition-all duration-[2000ms] ease-out select-none"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      imageRendering: 'pixelated',
      zIndex: Math.floor(y) // 动态层级：y轴越低（靠前）的显示在越上层
    }"
    draggable="false"
  />

  <!-- 表情：严格覆盖 -->
  <img
    v-if="showFace"
    :src="faceImgSrc"
    class="absolute h-[250px] w-auto pointer-events-none select-none"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      imageRendering: 'pixelated',
      zIndex: Math.floor(y) + 1
    }"
    draggable="false"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  initX: Number,
  initY: Number
})

const ASSETS = '/src/assets/second/'

// ==========================================
// 动画资源配置
// ==========================================
const animations = {
  walk: {
    front: 'front.webp', frontLeft: 'frontLeft.webp', frontRight: 'frontRight.webp',
    back: 'back.webp', backLeft: 'backLeft.webp', backRight: 'backRight.webp',
    left: 'left.webp', right: 'right.webp',
  },
  face: {
    front: ['Expresions_Front.webp', 'Expresions_Front_Normal.webp', 'Expresions_Front_Excited.webp'],
    frontLeft: ['Expresions_FrontLeft.webp', 'Expresions_FrontLeft_Normal.webp'],
    frontRight: ['Expresions_FrontRight.webp', 'Expresions_FrontRight_Normal.webp']
  },
  actionsByDir: {
    front: ['Isometric_Front_Celebrate.webp', 'Isometric_Front_Thinking.webp', 'Isometric_Front_EyesTriangle.webp'],
    frontLeft: ['Isometric_FrontLeft_Celebrate.webp', 'Isometric_FrontLeft_EyesTriangle.webp'],
    frontRight: ['Isometric_FrontRight_EyesTriangle.webp', 'Isometric_FrontRight_Thinking.webp'],
    back: ['Isometric_Back_HighFive.webp'], backLeft: ['Isometric_BackLeft_HighFive.webp'], backRight: ['Isometric_BackRight_HighFive.webp'],
    left: ['Isometric_FrontLeft_Celebrate.webp'], right: ['Isometric_FrontRight_Thinking.webp']
  },
  spawn: 'Isometric_Front_AgentSpawn.webp'
}

// 状态控制
const actorState = ref('spawn') // 'spawn' | 'walking' | 'action'
const actorRef = ref(null)
const currentBodySrc = ref(animations.spawn)
const faceSrc = ref('')
const showFace = ref(false)
const timestamp = ref(Date.now())

// 初始在屏幕外或金字塔预设点，这里直接使用传入的金字塔坐标
const x = ref(props.initX)
const y = ref(props.initY)
const speed = 1.5 + Math.random() * 1.5 // 随机速度，让走动更自然

const dirX = ref(0)
const dirY = ref(0)
const lastMoveDir = ref('front')

const bodyImgSrc = computed(() => `${ASSETS}${currentBodySrc.value}?v=${timestamp.value}`)
const faceImgSrc = computed(() => faceSrc.value ? `${ASSETS}${faceSrc.value}` : '')

const nowDirType = computed(() => {
  if (dirX.value === 0 && dirY.value === 0) return lastMoveDir.value
  if (dirX.value === 0 && dirY.value > 0) return 'front'
  if (dirX.value === 0 && dirY.value < 0) return 'back'
  if (dirX.value < 0 && dirY.value === 0) return 'left'
  if (dirX.value > 0 && dirY.value === 0) return 'right'
  if (dirX.value < 0 && dirY.value > 0) return 'frontLeft'
  if (dirX.value > 0 && dirY.value > 0) return 'frontRight'
  if (dirX.value < 0 && dirY.value < 0) return 'backLeft'
  if (dirX.value > 0 && dirY.value < 0) return 'backRight'
  return lastMoveDir.value
})

let isStateLocked = false
let lastIdleTime = Date.now()
let moveTimer = null
let behaviorTimer = null

function randomDir() {
  const dirs = [[0, 1], [0, -1], [-1, 0], [1, 0], [-1, 1], [1, 1], [-1, -1], [1, -1]]
  const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)]
  dirX.value = dx
  dirY.value = dy
  lastMoveDir.value = nowDirType.value
}

function refreshActor() {
  const dir = nowDirType.value
  showFace.value = actorState.value === 'walking' && ['front', 'frontLeft', 'frontRight'].includes(dir)
  if (actorState.value === 'walking') {
    currentBodySrc.value = animations.walk[dir]
    timestamp.value = Date.now()
  }
}

function startWalking() {
  clearInterval(moveTimer)
  actorState.value = 'walking'
  refreshActor()

  moveTimer = setInterval(() => {
    if (actorState.value !== 'walking') return
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
    lastMoveDir.value = nowDirType.value

    if (bounced) refreshActor()
  }, 40)
}

function startIdle() {
  if (isStateLocked) return
  isStateLocked = true
  clearInterval(moveTimer)
  
  lastMoveDir.value = nowDirType.value
  dirX.value = 0
  dirY.value = 0
  actorState.value = 'action'
  showFace.value = false

  const acts = animations.actionsByDir[nowDirType.value] || []
  if (acts.length > 0) {
    currentBodySrc.value = acts[Math.floor(Math.random() * acts.length)]
    timestamp.value = Date.now()
  }

  setTimeout(() => {
    randomDir()
    isStateLocked = false
    startWalking()
  }, 2000 + Math.random() * 2000) // 随机发呆1-4秒
}

function startBehaviorLoop() {
  clearInterval(behaviorTimer)
  behaviorTimer = setInterval(() => {
    const now = Date.now()
    // 增加随机混合间隔，防止14个人同时停下
    if (actorState.value === 'walking' && !isStateLocked && now - lastIdleTime > (5000 + Math.random() * 5000) && Math.random() > 0.5) {
      lastIdleTime = now
      startIdle()
    }
  }, 1000)
}

onMounted(() => {
  // 1. 出场动画保持在原地
  currentBodySrc.value = animations.spawn
  actorState.value = 'spawn'
  
  // 2. 延迟出场后（比如3秒后），各自散开随机走动
  setTimeout(() => {
    randomDir()
    startWalking()
    startBehaviorLoop()
  }, 3000 + Math.random() * 1500) // 错开散开的时间点，看起来更生动
})

onUnmounted(() => {
  clearInterval(moveTimer)
  clearInterval(behaviorTimer)
})
</script>
