<template>
  <div class="container">
    <div
      v-if="$route.name !== 'universities-slug-program-program'"
      class="flex gap-5 flex-col sm:flex-row"
    >
      <div class="basis-8/12 flex-col space-y-6">
        <div
          class="h-[256px] w-full relative overflow-hidden rounded-3xl border-2 border-white"
        >
          <img
            :src="card?.background ?? '/images/unit-study.png'"
            alt="university-single"
            class="w-full h-full object-cover aspect-video absolute z-0"
          />
          <div
            class="absolute w-full h-full top-0 left-0 z-2 bg-gradient-to-b from-black/5 to-dark-100/60"
          />
          <div class="absolute bottom-6 w-full flex-y-center gap-5 z-10 left-6">
            <UIAvatar
              :image="card?.avatar ?? '/images/svg/unitLogo.svg'"
              avatar-class="before:!hidden before:inset-0 before:!border-0"
              class="!rounded-full border border-gray-200 !bg-gray"
            />
            <p
              class="sm:text-base text-sm leading-5 text-white font-extrabold max-w-[316px]"
            >
              {{ card?.title }}
            </p>
          </div>
        </div>
        <div v-if="!sm" class="overflow-hidden max-sm:hidden">
          <slot>Content</slot>
        </div>
      </div>

      <div class="basis-4/12">
        <div
          class="relative bg-white rounded-3xl border-2 border-white basis-4/12 overflow-hidden h-fit"
        >
          <ClientOnly>
            <div v-for="(card, index) in list" :key="index" class="!w-full">
              <div
                :class="{
                  '!text-primary bg-gray': tab === card?.value,
                }"
                class="relative px-5 py-4 !w-full flex gap-3 items-center cursor-pointer transition-300"
                @click="activateTab(card?.value)"
              >
                <div
                  :class="{
                    '!bg-primary text-white  shadow-university-content':
                      tab === card?.value,
                  }"
                  class="rounded-10 sm:h-10 h-8 w-8 sm:w-10 flex-center bg-gray text-dark sm:text-2xl text-base transition-300"
                >
                  <span :class="card?.icon" />
                </div>
                <p
                  class="text-sm !leading-130 text-dark transition-300 font-semibold"
                >
                  {{ $t(card?.label) }}
                </p>
              </div>
            </div>
          </ClientOnly>
        </div>
        <!--        <UIButton-->
        <!--          class="w-full mt-4 !bg-primary-100 hover:!opacity-70"-->
        <!--          :text="$t('buttons.apply')"-->
        <!--          @click="$emit('navigate')"-->
        <!--        />-->
      </div>
      <div v-if="sm" class="overflow-hidden">
        <slot>Content</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

import { useWindowSize } from '@vueuse/core'

interface Props {
  list: {
    label: string
    value: string
    icon: string
  }[]
  card: {
    title: string
    background: string
    avatar: string
  }
  active?: string
  initial?: number
}

const { width } = useWindowSize()
const props = defineProps<Props>()
const emit = defineEmits(['on-tab-change', 'navigate'])
const tab = ref(props.active)
const sm = computed(() => width.value < 640)

const activateTab = (value: string) => {
  tab.value = value
  emit('on-tab-change', value)
}

watch(
  () => props.active,
  () => {
    tab.value = props.active
  }
)
</script>

<style scoped>
.linear-bg-tab {
  background: linear-gradient(
    180deg,
    rgba(0, 103, 255, 0) 0%,
    rgba(0, 103, 255, 0.1) 100%
  );
}

.linear-white-tab-right {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
}

.swiper-button-disabled {
  pointer-events: none !important;
  opacity: 0 !important;
}
</style>
