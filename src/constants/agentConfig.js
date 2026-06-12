export const ASSETS = '/second/'

export const FRONT_DIRS = ['front', 'frontLeft', 'frontRight']

export const SPRITES = {
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
    back: { emote: ['Isometric_Back_HighFive.webp'] },
    backLeft: { emote: ['Isometric_BackLeft_HighFive.webp'] },
    backRight: { emote: ['Isometric_BackRight_HighFive.webp'] },
    left: { emote: ['Isometric_FrontLeft_Celebrate.webp'], dance: ['Isometric_FrontLeft_TypeDance4.webp'] },
    right: { emote: ['Isometric_FrontRight_Thinking.webp'], dance: ['Isometric_FrontRight_TypeDance4.webp'] },
  },
  spawn: 'Isometric_Front_AgentSpawn.webp',
}

export const LAYOUT = [1, 3, 4, 6]
export const H_GAP = 90
export const V_GAP = 95
export const ROW_DELAY_STEP = 160

export const ACTOR_DISPLAY_H = 250
export const ACTOR_SPEED = 0.07
export const SPAWN_DURATION = 2000

export const IDLE_DELAY_MIN = 2000
export const IDLE_DELAY_RANGE = 2000
export const WALK_BEFORE_IDLE_MIN = 5000
export const WALK_BEFORE_IDLE_RANGE = 5000
export const IDLE_PROBABILITY = 0.5
export const FACE_SHOW_PROBABILITY = 0.08
export const FACE_DURATION_MIN = 800
export const FACE_DURATION_RANGE = 1200

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
