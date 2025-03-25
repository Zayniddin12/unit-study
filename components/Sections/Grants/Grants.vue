<template>
  <NuxtLink :to="`/universities/${card?.university_id?.id}/grant/${card?.id}`">
    <div
      :class="{
        '!pl-0': isFirst,
        '!pr-0': isLast,
        ' transition-300 duration-300 hover:border-primary cursor-pointer':
          !loading,
      }"
      class="md:p-4 p-2 max-md:pr-2.5 flex flex-col gap-5 justify-between h-full bg-white/70 rounded-3xl group border-2 border-white"
    >
      <div class="max-md:flex max-md:items-center max-md:gap-3 w-full">
        <div
          class="sm:w-[123px] w-[130px] md:w-full sm:h-[168px] h-[120px] shrink-0 md:h-[196px] relative"
        >
          <UIShimmer height="100%" v-bind="{ loading }" width="100%">
            <img
              :src="card?.image_url || '/images/default/default.svg'"
              alt="news"
              class="object-cover w-full h-full rounded-2xl grayscale-0 transition-300 border-2 border-gray-100/20"
              loading="lazy"
              @error="
                (e) => {
                  e.target.src = '/images/default/default.svg'
                }
              "
            />
          </UIShimmer>
        </div>
        <div class="px-2">
          <div class="inline-flex max-sm:flex-wrap w-full md:mt-6 gap-4">
            <div class="flex gap-1 items-center">
              <UIShimmer height="24px" v-bind="{ loading }" width="24px"
                ><span
                  v-if="card?.end_date"
                  class="icon-calendar-time text-gray-100 text-xl"
              /></UIShimmer>
              <UIShimmer height="24px" v-bind="{ loading }" width="100%">
                <p
                  class="!leading-130 transition-300 text-xs font-normal text-gray-100"
                >
                  {{ dayjs(card?.end_date).format('MM.DD.YYYY') }}
                </p>
              </UIShimmer>
            </div>
            <div class="flex gap-1 items-center">
              <UIShimmer height="24px" v-bind="{ loading }" width="24px">
                <i class="icon-eye text-xl text-gray-100" />
              </UIShimmer>
              <UIShimmer height="24px" v-bind="{ loading }" width="100%">
                <p
                  class="!leading-130 transition-300 text-xs font-normal text-gray-100"
                >
                  {{
                    card?.view_count ? formatNumberSpace(card?.view_count) : 0
                  }}
                </p>
              </UIShimmer>
            </div>
            <div class="flex gap-1 items-center">
              <UIShimmer height="24px" v-bind="{ loading }" width="24px">
                <span
                  v-if="card?.education_level_ids"
                  class="icon-award text-xl text-gray-100"
                />
              </UIShimmer>
              <Transition mode="out-in">
                <div :key="loading" class="flex gap-1 flex-wrap">
                  <UIShimmer height="24px" v-bind="{ loading }" width="100%" />
                  <template v-if="!loading">
                    <p
                      class="!leading-130 transition-300 text-xs font-normal text-gray-100"
                    >
                      {{ card?.education_level_ids?.name }}
                    </p>
                  </template>
                </div>
              </Transition>
            </div>
          </div>
          <UIShimmer
            height="24px"
            preloader-class="md:mt-3"
            v-bind="{ loading }"
            width="100%"
          >
            <h4
              class="md:mt-3 transition-300 sm:text-lg text-sm line-clamp-3 font-semibold text-dark"
            >
              {{ card?.title }}
            </h4>
          </UIShimmer>
        </div>
      </div>
      <UIShimmer
        class="max-md:hidden"
        height="24px"
        v-bind="{ loading }"
        width="140px"
      >
        <p
          class="text-primary flex items-center font-medium text-sm gap-1.5 transition-all px-2"
        >
          <span class="">{{ $t('more') }}</span>
          <span
            class="icon-chevron relative -rotate-90 font-medium sm:text-base text-xl text-primary group-hover:ml-0.5 group-hover:translate-x-0.5 transition-all transition-300"
          ></span>
        </p>
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
  card: {
    id: number
    title: string
    subject: {
      id: number
      name: string
    }[]
    university: {
      id: number
      name: string
      logo: string
    }
    direction: {
      id: number
      name: string
    }
    study_form: number
    study_form_display: string
    degree: {
      id: number
      name: string
    }
    free_training_available: true
    lang: {
      code: string
      name: string
    }
    region: {
      id: number
      name: string
    }
    duration_type: string
    duration_type_display: string
    price: number
    address: string
  }
  loading?: boolean
  isLast?: boolean
  isFirst?: boolean
}

defineProps<Props>()

const isReadMore = ref(false)
</script>
