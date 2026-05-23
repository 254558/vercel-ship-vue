const ANIM_CONFIG = {
  baseUrl: '/src/assets/second',
  front: { src: 'front.webp', frames: 18 },
  back: { src: 'back.webp', frames: 18 },
  left: { src: 'left.webp', frames: 18 },
  right: { src: 'right.webp', frames: 18 },
  frontLeft: { src: 'frontLeft.webp', frames: 18 },
  frontRight: { src: 'frontRight.webp', frames: 18 },
  backLeft: { src: 'backLeft.webp', frames: 18 },
  backRight: { src: 'backRight.webp', frames: 18 },
}

let frameTimer = null
let currentImg = null
let curFrame = 0

export function playHeroAnimation(canvasRef, action = 'front') {
  const ctx = canvasRef.getContext('2d')
  if (!ctx) return
  clearInterval(frameTimer)
  curFrame = 0

  const cfg = ANIM_CONFIG[action]
  const img = new Image()
  img.src = `${ANIM_CONFIG.baseUrl}/${cfg.src}`

  img.onload = () => {
    currentImg = img
    const frameW = img.width
    const frameH = img.height / cfg.frames

    frameTimer = setInterval(() => {
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height)
      ctx.drawImage(
        currentImg,
        0, curFrame * frameH,
        frameW, frameH,
        0, 0,
        canvasRef.width, canvasRef.height
      )
      curFrame = (curFrame + 1) % cfg.frames
    }, 90)
  }
}

export function stopHeroAnimation() {
  clearInterval(frameTimer)
}