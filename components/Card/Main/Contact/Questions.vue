<template>
  <div
    class="border border-white/[0.10] shadow-lg bg-dark-blue-200 lg:py-14 md:py-8 lg:px-8 md:px-6 rounded-2xl p-6 w-full"
  >
    <div>
      <h2
        class="text-white font-bold leading-120 sm:text-32 text-2xl md:mb-2 mb-1"
      >
        {{ t('have_question') }}
      </h2>
      <p
        class="text-gray-100 sm:text-base text-sm font-normal leading-130 md:mb-5 mb-4"
      >
        {{ t('have_question_subtitle') }}
      </p>
    </div>
    <client-only>
      <div class="flex flex-col gap-7 lg:mb-11 mb-4">
        <FormGroup
          :label="t('full_name')"
          :label-class="'text-base font-medium text-white'"
        >
          <FormInput
            v-model="form.values.name"
            :error="form.$v.value.name.$error"
            :placeholder="t('enter_name')"
            class="bg-white/[0.05] focus-within:bg-white/[0.10] border-white/[0.05]"
            input-class="text-white !font-normal"
            maxlength="50"
            type="text"
          />
        </FormGroup>
        <FormGroup
          :label="t('phone_number')"
          :label-class="'text-base font-medium text-white'"
        >
          <FormInputPhone
            v-model="form.values.phone"
            :autofocus="false"
            :placeholder="t('enter_number')"
            variant="phone-input"
          />
        </FormGroup>
        <FormGroup
          :label="t('email')"
          label-class="text-base font-medium text-white"
        >
          <FormInput
            v-model="form.values.email"
            :error="form.$v.value.email.$error"
            :placeholder="t('enter_email')"
            class="bg-white/[0.05] focus-within:bg-white/[0.10] border-white/[0.05]"
            input-class="text-white !font-normal"
          />
        </FormGroup>
        <FormGroup
          :label="t('message')"
          :label-class="'text-base font-medium text-white'"
        >
          <FormTextarea
            v-model="form.values.message"
            :error="form.$v.value.message.$error"
            :placeholder="t('comment')"
            :rows="4"
            class="bg-white/[0.05] focus-within:bg-white/[0.10] border-white/[0.05]"
            input-class="text-white !font-normal"
            type="text"
          />
        </FormGroup>
      </div>
      <form id="form" @submit.prevent="submit">
        <div
          class="flex max-sm:flex-col items-center sm:gap-20 gap-6 md:mt-8 sm:justify-between"
        >
          <FormCheckbox
            v-model="form.values.termsCheck"
            :checked="form.values.termsCheck"
            :error="form.$v.value.termsCheck.$error"
            :span="t('terms_and_conditions')"
          >
            <template #label>
              <i18n-t
                class="xl:text-base text-sm font-normal text-gray-100 line-clip-2 pl-2"
                keypath="register_terms"
                tag="span"
              >
                <template #link>
                  <span>
                    <NuxtLink :to="'/pages/termsofuse'" class="text-white">
                      {{ t('terms') }}
                    </NuxtLink>
                  </span>
                </template>
              </i18n-t>
            </template>
          </FormCheckbox>
          <UIButton
            :disabled="form.$v.value.$invalid"
            :loading="loading"
            :text="t('send')"
            class="py-3 px-6 max-sm:w-full"
            @click="submit()"
          />
        </div>
      </form>
    </client-only>
  </div>
</template>
<script lang="ts" setup>
import { email, required, sameAs } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useCustomToast } from '~/composables/useCustomToast'

const show = ref(false)
const { showToast } = useCustomToast()
const { t } = useI18n()
const loading = ref(false)
const isDisabled = ref(true)
const form = useForm(
  {
    name: '',
    phone: '',
    email: '',
    termsCheck: false,
    message: '',
  },
  {
    name: { required },
    email: { required, email },
    message: { required },
    termsCheck: { sameAs: sameAs(true) },
  }
)
let phoneNumber = ref('')
const closeModal = () => {
  show.value = false
}

async function submit() {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    loading.value = true
    phoneNumber = form.values.phone.split('-').join('').split(' ').join('')
    const payload = {
      vals: {
        full_name: form.values.name,
        phone_number: phoneNumber,
        message: form.values.message,
        email: form.values.email,
      },
    }

    try {
      await useApi().$post('/development/ask.question/advanced_create', {
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      show.value = true
      form.$v.value.$reset()
      form.values.name = ''
      form.values.phone = ''
      form.values.message = ''
      form.values.termsCheck = false // O'zgartirish: 'question' o'rniga 'message'
      showToast(t('validation.form_success'), 'success')
    } catch (e) {
      showToast(t('validation.form_empty'), 'error')
    } finally {
      loading.value = false
    }
  } else {
    showToast(t('validation.form_empty'), 'error')
  }
}
</script>
