<template>
  <!-- 像素人全屏动画层（Teleport到body，不受main的overflow影响） -->
  <Teleport to="body">
    <ActorAnimation />
  </Teleport>

  <main class="relative flex flex-col h-screen bg-black text-[#EDEDED] overflow-hidden">
    <!-- 头部导航 -->
    <header class="relative z-20 bg-black h-24 flex items-center">
      <div class="w-full flex items-center justify-between px-12">
        <nav class="flex items-center gap-8 font-mono uppercase">
          <ShuffleText text="SPEAKERS" />
          <ShuffleText text="SCHEDULE" />
          <ShuffleText text="FAQ" />
        </nav>

        <div class="flex items-center mr-17 gap-1">
          <span class="text-[28px] font-semibold tracking-[-2px] font-geist-sans text-white">
            Ship
          </span>
          <span
            class="px-0.5 text-xs border-[1.5px] border-white rounded font-mono cursor-pointer tracking-tight font-semibold"
          >
            LDN
          </span>
        </div>

        <nav class="flex items-center gap-8 font-geist-mono uppercase text-sm tracking-wider">
          <span class="hover:text-white transition-colors cursor-pointer inline-flex">
            GET A TICKET
          </span>
          <ShuffleText text="LOGIN" />
        </nav>
      </div>
    </header>

    <!-- 👇 底部核心内容区（已抽成组件） -->
    <HeroContent />
  </main>
</template>

<script setup>
import ShuffleText from './ShipCity_ShuffleText.vue'
import HeroContent from './ShipCity_HeroContent.vue'
import ActorAnimation from './ShipCity_HeroContent_ActorAnimation.vue'
</script>