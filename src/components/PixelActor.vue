<template>
  <template v-if="visible">
    <!-- 身体 -->
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

    <!-- 表情 -->
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
  spawnDelay: Number, // 接收按行出场延迟
})

const ASSETS = '/src/assets/second/'

const animations = {
  walk: {
    front: 'front.webp', frontLeft: 'frontLeft.webp', frontRight: 'frontRight.webp',
    back: 'back.webp', backLeft: 'backLeft.webp', backRight: 'backRight.webp',
    left: 'left.webp', right: 'right.webp',
  },
  face: {
    front: ['Expresions_Front.webp', 'Expresions_Front_Normal.webp', 'Expresions_Front_Excited.webp', 'Expresions_Front_Confused.webp'],
    frontLeft: ['Expresions_FrontLeft.webp', 'Expresions_FrontLeft_Normal.webp', 'Expresions_FrontLeft_Excited.webp', 'Expresions_FrontLeft_Confused.webp'],
    frontRight: ['Expresions_FrontRight.webp', 'Expresions_FrontRight_Normal.webp', 'Expresions_FrontRight_Excited.webp', 'Expresions_FrontRight_Confused.webp']
  },
  actionsByDir: {
    front: ['Isometric_Front_Celebrate.webp', 'Isometric_Front_Thinking.webp', 'Isometric_Front_HighFive.webp', 'Isometric_Front_TypeDance2.webp', 'Isometric_Front_TypeDance3.webp'],
    frontLeft: ['Isometric_FrontLeft_Celebrate.webp', 'Isometric_FrontLeft_HighFive.webp', 'Isometric_FrontLeft_TypeDance.webp', 'Isometric_FrontLeft_TypeDance4.webp'],
    frontRight: ['Isometric_FrontRight_Thinking.webp', 'Isometric_FrontRight_HighFive.webp', 'Isometric_FrontRight_TypeDance.webp', 'Isometric_FrontRight_TypeDance2.webp', 'Isometric_FrontRight_TypeDance3.webp', 'Isometric_FrontRight_TypeDance4.webp'],
    back: ['Isometric_Back_HighFive.webp'], backLeft: ['Isometric_BackLeft_HighFive.webp'], backRight: ['Isometric_BackRight_HighFive.webp'],
    left: ['Isometric_FrontLeft_Celebrate.webp', 'Isometric_FrontLeft_TypeDance4.webp'],
    right: ['Isometric_FrontRight_Thinking.webp', 'Isometric_FrontRight_TypeDance4.webp']
  },
  spawn: 'Isometric_Front_AgentSpawn.webp'
}

// 状态
const visible = ref(false)
const actorState = ref('spawn')
const actorRef = ref(null)
const currentBodySrc = ref('')
const faceSrc = ref('')
const showFace = ref(false)
const timestamp = ref(0)

const x = ref(props.initX)
const y = ref(props.initY)
const speed = 1.5 + Math.random() * 1.5

const dirX = ref(0)
const dirY = ref(0)
const lastMoveDir = ref('front')

const bodyImgSrc = computed(() => currentBodySrc.value ? `${ASSETS}${currentBodySrc.value}?v=${timestamp.value}` : '')
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
let faceTimer = null

// 随机走路方向
function randomDir() {
  const dirs = [[0, 1], [0, -1], [-1, 0], [1, 0], [-1, 1], [1, 1], [-1, -1], [1, -1]]
  const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)]
  dirX.value = dx
  dirY.value = dy
  lastMoveDir.value = nowDirType.value
}

// 随机看向周围（互看效果）
function randomLookDir() {
  const lookDirs = ['front', 'frontLeft', 'frontRight']
  const targetDir = lookDirs[Math.floor(Math.random() * lookDirs.length)]
  lastMoveDir.value = targetDir
  currentBodySrc.value = animations.walk[targetDir]
  timestamp.value = Date.now()
  return targetDir
}

// 随机表情
function randomFace(dir) {
  const faceList = animations.face[dir] || animations.face.front
  faceSrc.value = faceList[Math.floor(Math.random() * faceList.length)]
  showFace.value = true
  clearTimeout(faceTimer)
  faceTimer = setTimeout(() => {
    showFace.value = false
  }, 800 + Math.random() * 1200)
}

// 刷新角色
function refreshActor() {
  const dir = nowDirType.value
  if (actorState.value === 'walking') {
    currentBodySrc.value = animations.walk[dir]
    timestamp.value = Date.now()
    // 朝前方向随机显示表情
    if (['front', 'frontLeft', 'frontRight'].includes(dir)) {
      if (Math.random() < 0.08) {
        randomFace(dir)
      }
    } else {
      showFace.value = false
    }
  }
}

// 开始走路
function startWalking() {
  clearInterval(moveTimer)
  actorState.value = 'walking'
  showFace.value = false
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

// 出场后：原地互看 + 随机表情
function startLookAround() {
  if (isStateLocked) return
  isStateLocked = true

  dirX.value = 0
  dirY.value = 0
  actorState.value = 'idleLook'

  const lookDir = randomLookDir()
  randomFace(lookDir)

  // 1.5~3.5秒后散开
  setTimeout(() => {
    isStateLocked = false
    faceSrc.value = ''
    showFace.value = false
    randomDir()
    startWalking()
    startBehaviorLoop()
  }, 1500 + Math.random() * 2000)
}

// 走路中发呆
function startIdle() {
  if (isStateLocked) return
  isStateLocked = true
  clearInterval(moveTimer)

  lastMoveDir.value = nowDirType.value
  dirX.value = 0
  dirY.value = 0
  actorState.value = 'action'

  const dir = nowDirType.value
  const acts = animations.actionsByDir[dir] || []
  if (acts.length > 0) {
    currentBodySrc.value = acts[Math.floor(Math.random() * acts.length)]
    timestamp.value = Date.now()
  }

  // Dance动作不加表情，其余朝前方向叠表情
  const isDancing = currentBodySrc.value.includes('TypeDance')
  if (!isDancing && ['front', 'frontLeft', 'frontRight'].includes(dir)) {
    randomFace(dir)
  } else {
    showFace.value = false
  }

  setTimeout(() => {
    showFace.value = false
    randomDir()
    isStateLocked = false
    startWalking()
  }, 2000 + Math.random() * 2000)
}

// 行为循环
function startBehaviorLoop() {
  clearInterval(behaviorTimer)
  behaviorTimer = setInterval(() => {
    const now = Date.now()
    if (actorState.value === 'walking' && !isStateLocked && now - lastIdleTime > (5000 + Math.random() * 5000) && Math.random() > 0.5) {
      lastIdleTime = now
      startIdle()
    }
  }, 1000)
}

onMounted(() => {
  // 延迟出场：先等 spawnDelay 再显示角色
  setTimeout(() => {
    visible.value = true
    timestamp.value = Date.now()
    currentBodySrc.value = animations.spawn
    actorState.value = 'spawn'

    // spawn动画1秒后 → 互看 → 散开
    setTimeout(() => {
      startLookAround()
    }, 1000)
  }, props.spawnDelay)
})

onUnmounted(() => {
  clearInterval(moveTimer)
  clearInterval(behaviorTimer)
  clearTimeout(faceTimer)
})
</script>