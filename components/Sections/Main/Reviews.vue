<template>
  <div class="py-7 md:py-16 relative overflow-hidden bg-gray">
    <UISectionTitle
      :title="$t('reviews')"
      :subtitle="$t('reviews_subtitle')"
      :label-class="'md:!text-48 text-xl'"
      :subtitle-class="'!text-center !text-dark md:text-xl text-base font-normal'"
      class="container relative z-10"
    />
    <div class="container">
      <div class="relative -ml-[30%] -mr-[30%] lg:overflow-x-hidden">
        <div v-if="review?.length > 0" class="md:pt-16 pt-4 relative">
          <div class="relative z-10">
            <div class="space-y-0 md:space-y-9">
              <NuxtMarquee
                auto-fill
                pause-on-hover
                :speed="60"
                class="z-40 relative pb-10 md:pb-14"
              >
                <div class="flex-y-center space-x-4 gap-4 mr-8">
                  <CardMainReviewLoading v-if="loading" />
                  <div
                    v-for="(item, key) in review"
                    v-else
                    :key
                    class="space-x-1 !w-fit h-full"
                  >
                    <CardMainReview :card="item" />
                  </div>
                </div>
              </NuxtMarquee>
            </div>
          </div>
          <div
            class="w-[350px] h-full absolute top-0 -right-6 z-10 -mt-2 max-[1260px]:!hidden"
            style="
              background: linear-gradient(
                90deg,
                rgba(242, 243, 247, 0) 0%,
                #f2f3f7 100%
              );
            "
          />
          <div
            class="h-full w-[350px] absolute -left-1 rotate-180 top-0 z-10 max-[1260px]:!hidden"
            style="
              background: linear-gradient(
                90deg,
                rgba(242, 243, 247, 0) 0%,
                #f2f3f7 100%
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
import 'swiper/css/effect-cards'

import { EffectCards, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useHomeStore } from '~/store'

const loading = ref(true)
const { fetchReview } = useHomeStore()

const review = computed(() => useHomeStore().review)
Promise.allSettled([fetchReview()])
  .then(() => (loading.value = false))
  .catch((err) => {
    return new Error(err)
  })
</script>

<style>
.swiper-cards .swiper-slide {
  overflow: visible !important;
}
</style>
