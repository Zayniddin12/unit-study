<template>
  <div class="flex flex-col gap-4">
    <FormGroup
      :label="t('level_of_education')"
      for-id="level_of_education"
      label-class="text-base !font-bold text-base leading-5"
    >
      <FormSelect
        :key="degrees?.length"
        v-model="values.level"
        :options="degrees"
        :placeholder="t('choose_education_level')"
        is-home-main
        is-main
        label-key="name"
        selected-option-styles="rounded-xl !bg-gray"
        value-key="id"
      />
    </FormGroup>
    <FormGroup
      :label="t('education_form')"
      for-id="education_form"
      label-class="text-base !font-bold"
    >
      <FormSelect
        :key="directions?.length"
        v-model="values.direction"
        :options="directions"
        :placeholder="t('choose_direction')"
        infinite-scroll
        is-home-main
        is-main
        label-key="name"
        selected-option-styles="rounded-xl !bg-gray"
        value-key="id"
        @load="emits('load', 10)"
        @on-toggle="toggledSelect = $event"
        @on-select="handleSelectDirections"
      />
    </FormGroup>

    <FormGroup
      :label="t('language_instruction')"
      for-id="language_instruction"
      label-class="text-base !font-bold"
    >
      <FormSelect
        :key="languages?.length"
        v-model="values.language"
        :options="languages"
        :placeholder="t('choose_language_instruction')"
        is-home-main
        is-main
        label-key="name"
        selected-option-styles="rounded-xl !bg-gray"
        value-key="id"
        @on-select="handleSelectDirections1"
      />
    </FormGroup>

    <FormGroup
      :label="t('subject_taught')"
      for-id="all_subject"
      label-class=" !font-bold"
    >
      <FormSelect
        :key="subject?.length"
        v-model="values.item"
        :options="subject"
        :placeholder="t('all_subject_taught')"
        infinite-scroll
        is-home-main
        is-main
        label-key="name"
        selected-option-styles="rounded-xl !bg-gray"
        value-key="id"
        @load="emits('load-items')"
        @on-select="handleSelectItem"
      />
    </FormGroup>

    <FormGroup
      :label="t('program_subjects')"
      for-id="program_subjects"
      label-class=" !font-bold text-base leading-5"
    >
      <FormSelect
        :key="formTypes?.length"
        v-model="values.formType"
        :options="formTypes"
        :placeholder="t('all_forms')"
        is-home-main
        is-main
        label-key="name"
        selected-option-styles="rounded-xl !bg-gray"
        value-key="id"
      />
    </FormGroup>

    <FormGroup :label="t('country')" for-id="country" label-class=" !font-bold">
      <FormSelect
        v-model="form.values.countries"
        :loading="countriesLoading"
        :options="countries"
        :placeholder="t('select_country')"
        infinite-scroll
        input-classes="!font-normal"
        is-main
        label-key="name"
        selected-option-styles="!p-0 border-none"
        value-key="id"
        @load="store.moreCountries"
        @on-select="onSelect"
      >
        <template #selectedOption="data">
          <FormInput
            v-model="form.values.country"
            :input-class="
              countryName
                ? 'placeholder:!text-dark placeholder:!font-medium placeholder:!text-sm py-3 px-3.5'
                : '!font-medium placeholder:!text-dark placeholder:!font-medium placeholder:!text-sm py-3 px-3.5'
            "
            :placeholder="
              form.values.countries?.name
                ? form.values.countries.name
                : t('select_country')
            "
            class="w-full focus-within:!border-warning focus-within:bg-white"
            input-id="country"
            selected-option-styles="border-gray/40 !p-0 !border-none"
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
    </FormGroup>

    <FormGroup
      :key="form.values.countries.id"
      :label="t('city')"
      for-id="city"
      label-class="text-base !font-bold"
    >
      <FormSelect
        v-model="form.values.city"
        :disabled="form.values.countries?.id == '%'"
        :loading="loadingCities"
        :options="cities"
        :placeholder="t('choose_city')"
        input-classes="truncate"
        is-home-main
        is-main
        label-key="name"
        parent-input-classes="h-4"
        selected-option-styles="border-gray/40 !p-0 !border-none"
        value-key="id"
        @on-select="handleCitySelect"
      >
        <!-- Search Template -->
        <template #selectedOption="data">
          <FormInput
            v-model="searchableCities"
            :input-class="
              searchableCities
                ? 'placeholder:!text-dark !font-medium placeholder:!font-medium placeholder:!text-sm py-3 px-3.5'
                : '!font-medium placeholder:!text-dark placeholder:!font-medium placeholder:!text-sm py-3 px-3.5'
            "
            :disabled="form.values.countries?.id == '%'"
            :placeholder="
              form.values.city?.name ? form.values.city.name : t('choose_city')
            "
            class="w-full focus-within:!border-warning focus-within:bg-white"
            input-id="country"
            selected-option-styles="border-gray/40 !p-0 !border-none"
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
    </FormGroup>

    <div class="w-full h-px bg-[#D9E0E8]" />

    <FormGroup
      :label="t('sum_contracts')"
      for-id="sum_contracts"
      label-class="text-base !font-bold"
    >
      <div class="flex-center-between">
        <p class="text-xs leading-normal font-normal text-dark">
          ${{ formatNumberSpace(calculateValueInRange(+min, +max, minValue)) }}
        </p>
        <p class="text-xs leading-normal font-normal text-dark">
          ${{ formatNumberSpace(calculateValueInRange(+min, +max, maxValue)) }}
        </p>
      </div>
      <FormDoubleRange
        v-model:max-value="maxValue"
        v-model:min-value="minValue"
        :disabled="values.checkbox"
        :max="100"
        :min="0"
        :step="1_000"
      />
    </FormGroup>

    <FormCheckbox
      v-model="values.checkbox"
      :checked="values.checkbox"
      :label="t('sum_not_given')"
      checkbox-styles="w-5 h-5"
      for-id="sum_not_given"
      label-styles="text-sm font-medium text-dark"
    />

    <FormGroup
      :label="t('duration_of_training')"
      for-id="duration_of_training"
      label-class="text-base !font-bold"
    >
      <div class="flex-center-between">
        <p class="text-xs leading-normal font-normal text-dark flex gap-1">
          <span v-if="minDurationYear">
            {{ formatNumberSpace(minDurationYear) }} {{ t('year') }}
          </span>
          {{ formatNumberSpace(minDurationMonth) }} {{ t('month') }}
        </p>
        <p class="text-xs leading-normal font-normal text-dark flex gap-1">
          <span v-if="maxDurationYear">
            {{ formatNumberSpace(maxDurationYear) }} {{ t('year') }}
          </span>
          <span v-if="maxDurationMonth">
            {{ formatNumberSpace(maxDurationMonth) }} {{ t('month') }}
          </span>
        </p>
      </div>
      <FormDoubleRange
        v-model:max-value="maxTime"
        v-model:min-value="minTime"
        :max="72"
        :min="6"
        :step="1"
      />
    </FormGroup>

    <div class="w-full h-px bg-[#D9E0E8]" />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useCommonStore } from '~/store/common'
import type { SelectOption } from '~/types'
import {
  calculatePercentInRange,
  calculateValueInRange,
  debounce,
  formatNumberSpace,
} from '~/utils'

export type TOption = string | number | { [key: string]: string | number }

interface Props {
  degrees: SelectOption[]
  directions: SelectOption[]
  subject: SelectOption[]
  languages: SelectOption[]
  countries: SelectOption[]
  city: SelectOption[]
  form: TForm<any>
  formTypes: SelectOption[]
  countriesLoading: {
    list: boolean
    more: boolean
  }
}

interface Emits {
  (event: 'load', limit: number): void

  (event: 'load-items'): void

  (event: 'search', searchableDirections: string): void

  (event: 'search2', searchableDirectionsId: string): void

  (event: 'searchRegion', searchableRegion: string): void

  (event: 'searchCity', searchableRegion: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const store = useCommonStore()
const { t } = useI18n()

const { form } = unref(props)
const { values } = form

const min = ref(0)
const max = ref(160_000)
const minTime = ref(6)
const maxTime = ref(72)
const minValue = ref(20)
const maxValue = ref(60)
const minDurationYear = ref(0.5)
const maxDurationYear = ref(6)
const minDurationMonth = ref(0)
const maxDurationMonth = ref(0)
const searchableDirections = ref(null)
const searchableDirectionsId = ref(null)
const toggledSelect = ref(false)
const direction = ref<{ id: number; name: string }>()
const language = ref<{ id: number; name: string }>()
const searchableCities = ref('')
const isSearchable = ref(false)

const loadingCities = computed(() => ({
  list: store.cities.loading,
  more: store.cities.loadingMore,
}))

const cities = computed(() => {
  if (searchableCities.value.length > 0) {
    return store.cities.searchResults
  } else {
    return [{ name: t('all_city'), id: '%' }, ...store.cities.records]
  }
})

const handleSelectDirections = (option: { id: number; name: string }) => {
  direction.value = option
  values.direction = option
  toggledSelect.value = false
}

const handleSelectDirections1 = (option: { id: number; name: string }) => {
  language.value = option
  values.language = option

  toggledSelect.value = false
}

const handleCitySelect = (option: SelectOption) => {
  searchableCities.value = option?.name
  form.values.city = option
}

const countryName = computed(() => form.values.country)

watch(
  () => form.values.country,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      searchableCities.value = ''
      form.values.city = {
        id: '%',
        name: t('all_city'),
      }
      debounce('searchCountry', () => {
        emits('searchRegion', newValue)
      })
    }
  },
  { deep: true, immediate: true }
)

watch(
  searchableCities,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      debounce('searchCountry', () => {
        store.searchCities(newValue)
      })
    }
  },
  { immediate: true }
)

function onSelect(option: any) {
  values.country = option?.name
  values.countries = option
}

const handleSelectItem = (option: {
  id: number
  name: string
  university: { id: number; name: string }
}) => {
  values.item = option
}

watch(
  () => searchableDirections.value,
  (value) => {
    emits('search', value)
  },
  { deep: true, immediate: true }
)

watch(
  () => searchableDirectionsId.value,
  (value) => {
    emits('search2', value)
  },
  { deep: true, immediate: true }
)

watch([() => minValue.value, () => maxValue.value], () => {
  values.minValue = calculateValueInRange(
    +min.value,
    +max.value,
    minValue.value
  )
  values.maxValue = calculateValueInRange(
    +min.value,
    +max.value,
    maxValue.value
  )
})

// watch min and max values in form values and get percent
watch(
  [() => values.minValue, () => values.maxValue],
  () => {
    minValue.value = calculatePercentInRange(
      +min.value,
      +max.value,
      values.minValue
    )
    maxValue.value = calculatePercentInRange(
      +min.value,
      +max.value,
      values.maxValue
    )
  },
  {
    immediate: true,
  }
)
watch([() => minTime.value, () => maxTime.value], () => {
  values.minDuration = minTime.value
  values.maxDuration = maxTime.value
  minDurationMonth.value = Math.trunc(minTime.value % 12)
  maxDurationMonth.value = Math.trunc(maxTime.value % 12)
  minDurationYear.value = Math.trunc(minTime.value / 12)
  maxDurationYear.value = Math.trunc(maxTime.value / 12)
})

// watch min and max values in form values and get percent
watch(
  [() => values.minDuration, () => values.maxDuration],
  () => {
    minTime.value = values.minDuration
    maxTime.value = values.maxDuration
    minDurationMonth.value = Math.trunc(minTime.value % 12)
    maxDurationMonth.value = Math.trunc(maxTime.value % 12)
    minDurationYear.value = Math.trunc(minTime.value / 12)
    maxDurationYear.value = Math.trunc(maxTime.value / 12)
  },
  {
    immediate: true,
  }
)

// function handleFetchMoreCities(countryId: number | string) {
//   citiesPagination.page += 1
//   store.fetchCities(countryId, citiesPagination)
// }
</script>
