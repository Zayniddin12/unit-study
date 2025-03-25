<template>
  <div class="flex flex-col gap-y-6">
    <div v-if="semesterIds?.length" class="bg-white lg:rounded-20 py-5 px-4">
      <div
        v-for="(item, key) in semesterIds"
        :key
        class="flex flex-col gap-y-3"
      >
        <div class="flex flex-col gap-y-3">
          <p class="text-dark text-lg font-bold">{{ item?.name }}</p>
          <div class="flex gap-x-3 items-center">
            <i class="icon-clock-hour text-primary text-2xl" />
            <div>
              <p class="text-gray-100 text-xs">
                {{
                  $t('expire_date') +
                  ' ' +
                  extractGMT(item?.display_expire_datetime)
                }}
              </p>
              <p class="text-sm font-medium text-dark">
                {{
                  item?.is_expired
                    ? $t('expired')
                    : formatDate(item?.display_expire_datetime ?? '0')
                }}
              </p>
            </div>
          </div>
          <div class="h-px bg-gray w-[87%] self-end" />
          <div class="flex gap-x-3 items-center">
            <i class="icon-calendar text-primary text-2xl" />
            <div>
              <p class="text-gray-100 text-xs">
                {{ $t('semester_start') }}
              </p>
              <p class="text-sm font-medium text-dark">
                {{ formatDateToDDMMYYYY(item?.start_date ?? '0') }}
              </p>
            </div>
          </div>
          <UIButton
            :text="$t('submit_your_application')"
            :disabled="item?.is_expired"
            @click="navigateToApplicationCreate()"
          />
        </div>
        <div
          v-if="key < semesterIds.length - 1"
          class="h-px w-full bg-gray mb-3"
        />
      </div>
    </div>
    <div class="bg-white lg:rounded-20 py-5 px-4">
      <p class="text-lg font-bold text-dark">
        {{ $t('contact_info') }}
      </p>
      <div class="flex flex-col gap-4 mt-3">
        <div v-for="(item, key) in list" :key>
          <CardContactInfo
            v-if="item?.card?.value"
            :card="item?.card"
            :is-hover="item?.isHover"
            :target-blank="item?.targetBlank"
            :last="list?.length - 1 == key"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'
import type { IUniversity } from '~/types/common'
import {
  extractGMT,
  formatDate,
  formatDateToDDMMYYYY,
} from '~/utils/formatDate'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const userId = computed(() => authStore.user?.id)
const { $event } = useNuxtApp()

interface Props {
  data: IUniversity
  semesterIds: [
    {
      name: string
      expire_datetime: string
      is_expired: boolean
      display_expire_datetime: string
      start_date: string
    }
  ]
  cards: {
    id: number
    university_id: {
      id: number
      logo_url: string
      name: string
      city_id: {
        id: number
        name: string
      }
      full_location: string
    }
    name: string
    education_level_ids: {
      id: number
      name: string
    }
    course_of_study_id: {
      id: number
      name: string
    }
    form_of_education: {
      id: number
      name: string
    }
    language_of_education: {
      id: number
      name: string
    }
    subject_count: number
    duration: number
    contract: number
    currency: number
    description: string
  }
}

const props = defineProps<Props>()
const list = computed(() => [
  {
    card: {
      link: `tel:${props.data?.phone}`,
      icon: 'icon-call',
      title: t('phone'),
      value: phoneNumberFormatter(props.data?.phone),
    },
    isHover: true,
    targetBlank: false,
  },
  {
    card: {
      link: `mailto:${props.data?.email}`,
      icon: 'icon-mail',
      title: t('email'),
      value: props.data?.email,
    },
    isHover: true,
    targetBlank: false,
  },
  {
    card: {
      link: props.data?.website,
      icon: 'icon-world',
      title: t('site'),
      value: props.data?.website,
    },
    isHover: true,
    targetBlank: true,
  },
  {
    card: {
      icon: 'icon-building-scyscraper',
      title: t('city'),
      value: props.data?.city_id?.name,
    },
    isHover: false,
    targetBlank: false,
  },
  {
    card: {
      icon: 'icon-location',
      title: t('address'),
      value: props.data?.full_location,
    },
    isHover: false,
    targetBlank: false,
  },
])

const navigateToApplicationCreate = () => {
  if (!userId.value) {
    return $event('open-auth', 'login')
  } else {
    const uni = props.cards

    if (uni) {
      const query = {
        countryId: uni?.university_id?.country_id?.id,
        countryName: uni?.university_id?.country_id?.name,
        universityId: uni?.university_id?.id,
        universityName: uni?.university_id?.name,
        programId: uni?.id,
        programName: uni?.name,
        levelId: uni?.education_level_ids?.id,
        levelName: uni?.education_level_ids?.name,
      }
      router.push({ name: 'application-create', query })
    } else {
      router.push({ name: 'application-create' })
    }
  }
}
</script>
