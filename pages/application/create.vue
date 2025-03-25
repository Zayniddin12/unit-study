<template>
  <section>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />

    <UIWrapperTitle
      :subtitle="$t('form_application_subtitle')"
      :title="$t('form_application')"
      class="mt-8 mb-5 container"
    />

    <div class="container pb-16 grid grid-cols-12 gap-5 items-start">
      <UIStepper
        :current-step="storeCabinet.step"
        :steps="steps"
        class="pointer-events-none col-span-12 md:hidden"
        @change-step="changeCurrentStep"
      />
      <UIStepperWrapper
        ref="userForm"
        :current-step="storeCabinet.step"
        :next-button-disabled="disabledButtonForms"
        :save-button-disabled="saveButtonDisabled"
        :save-button-loading="saveButtonLoading"
        :submit-button-disabled="
          whereWantToStudyForm.$v.value.$invalid ||
          formOfTrainingForm.$v.value.$invalid
        "
        :submit-button-loading="submitButtonLoading"
        class="col-span-12 md:col-span-8"
        @handle-step="handleFromStep"
        @submit-profile="showSuccess = true"
        @save-profile="saveApplication('draft')"
      >
        <SectionsCabinetWhereWantToStudy
          v-if="steps[0]?.check === storeCabinet.step"
          :form="whereWantToStudyForm"
        />
        <SectionsCabinetAdditionalDocs
          v-if="steps[1]?.check === storeCabinet.step"
          :form="formOfTrainingForm"
          :is-edit="false"
          :want-study-form="whereWantToStudyForm.values"
        />
      </UIStepperWrapper>
      <UIStepper
        :current-step="storeCabinet.step"
        :steps="steps"
        class="pointer-events-none col-span-4 max-md:hidden"
        @change-step="changeCurrentStep"
      />
    </div>

    <ModalApplicationSendConfirm
      :loading="submitButtonLoading"
      :show-success
      :university-name="whereWantToStudyForm.values.university_name?.name"
      status="draft"
      @close="showSuccess = false"
      @submit="submitApplication('waiting')"
    />
  </section>
</template>

<script lang="ts" setup>
import { maxLength, minLength, required, url } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'
import { cabinetStore } from '~/store/cabinet'
import type { IUser } from '~/types/profile'
import { getTodayDate } from '~/utils/formatDate'

definePageMeta({
  layout: 'custom',
})

const { t } = useI18n()
const { showToast } = useCustomToast()
const authStore = useAuthStore()
const storeCabinet = cabinetStore()
const route = useRoute()
const router = useRouter()

const breadcrumbRoutes = computed(() => [
  {
    title: t('personal_account'),
    link: '/cabinet',
  },
  {
    title: t('form_application'),
    link: '',
  },
])

const currentStep = ref(storeCabinet.step)

const userForm = ref()
const submitUserData = ref<Partial<IUser>>()
const submitButtonLoading = ref(false)
const showSuccess = ref(false)
const saveButtonDisabled = ref(true)
const saveButtonLoading = ref(false)
const disabledButtonForms = ref(true) /////

function changeCurrentStep(step: number) {
  currentStep.value = step
}

const steps = computed(() => [
  {
    title: t('where_study'),
    icon: 'icon-compass',
    check: 0,
  },
  {
    title: t('additional_documents'),
    icon: 'icon-checklist',
    check: 1,
  },
])

const whereWantToStudyForm = useForm(
  {
    degree: {
      id: null,
      name: '',
    },
    country: {
      id: null,
      name: '',
    },
    university_name: {
      id: null,
      name: '',
    },
    study_program: {
      id: null,
      name: '',
    },
    study_plan_year: {
      id: '',
      name: '',
    },
  },
  {
    degree: {
      id: { required },
    },
    country: {
      id: { required },
    },
    university_name: {
      id: { required },
    },
    study_plan_year: {
      id: { required },
    },
  }
)



const formOfTrainingForm = useForm(
  {
    links: '',
    diplomas: [] as File[],
    language_certificates: [] as File[],
    other_certificates: [] as File[],
    letter_of_intent: [] as File[],
  },
  {
    diplomas: {
      required,
    },
    language_certificates: {
      required,
    },
    letter_of_intent: {
      required,
    },
  },
  {
    $registerAs: 'training',
    $scope: 4,
  }
)

const validateAllForms = () => {
  switch (currentStep.value) {
    case 0:
      whereWantToStudyForm.$v.value.$touch()
      if (!whereWantToStudyForm.$v.value.$invalid) {
        const differWhereWantToStudyForm = whereWantToStudyForm.values

        submitUserData.value = {
          ...submitUserData.value,
          ...differWhereWantToStudyForm,
        }
        currentStep.value++
      }

      break
    case 1:
      formOfTrainingForm.$v.value.$touch()
      break
  }
}

watch(
  [() => whereWantToStudyForm.values, () => formOfTrainingForm.values],
  () => {
    switch (currentStep.value) {
      case 0:
        saveButtonDisabled.value = !Object.entries(whereWantToStudyForm.values)
          .map(([_, value]) => value?.name)
          .some(Boolean)
        disabledButtonForms.value = whereWantToStudyForm.$v.value.$invalid
        break
      case 1:
        saveButtonDisabled.value = !Object.values(
          formOfTrainingForm.values
        ).some(Boolean)
        disabledButtonForms.value = whereWantToStudyForm.$v.value.$invalid
        break
      default:
        return true
    }
  },
  { deep: true }
)

function submitApplication(status: 'draft' | 'waiting') {
  if (status === 'waiting') {
    submitButtonLoading.value = true
    whereWantToStudyForm.$v.value.$touch()
    formOfTrainingForm.$v.value.$touch()
    if (
      !whereWantToStudyForm.$v.value.$invalid &&
      !formOfTrainingForm.$v.value.$invalid
    ) {
      saveApplication(status)
    }
  }
}

function saveApplication(status: 'draft' | 'waiting') {
  saveButtonLoading.value = true
  const data = {
    vals: {
      user_id: authStore.user.id,
      application_type: 'program',
      want_university_country_id: whereWantToStudyForm.values.country?.id,
      wanted_level_education: whereWantToStudyForm.values.degree?.id,
      program: whereWantToStudyForm.values.study_program?.id,
      links: formOfTrainingForm.values.links,
      want_university_id: whereWantToStudyForm.values.university_name?.id,
      diploma: formOfTrainingForm.values.diplomas.map((diploma) => [
        6,
        0,
        diploma?.file_id,
      ]),
      language_certificate: formOfTrainingForm.values.language_certificates.map(
        (langcertificate) => [6, 0, langcertificate?.file_id]
      ),
      other_certification: formOfTrainingForm.values.other_certificates.map(
        (othcertificate) => [6, 0, othcertificate?.file_id]
      ),
      motivation_letter: formOfTrainingForm.values.letter_of_intent.map(
        (letterofintent) => [6, 0, letterofintent?.file_id]
      ),
      planned_enrollment_year: whereWantToStudyForm.values.study_plan_year?.id,
      stage_id: status === 'waiting' ? 6 : 5,
      updated: false,
    },
  }

  useApi()
    .$post('development/application/advanced_create', {
      body: JSON.stringify(data),
    })
    .then(() => {
      showToast(
        t(
          `success_messages.application_${
            status === 'waiting' ? 'sent' : 'save'
          }`
        ),
        'success'
      )
      showSuccess.value = false
      storeCabinet.step = 1
      router.push('/cabinet/my-applications')
    })
    .catch((error) => {
      showToast(errorHandler(error.response) as string, 'error')
      showSuccess.value = false
    })
    .finally(() => {
      submitButtonLoading.value = false
      saveButtonLoading.value = false
    })
}

const handleFromStep = (value: string) => {
  if (value === 'prev') {
    currentStep.value--
  }
  if (value === 'next') {
    validateAllForms()
  }
}

watch(
  () => currentStep.value,
  () => (storeCabinet.step = currentStep.value)
)

watch(() => route.query, updateFormFromQuery, { deep: true, immediate: true })

function updateFormFromQuery() {
  const query = route.query
  if (query?.countryId && query?.countryName) {
    whereWantToStudyForm.values.country = {
      id: query.countryId.toString(),
      name: query.countryName.toString(),
    }
  }

  if (query?.universityId && query?.universityName) {
    console.log(query?.universityId)
    console.log(query?.universityName)
    whereWantToStudyForm.values.university_name = {
      id: query.universityId.toString(),
      name: query.universityName.toString(),
    }
  }

  if (query?.levelId && query?.levelName) {
    whereWantToStudyForm.values.degree = {
      id: query.levelId.toString(),
      name: query.levelName.toString(),
    }
  }

  if (query?.programId && query?.programName) {
    whereWantToStudyForm.values.study_program = {
      id: query.programId.toString(),
      name: query.programName.toString(),
    }
  }
  if(query?.countryId && query?.countryName){
    whereWantToStudyForm.values.study_plan_year = {id: new Date().getFullYear(), name: new Date().getFullYear()}
  }
}

onBeforeMount(() => {
  currentStep.value = 0
  storeCabinet.step = 0
})

definePageMeta({
  middleware: 'auth',
})
</script>
