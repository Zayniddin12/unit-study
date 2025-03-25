<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container">
      <div class="my-8">
        <UIWrapperTitle
          :subtitle="$t('contact_subtitle')"
          :title="$t('contact')"
        />
      </div>
      <SectionsMap />
      <div
        class="bg-white p-6 flex gap-9 rounded-[18px] w-full justify-between max-lg:flex-wrap mb-8"
      >
        <a
          v-for="(item, idx) in socialLinks"
          :key="idx"
          :href="item.link"
          class="flex gap-3 items-center relative overflow-hidden cursor-pointer transition-300 group"
          target="_blank"
        >
          <img :src="item?.icon" alt="icon" class="transition-300" />
          <div>
            <p
              class="text-dark text-base font-medium leading-130 group-hover:text-primary transition-300"
            >
              {{ item?.title }}
            </p>
            <p
              class="text-xs lg:w-[120px] truncate text-gray-100 leading-130 font-medium group-hover:text-primary transition-300"
            >
              {{ item?.value }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useCommonStore } from '~/store/common'
import type { IContactInfos } from '~/types/common'

const commonStore = useCommonStore()

const { t } = useI18n()

commonStore.fetchContactInfos()
const data = computed(() => commonStore.socialLinks[0])
const branches = computed((): IContactInfos => {
  const hasBranch = Object.values(commonStore.branchSingle).some(Boolean)

  if (hasBranch) {
    return commonStore.branchSingle?.contact_id
  } else {
    return data?.value
  }
})

const socialLinks = computed(() => [
  {
    value: data.value?.telegram.replace('https://', ''),
    title: t('telegram'),
    icon: '/images/svg/telegram.svg',
    link: `${branches.value?.telegram}`,
  },
  {
    value: data.value?.instagram.replace('https://', ''),
    title: t('instagram'),
    icon: '/images/svg/instagram.svg',
    link: `${branches.value?.instagram}`,
  },
  {
    value: data.value?.facebook.replace('https://', ''),
    title: t('facebook'),
    icon: '/images/svg/facebook.svg',
    link: `${branches.value?.facebook}`,
  },
  {
    title: t('youtube'),
    icon: '/images/svg/youtube.svg',
    value: data.value?.youtube.replace('https://', ''),
    link: `${branches.value?.youtube}`,
  },
  {
    title: t('linkedin'),
    icon: '/images/svg/linkedin.svg',
    value: data.value?.linkedin.replace('https://', ''),
    link: `${branches.value?.linkedin}`,
  },
])

const breadcrumbRoutes = [
  {
    title: t('contact'),
    path: '/contact',
  },
]

useSeoMeta({
  title: t('meta.contacts.title'),
  description: t('meta.contacts.info'),
})
</script>
