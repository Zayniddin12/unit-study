<template>
  <div>
    <UIWrapperPage
      :title="$t('personal_info')"
      has-edit
      custom-edit-route="/cabinet/edit"
    >
      <div class="flex items-center gap-3 mb-6">
        <UIAvatar
          :image="user?.image_1920_url"
          :loading="userLoading"
          class="w-[92px] h-[92px]"
        />

        <div v-if="userLoading" class="flex flex-col gap-2">
          <UIShimmer width="200px" height="24px" loading />
          <UIShimmer width="200px" height="24px" loading />
        </div>
        <div v-else>
          <h3 class="font-semibold text-dark leading-130 text-xl">
            {{ user?.first_name }} <br />
            {{ user?.last_name }}
          </h3>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 gap-5">
        <template v-if="userLoading">
          <div v-for="i in 4" :key="i" class="flex flex-col gap-2">
            <UIShimmer width="33%" height="16px" loading />
            <UIShimmer width="50%" height="18px" loading />
          </div>
        </template>
        <template v-else>
          <UIWrapperInfo
            v-for="(item, index) in personalInfo(user)"
            :key="index"
            v-bind="item"
          />
        </template>
      </div>
    </UIWrapperPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { personalInfo } from '~/data/profile'
import { useAuthStore } from '~/store/auth'
import { cabinetStore } from '~/store/cabinet'

definePageMeta({
  middleware: 'auth',
})

const store = cabinetStore()

const { user, userLoading } = storeToRefs(useAuthStore())

onMounted(() => {
  store.step = 0
})
</script>
