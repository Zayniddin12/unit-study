<template>
  <div
    v-if="servicesStore.singleBaseServiceLoading"
    class="flex flex-col gap-2 container mt-8 mb-16"
  >
    <UIShimmer
      width="100%"
      height="124px"
      loading
      preloader-class="!rounded-3xl"
    />
    <div class="w-full flex gap-5">
      <UIShimmer class="col-span-9" width="73%" height="300px" loading />
      <UIShimmer class="col-span-3" width="25%" height="124px" loading />
    </div>
  </div>
  <div v-else class="container mt-8 mb-16">
    <UIWrapperTitle
      :title="
        service?.name + ' ' + service?.price + ' ' + service?.currency_id?.name
      "
      :subtitle="service?.description"
      back-route="/services"
    />
    <div class="grid grid-cols-12 gap-5 mt-8">
      <div class="col-span-12 xl:col-span-9">
        <div
          class="w-full max-h-64 overflow-hidden rounded-3xl border-2 border-white"
        >
          <img
            :src="service?.image_url"
            alt="icon"
            class="w-full object-cover"
          />
        </div>
        <UIWrapperPage>
          <div
            class="explore-static-text"
            v-html="formatRichText(service?.body)"
          />
        </UIWrapperPage>
      </div>
      <div
        class="col-span-12 xl:col-span-3 flex flex-col gap-3 bg-white h-fit px-5 py-4 rounded-3xl"
      >
        <div v-for="(item, key) in contactInfo" :key>
          <CardContactInfo
            v-if="item?.card?.value"
            :card="item?.card"
            :is-hover="item?.isHover"
            :target-blank="item?.targetBlank"
            :last="contactInfo?.length - 1 == key"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useCommonStore } from '~/store/common'
import { useServicesStore } from '~/store/services'

const route = useRoute()

const { t } = useI18n()

const id = route.params.id
const servicesStore = useServicesStore()
const commonStore = useCommonStore()

commonStore.fetchContactInfos()
const data = computed(() => commonStore.socialLinks[0])

servicesStore.fetchBaseServicesById(id)

const service = computed(() => servicesStore.singleBaseService)

const contactInfo = computed(() => [
  {
    card: {
      link: `tel:${data.value?.phone}`,
      icon: 'icon-call px-2.5 rounded-10 py-1.5 bg-primary/10',
      title: t('phone'),
      value: phoneNumberFormatter(data.value?.phone),
    },
    isHover: true,
    targetBlank: false,
  },
  {
    card: {
      link: `mailto:${data.value?.email}`,
      icon: 'icon-mail px-2.5 rounded-10 py-1.5 bg-primary/10',
      title: t('email'),
      value: data.value?.email,
    },
    isHover: true,
    targetBlank: false,
  },
  {
    card: {
      link: `${data.value?.website}`,
      icon: 'icon-world px-2.5 rounded-10 py-1.5 bg-primary/10',
      title: t('site'),
      value: data.value?.website.replace('https://', ''),
    },
    isHover: true,
    targetBlank: true,
  },
  {
    card: {
      icon: 'icon-location px-2.5 rounded-10 py-1.5 bg-primary/10',
      title: t('address'),
      value: data.value?.country_id?.name,
    },
    isHover: false,
    targetBlank: false,
  },
])
</script>
<style>
.explore-static-text h3 {
  @apply text-base text-dark-100 font-medium mb-3;
}

.explore-static-text p {
  @apply text-sm text-dark-100 font-normal mb-4;
}

.explore-static-text ul {
  @apply list-disc list-inside leading-snug;
}

.explore-static-text li {
  @apply marker:text-warning;
}
</style>
