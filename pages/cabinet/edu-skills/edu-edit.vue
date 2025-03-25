<template>
  <div>
    <div v-if="profileLoader">
      <UIWrapperPage>
        <div class="min-h-[400px] flex items-center justify-center">
          <UILoader class="!border-primary" />
        </div>
      </UIWrapperPage>
    </div>
    <div v-else>
      <div
        v-for="(item, index) of form.values.items"
        :key="index"
        class="!first:bg-[red]"
      >
        <UIWrapperPage>
          <SectionsCabinetEducation
            :listedu="listEducation"
            :countries-all="countries_new"
            :has-add-button="index + 1 == form.values.items.length"
            :index="index"
            :input-values="useFormCollect[index]"
            :is-has-delete-btn="index >= 1"
            :languages-all="languages_new"
            :form="form"
            @add-univer-event="addUniverfunc"
            @delete_university="() => delete_university(index)"
            @search-university="countrySearch = $event"
          />
        </UIWrapperPage>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useCustomToast } from '~/composables/useCustomToast'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'
import { useUniversityStore } from '~/store/university'
import type { IResponse } from '~/types/common'

defineProps<Props>()

interface Props {
  eventTrigger: boolean
}

const countries_new = ref([])
const languages_new = ref([])
const universityStore = useUniversityStore()
const countrySearch = ref('')
const { showToast } = useCustomToast()
const {
  profileUpdate,
  loadingProfile,
  profileLoader,
  thirdStepBtn,
  edulevels,
  lastStep,
} = storeToRefs(useProfileStore())

const { user } = storeToRefs(useAuthStore())
thirdStepBtn.value = false
const userId = computed(() => user?.value?.id)
const useFormCollect = ref([])
const { newUniversIndex } = storeToRefs(useProfileStore())
const listEducation = ref([])

const form = useForm(
  {
    items: [],
  },
  {
    items: {
      $each: helpers.forEach({
        id: { required },
        edu_degree: { required },
        edu_country: { required },
        edu_place_display: { required },
        edu_finished_year: { required },
        edu_started_year: { required },
        native_lang: { required },
        english_level: { required },
      }),
    },
  }
)

const addUniverfunc = () => {
  newUniversIndex.value.push(form.values.items.length)
  const newQuery = {
    edu_degree: '',
    edu_country: '',
    edu_place: '',
    edu_place_display: '',
    edu_finished_year: '',
    edu_started_year: '',
    native_lang: '',
    english_level: '',
  }

  form.values.items.push(newQuery)

  form.$v.value.items?.$each?.push?.(
    useVuelidate(
      {
        edu_degree: { required },
        edu_country: { required },
        edu_place: { required },
        edu_place_display: { required },
        edu_finished_year: { required },
        edu_started_year: { required },
        native_lang: { required },
        english_level: { required },
      },
      newQuery
    )
  )
}

// Region
function getRegion() {
  return useApi()
    .$get('/development/params/res.country/advanced_list/', {
      params: {
        specification: { name: {} },
      },
    })
    .then((res: IResponse) => {
      countries_new.value = res.records
    })
}

// Language
function getLanguages() {
  return useApi()
    .$get('/development/params/res.lang/advanced_list', {
      params: {
        specification: {
          name: {},
          code: {},
        },
      },
    })
    .then((res: IResponse) => {
      languages_new.value = res.records
    })
}

// University
const getUserUniversities = async (id: number) => {
  try {
    const res = await useApi().$get(
      'development/params/user.education/advanced_list',
      {
        params: {
          specification: JSON.stringify({
            user_id: {},
            education_level_id: { fields: { name: {} } },
            end_university_country_id: { fields: { name: {} } },
            end_university_id: { fields: { name: {} } },
            extra_university: {},
            start_year: {},
            end_year: {},
            native_language_id: { fields: { name: {} } },
            other_language_ids: {
              fields: { name: {} },
            },
          }),
          domain: JSON.stringify([['user_id', '=', id]]),
        },
      }
    )
    if (res.records.length) {
      res.records.forEach((item, index) => {
        const newQuery = {
          id: item.id,
          edu_degree: item.education_level_id,
          edu_country: item.end_university_country_id,
          edu_place: item.end_university_id,
          edu_place_display: item.extra_university,
          edu_finished_year: item.end_year,
          edu_started_year: item.start_year,
          native_lang: item.native_language_id?.id,
          english_level: item?.other_language_ids[0]?.id,
        }

        form.values.items.push(newQuery)

        form.$v.value.items?.$each?.push?.(
          useVuelidate({
            id: { required },
            edu_degree: { required },
            edu_country: { required },
            edu_place: { required },
            edu_place_display: { required },
            edu_finished_year: { required },
            edu_started_year: { required },
            native_lang: { required },
            english_level: { required },
          }),
          newQuery
        )
      })
    } else {
      const defaultEducation = {
        edu_degree: '',
        edu_country: '',
        edu_place: '',
        edu_place_display: '',
        edu_finished_year: '',
        edu_started_year: '',
        native_lang: '',
        english_level: '',
      }

      form.values.items.push(defaultEducation)

      form.$v.value.items?.$each?.push?.(
        useVuelidate(
          {
            edu_degree: { required },
            edu_country: { required },
            edu_place: { required },
            edu_place_display: { required },
            edu_finished_year: { required },
            edu_started_year: { required },
            native_lang: { required },
            english_level: { required },
          },
          defaultEducation
        )
      )
    }

    await getListLevelOfEducation()
    await getRegion()
    await getLanguages()

    loadingProfile.value = false
    profileLoader.value = false
    thirdStepBtn.value = true
  } catch (e) {
    showToast(e, 'error')
  }
}

// Level
function getListLevelOfEducation() {
  useApi()
    .$get('/development/params/education.level/advanced_list/', {
      params: {
        specification: { name: {} },
      },
    })
    .then((res: any) => {
      edulevels.value = res?.records
    })
}

// list education
function getListEducation() {
  useApi()
    .$get('/development/params/university/advanced_list', {
      params: {
        specification: JSON.stringify({
          name: {},
        }),
      },
    })
    .then((res: any) => {
      listEducation.value = res.records
    })
}

getListEducation()

// getUserUniversities(userId)
watch(
  user,
  () => {
    if (user?.value?.id) {
      getUserUniversities(user?.value?.id)
    }
  },
  { immediate: true, deep: true }
)

const delete_university = async (index: number) => {
  if (form.values.items[index].id) {
    const deleteID = {
      object_id: form.values.items[index].id,
    }
    fetch(
      'https://admin.unit.study/api/development/user.education/advanced_delete',
      {
        method: 'POST',
        body: JSON.stringify(deleteID),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then((response) => {
      return response.json() // Предполагается, что сервер возвращает JSON
    })
  }
  newUniversIndex.value.splice(index, 1)
  form.values.items.splice(index, 1)
}

// button activate
watch(
  () => profileUpdate.value,
  (newVal) => {
    const allObjects = ref([])
    allObjects.value = []
    for (const objects of newVal) {
      if (
        objects.edu_country &&
        objects.edu_degree &&
        objects.edu_finished_year &&
        (objects.edu_place || objects.extra_university) &&
        objects.native_lang &&
        objects.english_level
      ) {
        allObjects.value.push(true)
      } else {
        allObjects.value.push(false)
      }
    }

    const isButtonActive = allObjects.value.every((item) => item == true)
  },
  { deep: true, immediate: true }
)

watch(
  () => form.values.items,
  () => {
    lastStep.value = !form.$v.value.$invalid
    profileUpdate.value = form.values.items
  },
  { deep: true, immediate: true }
)
</script>

<style scoped></style>
