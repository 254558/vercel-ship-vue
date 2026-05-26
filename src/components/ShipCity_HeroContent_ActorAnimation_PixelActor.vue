<template>
  <!-- 角色显示控制：只有 visible 为 true 时才渲染 -->
  <template v-if="visible">
    <!-- 角色身体图片 -->
    <img 
      ref="actorRef" 
      :src="bodyImgSrc" 
      class="absolute top-0 left-0 h-[250px] w-auto select-none" 
      :style="{
        transform: `translate(${x}px, ${y}px)`,  // 定位角色
        imageRendering: 'pixelated',            // 像素风清晰显示
        zIndex: Math.floor(y)                   // 根据Y轴确定层级，更立体
      }" 
      draggable="false" 
    />

    <!-- 角色表情（只有朝向前方时显示） -->
    <img 
      v-if="showFace" 
      :src="faceImgSrc"
      class="absolute top-0 left-0 h-[250px] w-auto pointer-events-none select-none" 
      :style="{
        transform: `translate(${x}px, ${y}px)`,
        imageRendering: 'pixelated',
        zIndex: Math.floor(y) + 1  // 表情层级比身体高1
      }" 
      draggable="false" 
    />
  </template>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// 接收父组件传入的参数
const props = defineProps({
  initX: Number,        // 初始X坐标
  initY: Number,        // 初始Y坐标
  spawnDelay: Number,   // 出生延迟时间
  speed: { type: Number, default: 0.12 },  // 移动速度 0.12px/ms = 120px/s
})

// 资源路径前缀
const ASSETS = '/second/'
// 朝向前方的方向集合（用于判断是否显示表情）
const FRONT_DIRS = ['front', 'frontLeft', 'frontRight']

// 所有精灵图资源配置
const SPRITES = {
  // 走路方向图
  walk: {
    front: 'front.webp', frontLeft: 'frontLeft.webp', frontRight: 'frontRight.webp',
    back: 'back.webp', backLeft: 'backLeft.webp', backRight: 'backRight.webp',
    left: 'left.webp', right: 'right.webp',
  },
  // 表情图
  face: {
    front: ['Expresions_Front.webp', 'Expresions_Front_Normal.webp', 'Expresions_Front_Excited.webp', 'Expresions_Front_Confused.webp'],
    frontLeft: ['Expresions_FrontLeft.webp', 'Expresions_FrontLeft_Normal.webp', 'Expresions_FrontLeft_Excited.webp', 'Expresions_FrontLeft_Confused.webp'],
    frontRight: ['Expresions_FrontRight.webp', 'Expresions_FrontRight_Normal.webp', 'Expresions_FrontRight_Excited.webp', 'Expresions_FrontRight_Confused.webp'],
  },
  // 待机动作（跳舞、庆祝、思考等）
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
    back: { emote: ['Isometric_Back_HighFive.webp'] },
    backLeft: { emote: ['Isometric_BackLeft_HighFive.webp'] },
    backRight: { emote: ['Isometric_BackRight_HighFive.webp'] },
    left: { emote: ['Isometric_FrontLeft_Celebrate.webp'], dance: ['Isometric_FrontLeft_TypeDance4.webp'] },
    right: { emote: ['Isometric_FrontRight_Thinking.webp'], dance: ['Isometric_FrontRight_TypeDance4.webp'] },
  },
  // 出生动画
  spawn: 'Isometric_Front_AgentSpawn.webp',
}

// 工具函数：从数组随机取一个元素
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ── 精灵图与表情控制 ──
const currentSpriteKey = ref('')   // 当前精灵图标识
const currentBodySrc = ref('')     // 身体图片源
const faceSrc = ref('')            // 表情图片源
const showFace = ref(false)         // 是否显示表情

// 计算属性：拼接完整身体图片路径
const bodyImgSrc = computed(() =>
  currentBodySrc.value ? `${ASSETS}${currentBodySrc.value}` : ''
)
// 计算属性：拼接完整表情图片路径
const faceImgSrc = computed(() =>
  faceSrc.value ? `${ASSETS}${faceSrc.value}` : ''
)

// 设置当前显示的精灵图
function setSprite(key, src) {
  if (currentSpriteKey.value === key) return
  currentSpriteKey.value = key
  currentBodySrc.value = src
}

// 随机显示表情（8%概率触发）
function showRandomFace(dir) {
  const list = SPRITES.face[dir] || SPRITES.face.front
  faceSrc.value = pick(list)
  showFace.value = true
  clearTimeout(faceTimer)
  // 随机显示 0.8~2秒后隐藏表情
  faceTimer = setTimeout(() => { showFace.value = false }, 800 + Math.random() * 1200)
}

// 隐藏表情并清理定时器
function hideFace() {
  showFace.value = false
  clearTimeout(faceTimer)
}

// ── 位置与方向：控制角色显示、坐标、移动的所有变量 ──
const visible = ref(false)         // 角色是否显示
const actorRef = ref(null)         // 角色DOM引用
const x = ref(props.initX)         // X坐标
const y = ref(props.initY)         // Y坐标
const dirX = ref(0)                // 水平方向 -1左 0不动 1右
const dirY = ref(0)                // 垂直方向 -1上 0不动 1下
const lastMoveDir = ref('front')   // 最后一次移动方向（停止时保持）
const isMoving = ref(false)        // 是否正在移动

// 自动计算角色当前朝向（8方向）
const dirType = computed(() => {
  const dx = dirX.value
  const dy = dirY.value

  // 不动 → 返回最后移动方向
  if (dx === 0 && dy === 0) return lastMoveDir.value
  // 纯上下
  if (dx === 0 && dy > 0) return 'front'
  if (dx === 0 && dy < 0) return 'back'
  // 纯左右
  if (dx < 0 && dy === 0) return 'left'
  if (dx > 0 && dy === 0) return 'right'
  // 斜向
  if (dx < 0 && dy > 0) return 'frontLeft'
  if (dx > 0 && dy > 0) return 'frontRight'
  if (dx < 0 && dy < 0) return 'backLeft'
  return 'backRight'
})

// 随机设置8方向移动
function randomizeDir() {
  const dirs = [[0,1],[0,-1],[-1,0],[1,0],[-1,1],[1,1],[-1,-1],[1,-1]]
  const [dx, dy] = pick(dirs)
  dirX.value = dx
  dirY.value = dy
  lastMoveDir.value = dirType.value
}

// ── 动画映射表 ──
const ANIMATION_MAP = {
  spawn: 'spawn',
  lookAround: 'lookAround',
  walking: 'walk',
  idle: 'idle',
}

let idleActionType = ''  // 记录当前待机动画类型

// 播放动画核心函数
function playAnimation(name, dir = dirType.value) {
  switch (name) {
    // 走路动画
    case 'walk':
      setSprite(`walk_${dir}`, SPRITES.walk[dir])
      // 朝前8%概率显示表情
      FRONT_DIRS.includes(dir) && Math.random() < 0.08 ? showRandomFace(dir) : hideFace()
      break

    // 待机动画（随机动作+表情）
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
      // 非跳舞+朝前 → 显示表情
      idleActionType !== 'dance' && FRONT_DIRS.includes(dir) ? showRandomFace(dir) : hideFace()
      break
    }

    // 四处张望
    case 'lookAround':
      setSprite(`lookAround_${dir}`, SPRITES.walk[dir])
      FRONT_DIRS.includes(dir) ? showRandomFace(dir) : hideFace()
      break

    // 出生动画
    case 'spawn':
      setSprite('spawn', SPRITES.spawn)
      hideFace()
      break
  }
}

// ── 状态机 FSM 配置 ──
// 状态切换规则（只能按这个流程切换）
const TRANSITIONS = {
  spawn: ['lookAround'],
  lookAround: ['walking'],
  walking: ['idle'],
  idle: ['walking'],
}

// 各状态进入/退出逻辑
const STATES = {
  spawn: { enter() {}, exit() {} },
  lookAround: {
    enter() {
      lastMoveDir.value = pick(FRONT_DIRS)
      isMoving.value = false
    },
    exit() { hideFace() },
  },
  walking: {
    enter() { randomizeDir(); isMoving.value = true },
    exit() { isMoving.value = false },
  },
  idle: {
    enter() {
      lastMoveDir.value = dirType.value
      isMoving.value = false
    },
    exit() { hideFace() },
  },
}

const state = ref('spawn')
let idleTimer = null
let lookAroundTimer = null

// 状态切换核心函数（安全切换+执行生命周期）
function transitionTo(newState) {
  // 校验是否允许切换
  if (!TRANSITIONS[state.value]?.includes(newState)) return
  // 退出旧状态
  STATES[state.value].exit()
  // 更新状态
  state.value = newState
  // 进入新状态
  STATES[newState].enter()
  // 播放对应动画
  playAnimation(ANIMATION_MAP[newState])
}

// ── 移动与游戏循环 ──
let lastFrameTime = 0   // 上一帧时间
let rafId = null        // 主循环ID
let behaviorTimer = null// 行为循环定时器
let faceTimer = null    // 表情定时器

// 每帧更新移动+边界反弹
function updateMovement(delta) {
  const el = actorRef.value
  if (!el) return

  const pw = window.innerWidth
  const ph = document.documentElement.scrollHeight
  const w = el.offsetWidth
  const h = el.offsetHeight

  let bounced = false

  // 四周边界碰撞反弹
  if (x.value <= 0) { dirX.value = 1; bounced = true }
  if (x.value >= pw - w) { dirX.value = -1; bounced = true }
  if (y.value <= 0) { dirY.value = 1; bounced = true }
  if (y.value >= ph - h * 1.2) { dirY.value = -1; bounced = true }

  // 计算新位置
  x.value += dirX.value * props.speed * delta
  y.value += dirY.value * props.speed * delta
  lastMoveDir.value = dirType.value

  // 反弹后继续播放走路动画
  if (bounced) playAnimation('walk')
}

// 游戏主循环（60帧/秒）
function gameLoop(now) {
  const delta = lastFrameTime ? now - lastFrameTime : 16
  lastFrameTime = now
  if (isMoving.value) updateMovement(delta)
  rafId = requestAnimationFrame(gameLoop)
}

// ── AI 行为逻辑 ──
let lastIdleTime = 0

// 张望结束自动走路
function scheduleWalkFromLookAround() {
  lookAroundTimer = setTimeout(() => {
    transitionTo('walking')
    startBehaviorLoop()
  }, Math.random() * 2000)
}

// 待机结束自动走路
function scheduleWalkFromIdle() {
  idleTimer = setTimeout(() => {
    transitionTo('walking')
  }, 2000 + Math.random() * 2000)
}

// 行为循环：走路→待机自动切换
function startBehaviorLoop() {
  clearInterval(behaviorTimer)
  behaviorTimer = setInterval(() => {
    const now = Date.now()
    if (
      state.value === 'walking' &&
      now - lastIdleTime > 5000 + Math.random() * 5000 &&
      Math.random() > 0.5
    ) {
      lastIdleTime = now
      transitionTo('idle')
      scheduleWalkFromIdle()
    }
  }, 1000)
}

// ── 生命周期 ──
onMounted(() => {
  // 延迟出生
  setTimeout(() => {
    visible.value = true
    state.value = 'spawn'
    STATES.spawn.enter()
    playAnimation('spawn')
    rafId = requestAnimationFrame(gameLoop)

    // 出生1秒后开始张望
    setTimeout(() => {
      transitionTo('lookAround')
      scheduleWalkFromLookAround()
    }, 1000)
  }, props.spawnDelay)
})

// 销毁时清理所有定时器
onUnmounted(() => {
  cancelAnimationFrame(rafId)
  clearInterval(behaviorTimer)
  clearTimeout(faceTimer)
  clearTimeout(idleTimer)
  clearTimeout(lookAroundTimer)
})
</script>