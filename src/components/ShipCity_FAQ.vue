<template>
  <div class="lg:pt-[calc(28rem-var(--header-height))]">
    <div class="mx-auto w-full px-16 grid lg:grid-cols-[repeat(18,1fr)] lg:gap-5 gap-6">
      <div class="lg:col-span-6">
        <div class="flex flex-col items-start gap-12 lg:sticky lg:top-[192px]">
          <p class="font-pixel-circle text-gray-1000 leading-none text-5xl xl:text-7xl  tracking-[-0.1rem] xl:tracking-[-0.2rem] [-webkit-text-stroke:0.02rem_currentColor]">FAQ</p>
        </div>
      </div>
      <div class="lg:col-start-7 lg:col-span-11 xl:col-start-8">
        <div class="lg:-mt-10">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="border-b border-dashed border-[#343232c0] last:border-0 py-4 overflow-hidden"
          >
            <button
              class="py-6 w-full flex justify-between gap-8 items-center group cursor-pointer bg-transparent"
              @click="toggle(i)"
            >
              <p class="font-geist-sans leading-none text-3xl lg:leading-none lg:tracking-[-0.04em] font-medium text-left text-gray-1000 group-hover:text-gray-500 transition-colors">
                {{ faq.question }}
              </p>
              <div class="pr-[7px] text-gray-500 group-hover:text-gray-1000 shrink-0">
                <svg
                  class="size-8 transition-transform duration-300"
                  :class="openIndex === i ? 'rotate-45' : ''"
                  viewBox="0 0 16 16" fill="currentColor"
                >
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M 8.75,1 H7.25 V7.25 H1.5 V8.75 H7.25 V15 H8.75 V8.75 H14.5 V7.25 H8.75 V1.75 Z"/>
                </svg>
              </div>
            </button>
            <div
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{ maxHeight: openIndex === i ? contentHeight[i] + 'px' : '0' }"
            >
              <div
                class="font-mono font-normal tracking-normal text-gray-400 text-base leading-normal pb-6"
                :ref="el => setHeight(el, i)"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
const openIndex = ref(-1)
const contentHeight = ref([])

// 自动获取内容高度，实现动画
function setHeight(el, i) {
  if (el) {
    nextTick(() => {
      contentHeight.value[i] = el.scrollHeight
    })
  }
}

function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}

const faqs = [
  { question: 'What is Ship?', answer: 'Ship is a conference by Vercel that brings together developers, designers, and leaders to explore the future of the web.' },
  { question: 'Will this be live-streamed?', answer: 'Yes, the event will be live-streamed. Check back closer to the event date for the stream link.' },
  { question: 'When will the full agenda be announced?', answer: 'The full agenda will be announced closer to the event date. Sign up for updates to be the first to know.' },
  { question: "What's the refund and cancellation policy?", answer: 'Tickets are refundable up to 7 days before the event. After that, tickets are non-refundable but can be transferred.' },
  { question: 'Can I participate as a sponsor of the event?', answer: 'Yes, sponsorship opportunities are available. Contact the team for more details on sponsorship packages.' },
  { question: 'Dietary Restrictions & Food Allergies', answer: 'We accommodate all dietary restrictions and food allergies. Please indicate your needs when registering.' },
  { question: 'Accessibility Accommodations', answer: 'The venue is fully accessible. If you need specific accommodations, please let us know when registering.' },
  { question: "I have additional questions that weren't covered here, who can I contact?", answer: 'Reach out to the team via email or on social media. We are happy to help with any questions.' },
]
</script>