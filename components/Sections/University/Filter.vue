<template>
  <section
    class="mx-auto w-full md:absolute relative md:bottom-[40px] z-30 p-4 sm:bg-white/80 backdrop-blur-3xl sm:backdrop-blur-xl rounded-2xl md:rounded-full border-2 border-white flex-y-center max-md:flex-col gap-3 md:gap-4"
    :class="filterClass"
  >
    <FormSelect
      v-model="queries.degree"
      :options="degrees"
      :placeholder="$t('level_of_education')"
      class="w-full rounded-full form"
      drop-down-class="!bg-white shadow-main-section-dropdown !overflow-hidden form"
      is-home-main
      is-main
      label-key="name"
      selected-option-styles="h-11 bg-white !rounded-full border-dark/[4%] py-3 !overflow-hidden"
      value-key="id"
    />
    <FormSelect
      v-model="queries.direction"
      :options="directions"
      :placeholder="$t('choose_education_level')"
      class="w-full rounded-full form"
      drop-down-class="!bg-white shadow-main-section-dropdown form"
      infinite-scroll
      is-home-main
      is-main
      label-key="name"
      selected-option-styles="h-11 bg-white !rounded-full border-dark/[4%] py-3"
      value-key="id"
    />
    <FormSelect
      v-model="queries.country"
      :loading="countriesLoading"
      :options="countries"
      :pagination="pagination"
      :placeholder="$t('select_country')"
      class="w-full rounded-full form"
      drop-down-class="!bg-white !backdrop-filter !backdrop-blur-2xl form"
      infinite-scroll
      input-classes="!font-normal"
      is-home-main
      is-main
      label-key="name"
      selected-option-styles="h-11 bg-white !px-0 !rounded-full border-dark/[4%] py-3 !overflow-hidden"
      value-key="id"
      @load="store.moreCountries"
      @on-select="onSelect"
    >
      <template #selectedOption="data">
        <FormInput
          v-model="countrySearch"
          :input-class="'placeholder:!text-dark !text-sm'"
          :placeholder="t('select_country')"
          class="!bg-white border-none w-full"
          input-id="country"
          selected-option-styles="!bg-white !p-0 !border-none !overflow-hidden"
          type="text"
        >
          <template #suffix>
            <div class="px-3 h-full flex-center">
              <span
                :class="{ '-rotate-180': data.toggleSelect }"
                class="icon-chevron transition-all duration-200 inline-block text-gray-100"
              ></span>
            </div>
          </template>
        </FormInput>
      </template>
    </FormSelect>
    <button
      class="!text-sm max-sm:!w-full h-10 rounded-full text-gray-100 bg-white border border-transparent px-3 font-medium flex-center gap-2"
      type="button"
      @click="clear"
    >
      <i class="icon-filter-clear text-lg" />
      {{ t('main_page.filter.clear') }}
    </button>
    <UIButton
      class="!text-sm !w-full sm:max-w-52 !rounded-full"
      text="search_program"
      variant="primary"
      @click="submit"
    />
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useCommonStore } from '~/store/common'
import type { SelectOption } from '~/types'
import type { IResponse } from '~/types/common'
import { debounce } from '~/utils'

type Filter = Record<string, SelectOption>

type Props = {
  navigateRoute?: string
  filterClass?: string
}

type Emits = {
  (e: 'submit', values: Filter): void
}

const props = withDefaults(defineProps<Props>(), {
  filterClass: '',
  navigateRoute: '',
})
const emits = defineEmits<Emits>()

const { t } = useI18n()
const router = useRouter()
const store = useCommonStore()

const loading = ref(false)
const degrees = ref<SelectOption[]>([])
const directions = ref<SelectOption[]>([])
const countrySearch = ref<string>('')

const countries = computed(() => store.countries.list)
const countriesLoading = computed(() => store.countries.loading)
const pagination = computed(() => store.countries.pagination)

onMounted(() => {
  getListLevelOfEducation()
  getListEducationForm()

  if (!countries.value?.length) {
    store.fetchCountries(true, false)
  }
})

watch(
  () => countrySearch.value,
  (newValue) => {
    debounce('searchCountry', () => {
      store.countries.params.page = 1
      store.countries.params.search.name = newValue

      store.fetchCountries(true, false)
    })
  }
)

function getListLevelOfEducation() {
  useApi()
    .$get<IResponse<SelectOption>>(
      '/development/params/education.level/advanced_list/',
      {
        params: {
          specification: { name: {} },
        },
      }
    )
    .then((res) => {
      degrees.value = res?.records
    })
    .finally(() => (loading.value = false))
}

function getListEducationForm() {
  useApi()
    .$get<IResponse<SelectOption>>(
      '/development/params/subject/advanced_list',
      {
        params: {
          specification: { name: {} },
        },
      }
    )
    .then((res) => {
      directions.value = res.records
    })
    .finally(() => (loading.value = false))
}

function onSelect(option: SelectOption) {
  countrySearch.value = option.name
}

const queries = reactive<Filter>({
  country: {
    id: null,
    name: '',
  },
  direction: {
    id: null,
    name: '',
  },
  degree: {
    id: null,
    name: '',
  },
})

function submit() {
  const query = {
    subjects: queries.direction?.id ? queries.direction.id : undefined,
    degree: queries.degree?.id ? queries.degree.id : undefined,
    countries: queries.country?.id ? queries.country.id : undefined,
    subjectsName: queries.direction?.name ? queries.direction.name : undefined,
    degreesName: queries.degree?.name ? queries.degree.name : undefined,
    countriesName: queries.country?.name ? queries.country.name : undefined,
  }

  const filteredQueries = Object.fromEntries(
    Object.entries(query).filter(([_, value]) => value !== undefined)
  )

  router.push({
    name: props.navigateRoute,
    query: filteredQueries,
  })
  emits('submit', queries)
}

function clear() {
  store.countries.params.page = 1
  store.countries.params.search.name = ''
  countrySearch.value = ''

  queries.country = {
    id: null,
    name: '',
  }
  queries.direction = {
    id: null,
    name: '',
  }
  queries.degree = {
    id: null,
    name: '',
  }

  // router.push({
  //   name: props.navigateRoute,
  //   query: {}, // Empty query object clears the parameters
  // })
}
</script>
