<template>
  <Modal
    :has-go-back="false"
    :title="titles?.[innerState]"
    body-class="!max-w-[396px]"
    close-button-style="-mt-4 -mr-4 !w-10 !h-10"
    close-icon-class="!text-2xl"
    disable-outer-close
    header-style="!pb-0"
    title-style="!text-2xl"
    v-bind="{ show }"
    @close="goBack"
  >
    <div class="p-8 pt-2">
      <SectionsConsultationRegistration
        v-if="innerState === ESTATE.have_question"
        :items="paymentAplications"
        :loading="loginBtnLoading"
        @submit="innerState = ESTATE.success"
      />
      <SectionsConsultationSuccess
        v-if="innerState === ESTATE.success"
        @go-back="goBack"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { paymentAplications } from '~/data/services'
import type { IService } from '~/types/common'

interface Props {
  show?: boolean
  state: 'have_question' | 'success'
  items?: IService
}

const props = withDefaults(defineProps<Props>(), {
  state: 'have_question',
})
const emit = defineEmits(['close'])
const { t } = useI18n()

const innerState = ref(props?.state)
const titles = {
  have_question: t('have_question'),
  success: '',
}

const loginBtnLoading = ref(false)

enum ESTATE {
  have_question = 'have_question',
  success = 'success',
}

function goBack() {
  emit('close')
  innerState.value = 'have_question'
}
</script>
