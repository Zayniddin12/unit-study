<template>
  <div class="py-7 md:py-16 overflow-hidden">
    <div class="container">
      <UISectionTitle
        :title="$t('numbers_about')"
        :label-class="'!text-left mb-1 md:text-40 text-xl font-bold'"
        :subtitle="$t('universities_subtitle')"
        :subtitle-class="'max-md:text-sm'"
      />
    </div>

    <div
      class="mt-8 container flex items-center w-full overflow-x-scroll md:overflow-x-auto"
    >
      <ClientOnly class="w-full h-full">
        <div v-for="(card, index) in list" :key="index">
          <CardMainStep v-bind="{ index, card, isVisible }" />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

import { reactive } from 'vue'

import { NumbersOfServices } from '~/data/index'

interface Props {
  isVisible?: boolean
}
defineProps<Props>()

const list = ref([])

async function getList() {
  await useApi()
    .$get('/development/params/number/advanced_list', {
      params: {
        specification: { name: {}, number: {}, description: {} },
      },
    })
    .then((res: any) => {
      list.value = res?.records
    })
}
getList()
</script>
<!--!w-[287px]-->
