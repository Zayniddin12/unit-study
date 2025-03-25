<template>
  <div class="relative overflow-hidden md:-mt-[82px]">
    <client-only>
      <SectionsMain />
    </client-only>
    <div class="container my-8 md:!my-16">
      <UIWrapperTitle
        has-button
        home
        subtitle="studying_abroad_subtitle"
        title="studying_abroad"
        @clicked="show = true"
      />
    </div>
    <LazySectionsMainOurServicesOpportunity />
    <div class="relative z-2">
      <LazySectionsMainOurAdventage />
    </div>
    <div ref="counterRef">
      <LazySectionsMainSteps id="numbers_about" v-bind="{ isVisible }" />
    </div>
    <div class="container my-8">
      <LazyUIWrapperTitle
        dark
        has-button
        home
        subtitle="studying_abroad_subtitle"
        title="studying_abroad"
        @clicked="show = true"
      />
    </div>
    <LazySectionsMainUniversities />
    <LazySectionsMainWayOfStudent />
    <LazySectionsMainOpportunityWithUs />
    <LazySectionsMainOurServices />
    <LazySectionsMainEvents />
    <LazySectionsMainGrands />
    <LazySectionsMainReviews />
    <LazySectionsMainNews />
    <LazySectionsMainFAQ />
    <ModalConsultation
      :key="state"
      :items="items"
      :show="show"
      :state="state"
      @close="show = false"
    />
    <LayoutsLoader custom-loading />
  </div>
</template>

<script lang="ts" setup>
import type { IService } from '~/types/common'

const route = useRoute()
const isVisible = ref(false)
const counterRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (route.query?.section && process.client) {
    setTimeout(() => {
      const section = document.getElementById(route.query.section as string)
      section?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 100)
  }
})
const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    isVisible.value = true
    if (observer) {
      observer.disconnect()
    }
  }
}
const show = ref(false)
const state = ref<'have_question' | 'success'>('have_question')
const items = ref<IService>()

let observer: IntersectionObserver | null = null

onMounted(() => {
  setTimeout(() => window.scrollTo(0, 0), 100)
  observer = new IntersectionObserver(handleIntersect)
  if (counterRef.value) {
    observer.observe(counterRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.swiper {
  overflow: unset;
}
</style>
