<template>
  <UIWrapperPage
    :title="$t('additional_documents')"
    has-edit
    custom-class="grid grid-cols-2 gap-5"
  >
    <template v-if="userLoading">
      <div v-for="i in 6" :key="i" class="flex flex-col gap-2">
        <UIShimmer width="33%" height="16px" loading />
        <UIShimmer width="50%" height="18px" loading />
      </div>
    </template>
    <template v-else>
      <UIWrapperInfo
        v-for="(item, index) in formEducation(user)"
        :key="index"
        v-bind="item"
      />
    </template>
  </UIWrapperPage>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { formEducation } from '~/data/profile'
import { useAuthStore } from '~/store/auth'
import { cabinetStore } from '~/store/cabinet'

const store = cabinetStore()

const { user, userLoading } = storeToRefs(useAuthStore())

definePageMeta({
  middleware: 'auth',
})
</script>
