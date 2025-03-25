<template>
  <div>
    <div class="grid grid-cols-12 gap-5">
      <FormGroup
        :label="$t('phone')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormInputPhone
          v-model="values.contact_phone"
          placeholder="+998 00 000 00 00"
          :error="$v.value?.contact_phone?.$error"
          variant="phone-white-input"
        />
      </FormGroup>
      <FormGroup
        :label="$t('email')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormInput
          v-model="values.contact_email"
          :placeholder="$t('enter_email')"
          :error="$v.value?.contact_email?.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('telegram')" class="col-span-12 lg:col-span-6">
        <FormInput
          v-model="values.contact_telegram"
          :placeholder="$t('your_telegram')"
          :error="$v.value?.contact_telegram?.$error"
        >
          <template #prefix>
            <i class="icon-telegramm text-blue text-2xl leading-6 mx-2"></i>
            <hr class="h-6 border border-solid" />
          </template>
        </FormInput>
      </FormGroup>
      <FormGroup :label="$t('whatsapp')" class="col-span-12 lg:col-span-6">
        <FormInput
          v-model="values.contact_whatsapp"
          :placeholder="$t('your_whatsapp')"
          :error="$v.value?.contact_whatsapp?.$error"
        >
          <template #prefix>
            <i class="icon-whatsapp text-green text-2xl leading-6 mx-2"></i>
            <hr class="h-6 border border-solid" />
          </template>
        </FormInput>
      </FormGroup>
      <FormGroup :label="$t('Instagram')" class="col-span-12 lg:col-span-6">
        <FormInput
          v-model="values.contact_instagram"
          :placeholder="$t('your_instagram')"
          :error="$v.value?.contact_instagram?.$error"
        >
          <template #prefix>
            <i class="icon-instagramm text-2xl leading-6 text-primary mx-2"></i>
            <hr class="h-6 border border-solid" />
          </template>
        </FormInput>
      </FormGroup>
      <FormGroup :label="$t('Facebook')" class="col-span-12 lg:col-span-6">
        <FormInput
          v-model="values.contact_facebook"
          :placeholder="$t('your_facebook')"
          :error="$v.value?.contact_facebook?.$error"
        >
          <template #prefix>
            <i class="icon-facebook text-blue text-2xl leading-6 mx-2"></i>
            <hr class="h-6 border border-solid" />
          </template>
        </FormInput>
      </FormGroup>
    </div>
    <!--      {{cabinetContactForm.$v.value.$invalid}}-->
  </div>
</template>
<script lang="ts" setup>
import { email, required } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'
import {
  validateEmail,
  validatePhoneNumber,
  validateUrlOrTelegramOrWhatsapp,
} from '~/utils/validations'

const { lastStep } = storeToRefs(useProfileStore())
lastStep.value = true
const cabinetContactForm = useForm(
  {
    contact_email: '',
    contact_phone: '',
    contact_telegram: '',
    contact_whatsapp: '',
    contact_instagram: '',
    contact_facebook: '',
  },
  {
    contact_email: {
      email,
      validateEmail,
    },
    contact_phone: {
      required,
      validatePhoneNumber,
    },
    contact_telegram: {
      validateUrlOrTelegramOrWhatsapp,
    },
    contact_whatsapp: {
      validateUrlOrTelegramOrWhatsapp,
    },
    contact_instagram: {
      validateUrlOrTelegramOrWhatsapp,
    },
    contact_facebook: {
      validateUrlOrTelegramOrWhatsapp,
    },
  },
  {
    $registerAs: 'contact',
    $scope: 2,
  }
)

const { user } = storeToRefs(useAuthStore())
const { values, $v } = cabinetContactForm
const { showToast } = useCustomToast()
const { t } = useI18n()
const router = useRouter()

// get all user's data
const getUserData = () => {
  // values.contact_phone = user.value?.phone
  // values.contact_email = user.value?.user_email
  // values.contact_telegram = user.value?.telegram
  // values.contact_whatsapp = user.value?.whatsapp
  // values.contact_instagram = user.value?.instagram
  // values.contact_facebook = user.value?.facebook
  useApi()
    .$get('auth/profile')
    .then((response) => {
      values.contact_phone = response?.phone
      values.contact_telegram = response?.telegram
      values.contact_whatsapp = response?.whatsapp
      values.contact_instagram = response?.instagram
      values.contact_facebook = response?.facebook
      values.contact_email = response?.email
    })
    .catch((err) => console.log(err))
}

watch(() => user.value?.firstname, getUserData)
onMounted(() => {
  getUserData()
})

const { userFallback } = storeToRefs(useAuthStore())
watch(
  () => {
    if (
      cabinetContactForm.$v.value.contact_phone.$invalid == false &&
      cabinetContactForm.$v.value.contact_email.$invalid == false
    ) {
      lastStep.value = true
    } else {
      lastStep.value = false
    }

    userFallback.value.phone = values.contact_phone
    userFallback.value.email = values.contact_email
    userFallback.value.telegram = values.contact_telegram
      ? values.contact_telegram
      : ''
    userFallback.value.instagram = values.contact_instagram
      ? values.contact_instagram
      : ''
    userFallback.value.whatsapp = values.contact_whatsapp
      ? values.contact_whatsapp
      : ''
    userFallback.value.facebook = values.contact_facebook
      ? values.contact_facebook
      : ''
    console.log(userFallback.value.whatsapp)
  },
  { immediate: true, deep: true }
)
</script>

<style scoped></style>
