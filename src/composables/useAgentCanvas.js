import {
  ASSETS, FRONT_DIRS, SPRITES, LAYOUT, H_GAP, V_GAP, ROW_DELAY_STEP,
  ACTOR_DISPLAY_H, ACTOR_SPEED, SPAWN_DURATION,
  IDLE_DELAY_MIN, IDLE_DELAY_RANGE, WALK_BEFORE_IDLE_MIN, WALK_BEFORE_IDLE_RANGE,
  IDLE_PROBABILITY, FACE_SHOW_PROBABILITY, FACE_DURATION_MIN, FACE_DURATION_RANGE,
  pick,
} from '@/constants/agentConfig'

const IMG_W = 166
const IMG_H = 124

// ── Animation Decoder ──

const animCache = new Map()

async function decodeAnimation(url) {
  const fullUrl = `${ASSETS}${url}`
  if (animCache.has(fullUrl)) return animCache.get(fullUrl)

  if (typeof ImageDecoder !== 'undefined') {
    try {
      const response = await fetch(fullUrl)
      const decoder = new ImageDecoder({ type: 'image/webp', data: response.body })
      await decoder.completed
      const track = decoder.tracks.selectedTrack
      const frames = []
      const durations = []

      for (let i = 0; i < track.frameCount; i++) {
        const result = await decoder.decode({ frameIndex: i })
        const bitmap = await createImageBitmap(result.image)
        frames.push(bitmap)
        durations.push(result.duration / 1000 || 100)
        result.image.close()
      }
      decoder.close()

      const anim = { frames, durations, frameCount: frames.length }
      animCache.set(fullUrl, anim)
      return anim
    } catch (e) {
      console.warn('ImageDecoder failed for', fullUrl, e)
    }
  }

  // Fallback: load as static image
  const bitmap = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => createImageBitmap(img).then(resolve, reject)
    img.onerror = reject
    img.src = fullUrl
  })
  const anim = { frames: [bitmap], durations: [100], frameCount: 1 }
  animCache.set(fullUrl, anim)
  return anim
}

function getAnimation(url) {
  const fullUrl = `${ASSETS}${url}`
  return animCache.get(fullUrl)
}

// ── Animation Player ──

class AnimPlayer {
  constructor(anim, loop = true) {
    this.anim = anim
    this.loop = loop
    this.frameIndex = 0
    this.elapsed = 0
    this.finished = false
  }

  tick(delta) {
    if (this.finished || this.anim.frameCount <= 1) return
    this.elapsed += delta
    while (this.elapsed >= this.anim.durations[this.frameIndex]) {
      this.elapsed -= this.anim.durations[this.frameIndex]
      this.frameIndex++
      if (this.frameIndex >= this.anim.frameCount) {
        if (this.loop) {
          this.frameIndex = 0
        } else {
          this.frameIndex = this.anim.frameCount - 1
          this.finished = true
          return
        }
      }
    }
  }

  get currentFrame() {
    return this.anim.frames[this.frameIndex]
  }

  reset() {
    this.frameIndex = 0
    this.elapsed = 0
    this.finished = false
  }
}

// ── Agent ──

class Agent {
  constructor(id, x, y, spawnDelay) {
    this.id = id
    this.x = x
    this.y = y
    this.spawnDelay = spawnDelay
    this.dirX = 0
    this.dirY = 0
    this.lastMoveDir = 'front'
    this.state = 'hidden'
    this.speed = ACTOR_SPEED
    this.idleActionType = ''
    this.spawnElapsed = 0
    this.lastIdleTime = 0
    this.opacity = 0

    const scale = ACTOR_DISPLAY_H / IMG_H
    this.drawW = IMG_W * scale
    this.drawH = ACTOR_DISPLAY_H

    this.bodyPlayer = null
    this.facePlayer = null
    this.showFace = false
    this.faceTimer = null
    this.idleTimer = null
    this.behaviorInterval = null
  }

  getDirType() {
    const dx = this.dirX, dy = this.dirY
    if (dx === 0 && dy === 0) return this.lastMoveDir
    if (dx === 0 && dy > 0) return 'front'
    if (dx === 0 && dy < 0) return 'back'
    if (dx < 0 && dy === 0) return 'left'
    if (dx > 0 && dy === 0) return 'right'
    if (dx < 0 && dy > 0) return 'frontLeft'
    if (dx > 0 && dy > 0) return 'frontRight'
    if (dx < 0 && dy < 0) return 'backLeft'
    return 'backRight'
  }

  randomizeDir() {
    const dirs = [[0,1],[0,-1],[-1,0],[1,0],[-1,1],[1,1],[-1,-1],[1,-1]]
    const [dx, dy] = pick(dirs)
    this.dirX = dx
    this.dirY = dy
    this.lastMoveDir = this.getDirType()
  }

  playAnimation(name, dir) {
    dir = dir || this.getDirType()
    switch (name) {
      case 'walk': {
        const anim = getAnimation(SPRITES.walk[dir])
        this.bodyPlayer = new AnimPlayer(anim, true)
        FRONT_DIRS.includes(dir) && Math.random() < FACE_SHOW_PROBABILITY
          ? this.showRandomFace(dir) : this.hideFace()
        break
      }
      case 'idle': {
        const actions = SPRITES.action[dir]
        if (actions) {
          const categories = Object.keys(actions)
          const cat = pick(categories)
          this.idleActionType = cat
          const anim = getAnimation(pick(actions[cat]))
          this.bodyPlayer = new AnimPlayer(anim, true)
        } else {
          const anim = getAnimation(SPRITES.walk[dir])
          this.bodyPlayer = new AnimPlayer(anim, true)
          this.idleActionType = 'emote'
        }
        this.idleActionType !== 'dance' && FRONT_DIRS.includes(dir)
          ? this.showRandomFace(dir) : this.hideFace()
        break
      }
      case 'spawn': {
        const anim = getAnimation(SPRITES.spawn)
        this.bodyPlayer = new AnimPlayer(anim, false)
        this.hideFace()
        break
      }
    }
  }

  showRandomFace(dir) {
    const list = SPRITES.face[dir] || SPRITES.face.front
    const anim = getAnimation(pick(list))
    this.facePlayer = new AnimPlayer(anim, true)
    this.showFace = true
    this._clearFaceTimer()
    this.faceTimer = setTimeout(() => {
      this.showFace = false
      this.facePlayer = null
    }, FACE_DURATION_MIN + Math.random() * FACE_DURATION_RANGE)
  }

  hideFace() {
    this.showFace = false
    this.facePlayer = null
    this._clearFaceTimer()
  }

  _clearFaceTimer() {
    if (this.faceTimer) { clearTimeout(this.faceTimer); this.faceTimer = null }
  }

  transitionTo(newState) {
    const allowed = { hidden: ['spawn'], spawn: ['idle'], idle: ['walking'], walking: ['idle'] }
    if (!allowed[this.state]?.includes(newState)) return

    if (this.state === 'idle') this.hideFace()
    this.state = newState

    switch (newState) {
      case 'spawn':
        this.opacity = 0
        this.spawnElapsed = 0
        this.playAnimation('spawn')
        break
      case 'idle':
        this.lastMoveDir = this.getDirType()
        this.playAnimation('idle')
        this.scheduleWalkFromIdle()
        break
      case 'walking':
        this.randomizeDir()
        this.playAnimation('walk')
        this.startBehaviorLoop()
        break
    }
  }

  tick(delta, canvasW, canvasH) {
    if (this.state === 'hidden') {
      this.spawnDelay -= delta
      if (this.spawnDelay <= 0) this.transitionTo('spawn')
      return
    }

    if (this.bodyPlayer) this.bodyPlayer.tick(delta)
    if (this.facePlayer) this.facePlayer.tick(delta)

    if (this.state === 'spawn') {
      this.spawnElapsed += delta
      this.opacity = Math.min(1, (this.spawnElapsed / SPAWN_DURATION) * 2)
      if (this.bodyPlayer?.finished || this.spawnElapsed >= SPAWN_DURATION) {
        this.transitionTo('idle')
      }
      return
    }
    if (this.state === 'walking') this.updateMovement(delta, canvasW, canvasH)
  }

  updateMovement(delta, canvasW, canvasH) {
    let bounced = false
    if (this.x <= 0) { this.dirX = 1; bounced = true }
    if (this.x >= canvasW - this.drawW) { this.dirX = -1; bounced = true }
    if (this.y <= 0) { this.dirY = 1; bounced = true }
    if (this.y >= canvasH - this.drawH * 1.2) { this.dirY = -1; bounced = true }
    this.x += this.dirX * this.speed * delta
    this.y += this.dirY * this.speed * delta
    this.lastMoveDir = this.getDirType()
    if (bounced) this.playAnimation('walk')
  }

  scheduleWalkFromIdle() {
    this._clearIdleTimer()
    this.idleTimer = setTimeout(() => { this.transitionTo('walking') }, IDLE_DELAY_MIN + Math.random() * IDLE_DELAY_RANGE)
  }

  startBehaviorLoop() {
    this._clearBehaviorInterval()
    this.behaviorInterval = setInterval(() => {
      const now = Date.now()
      if (this.state === 'walking' && now - this.lastIdleTime > WALK_BEFORE_IDLE_MIN + Math.random() * WALK_BEFORE_IDLE_RANGE && Math.random() > IDLE_PROBABILITY) {
        this.lastIdleTime = now
        this.transitionTo('idle')
      }
    }, 1000)
  }

  _clearIdleTimer() {
    if (this.idleTimer) { clearTimeout(this.idleTimer); this.idleTimer = null }
  }
  _clearBehaviorInterval() {
    if (this.behaviorInterval) { clearInterval(this.behaviorInterval); this.behaviorInterval = null }
  }

  destroy() {
    this._clearFaceTimer()
    this._clearIdleTimer()
    this._clearBehaviorInterval()
  }
}

// ── AgentManager ──

export class AgentManager {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.agents = []
    this.rafId = null
    this.lastFrameTime = 0
    this.ready = false
  }

  async init() {
    // Preload and decode all animations
    const urls = new Set()
    Object.values(SPRITES.walk).forEach(u => urls.add(u))
    SPRITES.spawn && urls.add(SPRITES.spawn)
    Object.values(SPRITES.face).forEach(arr => arr.forEach(u => urls.add(u)))
    Object.values(SPRITES.action).forEach(dir => {
      Object.values(dir).forEach(arr => arr.forEach(u => urls.add(u)))
    })

    await Promise.all([...urls].map(u => decodeAnimation(u)))

    this.createAgents()
    this.ready = true
    this.rafId = requestAnimationFrame((t) => this.gameLoop(t))
  }

  createAgents() {
    const screenW = this.canvas.width
    const screenH = this.canvas.height
    const centerX = screenW / 2 - 170
    const centerY = screenH * 0.004

    LAYOUT.forEach((count, row) => {
      const offset = ((count - 1) * H_GAP) / 2
      for (let col = 0; col < count; col++) {
        const id = `${row}-${col}`
        const x = centerX + col * H_GAP - offset
        const y = centerY + row * V_GAP
        const delay = row * ROW_DELAY_STEP
        this.agents.push(new Agent(id, x, y, delay))
      }
    })
  }

  gameLoop(now) {
    const delta = this.lastFrameTime ? now - this.lastFrameTime : 16
    this.lastFrameTime = now

    for (const agent of this.agents) {
      agent.tick(delta, this.canvas.width, this.canvas.height)
    }

    this.draw()
    this.rafId = requestAnimationFrame((t) => this.gameLoop(t))
  }

  draw() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const visible = this.agents.filter(a => a.state !== 'hidden')
    visible.sort((a, b) => a.y - b.y)

    for (const agent of visible) {
      ctx.globalAlpha = agent.opacity
      ctx.imageSmoothingEnabled = false

      if (agent.bodyPlayer?.currentFrame) {
        ctx.drawImage(agent.bodyPlayer.currentFrame, agent.x, agent.y, agent.drawW, agent.drawH)
      }

      if (agent.showFace && agent.facePlayer?.currentFrame) {
        ctx.drawImage(agent.facePlayer.currentFrame, agent.x, agent.y, agent.drawW, agent.drawH)
      }
    }
    ctx.globalAlpha = 1
  }

  resize(w, h) {
    this.canvas.width = w
    this.canvas.height = h
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId)
    for (const agent of this.agents) agent.destroy()
    this.agents = []
    this.ready = false
  }
}
