<template>
  <div class="bg-white p-6 rounded-3xl border border-gray-200">
    <div class="flex items-center justify-between">
      <div class="flex-y-center gap-6">
        <UIAvatar
          v-if="!noUniversity"
          :image="card?.university_id?.logo_url"
          class="!w-[72px] !h-[72px]"
          v-bind="{ loading }"
        />
        <div>
          <UIShimmer height="21.3px" v-bind="{ loading }" width="200px">
            <NuxtLink
              :to="`/universities/${card?.university_id?.id}/program/${card?.id}`"
              class="inline-block max-w-[90%] text-base md:text-22 !leading-130 font-bold text-dark hover:text-primary transition-300"
            >
              <p>{{ card?.university_id?.name }}</p>
            </NuxtLink>
          </UIShimmer>
          <div class="mt-1 flex-y-center gap-1">
            <UIShimmer height="20px" v-bind="{ loading }" width="20px">
              <i class="icon-map-pin text-primary text-lg md:text-xl" />
            </UIShimmer>
            <UIShimmer height="18px" v-bind="{ loading }" width="120px">
              <p class="text-xs md:text-sm leading-112 font-normal text-dark">
                {{ card?.university_id?.full_location }}
              </p>
            </UIShimmer>
          </div>
        </div>
      </div>
      <div v-if="isProgramSingle" class="max-md:hidden">
        <p class="text-dark font-normal md:text-20 text-base text-right">
          {{ $t('agreement') }}
        </p>
        <p class="md:text-28 text-lg font-medium text-primary text-right">
          {{ formatComma(card?.contract) + ' ' + card?.currency?.name }}
        </p>
      </div>
      <!--      <NuxtLink-->
      <!--        v-if="isExtra"-->
      <!--        :to="`/universities/${card?.university_id?.id}/program/${card?.id}`"-->
      <!--        class="sm:flex hidden items-center gap-1 text-primary text-base font-medium transition-300 cursor-pointer group group-hover:text-underline"-->
      <!--      >-->
      <!--        <span-->
      <!--          class="group-hover:text-primary transition-300 hover:text-primary whitespace-nowrap"-->
      <!--          >{{ $t('more') }}</span-->
      <!--        >-->
      <!--        <span class="-rotate-90 relative">-->
      <!--          <i-->
      <!--            class="icon-chevron text-xl text-primary group-hover:text-primary transition-300 hover:text-primary"-->
      <!--          />-->
      <!--        </span>-->
      <!--      </NuxtLink>-->
    </div>
    <div v-if="isProgramSingle" class="md:hidden mt-2">
      <p class="text-dark font-normal md:text-20 text-base">
        {{ $t('agreement') }}
      </p>
      <p class="md:text-28 text-lg font-medium text-primary">
        {{ formatComma(card?.contract) + ' ' + card?.currency?.name }}
      </p>
    </div>
    <NuxtLink
      v-if="isExtra"
      :to="`/universities/${card?.university_id?.id}/program/${card?.id}`"
      class="flex sm:hidden justify-end items-center gap-1 text-primary text-base font-medium transition-300 cursor-pointer group group-hover:text-underline"
    >
      <span
        class="group-hover:text-primary transition-300 hover:text-primary"
        >{{ $t('more') }}</span
      >
      <span class="-rotate-90 relative">
        <i
          class="icon-chevron text-xl text-primary group-hover:text-primary transition-300 hover:text-primary"
        />
      </span>
    </NuxtLink>
    <div class="w-full h-px bg-gray my-5" />
    <div>
      <UIShimmer height="13px" v-bind="{ loading }" width="100px">
        <p class="text-base font-medium leading-112 text-primary">
          {{ $t('program') }}
        </p>
      </UIShimmer>
      <UIShimmer
        height="15px"
        preloader-class="mt-1"
        v-bind="{ loading }"
        width="140px"
      >
        <p class="text-sm leading-112 text-dark font-medium mt-1">
          {{ card?.name }}
        </p>
      </UIShimmer>
    </div>
    <div class="flex justify-between my-5 max-sm:flex-col">
      <div>
        <div class="mb-7">
          <UIShimmer height="13px" v-bind="{ loading }" width="100px">
            <p class="text-xs font-normal text-gray-100">
              {{ $t('level') }}
            </p>
          </UIShimmer>
          <UIShimmer
            height="16px"
            preloader-class="mt-1"
            v-bind="{ loading }"
            width="140px"
          >
            <p
              class="text-sm leading-112 text-dark font-medium mt-1 truncate w-40"
            >
              {{ card?.education_level_ids?.name }}
            </p>
          </UIShimmer>
        </div>
        <div class="mb-7">
          <UIShimmer height="13px" v-bind="{ loading }" width="100px">
            <p class="text-xs font-normal text-gray-100">
              {{ $t('education_sector') }}
            </p>
          </UIShimmer>
          <UIShimmer
            height="15px"
            preloader-class="mt-1"
            v-bind="{ loading }"
            width="140px"
          >
            <p class="text-sm leading-112 text-dark font-medium mt-1 w-40">
              {{ card?.course_of_study_id?.name }}
            </p>
          </UIShimmer>
        </div>
        <div>
          <UIShimmer height="13px" v-bind="{ loading }" width="100px">
            <p class="text-xs font-normal text-gray-100">
              {{ $t('education_form') }}
            </p>
          </UIShimmer>
          <UIShimmer
            height="15px"
            preloader-class="mt-1"
            v-bind="{ loading }"
            width="140px"
          >
            <p class="text-sm leading-112 text-dark font-medium mt-1">
              {{ card?.form_of_education?.name || '-' }}
            </p>
          </UIShimmer>
        </div>
      </div>
      <div class="w-px h-[173px] bg-gray max-sm:hidden" />
      <div>
        <div class="mb-7">
          <UIShimmer height="13px" v-bind="{ loading }" width="100px">
            <p class="text-xs font-normal text-gray-100">
              {{ $t('duration') }}
            </p>
          </UIShimmer>
          <UIShimmer
            height="15px"
            preloader-class="mt-1"
            v-bind="{ loading }"
            width="140px"
          >
            <p class="text-sm leading-112 text-dark font-medium mt-1">
              {{ convertMonthsToYears(card?.duration) }}
            </p>
          </UIShimmer>
        </div>
        <div class="mb-7">
          <UIShimmer height="13px" v-bind="{ loading }" width="100px">
            <p class="text-xs font-normal text-gray-100">
              {{ $t('language_instruction') }}
            </p>
          </UIShimmer>
          <UIShimmer
            height="15px"
            preloader-class="mt-1"
            v-bind="{ loading }"
            width="140px"
          >
            <p class="text-sm leading-112 text-dark font-medium mt-1">
              {{ card?.language_of_education?.name || '-' }}
            </p>
          </UIShimmer>
        </div>
        <div>
          <UIShimmer height="13px" v-bind="{ loading }" width="100px">
            <p class="text-xs font-normal text-gray-100">
              {{ $t('subjects') }}
            </p>
          </UIShimmer>
          <UIShimmer
            height="15px"
            preloader-class="mt-1"
            v-bind="{ loading }"
            width="140px"
          >
            <p class="text-sm leading-112 text-dark font-medium mt-1">
              {{ card?.subject_count || '-' }}
            </p>
          </UIShimmer>
        </div>
      </div>
      <div class="w-px h-[173px] bg-gray max-sm:hidden" />
      <div>
        <div class="mb-7">
          <UIShimmer height="13px" v-bind="{ loading }" width="100px">
            <p class="text-xs font-normal text-gray-100">
              {{ $t('deadline') }}
            </p>
          </UIShimmer>
          <UIShimmer
            height="15px"
            preloader-class="mt-1"
            v-bind="{ loading }"
            width="140px"
          >
            <p class="text-sm leading-112 text-dark font-medium mt-1">
              {{
                card?.nearest_expire_deadline !== false
                  ? formatDate(card?.nearest_expire_deadline)
                  : '-'
              }}
            </p>
          </UIShimmer>
        </div>
        <div>
          <UIShimmer height="13px" v-bind="{ loading }" width="100px">
            <p class="text-xs font-normal text-gray-100">
              {{ $t('cost_of_education') }}
            </p>
          </UIShimmer>
          <UIShimmer
            height="15px"
            preloader-class="mt-1"
            v-bind="{ loading }"
            width="140px"
          >
            <p class="text-sm leading-112 text-dark font-medium mt-1">
              {{ formatComma(card?.contract) + ' ' + card?.currency?.name }}
            </p>
          </UIShimmer>
        </div>
      </div>
    </div>
    <div v-if="!isProgramSingle" class="flex max-sm:flex-col gap-4">
      <UIShimmer height="16px" v-bind="{ loading }" width="sm:100px w-full">
        <div class="sm:w-fit p-6 py-2 bg-gray rounded-xl flex-center gap-2">
          <span class="icon-building-scyscraper text-20" />
          <p class="text-dark text-xs font-normal">
            {{ card?.university_id?.city_id?.name }}
          </p>
        </div>
      </UIShimmer>
      <div>
        <UIShimmer height="18px" v-bind="{ loading }" width="sm:130px w-full">
          <div class="sm:w-fit p-6 py-2 bg-gray rounded-xl flex-center gap-2">
            <span class="icon-location text-20" />
            <p class="text-dark text-xs font-normal">
              {{ card?.university_id?.full_location }}
            </p>
          </div>
        </UIShimmer>
      </div>
    </div>
    <div v-if="!isProgramSingle" class="mt-5 gap-x-4 grid grid-cols-2">
      <UIButton
        variant="outline"
        :text="$t('more')"
        class="w-full"
        @click="
          router.push(
            `/universities/${card?.university_id?.id}/program/${card?.id}`
          )
        "
      />
      <UIButton
        class="w-full"
        :text="$t('submit_your_application')"
        :disabled="card?.nearest_expire_deadline === false"
        @click="navigateToApplicationCreate()"
      />
    </div>
    <div v-if="isProgramSingle" class="mt-2">
      <p class="mb-4 text-dark font-medium text-base">
        {{ $t('list_of_subject') }}
      </p>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="(item, index) in card?.subject_ids"
          :key="index"
          class="py-2 px-3 border border-dark-blue/[12%] bg-gray text-sm text-gray-100 font-medium w-fit rounded-lg"
        >
          {{ item?.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { convertMonthsToYears, formatDate } from '@/utils/formatDate'
import { useAuthStore } from '~/store/auth'
import { formatComma } from '~/utils'

const router = useRouter()
const authStore = useAuthStore()
const userId = computed(() => authStore?.user?.id)
const { $event } = useNuxtApp()

interface Props {
  card: {
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

  loading?: boolean
  noUniversity?: boolean
  isProgramSingle?: boolean
  isExtra?: boolean
}

const props = defineProps<Props>()

const navigateToApplicationCreate = () => {
  if (!userId.value) {
    return $event('open-auth', 'login')
  } else {
    const uni = props.card

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

// function isCustomDateBeforeNow(dateString: string) {
//   // Split the input date string into components
//   const [day, month, year, time, gmtOffset] = dateString.split(/[\s/:]+/)
//
//   // Convert to ISO 8601 format (YYYY-MM-DDTHH:mm:ss±hh:mm)
//   const isoString = `${year}-${month}-${day}T${time}:00${gmtOffset.replace(
//     'GMT',
//     ''
//   )}:00`
//
//   const givenDate = new Date(isoString)
//   const now = new Date()
//
//   return givenDate < now
// }
</script>
