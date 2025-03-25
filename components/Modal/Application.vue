<script setup lang="ts">
import type { IApplication } from '~/types/application'

interface Props {
  show: boolean
  item?: IApplication
}
defineProps<Props>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Modal
    v-bind="{ show }"
    :title="$t('rejected_reason')"
    @close="$emit('close')"
  >
    <div class="p-5 pt-4">
      <p class="text-dark text-base">
        {{
          (item?.diploma_rejected_reason === false
            ? ''
            : item?.diploma_rejected_reason) +
          '' +
          (item?.language_certificate_rejected_reason === false
            ? ''
            : item?.language_certificate_rejected_reason) +
          '' +
          (item?.other_certification_rejected_reason === false
            ? ''
            : item?.other_certification_rejected_reason)
        }}
      </p>
      <UIButton
        :text="$t('understandable')"
        class="mt-5 w-full"
        @click="$emit('close')"
      />
    </div>
  </Modal>
</template>
