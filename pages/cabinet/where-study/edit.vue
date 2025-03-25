<script setup lang="ts">
import { required } from '@vuelidate/validators'

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
    <UIWrapperPage :title="$t('where_study')" back-route="/cabinet/where-study">
      <SectionsCabinetWhereWantToStudy :form="whereWantToStudyForm" />
    </UIWrapperPage>
  </div>
</template>

<style scoped></style>
