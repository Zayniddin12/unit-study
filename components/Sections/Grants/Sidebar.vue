<template>
  <div class="flex flex-col gap-4">
    <div class="rounded-xl border-2 border-white/80 relative bg-white p-6">
      <div :key="trigger">
        <Transition mode="out-in" name="fade">
          <SectionsGrantsFilterBasic
            :form="filter"
            v-bind="{
              degrees,
              languages,
            }"
          />
        </Transition>
      </div>
      <div class="flex gap-4">
        <UIButton
          :disabled="isDisabled"
          :text="$t('clear_filter')"
          class="w-full mt-6 !py-2.5 text-sm !px-6"
          variant="primary-secondary"
          @click="clear"
        />
        <UIButton
          :disabled="isDisabled"
          :text="$t('search_program')"
          class="w-full mt-6 px-6 !py-2.5 text-sm"
          variant="primary"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useCommonStore } from '~/store/common'
import type { SelectOption } from '~/types'
import type { IResponse } from '~/types/common'
import { debounce } from '~/utils'

const emit = defineEmits(['get'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const commonStore = useCommonStore()

const trigger = ref(false)
const degrees = ref<SelectOption[]>([])
const languages = ref<SelectOption[]>([])

// Filter Start
const filter = useForm(
  {
    level: {
      id: '%',
      name: '',
    },
    language: {
      id: '%',
      name: '',
    },
    country: {
      id: '%',
      name: '',
    },
  },
  {}
)

const isDisabled = ref(true)

onMounted(() => {
  commonStore.fetchCountries(true, false)
  updateFilterFromQuery()

  Promise.all([getDegrees(), getLanguages()]).finally(
    () => (trigger.value = !trigger.value)
  )
})

function clear() {
  filter.values.level = { name: t('all_degrees'), id: '%' }
  filter.values.language = { name: t('all_languages'), id: '%' }
  filter.values.country = { id: '%', name: t('all_country') }

  const queries: Record<string, undefined> = {
    degree: undefined,
    degreeName: undefined,
    lang: undefined,
    langName: undefined,
    country: undefined,
    countryName: undefined,
  }

  if (
    Object.values(filter.values).some((v) => Boolean(v?.id) && v?.id !== '%')
  ) {
    router.replace({ query: queries })
    debounce('filterProgram', () => emit('get'), 800)
  }
}

function submit() {
  const queries = {
    lang: getCondition(filter.values.language?.id)
      ? filter.values.language.id
      : undefined,
    langName: getCondition(filter.values.language?.id)
      ? filter.values.language?.name
      : undefined,
    degree: getCondition(filter.values.level?.id)
      ? filter.values.level?.id
      : undefined,
    degreeName: getCondition(filter.values.level?.id)
      ? filter.values.level?.name
      : undefined,
    country: getCondition(filter.values.country?.id)
      ? filter.values.country?.name
      : undefined,
    countryName: getCondition(filter.values.country?.id)
      ? filter.values.country?.name
      : undefined,
  }

  const filteredQueries = Object.fromEntries(
    Object.entries(queries).filter(
      ([_, value]) => value !== undefined && value !== '%'
    )
  )

  router.push({ path: route.path, query: filteredQueries })
  if (
    Object.values(filter.values).every((v) => Boolean(v?.id) && v?.id !== '%')
  ) {
    debounce('filterProgram', () => emit('get'))
  }
  debounce('filterProgram', () => emit('get'))
}

watch(
  filter.values,
  (values) => {
    const filteredValues = Object.entries(values).map(([_, value]) => value.id)
    isDisabled.value = !filteredValues.every(Boolean)
  },
  { deep: true, immediate: true }
)

watch(() => route.query, updateFilterFromQuery, { deep: true, immediate: true })

function getDegrees() {
  return useApi()
    .$get<IResponse<SelectOption>>(
      '/development/params/education.level/advanced_list',
      {
        params: {
          specification: { name: {} },
        },
      }
    )
    .then((res) => {
      degrees.value = [
        {
          name: t('all_degrees'),
          id: '%',
        },
        ...res.records,
      ]
    })
}

function getLanguages() {
  return useApi()
    .$get<IResponse<SelectOption>>(
      '/development/params/res.language/advanced_list',
      {
        params: {
          specification: {
            name: {},
          },
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

function getCondition(value: string) {
  return value !== '%' && Boolean(value)
}

function updateFilterFromQuery() {
  const query = route.query

  if (query?.degree && query?.degreeName) {
    filter.values.level = {
      id: query.degree.toString(),
      name: query.degreeName.toString(),
    }
  }
  if (query?.lang && query?.langName) {
    filter.values.language = {
      id: query.lang.toString(),
      name: query.langName.toString(),
    }
  }
  if (query?.country && query?.countryName) {
    filter.values.country = {
      id: query.country.toString(),
      name: query.countryName.toString(),
    }
  }
}
</script>
