<template>
  <main class="bg-black text-[#EDEDED]">
    <header class="relative z-20 bg-black h-24 flex items-center shrink-0 border-b-[1.8px] border-[#343232c0]">
      <div class="w-full flex items-center justify-between px-12">
        <nav class="flex items-center gap-8 font-mono uppercase">
          <router-link :to="`/ship/${citySlug}`" class="hover:opacity-70 transition-opacity">Speakers</router-link>
          <router-link :to="`/ship/${citySlug}`" class="hover:opacity-70 transition-opacity">Schedule</router-link>
          <router-link :to="`/ship/${citySlug}#faq`" class="hover:opacity-70 transition-opacity">FAQ</router-link>
        </nav>

        <div class="flex items-center mr-17 gap-1">
          <router-link :to="`/ship/${citySlug}`" class="flex items-center gap-1">
            <span class="text-[28px] font-semibold tracking-[-2px] font-geist-sans text-white">Ship</span>
            <span class="px-0.5 text-xs border-[1.5px] border-white rounded font-mono cursor-pointer tracking-tight font-semibold">{{ cityCode }}</span>
          </router-link>
        </div>

        <nav class="flex items-center gap-8 font-geist-mono uppercase text-sm tracking-wider">
          <router-link :to="`/ship/${citySlug}/register`" class="hover:opacity-70 transition-opacity cursor-pointer inline-flex">GET A TICKET</router-link>
          <a href="/ship/login" class="hover:opacity-70 transition-opacity">Login</a>
        </nav>
      </div>
    </header>

  <form class="flex relative max-xl:flex-col max-xl:items-center xl:items-stretch xl:justify-center pl-4 pr-20" @submit.prevent>
    <div class="hidden xl:block w-1/4 max-w-[460px] max-[1600px]:hidden"></div>
    <div class="flex flex-col gap-10 lg:border-x lg:border-[#343232c0] p-6 md:p-16 lg:p-20 w-full max-w-[990px] 2xl:w-1/2 min-h-[calc(100vh-3.5rem)]">
      <!-- 标题 -->
      <div>
        <div class="flex flex-col gap-4">
          <h1 class="text-gray-1000 leading-none text-2xl lg:text-3xl xl:text-5xl tracking-[-3px] xl:leading-none font-medium">
            Join us in London on <span class="whitespace-nowrap">June 17</span>
          </h1>
          <p class="font-mono font-normal tracking-normal text-gray-400 text-sm leading-normal">
            Already registered?
            <a href="/ship/login" class="underline underline-offset-2 decoration-gray-600 hover:opacity-70 transition-opacity">Log in</a>
          </p>
        </div>
      </div>

      <!-- 票种选择 -->
      <div class="w-full flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <div
            class="border transition-colors p-5 relative min-h-20 cursor-pointer"
            :class="ticketType === 'in-person' ? 'bg-[#333] border-[#333]' : 'bg-transparent border-[#343232c0]'"
            @click="ticketType = 'in-person'"
          >
            <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div class="flex flex-col gap-1">
                <h3 class="text-base font-semibold" :class="ticketType === 'in-person' ? 'text-white' : 'text-gray-1000'">In-person</h3>
                <p class="max-w-[560px] font-mono text-sm" :class="ticketType === 'in-person' ? 'text-white/80' : 'text-gray-400'">Join us in London on June 17</p>
              </div>
              <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
                <p class="max-w-[560px] font-mono text-sm line-through" :class="ticketType === 'in-person' ? 'text-white/50' : 'text-gray-500'">$250.00</p>
                <div class="min-w-[82px] px-3 py-2.5 font-mono text-center text-sm uppercase font-semibold"
                  :class="ticketType === 'in-person' ? 'bg-white text-black' : 'bg-white text-black'"
                >$125.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 步骤1: Attendee info -->
      <div class="w-full flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
            <span class="text-sm font-mono bg-[#333] text-white flex h-7 w-8 items-center justify-center">1</span>
            <p class="text-gray-1000 leading-none text-2xl lg:text-3xl lg:leading-none lg:tracking-[-0.04em] font-medium">Complete your attendee information</p>
          </div>
        </div>
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label class="text-xs text-gray-400 font-mono uppercase">First name</label>
            <input class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none" placeholder="Tammy" required autocomplete="given-name" maxlength="40" v-model="form.firstName">
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs text-gray-400 font-mono uppercase">Last name</label>
            <input class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none" placeholder="Triangle" required autocomplete="family-name" maxlength="40" v-model="form.lastName">
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs text-gray-400 font-mono uppercase">Work Email</label>
            <input class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none" placeholder="tammytriangle@acme.com" required type="email" v-model="form.email">
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs text-gray-400 font-mono uppercase">Company Name</label>
            <input class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none" placeholder="Company" required v-model="form.companyName">
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs text-gray-400 font-mono uppercase">Job Title</label>
            <input class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none" placeholder="Role or function" required v-model="form.title">
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs text-gray-400 font-mono uppercase">Country</label>
            <select class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none appearance-none" required v-model="form.country">
              <option disabled value="">Select an option</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="CA">Canada</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="IN">India</option>
              <option value="AU">Australia</option>
              <option value="NL">Netherlands</option>
              <option value="KR">South Korea</option>
              <option value="BR">Brazil</option>
              <option value="SG">Singapore</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 步骤2: Buy ticket -->
      <div class="w-full flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
            <span class="text-sm font-mono bg-[#333] text-white flex h-7 w-8 items-center justify-center">2</span>
            <p class="text-gray-1000 leading-none text-2xl lg:text-3xl lg:leading-none lg:tracking-[-0.04em] font-medium">Buy your ticket</p>
          </div>
          <p class="font-mono font-normal tracking-normal text-gray-400 text-sm leading-normal">
            Enter your card details to purchase an in-person ticket.<br>Prices and charges are in USD.
          </p>
        </div>
        <div class="flex flex-col gap-6">
          <div class="border border-[#343232c0] p-6 flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-xs text-gray-400 font-mono uppercase">Card number</label>
              <input class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none" placeholder="4242 4242 4242 4242" v-model="form.cardNumber">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="text-xs text-gray-400 font-mono uppercase">Expiry</label>
                <input class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none" placeholder="MM / YY" v-model="form.expiry">
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-xs text-gray-400 font-mono uppercase">CVC</label>
                <input class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none" placeholder="123" v-model="form.cvc">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Promo code -->
      <div class="w-full flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-xs text-gray-400 font-mono uppercase">Promo Code</label>
          <div class="relative">
            <input class="w-full bg-transparent font-mono text-sm text-gray-1000 h-12 px-4 border border-[#343232c0] hover:border-[#555] focus:border-white focus:ring-2 focus:ring-white focus:outline-none uppercase pr-[72px]" v-model="form.promoCode">
            <div class="absolute right-0 top-0 h-full flex items-center pr-4">
              <button type="button" class="text-gray-500 hover:text-gray-1000 font-normal font-mono text-sm">Apply</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 步骤3: Order summary (xl:hidden) -->
      <div class="w-full flex flex-col gap-6 xl:hidden">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
            <span class="text-sm font-mono bg-[#333] text-white flex h-7 w-8 items-center justify-center">3</span>
            <p class="text-gray-1000 leading-none text-2xl lg:text-3xl lg:leading-none lg:tracking-[-0.04em] font-medium">Order summary</p>
          </div>
        </div>
        <div class="flex flex-col gap-5 w-full">
          <div class="flex gap-3">
            <p class="font-mono font-normal tracking-normal text-gray-400 text-sm leading-normal flex-1">Early bird in-person ticket</p>
            <p class="font-mono font-normal tracking-normal text-gray-400 text-sm leading-normal"><span class="text-gray-500 line-through">$250 USD</span> <span class="text-gray-1000">$125 USD</span></p>
          </div>
          <div class="flex gap-3">
            <p class="font-mono font-normal tracking-normal text-gray-400 text-sm leading-normal flex-1 uppercase">Sub total</p>
            <p class="font-mono font-normal tracking-normal text-gray-400 text-sm leading-normal"><span class="text-gray-500 line-through">$250.00 USD</span> <span class="text-gray-1000">$125.00 USD</span></p>
          </div>
        </div>
      </div>

      <!-- Checkboxes + Complete purchase -->
      <div class="flex flex-col gap-5">
        <label class="text-[13px] inline-flex items-start cursor-pointer">
          <input type="checkbox" v-model="form.termsAccepted" class="mt-1 mr-2">
          <span class="text-sm text-gray-400 pt-[3px] text-pretty leading-normal">I have read and agree to the <a href="https://vercel.com/legal/event-terms-conditions" target="_blank" class="underline underline-offset-2 decoration-gray-600">Event Terms and Conditions</a>.</span>
        </label>
        <label class="text-[13px] inline-flex items-start cursor-pointer">
          <input type="checkbox" v-model="form.marketingComms" class="mt-1 mr-2">
          <span class="text-sm text-gray-400 pt-[3px] text-pretty leading-normal">Yes, I agree to receive marketing communications from Vercel as described in your <a href="https://vercel.com/legal/privacy-policy" target="_blank" class="underline underline-offset-2 decoration-gray-600">Privacy Policy</a>. I can withdraw my consent at any time by clicking the unsubscribe link in the emails.</span>
        </label>

        <!-- Complete purchase -->
        <div
          class="border transition-colors p-5 relative min-h-20 cursor-pointer"
          :class="form.termsAccepted ? 'bg-white border-white' : 'bg-transparent border-[#343232c0]'"
        >
          <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex flex-col gap-1">
              <h3 class="text-base font-semibold" :class="form.termsAccepted ? 'text-black' : 'text-gray-1000'">Complete purchase</h3>
            </div>
            <div class="flex max-md:flex-col md:items-center gap-4">
              <p class="max-w-[560px] font-mono text-sm line-through text-gray-500">$250.00</p>
              <div class="min-w-[82px] px-3 py-2.5 font-mono text-center text-sm uppercase font-semibold"
                :class="form.termsAccepted ? 'bg-black text-white' : 'bg-white text-black'"
              >$125.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧 Order summary (xl only) -->
    <div class="hidden xl:block xl:max-w-[460px] 2xl:w-1/4 px-6 md:pr-8 md:pl-16 w-full max-w-[990px]">
      <div class="sticky top-14 py-10 md:py-20">
        <div class="flex flex-col gap-6 w-full items-start">
          <div class="flex flex-col gap-4">
            <p class="text-gray-1000 leading-none text-2xl lg:text-3xl lg:leading-none lg:tracking-[-0.04em] font-medium">Order summary</p>
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-3">
                <p class="font-mono font-normal tracking-normal text-gray-400 text-sm leading-normal">Early bird in-person ticket</p>
                <p class="font-mono font-normal tracking-normal text-gray-400 text-sm leading-normal"><span class="text-gray-500 line-through">$250 USD</span> <span class="text-gray-1000">$125 USD</span></p>
              </div>
            </div>
          </div>
          <div class="w-full h-px bg-gray-700"></div>
          <div class="flex flex-col gap-2 md:gap-4">
            <div class="flex flex-col gap-3">
              <p class="font-mono font-normal tracking-normal text-gray-400 text-sm lg:text-base leading-normal uppercase">Sub total</p>
              <p class="font-mono font-normal tracking-normal text-gray-400 text-sm lg:text-base leading-normal"><span class="text-gray-500 line-through">$250.00 USD</span> <span class="text-gray-1000">$125.00 USD</span></p>
            </div>
          </div>
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-3 h-12 px-5 font-mono uppercase font-semibold text-sm bg-white text-black hover:bg-white/80 cursor-pointer select-none whitespace-nowrap transition-colors w-full max-md:w-full"
            :disabled="!form.termsAccepted"
            :class="form.termsAccepted ? '' : 'opacity-50 grayscale cursor-not-allowed'"
          >
            Checkout
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.5L0.958427 2.5C1.41012 2.5 1.82194 2.74308 2.04258 3.12774L2.5 4.5L3.93019 8.79057C4.27047 9.81142 5.22582 10.5 6.3019 10.5H12.4505C13.6422 10.5 14.6682 9.65885 14.9019 8.49029L15.7 4.5L16 3H14.4703L4.5 3L3.62309 3L3.50287 2.70678C3.07956 1.67431 2.0743 1 0.958427 1H0V2.5ZM4.08114 4.5L5.35321 8.31623C5.48933 8.72457 5.87147 9 6.3019 9H12.4505C12.9272 9 13.3376 8.66354 13.4311 8.19612L14.1703 4.5H4.5H4.08114ZM12.5 15C11.6716 15 11 14.3284 11 13.5C11 12.6716 11.6716 12 12.5 12C13.3284 12 14 12.6716 14 13.5C14 14.3284 13.3284 15 12.5 15ZM4.5 13.5C4.5 14.3284 5.17157 15 6 15C6.82843 15 7.5 14.3284 7.5 13.5C7.5 12.6716 6.82843 12 6 12C5.17157 12 4.5 12.6716 4.5 13.5Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </form>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const cityCode = computed(() => route.meta.code || 'LDN')
const citySlug = computed(() => {
  const parts = route.path.split('/')
  return parts[2] || 'london'
})

const ticketType = ref('in-person')

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  title: '',
  country: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  promoCode: '',
  termsAccepted: false,
  marketingComms: false,
})
</script>
