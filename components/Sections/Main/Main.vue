<template>
  <header ref="scroll" class="md:h-screen relative hero">
    <Client-Only>
      <Swiper
        v-if="banners?.length"
        class="swiper md:!w-screen md:!h-screen max-md:!absolute w-full h-full"
        :settings="settings"
        v-bind="settings"
        @autoplay-time-left="onAutoplayTimeLeft"
      >
        <SwiperSlide
          v-for="(banner, index) in banners"
          :key="index"
          class="relative md:!w-screen md:!h-screen !h-full !w-full z-1"
        >
          <!--          <NuxtImg-->
          <!--            alt="hero Section image"-->
          <!--            class="bottom-0 md:!w-screen md:!h-screen !h-full !w-full top-0 object-cover"-->
          <!--            :src="banner"-->
          <!--          />-->
          <SectionsMainBanner :banner="banner" />
        </SwiperSlide>
      </Swiper>
    </Client-Only>
    <main
      class="container left-[50%] -translate-x-1/2 md:absolute relative z-30"
    >
      <div
        class="relative max-md:h-full max-md:flex max-md:flex-col max-md:pt-[290px] max-md:pb-10 max-md:gap-4"
      >
        <div class="max-sm:flex-col max-md:flex hidden gap-3 relative z-30">
          <UIButton
            text="contact_us_btn"
            variant="outline-primary"
            class="!test-white"
            @click="navigateTo('/contact')"
          />
          <a href="#numbers_about">
            <UIButton
              class="max-sm:w-full"
              text="be_friend_with"
              variant="primary"
            />
          </a>
        </div>
        <div class="flex gap-4 max-sm:hidden absolute bottom-[180px]">
          <button
            aria-label="prev button"
            class="living-prev-el flex-center w-10 h-10 rounded-full border border-white bg-white/80 rotate-90 transition-300 hover:bg-white group"
          >
            <i
              class="icon-chevron text-2xl text-gray-100 group-hover:text-warning transition-300"
            />
          </button>
          <button
            aria-label="next button"
            class="living-next-el flex-center w-10 h-10 rounded-full border border-white bg-white/80 -rotate-90 transition-300 hover:bg-white group"
          >
            <i
              class="icon-chevron text-2xl text-gray-100 group-hover:text-warning transition-300"
            />
          </button>
        </div>
        <SectionsUniversityFilter navigate-route="programs" />
      </div>
    </main>

    <ModalAuth :key="state" v-bind="{ show, state }" @close="show = false" />
  </header>
</template>

<script lang="ts" setup>
import { SectionsMainBanner } from '#components'
import 'swiper/css'
import 'swiper/css/effect-fade'

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

import type { AuthState } from '~/components/Modal/Auth.vue'
import Banner from '~/components/Sections/Main/Banner.vue'
import { SelectOption } from '~/types'
import { IBanner, IResponse } from '~/types/common'

const state = ref<AuthState>('login')
const show = ref(false)
const progressCircle = ref<SVGElement | null>(null)
const progressContent = ref<HTMLElement | null>(null)
const { t } = useI18n()
const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
  if (progressCircle.value) {
    progressCircle.value.style.setProperty('--progress', `${1 - progress}`)
  }
  if (progressContent.value) {
    progressContent.value.textContent = `${Math.ceil(time / 1000)}s`
  }
}

const banners = ref<IBanner[]>()

const settings = {
  pagination: {
    clickable: true,
  },
  effect: 'fade',
  initialSlide: 0,
  navigation: { nextEl: '.living-next-el', prevEl: '.living-prev-el' },
  loop: true,
  modules: [EffectFade, Autoplay, Pagination, Navigation],
  autoplay: {
    delay: 5000,
  },
}

async function getListBanners() {
  await useApi()
    .$get<IResponse<IBanner>>(
      '/development/params/background.image/advanced_list',
      {
        params: {
          specification: { id: {}, title: {}, description: {}, image_url: {} },
        },
      }
    )
    .then((res) => {
      banners.value = res?.records
    })
}

getListBanners()
</script>
<style>
.swiper .swiper-pagination {
  max-width: 1224px;
  width: 100% !important;
  left: 50% !important;
  transform: translateX(-50%);
  padding-left: 1rem;
  padding-right: 40%;
}
.swiper .swiper-pagination-bullets {
  width: 437px;
  position: absolute;
  z-index: 4;
  display: flex !important;
  gap: 7px;
  bottom: 156px;
  left: 0%;
  transform: translate(-50%, -50%);
}

.swiper .swiper-pagination-bullet {
  position: relative;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.24) !important;
  border-radius: 5px;
  overflow: hidden;
  opacity: 1 !important;
  width: 30%;
  height: 4px;
  z-index: 100;
}

.swiper .swiper-pagination-bullet-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  background: #d62f75; /* Progress bar color */
  height: 4px;
  width: 0; /* Start with 0 width */
  border-radius: 4px;
  animation: progressBar 5s linear forwards; /* Adjust duration to autoplay delay */
}

/* Keyframes for the progress animation */
@keyframes progressBar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .swiper .swiper-pagination-bullets {
    bottom: 10px;
  }
}
</style>
