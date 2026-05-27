<template>
  <!-- 页面主容器：全屏高度、黑色背景、浅灰色文字 -->
  <main class="flex flex-col h-dvh bg-black text-[#EDEDED]">
    <!-- 头部区域：固定层级、黑色背景、底部边框、固定高度、垂直居中 -->
    <header class="relative z-10 bg-black border-b-[1.8px] border-[#343232c0] h-24 flex items-center">
      <div class="w-full flex items-center relative">
        <!-- 头部左侧文字：选择城市 -->
        <span class="font-mono uppercase text-base ml-18">
          Choose your city:
        </span>

        <!-- 头部中间标题：Ship + 动态编码组件，绝对居中 -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
          <span class="text-[28px] font-semibold tracking-[-2px]">
            Ship
          </span>
          <!-- 随机编码动画组件 -->
          <ShuffleCode ref="shuffleRef" />
        </div>
      </div>
    </header>

    <!-- 导航列表区域：最高层级、自适应剩余高度、滚动溢出 -->
    <nav class="relative z-20 flex-1 overflow-auto">
      <!-- 城市列表网格：5行布局、占满全屏 -->
      <ul class="grid grid-rows-5 h-full w-full group/list">
        <!-- 循环渲染城市列表项 -->
        <li
          v-for="(city, i) in cityList"
          :key="city.path"
          class="city-item group/item relative"

          :class="{ 'border-b-0': i === cityList.length - 1 }"

          @mouseenter="handleEnter(i, city.code)"
          @mouseleave="handleLeave(i)"
          @click="router.push(city.path)"
        >
          <div class="flex w-full items-center justify-between relative cursor-pointer">
            <!-- 城市名称 + 日期展示 -->
            <span class="city-text">
              {{ city.label }},
              <span :data-ship-date="city.date">{{ city.dateText }}</span>
            </span>

            <!-- 波浪动画图标容器 -->
            <span class="ship-icon relative z-50 w-[280px] h-[200px] flex items-center justify-center overflow-visible -translate-y-9">
              <!-- 波浪动画组件 -->
              <WaveAnimation
                ref="waveRefList"
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
            </span>
          </div>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script setup>
// 导入Vue响应式核心API
import { ref } from 'vue'
// 导入路由跳转方法
import { useRouter } from 'vue-router'
// 导入编码随机动画子组件
import ShuffleCode from './HelloWorld_ShuffleCode.vue'
// 导入波浪动画子组件
import WaveAnimation from './HelloWorld_WaveAnimation.vue'

// 路由实例，用于页面跳转
const router = useRouter()

// 城市数据列表：包含名称、日期、路由路径、城市编码
const cityList = [
  { label: 'London', dateText: '06.17', date: '2026-06-17', path: '/ship/london', code: 'LDN' },
  { label: 'Berlin', dateText: '06.25', date: '2026-06-25', path: '/ship/berlin', code: 'BER' },
  { label: 'New York City', dateText: '06.30', date: '2026-06-30', path: '/ship/nyc', code: 'NYC' },
  { label: 'Sydney', dateText: '07.30', date: '2026-07-30', path: '/ship/sydney', code: 'SYD' },
  { label: 'San Francisco', dateText: '10.15', date: '2026-10-15', path: '/ship/sf', code: 'SF' },
]

// 随机编码组件DOM引用
const shuffleRef = ref(null)
// 波浪动画组件列表引用（存储5个城市的动画实例）
const waveRefList = ref([])

/**
 * 鼠标进入城市项事件
 * @param {Number} idx - 当前城市索引
 * @param {String} code - 城市编码
 */
const handleEnter = (idx, code) => {
  // 启动编码随机动画
  shuffleRef.value?.startShuffle(code)
  // 启动对应城市的波浪动画
  waveRefList.value[idx]?.startPlay()
}

/**
 * 鼠标离开城市项事件
 * @param {Number} idx - 当前城市索引
 */
const handleLeave = (idx) => {
  // 重置编码随机动画
  shuffleRef.value?.resetShuffle()
  // 停止对应城市的波浪动画
  waveRefList.value[idx]?.stopPlay()
}
</script>