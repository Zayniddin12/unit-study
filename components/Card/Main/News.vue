<template>
  <NuxtLink
    :to="!loading ? '/news/' + news?.id : ''"
    class="w-full group block rounded-3xl"
  >
    <div
      :class="[
        cardStyle,
        {
          '!pl-0': isFirst,
          '!pr-0': isLast,
          'hover:!border-primary cursor-pointer md:p-4': !isMain && !loading,
        },
      ]"
      class="max-md:pr-2.5 bg-white/80 flex flex-col gap-5 justify-between h-full rounded-3xl group border-2 border-white transition-300 duration-300 p-3.5"
    >
      <div class="max-md:flex max-md:items-center max-md:gap-3 w-full">
        <div
          class="sm:w-[123px] w-[100px] md:w-full sm:h-[168px] h-[120px] shrink-0 md:h-[196px] relative"
        >
          <div
            class="absolute w-full h-full z-10 rounded-lg flex justify-center items-center"
          >
            <div
              :class="{ 'group-hover:opacity-100': !isMain && !loading }"
              class="h-16 w-16 rounded-full flex items-center justify-center border border-white/20 bg-primary/5 backdrop-blur-[10px] opacity-0 transition-300"
            >
              <span class="icon-arrow-up text-32 text-white" />
            </div>
          </div>
          <UIShimmer
            height="100%"
            v-bind="{ loading }"
            width="100%"
            border-radius="24px"
          >
            <img
              :src="news?.image_url || '/images/default/default.svg'"
              alt="news"
              class="object-cover w-full h-full rounded-2xl grayscale-0 transition-300 border-2 border-gray-100/20"
              loading="lazy"
            />
          </UIShimmer>
        </div>
        <div :class="{ 'px-2': !isMain }">
          <div
            :class="{
              'border rounded-full border-gray !w-fit py-1.5 px-2 ': isMain,
            }"
            class="inline-flex w-full md:mt-5 gap-4"
          >
            <div class="flex gap-1 items-center">
              <UIShimmer height="24px" v-bind="{ loading }" width="100%"
                ><span class="icon-calendar text-gray-100 text-xl"
              /></UIShimmer>

              <UIShimmer height="24px" v-bind="{ loading }" width="100%">
                <p
                  class="!leading-130 transition-300 text-xs font-normal text-gray-100"
                >
                  {{
                    dayjs(news?.create_date)
                      .locale(
                        locale === 'uz'
                          ? 'uz-latn'
                          : locale === 'ru'
                          ? 'ru'
                          : 'en'
                      )
                      .format('MM.DD.YYYY')
                  }}
                  •
                  {{ dayjs(news?.create_date).format('HH:mm') }}
                </p>
              </UIShimmer>
            </div>
            <div v-if="!isMain" class="flex gap-1 items-center">
              <UIShimmer height="24px" v-bind="{ loading }" width="24px">
                <span class="icon-eye text-xl text-gray-100"
              /></UIShimmer>
              <UIShimmer height="24px" v-bind="{ loading }" width="100%">
                <p
                  class="!leading-130 transition-300 text-xs font-normal text-gray-100"
                >
                  {{ news?.views_count }}
                </p>
              </UIShimmer>
            </div>
            <div v-if="isMain" class="flex gap-1 items-center">
              <UIShimmer height="24px" v-bind="{ loading }" width="24px">
                <span class="icon-eye text-xl text-gray-100"
              /></UIShimmer>
              <UIShimmer height="24px" v-bind="{ loading }" width="100%">
                <p
                  class="!leading-130 transition-300 text-xs font-normal text-gray-100"
                >
                  {{ news?.views_count }}
                </p>
              </UIShimmer>
            </div>
          </div>
          <UIShimmer
            height="24px"
            preloader-class="md:mt-3"
            v-bind="{ loading }"
            width="100%"
          >
            <h4
              :class="{ 'group-hover:text-primary': isMain && !loading }"
              class="md:mt-2.5 !leading-130 transition-300 sm:text-lg text-sm line-clamp-2 font-semibold text-dark"
            >
              {{ news?.name }}
            </h4>
          </UIShimmer>
          <UIShimmer
            height="20px"
            preloader-class="mt-1 md:mt-3"
            v-bind="{ loading }"
            width="100%"
          >
            <p
              v-if="news?.content"
              :class="{
                'line-clamp-none': isReadMore || news?.subtitle?.length <= 138,
              }"
              class="text-sm font-normal w-full line-clamp-2 !leading-130 text-dark mt-1 md:mt-3"
            >
              {{ richTextPurify(news?.content, 200) }}...
            </p>
          </UIShimmer>
          <UIShimmer
            v-if="hasMore"
            height="24px"
            v-bind="{ loading }"
            width="24px"
          >
            <div class="flex gap-1 items-center mt-2">
              <p class="text-primary text-sm font-medium">{{ $t('more') }}</p>
              <i
                class="icon-chevron rotate-[270deg] group-hover:translate-x-0.5 transition-300 text-primary"
              />
            </div>
          </UIShimmer>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/en'

// commit
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { INews } from '~/types/common'

const { locale, t } = useI18n()

interface Props {
  news: INews
  loading?: boolean
  isLast?: boolean
  isFirst?: boolean
  isMain?: boolean
  cardStyle?: string
  hasMore?: boolean
}

defineProps<Props>()

const isReadMore = ref(false)
</script>
