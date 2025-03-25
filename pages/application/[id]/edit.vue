<template>
  <section>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />

    <section class="max-sm:px-4">
      <UIWrapperTitle
        class="mt-8 mb-5 container"
        subtitle="edit_application.subtitle"
        title="edit_application.title"
      />
    </section>

    <div
      class="container pb-16 sm:grid sm:grid-cols-12 flex-y-center flex-col-reverse gap-5 sm:items-start"
    >
      <UIShimmer
        :loading="applicationSingleLoading"
        border-radius="20px"
        height="450px"
        preloader-class="grid !w-full sm:col-span-8"
        width="100%"
      >
        <UIStepperWrapper
          v-if="!applicationSingleLoading"
          ref="userForm"
          :current-step="store.step"
          :next-button-disabled="disabledButtonForms"
          :save-button-loading="saveButtonLoading"
          :save-button-disabled="stage !== 'Draft'"
          class="sm:col-span-8 w-full"
          :submit-button-disabled="
            !(
              formOfTrainingForm.values.diplomas.length &&
              formOfTrainingForm.values.language_certificates.length &&
              formOfTrainingForm.values?.letter_of_intent.length
            )
          "
          @handle-step="handleFromStep"
          @submit-profile="showSuccess = true"
          @save-profile="handleSendApplication('draft')"
        >
          <SectionsCabinetWhereWantToStudy
            v-if="steps[0]?.check === store.step"
            :form="whereWantToStudyForm"
          />

          <SectionsCabinetAdditionalDocs
            v-if="steps[1]?.check === store.step"
            :form="formOfTrainingForm"
            is-edit
            update-key="id"
          />
        </UIStepperWrapper>
      </UIShimmer>

      <UIStepper
        :current-step="store.step"
        :steps="steps"
        class="pointer-events-none sm:col-span-4"
        @change-step="changeCurrentStep"
      />
    </div>
    <ModalApplicationSendConfirm
      :loading="applicationEditLoading"
      :show-success
      :status="stage"
      :university-name="whereWantToStudyForm.values.university_name?.name"
      @close="showSuccess = false"
      @submit="handleSendApplication('waiting')"
    />
  </section>
</template>

<script lang="ts" setup>
import { maxLength, minLength, required, url } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import useErrorHandle from '~/composables/useErrorHandle'
import { useAuthStore } from '~/store/auth'
import { cabinetStore } from '~/store/cabinet'
import type { TFile } from '~/types/application'
import { richTextPurify } from '~/utils'

definePageMeta({
  layout: 'custom',
})

const { t } = useI18n()
const authStore = useAuthStore()
const store = cabinetStore()
const { showToast } = useCustomToast()
const showError = useErrorHandle()

const route = useRoute()
const router = useRouter()

const breadcrumbRoutes = computed(() => [
  { title: t('edit_application.title'), link: '' },
])

const applicationSingle = computed(() => store.applicationSingle)
const applicationSingleLoading = computed(() => store.applicationSingleLoading)
const applicationEditLoading = computed(() => store.applicationEditLoading)

const currentStep = ref(store.step)
const submitButtonLoading = ref(false)
const showSuccess = ref(false)
const saveButtonLoading = ref(false)
const saveButtonDisabled = ref(false)

const whereWantToStudyForm = useForm(
  {
    degree: {
      id: null,
      name: '',
    },
    country: {
      id: applicationSingle.value.want_university_country_id?.id,
      name: applicationSingle.value.want_university_country_id?.name ?? '',
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
      id: applicationSingle.value.planned_enrollment_year,
      name: applicationSingle.value.planned_enrollment_year,
    },
  },
  {
    degree: { required },
    country: { required },
    university_name: { required },
    study_program: { required },
    study_plan_year: { required },
  }
)

const formOfTrainingForm = useForm(
  {
    links: applicationSingle.value.links || '',
    diplomas: applicationSingle.value.diploma || [],
    language_certificates: applicationSingle.value.language_certificate || [],
    other_certificates: applicationSingle.value.other_certification || [],
    letter_of_intent: applicationSingle.value?.motivation_letter || [],
  },
  {
    links: { required, url },
    diplomas: { required },
    language_certificates: { required },
    letter_of_intent: {
      required,
    },
  }
)

const steps = computed(() => [
  { title: t('where_study'), icon: 'icon-compass', check: 0 },
  { title: t('additional_documents'), icon: 'icon-checklist', check: 1 },
])

watch(
  () => route.params.id,
  (id) => {
    if (id) store.fetchApplicationSingle(Number(id))
  },
  { immediate: true }
)

const stage = computed(() => applicationSingle.value?.stage_id?.name)

watch(
  () => applicationSingle.value,
  (application) => {
    if (application) {
      whereWantToStudyForm.values = reactive({
        degree: application.wanted_level_education,
        country: application.want_university_country_id,
        university_name: application.want_university_id,
        study_program: application.program,
        study_plan_year: {
          id: application.planned_enrollment_year,
          name: application.planned_enrollment_year,
        },
      })

      formOfTrainingForm.values = reactive({
        links: application.links,
        diplomas: application.diploma,
        language_certificates: application.language_certificate,
        other_certificates: application.other_certification,
        letter_of_intent: application.motivation_letter,
      })
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => currentStep.value,
  () => {
    store.step = currentStep.value
  }
)

const changeCurrentStep = (step: number) => {
  currentStep.value = step
}

const handleFromStep = (value: string) => {
  if (value === 'prev') currentStep.value--
  if (value === 'next') validateAllForms()
}

const validateAllForms = () => {
  switch (currentStep.value) {
    case 0:
      whereWantToStudyForm.$v.value.$touch()
      if (!whereWantToStudyForm.$v.value.$invalid) {
        currentStep.value++
      }
      break
    case 1:
      formOfTrainingForm.$v.value.$touch()
      if (!formOfTrainingForm.$v.value.$invalid) {
        submitApplication()
      }
      break
  }
}

const disabledButtonForms = ref(false)

watch(
  [() => whereWantToStudyForm.values, () => formOfTrainingForm.values],
  () => {
    switch (currentStep.value) {
      case 0:
        whereWantToStudyForm.$v.value.$touch()
        saveButtonDisabled.value = !Object.entries(whereWantToStudyForm.values)
          .map(([_, value]) => value?.name)
          .some(Boolean)
        // disabledButtonForms.value = whereWantToStudyForm.$v.value.$invalid
        break
      case 1:
        saveButtonDisabled.value = !Object.values(
          formOfTrainingForm.values
        ).some(Boolean)
        disabledButtonForms.value = whereWantToStudyForm.$v.value.$invalid
        break
      default:
        break
    }
  },
  { deep: true, immediate: true }
)

function handleSendApplication(status: 'draft' | 'waiting') {
  saveButtonLoading.value = true
  const data: Record<string, Record<string, unknown> | string | number> = {
    object_id: Number(route.params.id),
    vals: {
      user_id: authStore.user.id,
      want_university_country_id: whereWantToStudyForm.values.country?.id,
      wanted_level_education:
        whereWantToStudyForm.values.degree.id ||
        whereWantToStudyForm.values.degree,
      program:
        whereWantToStudyForm.values.study_program?.id ||
        whereWantToStudyForm.values.study_program,
      links: formOfTrainingForm.values.links,
      want_university_id: whereWantToStudyForm.values.university_name?.id,
      diploma: getFormatedFileType(
        formOfTrainingForm.values.diplomas,
        Number(route.params.id)
      ),
      language_certificate: getFormatedFileType(
        formOfTrainingForm.values.language_certificates,
        Number(route.params.id)
      ),
      other_certification: getFormatedFileType(
        formOfTrainingForm.values.other_certificates,
        Number(route.params.id)
      ),
      motivation_letter: getFormatedFileType(
        formOfTrainingForm.values.letter_of_intent,
        Number(route.params.id)
      ),
      planned_enrollment_year:
        whereWantToStudyForm.values.study_plan_year.id ||
        whereWantToStudyForm.values.study_plan_year,
      stage_id: status === 'waiting' ? 6 : 5,
      updated: stage.value === 'Waiting',
    },
  }

  cabinetStore()
    .editApplication(data)
    .then(() => {
      showToast(t('edit_application.toast.success'), 'success')
      showSuccess.value = false
      router.push('/cabinet/my-applications')
    })
    .catch(showError)
    .finally(() => (saveButtonLoading.value = false))
}

function submitApplication() {
  submitButtonLoading.value = true
  whereWantToStudyForm.$v.value.$touch()
  formOfTrainingForm.$v.value.$touch()

  if (
    !whereWantToStudyForm.$v.value.$invalid &&
    !formOfTrainingForm.$v.value.$invalid
  ) {
    handleSendApplication('waiting')
    showSuccess.value = false
  } else {
    submitButtonLoading.value = false
  }
}

function getFormatedFileType(files: Partial<TFile>[], applicationId?: number) {
  return files.map((file) => {
    if (file.file_id) {
      return [6, 0, [file?.file_id]]
    } else {
      return [4, file?.file_id, 0]
    }
  })
}

onBeforeMount(() => {
  currentStep.value = 0
  store.step = 0
})

definePageMeta({
  middleware: 'auth',
})
</script>
