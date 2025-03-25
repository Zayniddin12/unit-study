<template>
  <div class="">
    <div class="bg-white absolute w-full h-full top-0 left-0" />
    <div class="!mx-auto py-7 md:pb-16 container">
      <div class="flex justify-between items-center pb-6 md:pb-14 -mb-7">
        <div class="!text-left">
          <UISectionTitle
            :title="$t('our_advantages')"
            :label-class="'-mt-2 md:text-32 text-xl !text-left'"
            :subtitle="$t('universities_subtitle')"
            :subtitle-class="'mb-2 mt-1 max-md:text-sm'"
            class="!text-left"
          />
        </div>

        <div class="flex-center gap-4 max-sm:hidden">
          <button
            aria-label="prev button"
            class="living-prev-el flex-center w-8 h-8 rounded-full border border-gray rotate-90 transition-300 hover:border-primary group"
          >
            <i
              class="icon-chevron text-xl text-gray-100 group-hover:text-primary"
            />
          </button>
          <button
            aria-label="next button"
            class="living-next-el flex-center w-8 h-8 rounded-full border border-gray -rotate-90 transition-300 hover:border-primary group"
          >
            <i
              class="icon-chevron text-xl text-gray-100 group-hover:text-primary"
            />
          </button>
        </div>
      </div>
      <div
        v-if="livingConditions?.length > 0"
        class="pb-6 md:pb-14 relative -ml-[5%] lg:-ml-[30%] lg:-mr-[30%] overflow-hidden"
      >
        <div class="container">
          <ClientOnly>
            <Swiper
              :space-between="20"
              :slides-per-view="4"
              :navigation="{
                nextEl: '.living-next-el',
                prevEl: '.living-prev-el',
              }"
              :modules="[Navigation]"
              :breakpoints="{
                '240': {
                  slidesPerView: 1,
                },
                '600': {
                  slidesPerView: 2,
                },
                '1440': {
                  slidesPerView: 3,
                },
              }"
              class="!overflow-visible"
            >
              <SwiperSlide
                v-for="(card, index) in livingConditions"
                :key="index"
                class=" rounded-2xl p-6 bg-gray hover:bg-white cursor-pointer !transition-all !duration-300 hover:shadow-content-hover"
              >
                <div class="min-h-[188px]">
                  <CardMainAdventage :card="card" class="content" />
                </div>
              </SwiperSlide>
            </Swiper>
          </ClientOnly>
          <div
            class="w-[350px] h-full absolute top-0 -right-0 z-10 max-[1260px]:!hidden"
            style="
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                #ffffff 100%
              );
            "
          />
          <div
            class="h-full w-[100px] absolute -left-1 top-0 z-10 rotate-180 max-[1260px]:!hidden"
            style="
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                #fff 100%
              );
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/navigation'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useHomeStore } from '~/store'

const news = {
  title: 'Льготы для студентов',
  description:
    'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
  image: '/images/fake/samarkand.png',
}
const loading = ref(true)
const { fetchlivingConditions } = useHomeStore()

const livingConditions = computed(() => useHomeStore().livingConditions)
Promise.allSettled([fetchlivingConditions()])
  .then(() => (loading.value = false))
  .catch((err) => {
    return new Error(err)
  })
</script>
