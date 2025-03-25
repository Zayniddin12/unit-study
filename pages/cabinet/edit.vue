<template>
  <section class="w-full col-span-3">
    <UIWrapperPage class="relative max-lg:mx-auto wrp max-lg:max-w-[80%]">
      <div class="pl-[10px] py-2">
        <h2 class="text-[32px] text-dark font-[700] leading-[35.84px] h2text">
          {{ $t('personal_info') }}
        </h2>
        <p class="text-sm mt-1 text-gray-100 ptext">
          {{ $t('personal_info_subtitle') }}
        </p>
      </div>
      <UnitStudyLogoSvg class="absolute right-[16px] bottom-[2px] svgitem" />
    </UIWrapperPage>

    <div
      class="flex wrp w-full max-lg:max-w-[100%] max-lg:mx-auto justify-between md:max:gap-[0px] gap-[20px] max-lg:flex-col max-lg:items-center"
    >
      <div
        class="flex-1 wrp max-sm:max-w-[80%] max-lg:w-[80%] max-sm:!w-[100%]"
      >
        <UIWrapperPage v-if="eventStep != 3">
          <SectionsCabinetPersonalInfo
            v-if="eventStep == 1"
            :form="{ values, $v }"
          />
          <edit v-if="eventStep == 2" />
        </UIWrapperPage>
        <eduEdit v-if="eventStep == 3" />

        <UIWrapperEdit class="mt-5 flex gap-[20px] justify-end">
          <UIButton
            v-if="eventStep == 2 || eventStep == 3"
            class="!px-14 !py-2.5 !bg-[#FFFFFF] !text-dark !border-[1px] !border-[#D62F75]"
            :text="$t('previous')"
            @click="previousStep"
          />
          <UIButton
            :loading="loadingProfile"
            class="!px-14 !py-2.5 text-dark"
            :disabled="!stepsBool || !thirdStepBtn || !lastStep"
            :text="$t(eventStep == 3 ? 'save' : 'continue')"
            @click="nextContent"
          />
        </UIWrapperEdit>
      </div>
      <UIWrapperEdit
        class="mt-5 wrp flex max-w-[381px] max-lg:max-w-[80%] max-xl:max-w-[330px] h-[max-content] w-full flex-1 max-lg:order-[-1]"
      >
        <div class="flex flex-col py-2 gap-[4px]">
          <div
            v-for="(item, index) of steps"
            :key="item.id"
            :class="{
              stepsActive: item.id == eventStep,
              stepsComplete: item.id < eventStep,
            }"
            class="flex flex-col gap-[4px]"
          >
            <div class="flex items-center gap-3.5">
              <button
                :class="{ hidden: item.id < eventStep }"
                class="text-base border-[2px] border-[#F2EFF4] text-gray-100 rounded-[10px] z-2 font-semibold h-10 w-10 bg-[transparent] leading-5"
              >
                {{ item.id }}
              </button>
              <button
                :class="{ hidden: item.id >= eventStep }"
                class="text-base flex items-center justify-center text-gray-100 rounded-[10px] z-2 font-semibold h-10 w-10 bg-[#FDEDF4] leading-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12L10 17L20 7"
                    stroke="#D62F75"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <span class="text-base text-font-semibold text-gray-100">
                {{ item.title }}
              </span>
            </div>
            <div v-if="index != 2" class="w-[2px] ml-5 h-[16px] bg-[#F2F3F7]" />
          </div>
        </div>
      </UIWrapperEdit>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { required } from '@vuelidate/validators'
import dayjs from 'dayjs'
import { isInteger } from 'lodash'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n' // Import useI18n

import edit from './contact/edit.vue'
import UnitStudyLogoSvg from '~/components/UI/UnitStudyLogoSvg.vue'
import { useMaritalStatuses } from '~/data'
import { useAuthStore } from '~/store/auth'
import { useCommonStore } from '~/store/common'
import { useProfileStore } from '~/store/profile'

import eduEdit from './edu-skills/edu-edit.vue'

const { t } = useI18n() // Use useI18n to get t function

const {
  loadingProfile,
  profileLoader,
  profileUpdate,
  stepsBool,
  thirdStepBtn,
  lastStep,
} = storeToRefs(useProfileStore())

const { user } = storeToRefs(useAuthStore())

const maritalStatuses = useMaritalStatuses()
const { showToast } = useCustomToast()
const route = useRoute()

const { values, $v } = useForm(
  {
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    country: {
      id: user?.country_id,
      name: user?.country_name,
    },
    address: '',
    passport: '',
    marital_status_id: '',
    image_1920: '',
    facebook: '',
    instagram: '',
    telegram: '',
    whatsapp: '',
  },
  {
    first_name: {
      required,
    },
    last_name: {
      required,
    },
    birth_date: {
      required,
    },
    gender: {},
    country: {
      required,
    },
    photo: {
      required,
    },
  },
  {
    $registerAs: 'profile',
    $scope: 1,
  }
)

interface Steps {
  title: string
  id: number
  isActive: boolean
}

const store = useCommonStore()
const profileStore = useProfileStore()
const eventStep = ref<number>(1)

const steps = ref<Steps[]>([
  {
    id: 1,
    title: t('personal_info'),
    isActive: true,
  },
  {
    id: 2,
    title: t('contact_info'),
    isActive: false,
  },
  {
    id: 3,
    title: t('edu_skills'),
    isActive: false,
  },
])

const countrySearch = ref('')
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

onMounted(() => {
  store.fetchCountries(true, false)
})

function previousStep() {
  eventStep.value--
}

const authStore = useAuthStore()

const { userFallback } = storeToRefs(useAuthStore())
const router = useRouter()
const { newUniversIndex } = storeToRefs(useProfileStore())

const changeData = (resp) => {
  useApi().$post('development/user.education/advanced_update', {
    body: JSON.stringify(resp),
  })
}

const newData = (resp) => {
  fetch(
    'https://admin.unit.study/api/development/user.education/advanced_create',
    {
      method: 'POST',
      body: JSON.stringify(resp),
      // id
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json() // Предполагается, что сервер возвращает JSON
    })
    .then((data) => {
      if (loadingProfile.value)
        showToast(t('edit_data_success_message'), 'success')

      authStore.getProfile()
      // Здесь можно обработать успешный ответ, например, обновить состояние приложения
    })
    .catch((error) => {
      if (loadingProfile.value) showToast(t('edit_data_error_message'), 'error')
      loadingProfile.value = false
      // Здесь можно обработать ошибку, например, показать уведомление пользователю
    })
}

const nextContent = () => {
  if (eventStep.value == 2) {
    profileLoader.value = true
    const infobody = {}
    for (const i in userFallback.value) {
      if (Object.prototype.hasOwnProperty.call(userFallback.value, i)) {
        infobody[i] = userFallback.value[i]
      }
    }
    console.log(userFallback.value)
    useApi().$put('/auth/profile', {
      body: JSON.stringify(infobody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  if (eventStep.value == 1) {
    userFallback.value.first_name = values.first_name
    userFallback.value.country_id = values.country?.id
    userFallback.value.last_name = values.last_name
    userFallback.value.gender = values.gender
    userFallback.value.marital_status_id = isInteger(values.marital_status_id)
      ? values.marital_status_id
      : maritalStatuses.find((item) => item.name === values.marital_status_id)
          ?.id
    userFallback.value.birth_date = dayjs(values.birth_date).format(
      'YYYY-MM-DD'
    )
    const infobody = {
      birth_date: userFallback.value.birth_date,
      country_id: userFallback.value.country_id,
      first_name: userFallback.value.first_name,
      gender: userFallback.value.gender,
      last_name: userFallback.value.last_name,
      marital_status_id: userFallback.value.marital_status_id,
      image_1920: values.image_1920?.split(',')?.[1],
      passport_number: values.passport,
      address: values.address,
    }
    useApi().$put('/auth/profile', {
      body: JSON.stringify(infobody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  if (eventStep.value != 3) {
    eventStep.value++
  } else if (eventStep.value == 3) {
    for (const i of profileUpdate.value) {
      if (!i.id) {
        const resp = {
          vals: {
            user_id: user.value.id,
            education_level_id: i.edu_degree.id,
            end_university_country_id: i.edu_country.id,
            end_university_id: i.edu_place_display === 'empty' ? typeof i.edu_place === 'object' ? i.edu_place?.id : i.edu_place : 0,
            extra_university: i.edu_place_display,
            start_year: i.edu_started_year,
            end_year: i.edu_finished_year,
            native_language_id: i.native_lang,
            other_language_ids: [[6, 0, [i.english_level]]],
          },
        }
        newData(resp)
      } else {
        const resp = {
          object_id: i.id,
          vals: {
            user_id: user.value.id,
            education_level_id: i.edu_degree.id,
            end_university_country_id: i.edu_country.id,
            end_university_id: i.edu_place_display === 'empty' ? typeof i.edu_place === 'object' ? i.edu_place?.id : i.edu_place : 0,
            extra_university: i.edu_place_display,
            start_year: i.edu_started_year,
            end_year: i.edu_finished_year,
            native_language_id: i.native_lang,
            other_language_ids: [[6, 0, [i.english_level]]],
          },
        }
        changeData(resp)
      }
    }
    router.push('/cabinet').then(() => {
      authStore.getProfile()
      eventStep.value = 1 // Reset step after navigation
      loadingProfile.value = false
      newUniversIndex.value = []
      profileUpdate.value = []
      showToast(t('edit_data_success_message'), 'success')
    })
  }
}

const getUserData = () => {
  values.image_1920 = user.value?.image_1920_url
  values.first_name = user.value?.first_name
  values.marital_status_id = user.value?.marital_status_id
  values.last_name = user.value?.last_name
  values.birth_date = user.value?.birth_date
  values.gender = user.value?.gender
  values.passport = user.value?.passport_number
  values.address = user.value?.address
  values.country = {
    id: user.value?.country_id,
    name: user.value?.country_name,
  }
}

watch(() => user.value?.first_name, getUserData)

watch(
  () => route.query.step,
  (newStep) => {
    if (newStep) {
      eventStep.value = parseInt(newStep as string) || 1
    }
  },
  { immediate: true }
)

watch(eventStep, (newStep) => {
  router.replace({ query: { ...route.query, step: newStep.toString() } })
})

definePageMeta({
  middleware: 'auth',
})

onMounted(() => {
  getUserData()
})
</script>

<style scoped>
.svgitem {
  height: 115px;
}

@media screen and (max-width: 816px) {
  .svgitem {
    height: 80px;
  }
}

@media screen and (max-width: 524px) {
  .svgitem {
    display: none;
  }
}

@media screen and (max-width: 699px) {
  .h2text {
    font-size: 26px !important;
  }

  .ptext {
    font-size: 12px !important;
  }

  .wrp {
    min-width: 100% !important;
    max-width: 100% !important;
    width: 100% !important;
  }
}

.stepsActive button {
  color: white;
  background: #d62f75;
  border-color: #d62f75;
  box-shadow: 0px 73px 56px 0px rgba(242, 78, 145, 0.04),
    0px 33.75px 25.89px 0px rgba(242, 78, 145, 0.06),
    0px 19.311px 14.814px 0px rgba(242, 78, 145, 0.07),
    0px 11.722px 8.992px 0px rgba(242, 78, 145, 0.09),
    0px 7.063px 5.418px 0px rgba(242, 78, 145, 0.1),
    0px 3.933px 3.017px 0px rgba(242, 78, 145, 0.12),
    0px 1.692px 1.298px 0px rgba(242, 78, 145, 0.16);
}

.stepsActive span {
  color: #2b2b2b;
}
</style>
