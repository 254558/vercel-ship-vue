<template>
  <label class="text-[13px] inline-flex items-start cursor-pointer">
    <div class="relative w-4 h-4 mt-1 mr-2">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
      />
      <div
        class="w-4 h-4 rounded border border-[#555] bg-[#333] flex items-center justify-center transition-colors"
        :class="modelValue ? 'bg-white border-white' : ''"
      >
        <svg fill="none" height="16" viewBox="0 0 20 20" width="16" class="scale-75">
          <path
            d="M14 7L8.5 12.5L6 10"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :class="modelValue ? 'stroke-black' : 'stroke-transparent'"
          />
        </svg>
      </div>
    </div>
    <span class="text-sm text-gray-400 pt-[3px] text-pretty leading-normal"><slot /></span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
})
defineEmits(['update:modelValue'])
</script>
