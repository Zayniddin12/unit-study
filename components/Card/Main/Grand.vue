<template>
  <NuxtLink
    :to="`/universities/${item.university_id?.id}/grant/${item.id}`"
    class="bg-white/[0.10] border-2 border-white/[0.10] group hover:border-primary rounded-3xl p-6 backdrop-blur-[5px] transition-300"
  >
    <div class="border-2 border-primary rounded-xl py-2.5 px-4 inline-block">
      <p class="text-white sm:text-32 text-base font-bold leading-130">
        {{ formatNumberSpace(item?.amount) }}.00
        <span class="text-white/[0.60] text-base font-semibold leading-130">
          {{ item?.currency?.name }}
        </span>
      </p>
    </div>
    <div class="mt-5">
      <h3 class="text-20 font-medium leading-130 text-white">
        {{ item.title }}
      </h3>
      <p class="md:text-20 text-base font-medium leading-130 text-white mb-1">
        {{ item?.name }}
      </p>
      <p class="text-gray-100 text-sm font-normal leading-140">
        {{ dayjs(item.end_date).format('MM.DD.YYYY') }}
      </p>
    </div>
    <div
      class="flex sm:justify-between sm:items-center mt-6 max-sm:flex-col max-sm:gap-2 justify-start"
    >
      <div class="space-y-2.5 max-sm:text-left">
        <div class="flex gap-2 items-center">
          <img
            alt="title"
            loading="lazy"
            src="/images/svg/university-building.svg"
          />
          <p class="text-white md:text-base text-sm font-normal leading-140">
            {{ item.university_id?.name }}
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <img alt="title" loading="lazy" src="/images/svg/morterboard.svg" />
          <p class="text-white md:text-base text-sm font-normal leading-140">
            {{ item?.education_level_ids.name }}
          </p>
        </div>
      </div>
      <UIButton
        :icon="'icon-chevron text-xl -rotate-90'"
        :text="$t('more')"
        class="max-sm:w-full mt-4 md:mt-0"
        variant="primary"
      />
    </div>
  </NuxtLink>
</template>
<script lang="ts" setup>
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/en'

import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { formatNumberSpace } from '~/utils'

const { locale, t } = useI18n()

interface Props {
  item: {
    id: number
    title: string
    name: string
    amount: number
    currency: {
      name: string
    }
    end_date: string
    university_id: {
      id: number
      name: string
    }
    education_level_ids: {
      name: string
    }
  }
}

const props = defineProps<Props>()

const date = dayjs(props.item?.time)
  .locale(
    locale.value === 'uz' ? 'uz-latn' : locale.value === 'ru' ? 'ru' : 'en'
  )
  .format('MMMM DD, YYYY')
</script>
