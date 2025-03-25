<template>
  <div>
    <div class="flex items-center mb-4 justify-between">
      <h1 class="text-2xl font-bold">{{ $t('titleUniversityBlock') }}</h1>
      <svg
        v-if="isHasDeleteBtn"
        class="cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        @click="deleteUniversity"
      >
        <path
          d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
          stroke="#001C3C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <FormGroup
        :label="$t('level_education_available')"
        class="col-span-12 lg:col-span-6"
        for-id="educationDegrees"
        is-required
      >
        <FormSelect
          v-model="form.values.items[index].edu_degree"
          :options="educationDegrees"
          value-key="id"
          label-key="name"
          :placeholder="$t('profile.education.education_degree')"
        >
        </FormSelect>
      </FormGroup>

      <FormGroup
        :label="$t('country_graduated_education')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <SelectCountryEdit
          v-model="form.values.items[index].edu_country"
          :loading="countries.loading"
          :options="countries.list"
          :pagination="countries.pagination"
          :placeholder="$t('profile.education.country')"
          infinite-scroll
          label-key="name"
          selected-option-styles="!p-0.5 !border-none"
          value-key="id"
          @load="store.moreCountries"
          @on-select="onSelectCountry"
        >
          <template #selectedOption="data">
            <FormInput
              v-model="countrySearch"
              :input-class="countrySearch ? 'placeholder:!text-dark' : ''"
              :placeholder="$t('profile.education.country')"
              class="w-full"
              type="text"
              @input="emit('searchUniversity', countrySearch)"
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
        :label="$t('name_education_block')"
        class="col-span-12"
        is-required
      >
        <PopUp
          :idx="props.index"
          :model-value="eduPlace"
          :placeholder="$t('profile.education.university_name')"
          label-key="name"
          :options="options"
          @on-select="onSelectUniversity"
          @update="updateUniversity"
        />
      </FormGroup>

      <FormGroup
        :label="$t('start_of_end')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormDatePicker
          v-model="form.values.items[index].edu_started_year"
          :min-date="new Date('1990-01-01')"
          :max-date="
            form.values.items[index].edu_finished_year
              ? new Date().setFullYear(
                  Number(form.values.items[index].edu_finished_year) - 1
                )
              : new Date()
          "
          is-year
          placeholder="profile.education.graduated_date"
        />
      </FormGroup>
      <FormGroup
        :label="$t('date_of_end')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormDatePicker
          v-model="form.values.items[index].edu_finished_year"
          :min-date="
            new Date().setFullYear(
              Number(form.values.items[index].edu_started_year) + 1
            )
          "
          is-year
          placeholder="profile.education.graduated_date"
        />
      </FormGroup>
      <FormGroup
        :label="$t('mother_language')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormSelect
          v-model="nativeLang"
          :options="languagesAll"
          :placeholder="$t('choose_language')"
          label-key="name"
          value-key="id"
          @load="moreLanguages"
          @on-select="onSelectLanguage"
        >
        </FormSelect>
      </FormGroup>
      <FormGroup
        :label="$t('another_languages')"
        class="col-span-12 lg:col-span-6"
      >
        <FormSelect
          v-model="otherLang"
          :options="languagesAll"
          :placeholder="$t('choose_language')"
          label-key="name"
          value-key="id"
          @load="moreLanguages"
          @on-select="onSelectOtherLanguage"
        >
        </FormSelect>
      </FormGroup>
      <UIButton
        v-if="props.hasAddButton"
        variant="outline"
        class="!px-14 col-span-12 !py-2.5 !w-full"
        :text="$t('addUniver')"
        @click="$emit('addUniverEvent')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { required } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import PopUp from '~/components/Form/Select/PopUp.vue'
import SelectCountryEdit from '~/components/Form/Select/SelectCountryEdit.vue'
import { useCommonStore } from '~/store/common'
import { useProfileStore } from '~/store/profile'

const { profileUpdate, edulevels } = storeToRefs(useProfileStore())

interface Props {
  eduDEGREE: number
  languagesAll: object
  listedu: object
  country: object
  countriesAll: object
  university_country_id: number
  hasAddButton: boolean
  inputValues: any
  index: number
  isHasDeleteBtn: boolean
  NLang: number | string
  ELang: number | string
  form: TForm<any>
}

const props = defineProps<Props>()
const { t } = useI18n()

const { moreLanguages } = useCommonStore()
const store = useCommonStore()
const { countries } = storeToRefs(useCommonStore())
const countrySearch = ref<any>(
  props.form.values.items[props.index].edu_country?.name || ''
)

setTimeout(() => {
  countrySearch.value = props.form.values.items[props.index].edu_country?.name
}, 100)

function checkFinishYear() {
  //   finished year should not be greater than 7 years starting from edu_started_year
  return values.edu_started_year < values.edu_finished_year
}

function checkStartYear() {
  return values.edu_started_year || values.edu_finished_year
    ? values.edu_started_year < values.edu_finished_year
    : false
}

const educationDegrees = computed(() => {
  const translate = ref([])
  for (const i of edulevels.value) {
    translate.value.push({
      id: i.id,
      name: t(`eduLeveL[${i.id - 1}]`),
    })
  }
  return translate.value
})

const options = ref([])

setTimeout(() => {
  for (const i of props.listedu) {
    options.value.push({
      id: i.id,
      name: i.name,
    })
  }
}, 500)

const degrees = ref<any>([])
const degreesLoading = ref<boolean>(true)

function getListLevelOfEducation() {
  degreesLoading.value = true
  useApi()
    .$get('/development/params/education.level/advanced_list/', {
      params: {
        specification: { name: {} },
      },
    })
    .then((res: any) => {
      degrees.value = res?.records
    })
    .finally(() => {
      degreesLoading.value = false
    })
}

onMounted(() => {
  getListLevelOfEducation()
})

const loadMore = () => {
  useCommonStore().moreCountries()
}

const emit = defineEmits<{
  (e: 'delete_university', index: number): void
  (e: 'addUniverEvent'): void
  (e: 'searchUniversity', value: string): void
}>()

const deleteUniversity = () => {
  emit('delete_university', props.index)
}

const trigger = ref(false)

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

function onSelectCountry(option: { name: string; id: number }) {
  countrySearch.value = option.name
}

// new new new
function onSelectUniversity(option: { name: string; id: number }) {
  // countrySearch.value = option.name
  // values.edu_country = option
  props.form.values.items[props.index].edu_place = option.id
  props.form.values.items[props.index].edu_place_display = 'empty'
}
function updateUniversity(value: string) {
  props.form.values.items[props.index].edu_place = null
  props.form.values.items[props.index].edu_place_display = value
}
function onSelectLanguage(option: { name: string; id: number }) {
  props.form.values.items[props.index].native_lang = option.id
}
function onSelectOtherLanguage(option: { name: string; id: number }) {
  props.form.values.items[props.index].english_level = option.id
}

// new new new
const eduPlace = computed(() => {
  if (props.form.values.items[props.index].edu_place) {
    return props.form.values.items[props.index].edu_place
  } else {
    return {
      id: 1,
      name: props.form.values.items[props.index].edu_place_display,
    }
  }
})

const nativeLang = computed(() =>
  props.languagesAll.find(
    (i) => i.id == props.form.values.items[props.index].native_lang
  )
)
const otherLang = computed(() =>
  props.languagesAll.find(
    (i) => i.id == props.form.values.items[props.index].english_level
  )
)
</script>

<style scoped>
.univer__lists {
  border-radius: 6px;
  border: 1px solid #f7f9fa;
  background: white;
  box-shadow: 0 4px 28px 0 rgba(24, 24, 24, 0.03);
}
</style>

<!--commit -->
