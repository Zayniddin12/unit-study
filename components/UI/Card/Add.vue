<template>
  <div class="grid gap-y-8">
    <div class="grid gap-y-4">
      <FormGroup :label="$t('card_number')">
        <FormInput
          v-model="form.values.cardNumber"
          v-maska="'#### #### #### ####'"
          placeholder="0000 0000 0000 0000"
          :error="form.$v.value.cardNumber.$error"
        >
          <template #prefix>
            <UICardPaymentLogo
              :type="cardStore?.cardIdentity?.vendor"
              class="ml-3"
            />
          </template>
        </FormInput>
      </FormGroup>
      <FormGroup :label="$t('card_deadline')">
        <FormInput
          v-model="form.values.cardDeadline"
          v-maska="'##/##'"
          :placeholder="$t('mm/yy')"
          :error="form.$v.value.cardDeadline.$error"
        />
      </FormGroup>
    </div>
    <UIButton
      :text="$t('add')"
      :loading="loading"
      class="w-full"
      :disabled="
        !(form.values.cardNumber.length === 19) ||
        !(form.values.cardDeadline.length === 5)
      "
      @click="addCard"
    />
  </div>
</template>

<script setup lang="ts">
import { minLength, required } from '@vuelidate/validators'

import { useCardStore } from '~/store/cardStore'
import { formatCardDeadline } from '~/utils'

const cardStore = useCardStore()

const { showToast } = useCustomToast()

const dateFormat = (value: string) => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
  return regex.test(value)
}

const futureDate = (value: string) => {
  if (!dateFormat(value)) return false
  const [month, year] = value.split('/').map(Number)
  const expiryDate = new Date(`20${year}`, month - 1)
  const today = new Date()
  return expiryDate > today
}

const form = useForm(
  {
    cardNumber: '',
    cardDeadline: '',
  },
  {
    cardNumber: {
      required,
      minlength: minLength(16),
    },
    cardDeadline: {
      required,
      minlength: minLength(4),
      dateFormat,
      futureDate,
    },
  }
)

const emit = defineEmits(['addCard'])
// const { handleError } = useHandleError();
const loading = ref(false)

const addCard = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    loading.value = true

    useApi()
      .$post('/card/create', {
        body: {
          card_number: form.values.cardNumber.replaceAll(' ', ''),
          expiry_date: formatCardDeadline(form.values.cardDeadline),
        },
      })
      .then((response) => {
        emit('addCard', {
          cid: response.cid,
          otp_code: response.otp_code,
          card_number: form.values.cardNumber,
          card_deadline: form.values.cardDeadline,
        })
        form.values.cardNumber = ''
        form.values.cardDeadline = ''
      })
      .catch((error) => {
        showToast(error?._data?.detail?.detail, 'error')
      })
      .finally(() => {
        loading.value = false
      })
  }
}

watch(
  () => form.values.cardNumber,
  (newValue) => {
    if (newValue.length < 4) {
      cardStore.cardIdentity.vendor = ''
      cardStore.cardIdentity.source = ''
    } else if (newValue.length === 5) {
      cardStore.identifyCard(newValue.replaceAll(' ', ''))
    }
  }
)

onMounted(() => {
  cardStore.cardIdentity.vendor = ''
  cardStore.cardIdentity.source = ''
})
</script>
