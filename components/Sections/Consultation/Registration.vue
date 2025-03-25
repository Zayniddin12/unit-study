<template>
  <div>
    <p class="text-sm text-gray-100 font-normal leading-130">
      {{ $t('enter_your_contact') }}
    </p>
    <FormGroup
      :label="$t('name')"
      class="my-5"
      for-id="name"
      label-class="sm:!text-base !font-medium"
    >
      <FormInput
        v-model="form.values.name"
        :error="form.$v.value.name.$error"
        :placeholder="$t('enter_name')"
        input-class="!font-normal"
        input-id="name"
      />
    </FormGroup>
    <FormGroup
      :label="$t('phone_number')"
      :label-class="'text-base font-medium'"
      class="my-5"
    >
      <FormInputPhone
        v-model="form.values.phone"
        :placeholder="t('enter_number')"
        variant="phone-white-input"
      />
    </FormGroup>
    <FormGroup
      :label="$t('email')"
      class="my-5"
      label-class="text-base font-medium"
    >
      <FormInput
        v-model="form.values.email"
        :error="form.$v.value.email.$error"
        :placeholder="$t('enter_email')"
        input-class="!font-normal"
        input-id="email"
      />
    </FormGroup>
    <FormGroup
      :label="$t('question')"
      class="mt-5 mb-8"
      label-class="text-base font-medium"
    >
      <FormTextarea
        v-model="form.values.message"
        :error="form.$v.value.message.$error"
        :placeholder="$t('question_subtitle')"
        :min="100"
        :max="500"
        input-class="!font-normal min-h-[120px] !bg-gray"
        input-id="message"
      />
    </FormGroup>
    <UIButton
      :disabled="form.$v.value.$invalid"
      :text="$t('send')"
      class="w-full"
      v-bind="{ loading }"
      variant="primary"
      @click="onSubmit"
    />
  </div>
</template>
<script lang="ts" setup>
import { email, maxLength, minLength, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { validatePhoneNumber } from '~/utils/validations'

const { t } = useI18n()
const emit = defineEmits(['submit', 'error'])
const loading = ref(false)
const form = useForm(
  {
    phone: '',
    name: null,
    email: '',
    message: '',
  },
  {
    name: { required },
    email: { required, email },
    message: { required, maxLength: maxLength(650), minLength: minLength(10) },
  }
)
const isDisabled = ref(true)

async function onSubmit() {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    loading.value = true
    await useApi()
      .$post(`/development/ask.question/advanced_create`, {
        body: {
          vals: {
            full_name: form.values.name,
            phone_number: form.values.phone,
            email: form.values.email,
            message: form.values.message,
          },
        },
      })
      .then(() => {
        emit('submit')
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    emit('error')
  }
}
</script>
