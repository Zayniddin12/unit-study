<template>
  <div
    class="relative w-full h-full min-h-[calc(100vh-108px)] bg-white-200 pb-16"
  >
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container mt-4 md:mt-8">
      <div class="!z-50">
        <div class="w-full lg:mt-8 my-4">
          <UIWrapperTitle
            subtitle="way_of_students_subtitle"
            title="programs"
          />
        </div>
        <button
          class="bg-white p-2 rounded-lg lg:hidden flex gap-2 items-center cursor-pointer w-full"
          @click="showFilter = true"
        >
          <i class="icon-filter text-2xl" />
          <p class="text-dark font-medium leading-140">
            {{ t('programs_filter.placeholder') }}
          </p>
        </button>
      </div>
      <div class="w-full lg:grid lg:grid-cols-12 gap-5 lg:mt-8 mt-4">
        <div v-if="width > 1024" class="col-span-4 max-lg:hidden">
          <SectionsProgramsSidebar @submit="filterGetData" />
        </div>
        <div class="lg:col-span-8">
          <Transition mode="out-in" name="fade">
            <div
              :key="loading"
              :class="{ 'h-full': !list.length }"
              class="flex flex-col gap-4"
            >
              <template v-if="loading">
                <CardProgram
                  v-for="i in 5"
                  :key="i"
                  loading
                  v-bind="{ card: cardExample }"
                />
              </template>
              <template v-if="!loading">
                <CardProgram
                  v-for="(card, i) in list"
                  :key="i"
                  is-extra
                  v-bind="{ card }"
                />
                <template v-if="!loading && !list.length">
                  <EmptyProgram class="mt-6 relative" />
                </template>
              </template>
            </div>
          </Transition>
          <div
            v-if="total > 3"
            class="mt-6 flex max-sm:flex-col justify-end items-end gap-5"
          >
            <div class="flex-y-center gap-2">
              <p class="text-sm">{{ t('show') }}</p>
              <FormSelect
                v-model="showItem"
                placeholder=""
                selected-option-styles="bg-transparent border-transparent"
                :options="showOptions"
              />
            </div>
            <UIPagination
              v-if="total > Number(degree)"
              :current-page="Number(currentPage)"
              :limit="showOptions[showItem.id - 1]?.name"
              :total="total"
              pagination-buttons
              @input="pageChange"
            />
          </div>
        </div>
      </div>
    </div>

    <Modal
      :show="showFilter"
      :title="t('programs')"
      header-style="!pb-0"
      @close="showFilter = false"
    >
      <SectionsProgramsSidebar @submit="filterGetData" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import useUpdateRouteQuery from '~/composables/useQueryChange'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { width } = useWindowSize()

const list = ref<any>([])
const loading = ref(true)
const degree = ref(route.query.content || 4)
const showFilter = ref<boolean>(false)
const currentPage = ref<string | number>(1)
const total = ref<number>(0)
const showItem = ref({ id: 1, name: 4 })

const paginationData = reactive({
  content: degree.value,
  page: route.query.page ? +route.query.page : 1,
  ...route.query,
})

function getData() {
  showFilter.value = false
  const query = route.query

  const defaultValues = {
    degree: '%',
    direction: '%',
    lang: '%',
    subjects: '%',
    countries: '%',
    region: '%',
    duration__gte: '0',
    duration__lte: query.price__valid ? 24 : 72,
    price__gte: '0',
    price__lte: 160_000,
    studyType: '%',
    formType: '%',
  }

  const params = computed(() => {
    const conditions = []

    for (const [key, defaultValue] of Object.entries(defaultValues)) {
      const value = query[key]
      if (value && value !== defaultValue) {
        const condition = getCondition(key, value)
        if (condition) conditions.push(condition)
      }
    }

    return [conditions]
  })

  loading.value = true
  useApi()
    .$get('/development/params/program/advanced_list', {
      params: {
        domain: params.value,
        page_size: degree.value,
        page: paginationData.page,
        specification: {
          university_id: {
            fields: {
              logo_url: {},
              name: {},
              city_id: { fields: { id: {}, name: {} } },
              country_id: { fields: { id: {}, name: {} } },
              full_location: {},
            },
          },
          name: {},
          education_level_ids: { fields: { id: {}, name: {} } },
          course_of_study_id: { fields: { id: {}, name: {} } },
          form_of_education: { fields: { id: {}, name: {} } },
          language_of_education: { fields: { id: {}, name: {} } },
          subject_count: {},
          duration: {},
          contract: {},
          currency: {
            fields: {
              id: {},
              name: {},
            },
          },
          nearest_expire_deadline: {},
        },
      },
    })
    .then((res: IResponse<any>) => {
      total.value = res?.length
      currentPage.value = res.current
      list.value = res.records
    })
    .catch(() => {
      loading.value = false
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })
}

function filterGetData() {
  currentPage.value = 1
  paginationData.page = 1
  useUpdateRouteQuery('page', undefined)
}

function pageChange(page: number) {
  currentPage.value = page
  paginationData.page = page
  useUpdateRouteQuery('page', '' + page)
  getData()
  if (process.client) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

watch(showFilter, () => {
  if (process.client) {
    if (showFilter.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
})

const breadcrumbRoutes = computed(() => [
  {
    title: t('programs'),
    link: '/',
  },
])

const cardExample = {
  title: 'Digital Marketing',
  avatar: '/images/fake/image-fake.png',
  city: 'Ташкент',
  direction: 'Маркетинг',
  level: 'Бакалавриат',
  language: 'Английский',
  duration: '4 года',
  form_of_study: 'Очная',
  free_training_opportunity: 'Есть',
  where_does_the_training_take_place: 'Ташкент',
  amount: 17457094,
}

getData()

watch(
  () => route,
  () => {
    getData()
  },
  { deep: true }
)

onMounted(() => {
  const content = route.query.content
  if (Number(content) !== 4) {
    const value = showOptions.find((i) => i.name == Number(content))
    if (value) showItem.value = value
  }
})

watch(
  degree,
  () => {
    paginationData.page = 1
    paginationData.content = degree.value
    router.push({ query: paginationData })
    getData()
  },
  { deep: true }
)

watch(showItem, () => {
  degree.value = showItem.value.name
  router.replace({ query: { ...route?.query, content: showItem.value.name } })
})

function getCondition(key: string, value: string | number | object) {
  const conditionsMap = {
    degree: ['education_level_ids.id', '=', value],
    direction: ['course_of_study_id.id', '=', value],
    lang: ['language_of_education.id', '=', value],
    subjects: ['subject_ids.id', '=', value],
    countries: ['university_id.country_id.id', '=', value],
    region: ['university_id.city_id.id', '=', value],
    duration__gte: ['duration', '>', value],
    duration__lte: ['duration', '<', value],
    price__gte: ['contract', '>', value],
    price__lte: ['contract', '<', value],
    studyType: ['facultet_id', 'ilike', value],
  }
  return conditionsMap[key] || null
}

useSeoMeta({
  title: t('meta.programs.title'),
  description: t('meta.programs.info'),
})

const showOptions = [
  {
    id: 1,
    name: 4,
  },
  {
    id: 2,
    name: 8,
  },
  {
    id: 3,
    name: 16,
  },
  {
    id: 4,
    name: 32,
  },
]
</script>
