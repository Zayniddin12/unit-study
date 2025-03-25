<template>
  <div>
    <p class="text-dark font-medium leading-130 text-sm">
      {{ $t('we_send_code') }}
    </p>
    <div
      class="rounded-md py-[6px] px-2 bg-gray flex gap-2.5 mt-3 w-fit items-center"
    >
      <p>{{ form.values?.email || 'z.mamatqulov@uic.group' }}</p>
      <span class="icon-edit text-gray-100 text-20" @click="emit('edit')" />
    </div>

    <FormInputOtp
      v-model="form.values.code"
      :error="form.$v.value.code.$error || error"
      :title="$t('confirm_code')"
      class="mt-6 mb-8"
    />
    <UIButton
      class="w-full mt-5"
      :text="$t('login')"
      :disabled="isDisabled"
      :loading="loading"
      @click="
        submit({
          email: form.values.email,
          otp_code: form.values.code,
          session: form.values.session,
        })
      "
    />
  </div>
</template>

<script setup lang="ts">
import type { TForm } from '~/composables/useForm'

interface Props {
  form: TForm<{
    code: string
    email?: string
    password?: string
    session?: string
  }>
  loading: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (
    event: 'on-confirm',
    { email: string, otp_code: string, session: string }
  ): void
  (event: 'edit'): void
}>()

const { form } = unref(props)
const { values, $v } = form

const isDisabled = ref(true)

watch(
  () => values,
  () => {
    if (values.code?.length == 6) {
      isDisabled.value = false
    } else {
      isDisabled.value = true
    }
  },
  {
    deep: true,
    immediate: true,
  }
)
function submit(code: { email: string; otp_code: string; session: string }) {
  emit('on-confirm', code)
}
</script>
