<template>
  <div
    class="border-2 group border-transparent bg-white flex justify-between items-start rounded-xl bg-white-200 p-4 hover:border-primary transition-300 cursor-pointer max-sm:flex-col"
  >
    <div class="flex-y-center gap-3">
      <UIAvatar
        :image="item?.want_university_id?.logo_url"
        default-image="/images/profile/building-default.svg"
        size="md"
        class="border border-gray-200 before:hidden"
        avatar-class="max-sm:!size-12"
      />
      <div class="flex flex-col justify-center gap-1">
        <h3
          class="text-sm md:text-lg font-bold text-dark leading-130% group-hover:text-primary transition-300 line-clamp-2"
        >
          {{ item?.want_university_id?.name }}
        </h3>
        <div class="flex items-center gap-2">
          <UIBadgeStatus :status="item?.stage_id?.name ?? 'Draft'" />
          <p
            class="text-xs md:text-sm text-primary leading-normal font-normal mt-1"
          >
            ID {{ item?.id }}
          </p>
        </div>
        <div class="flex items-center gap-1.5">
          <p class="text-gray-100 text-xs leading-normal">
            {{ $t('sent_date') + dayjs(item?.enrollment_date).format('DD.MM.YYYY') }}
          </p>
          <i
            v-if="item?.stage_id?.name === 'waiting' && item?.updated"
            class="icon-dot text-[4px] text-warning"
          />
          <p
            v-if="item?.stage_id?.name === 'waiting' && item?.updated"
            class="text-xs text-gray-100"
          >
            {{ $t('can_edit_once') }}
          </p>
        </div>
      </div>
    </div>
    <UIButton
      variant="outline"
      :text="itemText"
      class="!px-5 !py-2.5 !mt-auto max-sm:!max-w-full max-sm:!w-full max-sm:!mt-2"
      main-class="!text-sm !font-medium max-sm:!w-full"
      :disabled="buttonDisabled"
      @click="handleEdit"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { IApplication } from '~/types/application'

interface Props {
  item?: IApplication
}
// item?.status === 'rejected' ? $t('rejected_reason') : $t('edit')
const props = defineProps<Props>()

const router = useRouter()

const { t } = useI18n()

const buttonDisabled = computed(() => {
  if (props.item?.stage_id?.name === 'Accepted') {
    return false
  } else if (props?.item?.stage_id?.name === 'Draft') {
    return false
  } else if (
    props?.item?.stage_id?.name === 'Waiting' &&
    props?.item?.updated === false
  ) {
    return false
  } else if (props?.item?.stage_id?.name === 'Rejected') {
    return false
  } else return true
})

const itemText = computed(() => {
  if (props.item?.stage_id?.name === 'Accepted') {
    return t('more')
  } else if (props.item?.stage_id?.name === 'Rejected') {
    return t('rejected_reason')
  } else return t('edit')
})

const emit = defineEmits(['handleEdit', 'handleRejected'])

const handleEdit = () => {
  if (props.item?.stage_id?.name === 'Rejected') {
    emit('handleRejected')
  } else if (props.item?.stage_id?.name === 'Accepted') {
    router.push({
      path: `/cabinet/my-applications/${props.item?.program}`,
      query: {
        applicationId: props.item?.id,
      },
    })
  } else {
    emit('handleEdit')
  }
}
</script>
