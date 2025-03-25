<template>
  <div class="flex flex-col gap-4">
    <div class="rounded-3xl border-2 border-white/80 relative bg-white p-6">
      <div :key="trigger">
        <Transition mode="out-in" name="fade">
          <SectionsProgramsFilterBasic
            :form="filter"
            v-bind="{
              degrees,
              directions,
              formTypes,
              languages,
              countries,
              subject,
              city: cities,
              countriesLoading,
            }"
            @search="getDirectionsBySearch"
            @search-region="searchRegion"
          />
        </Transition>
      </div>
      <div class="gap-4 flex">
        <UIButton
          class="w-full mt-6 !py-2.5 text-sm !px-6"
          main-class="!whitespace-wrap"
          text="clear_filter"
          variant="primary-secondary"
          @click="clear"
        />
        <UIButton
          :disabled="isDisabled"
          class="w-full mt-6 px-6 !py-2.5 text-sm"
          main-class="!whitespace-wrap"
          text="search_program"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'
import { useCommonStore } from '~/store/common'
import type { SelectOption } from '~/types'
import type { IResponse } from '~/types/common'

const emit = defineEmits(['submit'])

const route = useRoute()
const router = useRouter()

const { t, locale } = useI18n()
const commonStore = useCommonStore()

const trigger = ref(false)
const degrees = ref<SelectOption[]>([])
const directions = ref<SelectOption[]>([])
const formTypes = ref<SelectOption[]>([])
const languages = ref<SelectOption[]>([])
const subject = ref<SelectOption[]>([])
const searchDirection = ref<string>('')

const cities = computed(() => [
  {
    id: '%',
    name: t('all_city'),
  },
  ...commonStore.cities.records,
])
const countriesLoading = computed(() => commonStore.countries.loading)
const countries = computed(() => [
  { name: t('all_country'), id: '%' },
  ...commonStore.countries.list,
])

// Filter Start
const filter = useForm(
  {
    countries: { id: '%', name: t('all_country') },
    city: { id: '%', name: t('all_city') },
    direction: { id: '%', name: t('all_directions') },
    level: { id: '%', name: t('all_degrees') },
    language: { id: '%', name: t('all_languages') },
    item: { id: '%', name: t('subject_taught') },
    minValue: 0,
    maxValue: 160_000,
    minDuration: 6,
    maxDuration: 72,
    formType: { id: '%', name: t('all_forms') },
    checkbox: false,
  },
  {}
)

const store = useHomeStore()

function submit() {
  const queries = {
    degree:
      filter.values.level?.id !== '%' ? filter.values.level?.id : undefined,
    degreesName:
      filter.values.level?.id !== '%' ? filter.values.level?.name : undefined,
    direction:
      filter.values.direction.id !== '%'
        ? filter.values.direction.id
        : undefined,
    directionName:
      filter.values.direction?.id !== '%'
        ? filter.values.direction?.name
        : undefined,
    lang:
      filter.values.language.id !== '%' ? filter.values.language.id : undefined,
    langName:
      filter.values.language?.id !== '%'
        ? filter.values.language?.name
        : undefined,
    subjects: filter.values.item.id !== '%' ? filter.values.item.id : undefined,
    subjectsName:
      filter.values.item?.id !== '%' ? filter.values.item?.name : undefined,
    formType:
      filter.values.formType.id !== '%' ? filter.values.formType.id : undefined,
    formTypeName:
      filter.values.formType?.id !== '%'
        ? filter.values.formType?.name
        : undefined,
    city: filter.values.city.id !== '%' ? filter.values.city.id : undefined,
    cityName:
      filter.values.city?.id !== '%' ? filter.values.city?.name : undefined,
    countries:
      filter.values.countries.id !== '%'
        ? filter.values.countries.id
        : undefined,
    countriesName:
      filter.values.countries?.id !== '%'
        ? filter.values.countries?.name
        : undefined,
    price__gte:
      filter.values.minValue !== 0 ? `${filter.values.minValue}` : undefined,
    price__lte:
      filter.values.maxValue !== 160_000
        ? `${filter.values.maxValue}`
        : undefined,
    price__valid: filter.values.checkbox
      ? `${filter.values.checkbox}`
      : undefined,
    duration__gte:
      filter.values.minDuration !== 6
        ? `${filter.values.minDuration}`
        : undefined,
    duration__lte:
      filter.values.maxDuration !== 72
        ? `${filter.values.maxDuration}`
        : undefined,
  }

  const filteredQueries = Object.fromEntries(
    Object.entries(queries).filter(
      ([_, value]) => value !== undefined && value !== '%'
    )
  )

  router.push({ path: route.path, query: filteredQueries })
  debounce('filterProgram', () => emit('submit'))
}

const formType = computed(() => [
  {
    id: '',
    name: t('all_forms'),
  },
  ...store.studyTypes,
])

const limit = ref(0)
const count = ref(10)
const limit1 = ref(0)
const count1 = ref(10)
const page2 = ref(1)

function getDirectionsBySearch(e: string) {
  searchDirection.value = e
  limit.value = 0
  count.value = 10
  limit1.value = 0
  page2.value = 0
  count1.value = 10
}

watch(
  searchDirection,
  () => {
    debounce(
      'searchable',
      () => {
        getDirectionsBySearch(searchDirection.value)
      },
      500
    )
  },
  { deep: true, immediate: true }
)

watch(
  () => filter.values.direction,
  () => {
    page2.value = 0
  }
)

function searchRegion(item: string) {
  commonStore.countries.params.page = 1
  commonStore.countries.params.search.name = item
  commonStore.fetchCountries(true, false)
}

function getLanguages() {
  return useApi()
    .$get<IResponse<SelectOption>>(
      '/development/params/res.lang/advanced_list/',
      {
        params: {
          specification: { name: {} },
        },
      }
    )
    .then((res) => {
      languages.value = [
        {
          name: t('all_languages'),
          id: '%',
        },
        ...res.records,
      ]
    })
}

function getSubject() {
  useApi()
    .$get<IResponse<SelectOption>>(
      '/development/params/subject/advanced_list/',
      {
        params: {
          specification: { name: {} },
        },
      }
    )
    .then((res) => {
      subject.value = [
        {
          name: t('subject_taught'),
          id: '%',
        },
        ...res.records,
      ]
    })
}

watch(
  () => filter.values.countries.id,
  (countryId) => {
    if (countryId && countryId !== '%') {
      commonStore.fetchCities(countryId, { page: 1 })
    }
  }
)

function getListLevelOfEducation() {
  return useApi()
    .$get<IResponse<SelectOption>>(
      '/development/params/education.level/advanced_list/',
      {
        params: {
          specification: { name: {} },
        },
      }
    )
    .then((res) => {
      degrees.value = [{ id: '%', name: t('all_degrees') }, ...res.records]
    })
}

function getListEducationForm() {
  return useApi()
    .$get<IResponse<SelectOption>>(
      '/development/params/education.form/advanced_list/',
      {
        params: {
          specification: { name: {} },
        },
      }
    )
    .then((res) => {
      console.log(res)
      directions.value = [
        { id: '%', name: t('all_directions') },
        ...res.records,
      ]
    })
}

function getListEducationFormType() {
  useApi()
    .$get<IResponse<SelectOption>>(
      '/development/params/faculty/advanced_list',
      {
        params: {
          specification: { name: {} },
        },
      }
    )
    .then((res) => {
      formTypes.value = [{ id: '%', name: t('all_forms') }, ...res.records]
    })
}

onMounted(() => {
  updateFilterFromQuery()

  // fetching filter data
  commonStore.fetchCountries(true, false)
  getSubject()
  getListEducationForm()
  getListLevelOfEducation()
  getListEducationFormType()
  getLanguages()
  Promise.all([getListEducationForm, getListLevelOfEducation]).finally(
    () => (trigger.value = !trigger.value)
  )
})

onBeforeMount(() => {
  commonStore.countries.params.page = 1
  commonStore.countries.params.search.id = ''
  commonStore.countries.params.search.name = ''
})

const isDisabled = ref(true)

watch(
  filter.values,
  () => {
    if (
      filter.values.checkbox != false ||
      filter.values.minValue != 0 ||
      filter.values.maxValue != 160_000 ||
      filter.values.minDuration != 6 ||
      filter.values.maxDuration != 72 ||
      filter.values.language?.id != '%' ||
      filter.values.city?.id != '%' ||
      filter.values.direction?.id != '%' ||
      filter.values.level?.id != '%' ||
      filter.values.item?.id != '%' ||
      filter.values.countries?.id != '%' ||
      filter.values.formType?.id != '%'
    ) {
      isDisabled.value = false
    }
  },
  { deep: true }
)

function clear() {
  commonStore.countries.params.search.name = ''
  filter.values.countries = { id: '%', name: t('all_country') }
  filter.values.country = ''
  filter.values.city = { id: '%', name: t('all_city') }
  filter.values.direction = { id: '%', name: t('all_directions') }
  filter.values.level = { id: '%', name: t('all_degrees') }
  filter.values.language = { id: '%', name: t('all_languages') }
  filter.values.item = { id: '%', name: t('subject_taught') }
  filter.values.checkbox = false
  filter.values.minValue = 0
  filter.values.maxValue = 160_000
  filter.values.minDuration = 6
  filter.values.maxDuration = 72
  filter.values.formType = { id: '%', name: t('all_forms') }

  const queries: Record<string, undefined> = {
    degree: undefined,
    degreesName: undefined,
    direction: undefined,
    directionName: undefined,
    lang: undefined,
    langName: undefined,
    studyType: undefined,
    subjects: undefined,
    subjectsName: undefined,
    study_form: undefined,
    city: undefined,
    cityName: undefined,
    countries: undefined,
    countriesName: undefined,
    price__gte: undefined,
    price__lte: undefined,
    price__valid: undefined,
    duration__gte: undefined,
    duration__lte: undefined,
  }

  Object.keys(queries).forEach((key) => {
    router.replace({ query: { key: queries[key] } })
  })

  debounce('query-update', () => emit('submit'), 800)
}

// watch(
//   () => route.query,
//   () => {
//     updateFilterFromQuery()
//
//     emit('submit')
//   },
//   { deep: true, immediate: true }
// )

watch(locale, () => {
  clear()
})

function updateFilterFromQuery() {
  const query = route.query

  if (query.price__valid == 'true') {
    filter.values.checkbox = true
  }
  if (query?.degree && query?.degreesName) {
    filter.values.level = {
      id: query.degree.toString(),
      name: query.degreesName.toString(),
    }
  }
  if (query?.direction && query?.directionName) {
    filter.values.direction = {
      id: query.direction.toString(),
      name: query.directionName.toString(),
    }
  }
  if (query?.lang && query?.langName) {
    filter.values.language = {
      id: query.lang.toString(),
      name: query.langName.toString(),
    }
  }
  if (query?.city && query?.cityName) {
    filter.values.city = {
      id: query.city.toString(),
      name: query.cityName.toString(),
    }
  }
  if (query.price__gte) {
    filter.values.minValue = +query.price__gte
  }
  if (query.price__lte) {
    filter.values.maxValue = +query.price__lte
  }
  if (query.duration__gte) {
    filter.values.minDuration = +query.duration__gte
  }
  if (query.duration__lte) {
    filter.values.maxDuration = +query.duration__lte
  }
  if (query.include_price_null) {
    filter.values.checkbox = query.include_price_null === 'true'
  }
  if (query?.countries && query?.countriesName) {
    filter.values.countries = {
      id: query.countries.toString(),
      name: query.countriesName.toString(),
    }
  }
  if (query?.subjects && query?.subjectsName) {
    filter.values.item = {
      id: query?.subjects?.toString(),
      name: query?.subjectsName?.toString(),
    }
  }
}
</script>
