<template>
  <Modal
    :show="showSuccess"
    :title="$t('confirmation')"
    body-class="!max-w-[396px]"
    @close="$emit('close')"
  >
    <div class="flex flex-col gap-4 p-8 pt-0">
      <p class="text-sm text-gray-100">
        {{
          $t(
            `application.confirmation_text_${
              status === 'Waiting' ? 'waiting' : 'draft'
            }`
          )
        }}
      </p>
      <div
        class="p-3 bg-gray rounded-full flex items-center gap-2 border-2 border-white shadow-sm"
      >
        <i class="icon-building-scyscraper text-2xl text-black" />
        <p class="text-xs font-bold text-black">
          {{ universityName }}
        </p>
      </div>
      <div class="px-2 py-1.5 bg-gray rounded-lg flex items-center gap-2 mt-4">
        <i class="icon-info-circle text-2xl text-black" />
        <p class="text-xs font-medium text-black">{{ $t('info_text') }}</p>
      </div>
      <UIButton
        :loading="loading"
        :text="$t('send')"
        class="mt-1"
        @click="$emit('submit')"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
type Props = {
  showSuccess: boolean
  universityName: string
  loading: boolean
  status: string
}

type Emits = {
  (e: 'submit'): void
  (e: 'close'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
