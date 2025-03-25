<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container mt-8">
      <UIWrapperTitle subtitle="event_subtitle" title="events" />
    </div>
    <div class="container my-8">
      <Transition mode="out-in" name="fade">
        <div :key="loading" class="grid md:grid-cols-2 gap-6">
          <template v-if="loading">
            <CardMainEvent
              v-for="(card, i) in 4"
              :key="i"
              :loading="loading"
              v-bind="{ card }"
            />
          </template>
          <template v-if="!loading">
            <CardMainEvent
              v-for="(card, i) in list"
              :key="i"
              :loading="loading"
              v-bind="{ item: card }"
            />
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
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import useUpdateRouteQuery from '~/composables/useQueryChange'
import type { IBreadcrumb } from '~/types/components/breadcrumb'

const { t } = useI18n()
const total = ref<number>(0)
const showItem = ref({ id: 1, name: 4 })

const route = useRoute()
const router = useRouter()
const list = ref([])
const loading = ref(true)
const currentPage = ref<string | number>(1)
const degree = ref(route.query.content || 4)

const paginationData = reactive({
  content: degree.value,
  page: route.query.page ? +route.query.page : 1,
  ...route.query,
})
const breadcrumbRoutes = [
  {
    title: t('events'),
    link: '/events',
  },
] as IBreadcrumb[]

function getList() {
  loading.value = true
  useApi()
    .$get('/development/params/education.event/advanced_list/', {
      params: {
        specification: {
          image_url: {},
          name: {},
          description: {},
          country_id: { fields: { id: {}, name: {} } },
          country_state_id: { fields: { id: {}, name: {} } },
          date: {},
          priority: {},
        },
        page: paginationData.page,
        region: route.query.region ?? undefined,
        page_size: degree.value,
        offset: paginationData.offset,
      },
    })
    .then((res: any) => {
      list.value = res?.records
      total.value = res?.length
      currentPage.value = res.current
    })
    .finally(() => {
      loading.value = false
    })
}

getList()

function pageChange(page: number) {
  currentPage.value = page
  paginationData.page = page
  useUpdateRouteQuery('page', '' + page)
  getList()
  if (process.client) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

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
    useUpdateRouteQuery('content', '' + degree.value)
    getList()
  },
  { deep: true }
)

watch(showItem, () => {
  degree.value = showItem.value.name
  router.replace({ query: { ...route?.query, content: showItem.value.name } })
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
