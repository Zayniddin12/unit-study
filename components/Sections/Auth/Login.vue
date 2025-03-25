<template>
  <div>
    <div class="flex flex-col gap-3">
      <FormGroup
        :label="$t('email')"
        label-class="text-base font-medium leading-120"
        for-id="email"
      >
        <FormInput
          v-model="values.email"
          input-id="email"
          :placeholder="$t('enter_email')"
          :error="form.$v.value.email.$error"
          input-class="font-normal"
        />
      </FormGroup>
      <FormGroup
        :label="$t('password')"
        label-class="text-base font-medium leading-120"
        for-id="password"
      >
        <FormInputPassword
          v-model="values.password"
          input-id="password"
          :placeholder="$t('enter_password')"
          :error="form.$v.value.password.$error"
        />
      </FormGroup>
      <div>
        <button
          class="text-sm leading-20 font-medium underline text-blue text-left w-auto inline-block transition-300 hover:text-dark"
          @click="$emit('password')"
        >
          {{ $t('did_you_forgot_password') }}
        </button>
      </div>
    </div>

    <UIButton
      class="w-full mt-5"
      :text="$t('login')"
      :disabled="isDisabled"
      :loading="loading"
      @click="submit"
    />
    <div class="flex-center gap-2 mt-3">
      <p class="text-dark-100 opacity-50 leading-20 text-sm font-medium">
        {{ $t('not_have_account_yet') }}
      </p>
      <button
        class="text-sm leading-20 font-medium text-dark-100 hover:text-primary transition-300"
        @click="$emit('register')"
      >
        {{ $t('registration') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TForm } from '~/composables/useForm'

interface Props {
  form: TForm<any>
  loading: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['on-submit'])

const { form } = unref(props)
const { values, $v } = form

const isDisabled = ref(true)

function submit() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    emit('on-submit')
  }
}

watch(
  () => values,
  () => {
    if (values?.email?.length && values?.password?.length) {
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
</script>
