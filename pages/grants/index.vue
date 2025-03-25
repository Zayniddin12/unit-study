<template>
  <div
    class="relative w-full h-full min-h-[calc(100vh-108px)] bg-white-200 pb-16"
  >
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container mt-4 md:mt-8">
      <div class="flex-center-between !z-40">
        <div class="w-full max-md:my-4">
          <UIWrapperTitle subtitle="grants_page_subtitle" title="grants" />
          <div
            class="bg-white p-2 rounded-lg lg:hidden flex gap-2 items-center mt-4 cursor-pointer"
            @click="showFilter = !showFilter"
          >
            <i class="icon-filter text-2xl" />
            <p class="text-dark font-medium leading-140">
              {{ $t('filter') }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full lg:grid lg:grid-cols-12 gap-5 md:mt-8 mt-4 relative">
        <div v-if="width > 1024" class="col-span-4 max-lg:hidden">
          <SectionsGrantsSidebar @get="filterGetData" />
        </div>
        <div class="lg:col-span-8">
          <Transition mode="out-in" name="fade">
            <div :key="loading" :class="{ 'h-full': !list.length }">
              <div class="grid gap-5 md:grid-cols-2 grid-cols-1">
                <template v-if="loading">
                  <SectionsGrants
                    v-for="i in 5"
                    :key="i"
                    loading
                    v-bind="{ card: cardExample }"
                  />
                </template>
                <template v-if="!loading && list.length">
                  <SectionsGrants
                    v-for="(card, i) in list"
                    :key="i"
                    is-extra
                    v-bind="{ card }"
                  />
                </template>
              </div>
              <template v-if="!loading && !list.length">
                <EmptyProgram
                  class="absolute -bottom-5 left-6 lg:relative pointer-events-none"
                />
              </template>
            </div>
          </Transition>
          <div
            v-if="total > 3"
            class="mt-6 flex justify-end max-sm:flex-wrap gap-5"
          >
            <div class="flex gap-2 items-center">
              <p>{{ t('show') }}</p>
              <FormSelect
                v-model="showItem"
                placeholder=""
                selected-option-styles="bg-transparent border-transparent"
                :options="showOptions"
              />
            </div>
            <UIPagination
              v-if="total > degree"
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
    <Transition name="fade">
      <Modal
        :show="showFilter && width < 1024"
        :title="t('grants')"
        class="absolute-center left-2.5 w-[calc(100vw-20px)] p-4 bg-white h-fit sm:pb-4 z-[51] shadow-custom-select rounded-xl"
        @close="showFilter = false"
      >
        <SectionsGrantsSidebar @get="filterGetData" />
      </Modal>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import useUpdateRouteQuery from '~/composables/useQueryChange'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const route = useRoute()
const { width } = useWindowSize()

const router = useRouter()
const list = ref<any>([])
const loading = ref<boolean>(false)
const degree = ref(route.query.content || 4)
const showFilter = ref<boolean>(false)
const showItem = ref({ id: 1, name: 4 })
const currentPage = ref<string | number>(Number(route?.query?.page) || 1)
const total = ref<number>(0)
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

const paginationData = reactive({
  content: degree.value,
  page: route.query.page ? +route.query.page : 1,
  ...route.query,
})

function getData() {
  loading.value = true

  // Build the domain array dynamically
  const domain = [
    [
      ['education_level_ids.id', 'ilike', route?.query.degree ?? ''],
      ['language_of_education.id', 'ilike', route?.query.lang ?? ''],
    ],
  ]

  // Add the country filter only if route.query.country is defined
  if (route?.query.country) {
    domain[0].push([
      'university_id.country_id.name',
      'ilike',
      route.query.country,
    ])
  }

  useApi()
    .$get('/development/params/grant/advanced_list', {
      params: {
        specification: {
          image_url: {},
          slug: {},
          title: {},
          end_date: {},
          university_id: { fields: { id: {}, name: {}, slug: {} } },
          view_count: {},
        },
        page_size: degree.value,
        page: paginationData.page,
        domain,
      },
    })
    .then((res: IResponse<any>) => {
      total.value = res?.length
      currentPage.value = res.current
      list.value = res.records
    })
    .finally(() => {
      loading.value = false
    })
}

getData()

// function onSelect(item) {
//   degree.value = item.name
// }

function filterGetData() {
  showFilter.value = false
  currentPage.value = 1
  paginationData.page = 1
  useUpdateRouteQuery('page', undefined)
  getData()
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

watch(
  () => showFilter.value,
  () => {
    if (process.client) {
      if (showFilter.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }
)

const breadcrumbRoutes = computed(() => [
  {
    title: t('grants'),
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

onMounted(() => {
  const content = route.query.content
  if (Number(content) !== 4) {
    const value = showOptions.find((i) => i.name == Number(content))
    if (value) showItem.value = value
  }
})

watch(showItem, () => {
  degree.value = showItem.value.name
  router.replace({ query: { ...route?.query, content: showItem.value.name } })
})

useSeoMeta({
  title: t('meta.scholarships.title'),
  description: t('meta.scholarships.info'),
})
</script>
