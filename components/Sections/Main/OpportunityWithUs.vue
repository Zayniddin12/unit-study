<template>
  <div class="py-[72px] relative">
    <img
      alt="title"
      class="absolute w-full h-full top-0 left-0 object-cover"
      loading="lazy"
      src="/images/bg.webp"
    />
    <div class="flex flex-col justify-center container">
      <div class="text-center">
        <UIButton
          :no-hover="false"
          :text="$t('education_without_border')"
          class="cursor-auto"
          variant="primary"
        />
      </div>
      <div class="sm:max-w-[582px] w-full mx-auto mt-9 text-center z-10">
        <h2
          class="sm:text-[48px] text-3xl font-bold text-white text-center leading-112"
        >
          {{ $t('our_wold') }}
        </h2>
        <p class="mt-5 text-20 text-center text-white leading-116 font-normal">
          {{ $t('opportunity_education') }}
        </p>
        <UIButton
          class="mx-auto mt-[128px]"
          text="leave_request"
          variant="warning-border"
          @click="goLogin"
        />
      </div>
    </div>
    <ModalAuth :key="state" v-bind="{ show, state }" @close="show = false" />
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'
import type { IService } from '~/types/common'

const store = useAuthStore()
const show = ref(false)
const state = ref('login')
const items = ref<IService>()

function goLogin(item: IService) {
  if (Object.keys(store.user).length) {
    navigateTo('/application/create')
  } else {
    state.value = 'login'
    items.value = item
    show.value = true
  }
}
</script>
