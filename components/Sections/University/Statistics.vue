<template>
  <div>
    <div class="grid sm:grid-cols-2 xl:grid-cols-6 gap-4">
      <template v-for="(item, index) in universityContacts" :key="index">
        <UIShimmer border-radius="16px" height="220px" v-bind="{ loading }" width="220px">
          <div
              class="flex-y-center gap-3 p-3 rounded-2xl bg-gray"
              :class="{'sm:col-span-2': index < 3, 'sm:col-span-2 xl:col-span-3': index >= 3 && index < 5}">
            <div
                class="h-10 w-10 rounded-xl flex-center bg-white shadow-tab shrink-0">
              <i :class="item.icon" class="text-2xl !text-primary"/>
            </div>
            <div>
              <p class="text-dark text-sm font-normal">{{ t(item.label) }}</p>
              <p class="text-dark text-sm font-bold break-all leading-none mt-1 hover:text-primary transition-300">
                <a :href="item.to" :target="item.target">
                  {{ item.value }}
                </a>
              </p>
            </div>
          </div>
        </UIShimmer>
      </template>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-10 border-t border-t-gray">
      <template v-for="(item, index) in universitySocial" :key="index">
        <UIShimmer border-radius="16px" height="220px" v-bind="{ loading }" width="220px">
          <div class="grid gap-3 p-3 rounded-2xl bg-gray">
            <div
                class="h-10 w-10 rounded-xl flex-center shrink-0 bg-white shadow-tab">
              <i :class="item.icon" class="text-2xl !text-primary"/>
            </div>
            <div>
              <p class="text-dark text-sm font-normal">{{ t(item.label) }}</p>
              <p
                  class="text-dark text-sm truncate max-w-32 font-bold leading-none hover:text-primary transition-300">
                <a :href="item.to" target="_blank">
                  {{ item.value }}
                </a>
              </p>
            </div>
          </div>
        </UIShimmer>
      </template>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 pt-10 border-t border-t-gray">
      <template v-for="(item, index) in universityStatistics" :key="index">
        <UIShimmer border-radius="16px" height="220px" v-bind="{ loading }" width="220px">
          <div class="flex sm:flex-col items-start sm:gap-6 gap-2 sm:p-6 p-2 sm:rounded-3xl rounded-xl bg-gray">
            <div
                class="sm:h-16 sm:w-16 h-8 w-8 sm:rounded-2xl rounded-md flex-center bg-primary shadow-university-content">
              <i :class="item.icon" class="md:text-3xl text-xl !text-white"/>
            </div>
            <div>
              <p class="text-dark sm:text-base text-sm sm:font-semibold font-normal break-words sm:mb-3">
                {{ t(item.label) }}</p>
              <p v-if="item.type !== 'array'" class="text-dark sm:font-bold font-medium sm:text-20 text-base">
                {{ item.value }}
              </p>
              <p v-else class="flex flex-wrap gap-1">
                <p
                    v-for="type in item.value" :key="type.id"
                    class="text-dark sm:font-bold font-normal sm:text-20 text-base">
                  {{ type.name }}
                </p>
              </p>
            </div>
          </div>
        </UIShimmer>
      </template>
    </div>
    <div class="sm:mt-[54px] mt-10 pt-10 border-t border-t-gray">
      <div>
        <div class="flex items-center gap-3">
          <div
              class="sm:h-16 sm:w-16 h-8 w-8 shrink-0 sm:rounded-2xl rounded-md flex-center bg-primary shadow-university-content">
            <i
                class="sm:text-4xl text-xl !text-white icon-people"/></div>
          <div class="">
            <p class="text-dark sm:text-base text-sm font-medium mb-1">
              {{ t('teachers_count') }}
            </p>
            <p class="text-dark sm:font-bold sm:text-base text-sm">
              {{ formatNumberSpace(single?.all_teacher_count) }}
            </p>
          </div>
        </div>

        <div
            class="flex gap-4 max-sm:flex-wrap max-sm:gap-3 mt-4 w-full"
        >
          <div
              v-for="(item, index) in universityTeachersStats"
              :key="index"
              class="rounded-2xl border border-dark-100/[4%] bg-white w-full justify-center max-sm:px-4 px-2 sm:text-center py-2.5 gap-1"
          >
            <UIShimmer :loading="loading" border-radius="16px" height="20px" preloader-class=mx-auto width="80%">
              <p class="text-dark text-sm font-normal leading-5 whitespace-normal break-words">
                {{ t('uni_single.teachers.' + item?.label) }}</p>
            </UIShimmer>

            <UIShimmer :loading="loading" border-radius="16px" height="20px" preloader-class=mx-auto width="30%">
              <p class="text-dark text-base font-semibold mt-1">{{ item?.value }}</p>
            </UIShimmer>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <div class="flex items-center gap-3">
          <div
              class="sm:h-16 sm:w-16 h-8 w-8 shrink-0 sm:rounded-2xl rounded-md flex-center bg-primary shadow-university-content">
            <i
                class="sm:text-4xl text-xl !text-white icon-calendar"/></div>
          <div class="">
            <p class="text-dark sm:text-base text-sm font-medium mb-1 whitespace-normal">
              {{ t('main_programs_for_international') }}
            </p>
            <p class="text-dark sm:font-bold sm:text-base text-sm">
              {{ formatNumberSpace(single?.faculty_counts) }}
            </p>
          </div>
        </div>
        <div
            class="flex gap-4 max-sm:flex-wrap max-sm:gap-3 mt-4 w-full"
        >
          <div
              v-for="(item, index) in universityProgramStats"
              :key="index"
              class="rounded-2xl border border-dark-100/[4%] bg-white w-full justify-center max-sm:px-4 px-2 sm:text-center py-2.5 gap-1"
          >

            <UIShimmer :loading="loading" border-radius="16px" height="20px" preloader-class=mx-auto width="80%">
              <p class="text-dark text-sm font-normal leading-5 capitalize">
                {{ t('uni_single.stats.' + item?.label) }}
              </p>
            </UIShimmer>
            <UIShimmer :loading="loading" border-radius="16px" height="20px" preloader-class="mx-auto" width="30%">
              <p class="text-dark text-base font-semibold mt-1">{{ item?.value }}</p>
            </UIShimmer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import {useI18n} from 'vue-i18n'

import {formatNumberSpace} from "@/utils"
import type {IUniversity} from '~/types/common'

interface Props {
  single: IUniversity
  loading: boolean;
}

const props = defineProps<Props>()

const {t} = useI18n()

const universityContacts = computed(() => [
  {
    label: 'phone',
    value: props.single?.phone ?? '-',
    icon: 'icon-phone',
    to: `tel:${props.single?.phone}` ?? '-',
    target: '',
  },
  {
    label: 'email',
    value: props.single?.email ?? '-',
    icon: 'icon-mail',
    to: `mailto:${props.single?.email}` ?? '-',
    target: '',
  },
  {
    label: 'website',
    value: props.single?.website?.replace('https://', '') ?? '-',
    icon: 'icon-world',
    to: props.single?.website ?? '-',
    target: '_blank',
  },
  {
    label: 'location_city',
    value: props.single?.city_id?.name ?? '-',
    icon: 'icon-location',
    to: `https://yandex.uz/maps/?ll=${props.single?.latitude}%2C${props.single?.longitude}&mode=whatshere&utm_source=share&whatshere%5Bpoint%5D=${props.single?.latitude}%2C${props.single?.longitude}&whatshere%5Bzoom%5D=11&z=11`,
    target: '_blank',
  },
  {
    label: 'location',
    value: props.single?.location ?? '-',
    icon: 'icon-map-pin',
    to: `https://yandex.uz/maps/?ll=${props.single?.latitude}%2C${props.single?.longitude}&mode=whatshere&utm_source=share&whatshere%5Bpoint%5D=${props.single?.latitude}%2C${props.single?.longitude}&whatshere%5Bzoom%5D=11&z=11`,
    target: '_blank',
  }
])

const universitySocial = computed(() => [
  {
    label: 'facebook',
    value: props.single?.facebook === false ? '-' : props.single?.facebook,
    icon: 'icon-facebook',
    type: 'not array',
    to: props.single?.facebook === false ? '-' : props?.single?.facebook,
  },
  {
    label: 'instagram',
    value: props.single?.instagram === false ? '-' : props?.single?.instagram,
    icon: 'icon-instagramm',
    type: 'not array',
    to: props.single?.instagram === false ? '-' : props?.single?.instagram,
  },
  {
    label: 'youtube',
    value: props.single?.youtube === false ? '-' : props?.single?.youtube,
    icon: 'icon-you-tube',
    type: 'not array',
    to: props.single?.youtube === false ? '-' : props?.single?.youtube,
  },
  {
    label: 'telegram',
    value: props.single?.telegram === false ? '-' : props?.single?.telegram,
    icon: 'icon-telegramm',
    type: 'not array',
    to: props.single?.telegram === false ? '-' : props?.single?.telegram,
  },
])

const universityStatistics = computed(() => [
  {
    label: 'founded_year',
    value: dayjs(props.single?.establishment).format('DD.MM.YYYY'),
    icon: 'icon-calendar',
    type: 'not array',
  },
  {
    label: 'all_students',
    value: formatNumberSpace(props.single?.all_student_count),
    icon: 'icon-people',
    type: 'not array',
  },
  {
    label: 'international_students',
    value: formatNumberSpace(props.single?.foreign_student_count),
    icon: 'icon-people',
    type: 'not array',
  },
  {
    label: 'faculties_count',
    value: formatNumberSpace(props.single?.faculty_counts),
    icon: 'icon-book',
    type: 'not array',
  },
  {
    label: 'sections_count',
    value: formatNumberSpace(props.single?.department_counts),
    icon: 'icon-book',
    type: 'not array',
  },
  {
    label: 'study_type',
    value: props.single?.form_of_education_id,
    icon: 'icon-book',
    type: 'array',
  },
]);

const universityTeachersStats = computed(() => [
  {
    label: 'professors',
    value: formatNumberSpace(props.single?.professor_count),
  },
  {
    label: 'associate_professor_count',
    value: formatNumberSpace(props.single?.associate_professor_count),
  },
  {
    label: 'doctor_count',
    value: formatNumberSpace(props.single?.doctor_count),
  },
  {
    label: 'candidate_count',
    value: formatNumberSpace(props.single?.candidate_count),
  },
  {
    label: 'teacher_count',
    value: formatNumberSpace(props.single?.teacher_count),
  },
]);

const universityProgramStats = computed(() => [
  {
    label: 'bachelor',
    value: formatNumberSpace(props.single?.bachelor_count),
  },
  {
    label: 'master',
    value: formatNumberSpace(props.single?.master_count),
  },
  {
    label: 'speciality_count',
    value: formatNumberSpace(props.single?.speciality_count),
  },
  {
    label: 'higher_personal_count',
    value: formatNumberSpace(props.single?.higher_personal_count),
  },
]);

</script>

