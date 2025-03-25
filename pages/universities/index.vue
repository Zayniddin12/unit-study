<template>
  <main>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <section class="container my-8">
      <UIWrapperTitle subtitle="universities_subtitle" title="item" />
    </section>

    <!--    <SectionsUniversityFilter-->
    <!--      filter-class="!relative !top-0 !w-full container"-->
    <!--      navigate-route=""-->
    <!--      @submit="submitFilter"-->
    <!--    />-->

    <section class="container my-8">
      <SectionsUniversityList
        :universities="universities.records"
        v-bind="{ loading }"
      />

      <div
        v-if="universities.length > 10 && !loading"
        class="mt-6 flex justify-end gap-5"
      >
        <FormSelect
          v-model="showItem"
          placeholder=""
          selected-option-styles="bg-transparent border-transparent"
          :options="showOptions"
        />
        <UIPagination
          :current-page="Number(pagination.page)"
          :limit="Number(pagination.page_size)"
          :total="universities.length"
          pagination-buttons
          @input="pageChange"
        />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import useUpdateRouteQuery from '~/composables/useQueryChange'
import { useUniversityStore } from '~/store/university'
import type { SelectOption } from '~/types'
import type { IBreadcrumb } from '~/types/components/breadcrumb'

const { t } = useI18n()
const route = useRoute()
const store = useUniversityStore()

const showItem = ref({ id: 1, name: route.query?.content || 10 })

const pagination = reactive({
  page_size: Number(showItem.value.name),
  page: route.query.page ? +route.query.page : 1,
})

const universities = computed(() => store.universities)
const loading = computed(() => store.universitiesLoading)

const showOptions = [
  { id: 1, name: 10 },
  { id: 2, name: 20 },
  { id: 3, name: 30 },
]

const filterVals = computed(() => {
  return {
    subjectId: route.query.subjectId ? +route.query.subjectId : null,
    educationLevelId: route.query.educationLevelId
      ? +route.query.educationLevelId
      : null,
    countryId: route.query.countryId ? +route.query.countryId : null,
  }
})

onMounted(() => {
  store.fetchUniversities(pagination, filterVals.value)
})

watch(
  () => route.query,
  (newQuery) => {
    // Update filter values when the route query changes
    filterVals.value.subjectId = newQuery.subjectId ? +newQuery.subjectId : null
    filterVals.value.educationLevelId = newQuery.educationLevelId
      ? +newQuery.educationLevelId
      : null
    filterVals.value.countryId = newQuery.countryId ? +newQuery.countryId : null

    pagination.page_size = newQuery.content
      ? +newQuery.content
      : pagination.page_size
    pagination.page = newQuery.page ? +newQuery.page : pagination.page

    store.fetchUniversities(pagination, filterVals.value)
  }
)

watch(showItem, () => {
  pagination.page_size = Number(showItem.value.name)
  pageChange(pagination.page)
})

function pageChange(page: number) {
  pagination.page = page
  useUpdateRouteQuery('page', '' + page)
  if (showItem.value.name !== 10) {
    useUpdateRouteQuery('content', showItem.value.name as string)
  } else {
    useUpdateRouteQuery('content', undefined)
  }
  store.fetchUniversities(pagination, filterVals.value)
}

function submitFilter(filterValues: Record<string, SelectOption>) {
  filterVals.value.subjectId = filterValues.direction?.id || null // Align with 'direction'
  filterVals.value.educationLevelId = filterValues.degree?.id || null // Align with 'degree'
  filterVals.value.countryId = filterValues.country?.id || null // Align with 'countries'

  // Update query parameters
  useUpdateRouteQuery(
    'direction',
    filterVals.value.subjectId ? String(filterVals.value.subjectId) : undefined
  )
  useUpdateRouteQuery(
    'degree',
    filterVals.value.educationLevelId
      ? String(filterVals.value.educationLevelId)
      : undefined
  )
  useUpdateRouteQuery(
    'countries',
    filterVals.value.countryId ? String(filterVals.value.countryId) : undefined
  )

  store.fetchUniversities(pagination, filterVals.value)
}

const breadcrumbRoutes: IBreadcrumb[] = [
  {
    title: t('universities'),
    link: '',
  },
]
</script>
