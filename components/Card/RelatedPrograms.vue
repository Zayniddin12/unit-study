<template>
  <div class="bg-white lg:rounded-20 py-5">
    <p class="text-lg font-bold text-dark px-4">
      {{ $t('programs') }}
    </p>
    <div class="flex flex-col mt-3">
      <NuxtLink
        v-for="(item, index) in list"
        :key="index"
        :to="
          route.name == 'universities-slug-program-id'
            ? `/universities/${item?.university_id?.id}/program/${item?.id}`
            : route.name == 'universities-slug-grant-id'
            ? `/universities/${item?.university_id?.id}/grant/${item?.id}`
            : ''
        "
        class="group px-4 hover:bg-gray transition-300 cursor-pointer"
      >
        <div class="flex items-center gap-3 border-b border-gray py-3">
          <UIAvatar
            :image="item?.university_id?.logo_url"
            class="!w-[72px] !h-[72px]"
            v-bind="{ loading }"
          />
          <div>
            <UIShimmer
              height="14px"
              v-bind="{ loading }"
              width="200px"
              class="mb-2"
            >
              <div
                class="text-dark font-bold text-sm line-clamp-2 leading-120 group-hover:text-primary transition-300"
              >
                <p>{{ item?.university_id?.name }}</p>
              </div>
            </UIShimmer>
            <div v-if="isPrograms" class="flex gap-1">
              <p class="text-gray-100 font-medium text-xs">
                {{ $t('agreement') }}:
              </p>
              <p class="text-primary font-medium text-xs">
                ${{ formatNumberSpace(item?.contract) }}
              </p>
            </div>
            <div v-if="!isPrograms" class="flex gap-1">
              <p
                class="text-gray-100 font-normal line-clamp-1 text-primary text-xs"
              >
                {{ item?.education_level_ids?.name }}:
              </p>
            </div>
          </div>
        </div>
      </NuxtLink>
      <div class="px-5 mt-1">
        <UIButton
          variant="bg-white"
          :text="buttonText"
          class="w-full"
          @click="navigateTo(`${navigateUrl}`)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatNumberSpace } from '~/utils'

interface Props {
  list: {
    degree: { id: number; name: string; order: number; is_main: boolean }
    direction: { id: number; name: string }
    duration_type: { id: number; name: string }
    free_training_available: boolean
    id: number
    lang: { code: string; name: string }
    price: number
    region: { id: number; name: string }
    study_form: { id: number; name: string }
    education_level_ids: {
      id: number
      name: string
    }
    subjects: number
    title: string
    university_id: {
      id: number
      name: string
      image_url: string
    }
  }[]
  loading: boolean
  buttonText: string
  navigateUrl: string
  isPrograms: boolean
}
defineProps<Props>()
const route = useRoute()
</script>
