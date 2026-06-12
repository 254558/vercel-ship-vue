import { ref, onMounted, onUnmounted } from 'vue'

export function useCountdown(targetDate) {
  const countDown = ref('00D.00H.00M.00S')
  let timer = null

  function formatCountDown(diff) {
    if (diff <= 0) return '00D.00H.00M.00S'
    const d = Math.floor(diff / 86400000)
    const h = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0')
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
    return `${d}D.${h}H.${m}M.${s}S`
  }

  function updateTime() {
    countDown.value = formatCountDown(targetDate - new Date())
  }

  onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
  })

  onUnmounted(() => clearInterval(timer))

  return { countDown }
}
