import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useCityRoute() {
  const route = useRoute()
  const cityCode = computed(() => route.meta.code || 'LDN')
  const citySlug = computed(() => {
    const parts = route.path.split('/')
    return parts[2] || 'london'
  })
  return { cityCode, citySlug }
}
