<template>
  <Modal
    :show
    title=""
    body-class="px-5 pb-8 !max-w-[516px]"
    @close="emits('close')"
  >
    <div class="text-center">
      <UIRoundedIcon color="red" icon="icon-trash" />
      <p class="text-base leading-130 font-semibold mt-5 mb-2">
        {{ $t('delete_card') }}
      </p>
      <p class="text-xs leading-normal text-dark">
        {{ $t('delete_card_text') }}?
      </p>
      <div class="flex-y-center gap-4 mt-4">
        <UIButton
          class="w-full"
          variant="outline"
          :text="$t('cancel')"
          @click="$emit('close')"
        />
        <UIButton
          class="w-full"
          variant="danger"
          :text="$t('delete')"
          :loading="loading"
          @click="submit"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const loading = ref(false)

interface Props {
  cardId?: string
  show: boolean
}

const { showToast } = useCustomToast()
const { t } = useI18n()

const props = defineProps<Props>()
const emits = defineEmits(['close', 'fetchCard'])

function submit() {
  loading.value = true
  useApi()
    .$delete(`/card/delete/${props.cardId}`)
    .then(() => {
      emits('fetchCard')
    })
    .catch(() => {
      showToast(t('card_delete_failed'), 'error')
    })
    .finally(() => {
      loading.value = false
      emits('close')
    })
}
</script>
