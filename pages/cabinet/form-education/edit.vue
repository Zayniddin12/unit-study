<script setup lang="ts">
import { required } from '@vuelidate/validators'

const formOfTrainingForm = useForm(
  {
    study_plan_form: 0,
    study_plan_univer_direction: '',
    study_plan_universities: '',
  },
  {
    study_plan_form: {},
    study_plan_univer_direction: {},
    study_plan_universities: {
      required,
    },
  },
  {
    $registerAs: 'training',
    $scope: 4,
  }
)

const whereWantToStudyForm = useForm(
  {
    study_plan_degree: '',
    study_plan_degree_extra: '',
    study_plan_year: 1,
  },
  {
    study_plan_degree: {
      required,
    },
    study_plan_year: {
      required,
    },
  },
  {
    $registerAs: 'study',
    $scope: 3,
  }
)
</script>

<template>
  <div>
    <UIWrapperPage
      title="additional_documents"
      back-route="/cabinet/form-education"
    >
      <SectionsCabinetAdditionalDocs
        :form="formOfTrainingForm"
        :want-study-form="whereWantToStudyForm.values"
      />
    </UIWrapperPage>
  </div>
</template>

<style scoped></style>
