<template>
  <main class="flex flex-col h-dvh overflow-hidden bg-black text-[#EDEDED]">
    <!-- 顶部 Header -->
<!-- 顶部 Header -->
<!-- 顶部 Header -->
<header class="bg-black border-b-[1.8px] border-[#343232c0] h-24 flex items-center">
  <div class="w-full flex items-center relative">
    <span class="font-mono uppercase text-base ml-17 ">
      Choose your city:
    </span>

    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
      <!-- 🔥 这里加 tracking-[-2px] 收紧字母间距 -->
      <span class="text-[28px] font-semibold tracking-[-2px]">Ship</span>
      <div class="h-5 w-[21px] border-1 border-white rounded-sm flex items-center justify-center">
        <span class="font-mono uppercase text-xs font-semibold">26</span>
      </div>
    </div>
  </div>
</header>

    <!-- 导航列表 -->
    <nav class="flex-1 overflow-auto">
      <!-- 🔥 加 group/list -->
      <ul class="grid grid-rows-5 h-full w-full group/list">
        <!-- 🔥 加 group/item -->
        <li 
          v-for="(city, i) in cityList" 
          :key="city.path" 
          class="city-item hover:city-item-hover group/item"
          :class="{ 'border-b-0': i === cityList.length - 1 }"
        >
          <a :href="city.path" class="flex w-full items-center justify-between">
            <span class="city-text">
              {{ city.label }}, <span :data-ship-date="city.date">{{ city.dateText }}</span>
            </span>
            <span class="ship-icon">
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                <rect x="20" y="20" width="80" height="40" fill="#444" />
                <rect x="25" y="25" width="70" height="30" fill="#111" />
                <rect x="30" y="10" width="10" height="10" fill="#444" />
                <rect x="50" y="10" width="10" height="10" fill="#444" />
                <rect x="70" y="10" width="10" height="10" fill="#444" />
                <rect x="10" y="35" width="10" height="10" fill="#444" />
                <rect x="100" y="35" width="10" height="10" fill="#444" />
                <rect x="40" y="60" width="10" height="10" fill="#444" />
                <rect x="70" y="60" width="10" height="10" fill="#444" />
              </svg>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script setup>
const cityList = [
  { label: 'London', dateText: '06.17', date: '2026-06-17', path: '/ship/london' },
  { label: 'Berlin', dateText: '06.25', date: '2026-06-25', path: '/ship/berlin' },
  { label: 'New York City', dateText: '06.30', date: '2026-06-30', path: '/ship/nyc' },
  { label: 'Sydney', dateText: '07.30', date: '2026-07-30', path: '/ship/sydney' },
  { label: 'San Francisco', dateText: '10.15', date: '2026-06-15', path: '/ship/sf' },
];
</script>

<!-- 🔥 删掉这里的错误样式！ -->
<style scoped>
</style>