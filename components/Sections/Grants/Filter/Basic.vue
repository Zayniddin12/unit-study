<template>
  <div class="flex flex-col gap-4">
    <FormGroup
      :label="t('type_of_grant')"
      label-class="text-xs !font-bold text-base leading-5"
    >
      <FormSelect
        v-model="values.level"
        :options="degrees"
        :placeholder="t('all_type_of_study')"
        is-main
        label-key="name"
        selected-option-styles="rounded-xl !bg-gray"
        value-key="id"
      />
    </FormGroup>

    <FormGroup
      :label="t('language_instruction')"
      label-class="text-xs !font-bold"
    >
      <FormSelect
        v-model="values.language"
        :options="languages"
        :placeholder="t('choose_language_instruction')"
        is-main
        label-key="name"
        selected-option-styles="rounded-xl !bg-gray"
        value-key="id"
      />
    </FormGroup>

    <FormGroup :label="t('country')" label-class="text-xs !font-bold">
      <FormSelect
        v-model="values.country"
        :loading="countriesLoading"
        :options="countries"
        :placeholder="t('all_country')"
        infinite-scroll
        label-key="name"
        selected-option-styles="rounded-xl !bg-gray !p-0 !border-none"
        value-key="id"
        @load="commonStore.moreCountries(countrySearch)"
        @on-select="onSelect"
      >
        <template #selectedOption="data">
          <FormInput
            v-model="values.country.name"
            :input-class="'placeholder:!text-dark  !font-medium'"
            :placeholder="countryName ? countryName : t('all_country')"
            class="w-full"
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
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useCommonStore } from '~/store/common'
import type { SelectOption } from '~/types'
import { debounce } from '~/utils'

interface Props {
  degrees: SelectOption[]
  languages: SelectOption[]
  form: TForm<any>
}

interface Emits {
  (event: 'loadMore'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const commonStore = useCommonStore()
const { t } = useI18n()

const { form } = unref(props)
const { values } = form

const countriesLoading = computed(() => commonStore.countries.loading)

const countrySearch = ref<string>('')
const countries = computed(() => [
  { id: '%', name: t('all_country') },
  ...commonStore.countries.list,
])
const countryName = computed(() => form.values.countryName)

watch(
  () => values.country?.name,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      debounce('searchCountry', () => {
        commonStore.countries.params.page = 0
        commonStore.countries.params.search.name = newValue
        commonStore.fetchCountries(true, false)
      })
    }
  }
)

function onSelect(option: SelectOption) {
  countrySearch.value = option.name
}
</script>
