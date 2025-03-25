<template>
  <div
    class="flex-y-center gap-1 text-xs font-normal leading-normal px-1.5 py-1 rounded-lg"
    :class="detectColor"
  >
    <i class="text-base leading-4" :class="detectIcon" />
    {{ detectText }}
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { TStatus } from '~/types/components/status'

interface Props {
  status: TStatus
}
const props = defineProps<Props>()

const { t } = useI18n()

const detectColor = computed(() => {
  switch (props.status) {
    case 'Accepted':
      return 'text-green bg-green/10'
    case 'Rejected':
      return 'text-red bg-red/10'
    case 'Draft':
      return 'text-gray-100 bg-gray-100/10'
    case 'Waiting':
      return 'text-warning bg-warning/10'
  }
})

const detectIcon = computed(() => {
  switch (props.status) {
    case 'Accepted':
      return 'icon-clock-check'
    case 'Rejected':
      return 'icon-circle-x'
    case 'Draft':
      return 'icon-edit1'
    case 'Waiting':
      return 'icon-clock-hour'
  }
})

const detectText = computed(() => {
  switch (props.status) {
    case 'Accepted':
      return t('accepted')
    case 'Rejected':
      return t('rejected')
    case 'Draft':
      return t('draft')
    case 'Waiting':
      return t('waiting')
  }
})
</script>
