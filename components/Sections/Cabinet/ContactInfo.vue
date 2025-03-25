<template>
  <div class="grid grid-cols-12 gap-5">
    <FormGroup
      :label="$t('phone')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormInputPhone
        v-model="values.contact_phone"
        placeholder="+998 00 000 00 00"
        :error="form.$v.value.contact_phone.$error"
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
        :error="form.$v.value.contact_email.$error"
      />
    </FormGroup>
    <FormGroup :label="$t('telegram')" class="col-span-12 lg:col-span-6">
      <FormInput
        v-model="values.contact_telegram"
        :placeholder="$t('your_telegram')"
        :error="form.$v.value.contact_telegram.$error"
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
        :error="form.$v.value.contact_whatsapp.$error"
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
        :error="form.$v.value.contact_instagram.$error"
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
        :error="form.$v.value.contact_facebook.$error"
      >
        <template #prefix>
          <i class="icon-facebook text-blue text-2xl leading-6 mx-2"></i>
          <hr class="h-6 border border-solid" />
        </template>
      </FormInput>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import type { TForm } from '~/composables/useForm'
import { useAuthStore } from '~/store/auth'

interface Props {
  form: TForm<any>
}

const { user } = storeToRefs(useAuthStore())

const props = defineProps<Props>()

const { form } = unref(props)
const { values, $v } = form
</script>
