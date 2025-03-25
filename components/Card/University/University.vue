<template>
  <div @click="router.push(`/universities/${card?.id}`)">
    <div
      :class="{ 'hover:border-primary': !loading }"
      class="p-6 rounded-20 bg-white flex flex-col justify-between group border-2 border-white transition-300 duration-300"
    >
      <div>
        <div class="flex-center-between">
          <UIAvatar
            :image="card?.logo_url"
            avatar-class="!rounded-lg bg-gray"
            class="before:!border-gray-200 !rounded-lg overflow-hidden"
            default-image="/images/profile/building-default.svg"
            size="md"
            v-bind="{ loading }"
          />
          <UIShimmer height="20px" v-bind="{ loading }" width="100px">
            <NuxtLink
              :to="`/universities/${card?.id}`"
              class="flex items-center hover:text-primary text-sm font-medium transition-300 group-hover:text-primary transition-300 duration-300"
            >
              {{ $t('more') }}
              <i
                class="icon-chevron text-20 -rotate-90 group-hover:text-primary transition-300 duration-300"
              ></i>
            </NuxtLink>
          </UIShimmer>
        </div>
        <UIShimmer
          height="20px"
          preloader-class="my-4"
          v-bind="{ loading }"
          width="100%"
        >
          <h2
            class="mt-4 mb-2 text-dark font-bold leading-112 text-22 line-clamp-3"
          >
            {{ card?.name }}
          </h2>
        </UIShimmer>
        <UIShimmer
          height="20px"
          preloader-class="my-4"
          v-bind="{ loading }"
          width="100%"
        >
          <div class="flex items-center gap-1 text-xl">
            <i class="icon-map-pin"></i>
            <p class="line-clamp-1 text-black text-sm">{{ card?.location }}</p>
          </div>
        </UIShimmer>
      </div>
      <span class="bg-gray w-full h-px my-6"></span>
      <div class="flex flex-col justify-between">
        <ul class="">
          <li
            v-for="(item, index) in infoList"
            :key="index"
            class="flex mb-3 last:mb-0"
          >
            <template v-if="item.value">
              <UIShimmer height="24px" v-bind="{ loading }" width="24px">
                <i :class="`${item?.icon} text-2xl leading-6 text-primary`" />
              </UIShimmer>
              <div>
                <UIShimmer
                  height="16px"
                  preloader-class="mb-1"
                  v-bind="{ loading }"
                  width="80px"
                >
                  <p class="info-label mb-1 text-xs">
                    {{ $t(item?.label) }}
                  </p>
                </UIShimmer>
                <UIShimmer height="18px" v-bind="{ loading }" width="180px">
                  <a
                    :class="{ 'hover:text-primary': item?.link }"
                    :href="item?.link"
                    class="info-value transition-300 line-clamp-1"
                    target="_blank"
                    @click.stop
                  >
                    {{ item?.value }}
                  </a>
                </UIShimmer>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import type { IUniversity } from '~/types/common'

const router = useRouter()

interface Props {
  card?: IUniversity
  loading?: boolean
}

const props = defineProps<Props>()

const infoList = [
  {
    label: 'city',
    value: props.card?.city_id?.name || '-',
  },
  {
    label: 'programs',
    value: props.card?.programs_count || '-',
  },
  {
    label: 'site',
    link: props.card?.website || '-',
    value: props.card?.website || '-',
  },
]
</script>
