<template>
  <div
    class="relative h-[800px] md:h-[580px] md:border md:rounded-3xl md:border-gray-700 overflow-hidden mb-5 max-md:flex max-md:flex-col max-md:gap-3"
  >
    <div class="md:w-fit flex items-center justify-center h-fit">
      <div
        v-if="hasContactInfo && width >= 768"
        class="bg-white/90 backdrop-blur-[32px] max-w-[350px] px-4 py-5 rounded-20 flex flex-col gap-[20px] border-2 border-white md:w-fit w-full absolute-y left-24 z-20"
      >
        <p class="text-dark text-[18px] font-bold pr-4">
          {{ $t('contact_info') }}
        </p>
        <div class="flex flex-col gap-3">
          <div v-for="(item, key) in contactInfo" :key="key">
            <CardContactInfo
              v-if="item?.card?.value"
              :card="item?.card"
              :is-hover="item?.isHover"
              :last="isLastContact(key)"
              :target-blank="item?.targetBlank"
            />
          </div>
        </div>
      </div>

      <div
        v-else-if="hasContactInfo && width < 768"
        class="bg-white/90 backdrop-blur-[32px] px-4 py-5 rounded-20 flex flex-col gap-[20px] border-2 border-white md:w-fit w-full"
      >
        <p class="text-dark text-[18px] font-bold pr-4">
          {{ $t('contact_info') }}
        </p>
        <div class="flex flex-col gap-3">
          <div v-for="(item, key) in contactInfo" :key="key">
            <CardContactInfo
              v-if="item?.card?.value"
              :card="item?.card"
              :is-hover="item?.isHover"
              :last="isLastContact(key)"
              :target-blank="item?.targetBlank"
            />
          </div>
        </div>
      </div>
    </div>
    <yandex-map
      :settings="{
        location: LOCATION,
        showScaleInCopyrights: true,
      }"
      class="w-full h-full z-10 top-0 left-0 rounded-2xl"
    >
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-marker
        v-for="(marker, index) in branches"
        :key="marker.id || index"
        :settings="{ coordinates: marker.coordinates }"
        position="top-center left-center"
        :hint-content="marker.name"
        class="!size-20"
      >
        <img
          alt="Marker"
          class="cursor-pointer w-[45px] h-[60px]"
          src="/public/images/svg/mappin.svg"
          @click="pickBranch(marker.id, marker.coordinates)"
        />
      </yandex-map-marker>
      <yandex-map-feature
        v-for="(feature, index) in POLYGONS_PROPS"
        :key="index"
        :settings="{
          ...feature,
          style: {
            stroke: [{ color: '#2B2F8A', width: 3 }],
            fill: 'rgba(56, 56, 219, 0)',
          },
        }"
      />
    </yandex-map>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import type { LngLat } from '@yandex/ymaps3-types'
import { useI18n } from 'vue-i18n'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapFeature,
  YandexMapMarker,
} from 'vue-yandex-maps'
import uzbBoundaries from 'public/uzb-boundaries.json'

import type { ActiveCoord, Branch, ContactItem } from '@/types/map'
import { useCommonStore } from '~/store/common'

const { t } = useI18n()
const commonStore = useCommonStore()
const { width } = useWindowSize()

const activeBranchId = ref<number>(0)
const branches = ref<Branch[]>([])
const allcoords = ref<number[]>([])
commonStore.fetchBranches()

const data = computed(() => commonStore.socialLinks[0])
const branch = computed(() => commonStore.branchSingle)
const branchess = computed(() => commonStore.branchess)

const hasBranches = computed(() => branches.value.length > 0)
const hasContactInfo = computed(() =>
  contactInfo.value.some((item) => item.card.value)
)

const activeCoord = computed<ActiveCoord | undefined>(() => {
  const branch = branches.value[activeBranchId.value]
  return branch
    ? {
        lat: branch.coords[0],
        lng: branch.coords[1],
        location: activeBranchId.value,
      }
    : undefined
})

const mapSettings = {
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'longlat',
  version: '2.1',
  maxZoom: 19,
}

const markerIcon = {
  layout: 'default#imageWithContent',
  imageHref: '/images/svg/mappin.svg',
  imageSize: [70, 54],
  imageOffset: [-18.5, -27],
}

const LOCATION = ref({
  center:
    width.value < 375
      ? [64.2401, 38.2995]
      : width.value < 768
      ? [64.2401, 39.7995]
      : [60.2401, 41.2995],
  zoom: width.value < 768 ? 5 : 6,
})

watch(width, (newWidth) => {
  // Update LOCATION dynamically on screen resize
  LOCATION.value = {
    center:
      newWidth < 375
        ? [64.2401, 38.2995]
        : newWidth < 768
        ? [64.2401, 40.2995]
        : [60.2401, 41.2995],
    zoom: newWidth < 768 ? 5 : 6,
  }
})

// const LOCATION = ref({
//   center: [60.2401, 41.2995], // starting position [lng, lat]
//   zoom: 6, // starting zoom
// })
const POLYGONS_PROPS = [
  {
    geometry: {
      type: 'MultiPolygon',
      coordinates: uzbBoundaries?.features[0]?.geometry.coordinates,
    },
    properties: {
      hint: '<b>Uzbekistan</b> - Boundaries Display',
    },
  },
]

const contactInfo = computed<ContactItem[]>(() => {
  const { phone, email, website } = branch.value?.contact_id || data.value || {}
  const address = branch.value?.complete_address
    ? branch.value?.complete_address
    : data.value?.branches?.[0]?.complete_address
  return [
    createContactItem(
      'phone',
      phone ? `tel:${phone}` : '-',
      'icon-call',
      formatPhone(phone)
    ),
    createContactItem(
      'email',
      email ? `mailto:${email}` : '-',
      'icon-mail',
      email
    ),
    createContactItem('site', getWebsite(website), 'icon-world', website, true),
    createContactItem('address', '', 'icon-location', address),
  ]
})

function createContactItem(
  titleKey: string,
  link: string,
  icon: string,
  value: string | null,
  targetBlank = false
): ContactItem {
  return {
    card: { link, icon, title: t(titleKey), value },
    isHover: true,
    targetBlank,
  }
}

function formatPhone(phone: string | undefined): string {
  return phone ? phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : ''
}

function getWebsite(url: string | undefined): string {
  return url && !url.includes('http') ? `https://${url}` : url || ''
}

watch(branchess, () => {
  branches.value =
    branchess.value?.map(({ id, longitude, latitude }) => ({
      id,
      name: id,
      coordinates: [longitude, latitude],
    })) || []

  allcoords.value = branches.value.flatMap((branch) => branch.coordinates)
})

function pickBranch(id: number, coords: []): void {
  commonStore.fetchBranch(id)
  console.log(coords)
  LOCATION.value = {
    center: coords,
    zoom: 15,
  }
}

function isLastContact(index: number): boolean {
  return contactInfo.value.length - 1 === index
}
</script>

<style scoped>
.ymaps-2-1-79-gotoymaps__container,
.ymaps-2-1-79-gototech,
.ymaps-2-1-79-copyright__agreement,
.ymaps3x0--map-copyrights {
  display: none !important;
}
</style>
