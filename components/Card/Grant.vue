<template>
  <div class="bg-white sm:p-6 p-3 rounded-xl border border-gray-200">
    <div class="flex max-md:flex-col gap-6">
      <UIAvatar
        v-if="!noUniversity"
        :image="card?.image_url"
        class="sm:w-[242px] w-full h-full sm:aspect-[1/1] aspect-video object-cover"
        v-bind="{ loading }"
      />
      <div>
        <div class="inline-flex w-full gap-4">
          <div class="flex gap-1 items-center">
            <UIShimmer height="24px" v-bind="{ loading }" width="24px">
              <span class="icon-clock-check text-gray-100 text-xl" />
            </UIShimmer>

            <UIShimmer height="24px" v-bind="{ loading }" width="100%">
              <p
                class="!leading-130 transition-300 text-xs font-normal text-gray-100"
              >
                {{ dayjs(card?.end_date).format('MM.DD.YYYY') }}
                •
                {{ dayjs(card?.end_date).format('HH:mm') }}
              </p>
            </UIShimmer>
          </div>
          <div class="flex gap-1 items-center">
            <UIShimmer height="24px" v-bind="{ loading }" width="24px">
              <span class="icon-eye text-xl text-gray-100" />
            </UIShimmer>

            <UIShimmer height="24px" v-bind="{ loading }" width="100%">
              <p
                class="!leading-130 transition-300 text-xs font-normal text-gray-100"
              >
                {{ card?.view_count || 0 }}
              </p>
            </UIShimmer>
          </div>
        </div>
        <UIShimmer height="21.3px" v-bind="{ loading }" width="200px">
          <NuxtLink
            :to="`/universities/${card?.id}/program/${card?.id}`"
            class="inline-block max-w-[90%] text-base md:text-22 !leading-130 font-bold text-dark hover:text-primary transition-300 line-clamp-4"
          >
            <p>{{ card?.title }}</p>
          </NuxtLink>
        </UIShimmer>
        <div class="grid min-[490px]:grid-cols-3 grid-cols-1 gap-2 mt-6">
          <div
            class="col-span-1 min-[490px]:border-r max-[490px]:border-b max-[490px]:pb-3 min-[490px]:pr-6"
          >
            <div class="min-[490px]:mb-7 mb-1.5">
              <UIShimmer height="13px" v-bind="{ loading }" width="100px">
                <p class="text-xs font-normal text-gray-100">
                  {{ t('term') }}
                </p>
              </UIShimmer>
              <UIShimmer
                height="15px"
                preloader-class="mt-1"
                v-bind="{ loading }"
                width="140px"
              >
                <p
                  class="text-sm leading-112 text-dark font-medium mt-1 truncate w-40"
                >
                  {{ dayjs(card?.end_date).format('MM.DD.YYYY') }}
                </p>
              </UIShimmer>
            </div>
            <div class="">
              <UIShimmer height="13px" v-bind="{ loading }" width="100px">
                <p class="text-xs font-normal text-gray-100">
                  {{ t('country') }}
                </p>
              </UIShimmer>
              <Transition mode="out-in">
                <div :key="loading">
                  <div v-if="!loading" class="flex gap-1 flex-wrap">
                    <p
                      class="text-sm leading-112 text-dark font-medium mt-1 truncate w-40"
                    >
                      {{ card?.country_id?.name || '-' }}
                    </p>
                  </div>
                  <template v-else>
                    <UIShimmer
                      v-for="i in 2"
                      :key="i"
                      height="15px"
                      preloader-class="mt-1"
                      v-bind="{ loading }"
                      width="140px"
                    />
                  </template>
                </div>
              </Transition>
            </div>
          </div>
          <div
            class="col-span-1 min-[490px]:border-r max-[490px]:border-b max-[490px]:pb-3 min-[490px]:px-6"
          >
            <div class="min-[490px]:mb-7 mb-1.5">
              <UIShimmer height="13px" v-bind="{ loading }" width="100px">
                <p class="text-xs font-normal text-gray-100">
                  {{ t('language_instruction') }}
                </p>
              </UIShimmer>

              <UIShimmer
                height="15px"
                preloader-class="mt-1"
                v-bind="{ loading }"
                width="140px"
              >
                <p class="text-sm leading-112 text-dark font-medium mt-1">
                  {{ card?.language_of_education?.name }}
                </p>
              </UIShimmer>
            </div>
            <div>
              <UIShimmer height="13px" v-bind="{ loading }" width="100px">
                <p class="text-xs font-normal text-gray-100">
                  {{ t('type_of_grant') }}
                </p>
              </UIShimmer>
              <Transition mode="out-in">
                <div :key="loading">
                  <template v-if="loading">
                    <UIShimmer
                      v-for="(item, key) in card?.education_level_ids"
                      :key
                      height="15px"
                      preloader-class="mt-1"
                      v-bind="{ loading }"
                      width="140px"
                    />
                  </template>
                  <div v-else class="flex gap-1 flex-wrap">
                    <p class="text-sm leading-112 text-dark font-medium mt-1">
                      {{ card.education_level_ids?.name }}
                    </p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
          <div class="col-span-1 min-[490px]:pl-6">
            <div class="max-[490px]:my-3 mb-7">
              <UIShimmer height="13px" v-bind="{ loading }" width="100px">
                <p class="text-xs font-normal text-gray-100">
                  {{ t('official_link') }}
                </p>
              </UIShimmer>
              <UIShimmer
                height="15px"
                preloader-class="mt-1"
                v-bind="{ loading }"
                width="140px"
              >
                <a
                  :href="`${card?.website}`"
                  class="text-sm leading-112 text-ellipsis text-primary underline font-medium mt-1"
                  target="_blank"
                >
                  <p class="line-clamp-1 text-ellipsis overflow-hidden">
                    {{ card?.website.replace('https://www.', '') }}
                  </p>
                </a>
              </UIShimmer>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-px bg-gray my-5" />
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  card: {
    id: number
    view_count: number
    image_url: string
    title: string
    end_date: string
    language_of_education: { id: number; name: string }
    website: string
    country_id: { id: number; name: string }
    education_level_ids: {
      id: number
      name: string
    }
    description: string
  }
  loading?: boolean
  noUniversity?: boolean
  isProgramSingle?: boolean
  isExtra?: boolean
}

const props = defineProps<Props>()
</script>
