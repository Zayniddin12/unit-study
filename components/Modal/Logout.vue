<template>
  <Modal
    :show="isOpen"
    :title-style="'logout_title !text-2xl !font-bold !leading-120'"
    body-class="!max-w-[516px] !overflow-visible"
    class="logOut !w-[378px]"
    title=""
    @close="$emit('close')"
  >
    <div class="px-5 pb-5">
      <div class="gap-3">
        <div class="flex items-center justify-center pb-5">
          <span
            class="text-center !bg-[#E94720] icon-logout text-6xl text-white rounded-full p-6"
          ></span>
        </div>
        <h3
          class="text-center text-dark font-semibold leading-130 text-xl mb-1"
        >
          {{ $t('log_out') }}
        </h3>
        <p
          class="logout_subtitle text-center text-gray-100 text-sm leading-130 mb-8"
        >
          {{ $t('confirm_log_out') }}
        </p>
        <div class="flex gap-4">
          <UIButton
            :text="$t('cancel')"
            class="w-full cursor-pointer !px-12"
            main-class="whitespace-nowrap"
            variant="outline"
            @click="$emit('close')"
          />
          <UIButton
            :text="$t('log_out')"
            class="w-full cursor-pointer !bg-orange !px-12"
            main-class="whitespace-nowrap"
            variant="primary"
            @click="handleLogout"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'

type Emits = {
  (e: 'close'): void
}

const isOpen = defineModel<boolean>()
const emits = defineEmits<Emits>()

const store = useAuthStore()

const handleLogout = () => {
  store.logOut()
  emits('close')
}
</script>
