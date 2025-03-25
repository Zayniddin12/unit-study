<template>
  <UIWrapperPage
    :title="$t('edu_skills')"
    has-edit
    custom-edit-route="/cabinet/edit?step=3"
    :custom-class="
      userLoading || cabinetSkillsLoading
        ? ''
        : 'grid gap-5 !p-0 !rounded-0 !bg-transparent'
    "
  >
    <template v-if="userLoading || cabinetSkillsLoading">
      <div v-for="i in 7" :key="i" class="flex flex-col gap-2">
        <UIShimmer width="33%" height="16px" loading />
        <UIShimmer width="50%" height="18px" loading />
      </div>
    </template>
    <template v-else-if="cabinetSkills.length">
      <SectionsEduSkills
        v-for="(item, index) in eduSkills(cabinetSkills)"
        :key="index"
        :data="item"
      />
    </template>
    <template v-else>
      <LazyEmptyProgram
        :subtitle="$t('add_to_see')"
        img="/images/svg/no-data.svg"
        :button-text="$t('add')"
        button-link="/cabinet/edit"
      />
    </template>
  </UIWrapperPage>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { eduSkills } from '~/data/profile'
import { useAuthStore } from '~/store/auth'
import { cabinetStore } from '~/store/cabinet'

const store = cabinetStore()

const { user, userLoading } = storeToRefs(useAuthStore())
const { cabinetSkills, cabinetSkillsLoading } = storeToRefs(cabinetStore())

watch(
  user,
  () => {
    if (user?.value?.id) {
      store.fetchCabinetSkills(user.value?.id)
    }
  },
  { deep: true, immediate: true }
)

definePageMeta({
  middleware: 'auth',
})
</script>
