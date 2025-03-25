<template>
  <NuxtLink
    :class="{ 'hover:-translate-y-1 transition-300 group': !loading }"
    :to="`/events/${item?.id}`"
    class="sm:flex-y-center block rounded-2xl flex-col sm:min-h-[265px] shrink-0 sm:max-w-[560px] max-sm:w-full gap-3 cursor-pointer mr-5"
  >
    <div
      :class="{ 'group-hover:shadow-md transition-300': !loading }"
      class="flex hover:-translate-y-0 sm:justify-between sm:flex-row-reverse flex-col-reverse rounded-20 overflow-hidden min-h-[265px] bg-white"
    >
      <div class="p-5">
        <UIShimmer height="18px" v-bind="{ loading }" width="100%">
          <h3
            class="lg:text-xl md:text-lg text-base text-dark font-medium leading-130 mb-3 line-clamp-2"
          >
            {{ item?.name }}
          </h3>
        </UIShimmer>
        <Transition mode="out-in">
          <div :key="loading">
            <template v-if="loading">
              <UIShimmer
                v-for="item in 2"
                :key="item"
                height="14px"
                preloader-class="!my-2"
                v-bind="{ loading }"
                width="100%"
              />
            </template>
            <div
              v-else
              class="text-sm font-normal leading-130 text-gray-100 line-clamp-2"
              v-html="item?.description"
            />
          </div>
        </Transition>

        <div class="flex items-center gap-2.5 py-3">
          <UIShimmer height="24px" v-bind="{ loading }" width="24px">
            <span class="icon-map-pin text-primary text-2xl" />
          </UIShimmer>
          <UIShimmer height="14px" v-bind="{ loading }" width="80%">
            <p class="text-brand-black text-sm font-semibold leading-130">
              {{ item?.country_id?.name || '-' }}
            </p>
          </UIShimmer>
        </div>
        <div class="flex items-center gap-2.5 max-sm:flex-col">
          <div
            class="border border-dark/[0.10] p-3 rounded-[10px] flex gap-2 w-full h-[66px] items-center"
          >
            <UIShimmer height="40px" v-bind="{ loading }" width="40px">
              <p
                class="text-dark font-bold md:text-40 text-2xl md:w-12 text-right"
              >
                {{ day }}
              </p>
            </UIShimmer>
            <UIShimmer height="14px" v-bind="{ loading }" width="50px">
              <p class="text-dark text-sm font-normal">{{ monthYear }}</p>
            </UIShimmer>
          </div>
          <div
            class="border border-dark/[0.10] p-3 rounded-[10px] flex-center gap-2 w-full h-[66px]"
          >
            <UIShimmer height="14px" v-bind="{ loading }" width="50px">
              <p class="text-dark font-bold md:text-40 text-2xl">{{ hour }}</p>
            </UIShimmer>
          </div>
        </div>
      </div>
      <UIShimmer
        height="265px"
        preloader-class="sm:max-w-[260px] w-full shrink-0"
        v-bind="{ loading }"
      >
        <img
          :src="item?.image_url || '/images/default/default.svg'"
          alt="img"
          class="sm:max-w-[240px] w-full !aspect-video object-cover shrink-0"
          loading="lazy"
        />
      </UIShimmer>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/en'

import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

interface Props {
  item?: {
    image: string
    title: string
    description: string
    location: string
    time: string
    id: number
  }
  loading: boolean
}

const props = defineProps<Props>()

const day = ref(dayjs(props.item?.date).format('DD'))
const hour = dayjs(props.item?.date).format('HH:mm')
const month = dayjs(props.item?.date)
  .locale(
    locale.value === 'uz' ? 'uz-latn' : locale.value === 'ru' ? 'ru' : 'en'
  )
  .format('MMMM')
const year = dayjs(props.item?.date).format('YYYY')
const monthYear = ref(`${month} ${year}`)
onMounted(() => {
  if (day.value.charAt(0) == '0') {
    day.value = day.value.slice(1)
  }
})
</script>

<style scoped></style>
