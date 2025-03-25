<template>
  <div class="grid grid-cols-12 gap-5">
    <FormGroup
      :label="$t('country_study')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <SelectCountryEdit
        v-model="form.values.country"
        :error="form.$v.value.country.$error"
        :loading="loading"
        :options="countries"
        :pagination="pagination"
        :placeholder="$t('select_country')"
        infinite-scroll
        label-key="name"
        selected-option-styles="!p-0 !border-none"
        value-key="id"
        @load="store.moreCountries"
        @on-select="onSelectCountry"
      >
        <template #selectedOption="data">
          <FormInput
            v-model="countrySearch"
            :error="form.$v.value.country.$error"
            :input-class="countrySearch ? 'placeholder:!text-dark' : ''"
            :placeholder="$t('select_country')"
            class="w-full"
            type="text"
          >
            <template #suffix>
              <div class="px-3 h-full flex-center">
                <span
                  :class="{ '-rotate-180': data.toggleSelect }"
                  class="icon-chevron transition-all duration-200 inline-block"
                />
              </div>
            </template>
          </FormInput>
        </template>
      </SelectCountryEdit>
    </FormGroup>

    <FormGroup
      :label="$t('level_of_education')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormSelect
        :key="degrees?.length"
        v-model="form.values.degree"
        :error="form.$v.value.degree.$error"
        :options="degrees"
        :placeholder="$t('profile.where_to_study.degree')"
        is-main
      />
    </FormGroup>
    <FormGroup
      :label="$t('which_university_would_you_like_to_study')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormSelect
        v-model="form.values.university_name"
        :error="form.$v.value.university_name.$error"
        :options="universities"
        :placeholder="$t('select_a_university')"
        infinite-scroll
        label-key="name"
        value-key="id"
        @on-select="onSelect"
      >
        <template #noData>
          <span>{{ $t('no_country_university') }}</span>
        </template>
      </FormSelect>
    </FormGroup>

    <FormGroup
      :label="$t('plan_year_enter')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormSelect
        v-model="form.values.study_plan_year"
        :error="form.$v.value.study_plan_year.$error"
        :options="years"
        :placeholder="$t('plan_year_enter')"
      />
    </FormGroup>

    <FormGroup :label="$t('choose_grant_form')" class="col-span-12">
      <FormSelect
        :key="programsType?.length"
        v-model="form.values.study_program"
        :error="form.$v.value.study_program?.$error"
        :options="programsType"
        label-key="display_name"
        value-key="id"
        :placeholder="form.values.study_program.display_name ?? $t('choose_grant')"
        is-main
      />
    </FormGroup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import SelectCountryEdit from '~/components/Form/Select/SelectCountryEdit.vue'
import type { TForm } from '~/composables/useForm'
import { useCommonStore } from '~/store/common'
import type { SelectOption } from '~/types'
import type { IResponse } from '~/types/common'

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()

const { form } = unref(props)

const years = computed(() => {
  const CURRENT_YEAR = new Date().getFullYear()
  const years = []
  // init years
  for (let i = 0; i < 5; i++) {
    const yearObj = {
      id: CURRENT_YEAR + i,
      name: CURRENT_YEAR + i,
    }

    years.push(yearObj)
  }

  return years
})

const programsType = ref([])

const getProgramsType = (id: number) => {
  useApi()
    .$get<IResponse<SelectOption>>('development/params/grant/advanced_list', {
      params: {
        domain: [[['university_id', 'ilike', id]]],
        specification: {
          display_name: {},
          university_id: {
            fields: {
              id: {},
              display_name: {},
            },
          },
        },
      },
    })
    .then((res) => {
      console.log(res)
      programsType.value = res.records
    })
}

const store = useCommonStore()

const pagination = computed(() => store.countries.pagination)
const loading = computed(() => store.countries.loading)
const countries = computed(() => store.countries.list)
const degrees = ref([])
const universities = ref([])

const trigger = ref(false)
const countrySearch = ref(form.values.country?.name || '')

watch(
  () => countrySearch.value,
  (newValue) => {
    debounce('searchCountry', () => {
      store.countries.params.page = 1
      store.countries.params.search.name = newValue
      store
        .fetchCountries(true, false)
        .finally(() => (trigger.value = !trigger.value))
    })
  }
)

watch(
  () => form.values.country,
  (country) => {
    store.countries.params.page = 1
    countrySearch.value = country.name
    store.countries.params.search.name = country.name
  },
  { deep: true, immediate: true }
)

store.fetchCountries(true)

watch(
  () => form.values.university_name,
  (newValue) => {
    getProgramsType(newValue.id)
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
}

getListLevelOfEducation()

function getListUniversities() {
  useApi()
    .$get<IResponse<SelectOption>>(
      'development/params/university/advanced_list/',
      {
        params: {
          specification: { name: {} },
          domain: form.values.country?.id
            ? JSON.stringify([
                ['country_id.id', '=', Number(form.values.country.id)],
              ])
            : [],
        },
      }
    )
    .then((res) => {
      universities.value = res?.records
    })
}

watch(
  () => form.values.country?.id,
  () => {
    getListUniversities()
  },
  { immediate: true }
)

function onSelect(option: any) {
  form.values.university_name = option
  getProgramsType(option.id)
}

function onSelectCountry(option: { name: string; id: number }) {
  countrySearch.value = option.name
  form.values.country = option
  getListUniversities()
  form.values.university_name = {
    id: null,
    name: '',
  }
}
</script>
