<template>
  <div>
    <FormGroup
      :label="$t('email')"
      label-class="text-base font-medium leading-120 text-dark"
      for-id="email"
    >
      <FormInput
        v-model="values.email"
        input-id="email"
        :placeholder="$t('enter_email')"
        :error="form.$v.value.email.$error"
        input-class="!text-sm !font-normal placeholder:!text-sm placeholder:!font-normal"
      />
    </FormGroup>

    <UIButton
      class="w-full mt-5"
      :disabled="!values.email"
      v-bind="{ loading }"
      :text="$t('reset')"
      @click="submit"
    />
  </div>
  <div class="flex-center gap-2 mt-4">
    <p class="text-dark-100 opacity-50 leading-20 text-sm font-medium">
      {{ $t('not_have_account_yet') }}
    </p>
    <button
      class="text-sm leading-20 font-medium text-dark-100 hover:text-primary transition-300"
      @click="Register"
    >
      {{ $t('registration') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useCustomToast } from '~/composables/useCustomToast'
import type { TForm } from '~/composables/useForm'
import { useAuthStore } from '~/store/auth'
import type { TCheckEmailData, TRequestOtpData } from '~/types/auth'

interface Props {
  form: TForm<any>
}

const { t } = useI18n()
const { showToast } = useCustomToast()
const props = defineProps<Props>()

const { form } = unref(props)
const { values, $v } = form
const store = useAuthStore()
const emit = defineEmits(['next', 'register'])
const loading = ref(false)
async function submit() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    try {
      loading.value = true
      const data: TCheckEmailData = await store.checkAccount(values.email)
      if (data?.session) {
        // const result: TRequestOtpData = await store.requestOtp(values.email)
        // store.requestOtpData = result
        emit('next', data?.session)
      } else {
        showToast(t('email_not_available_in_system'), 'error')
      }
      loading.value = false
    } catch (e) {
      loading.value = false
      showToast(t('email_not_available_in_system'), 'error')
    }
  }
}
function Register() {
  emit('register')
}
</script>
