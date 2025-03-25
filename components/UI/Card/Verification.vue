<template>
  <div class="grid">
    <div class="text-center">
      <p class="text-slate-950 font-semibold">{{ $t('we_sent_code') }}</p>
      <div class="py-1 px-2 mt-2 mb-4 bg-gray w-fit mx-auto rounded-md">
        <p>{{ props.otp_sent_phone }}</p>
      </div>
    </div>
    <FormGroup :label="$t('verification_code')" class="mx-auto">
      <FormOtp
        v-model="form.values.code"
        :error="form.$v.value.code.$error"
        class="max-w-[331px]"
      />
    </FormGroup>
    <!--    <div class="flex-center my-8">-->
    <!--      <CResend v-bind="{ time }" @resend="resendCode" />-->
    <!--    </div>-->
    <UIButton
      :text="$t('confirm')"
      :disabled="form.$v.value.$invalid"
      :loading="loading"
      class="w-full mt-8"
      @click="confirmCard"
    />
  </div>
</template>

<script setup lang="ts">
import { minLength, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

const { showToast } = useCustomToast()
const { t } = useI18n()
const time = ref(90)
const loading = ref(false)

interface Props {
  otp_sent_phone: string
  cardId: string
  cardNumber: string
  cardDeadline: string
}

const props = defineProps<Props>()

const form = useForm(
  {
    code: '',
  },
  {
    code: {
      required,
      minLength: minLength(6),
    },
  }
)

const emits = defineEmits(['close', 'resend', 'fetchCard'])

const confirmCard = () => {
  if (!form.$v.value.$invalid) {
    loading.value = true
    const data = new FormData()
    data.append('card_id', props.cardId)
    data.append('otp', form.values.code)
    useApi()
      .$post('/card/confirm/', {
        body: {
          cid: props.cardId,
          otp_code: form.values.code,
        },
      })
      .then((response) => {
        showToast(t('card_added_successfully'), 'success')
        emits('close')
        emits('fetchCard')
      })
      .catch((err) => {
        showToast(err?._data?.detail?.detail, 'error')
      })
      .finally(() => {
        loading.value = false
      })
  }
}

// const resendCode = () => {
//   const formData = new FormData()
//   formData.append('card_number', props?.cardNumber.replaceAll(' ', ''))
//   formData.append('expire_date', props?.cardDeadline)
//   ApiService.post('/payment/cards/add/', formData)
//     .then(() => {
//       form.values.code = ''
//       form.$v.value.$reset()
//     })
//     .catch((error) => {
//       handleError(error)
//     })
// }
</script>
