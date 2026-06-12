<template>
  <div class="flex items-center mr-17 gap-1">
    <span class="text-[28px] font-semibold tracking-[-2px] font-geist-sans text-white">Ship</span>
    <span class="px-0.5 text-xs border-[1.5px] border-white rounded font-mono cursor-pointer tracking-tight font-semibold">{{ cityCode }}</span>
  </div>
</template>

<script setup>
defineProps({
  cityCode: String,
})
</script>
