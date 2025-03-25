<template>
  <div class="grid grid-cols-12 gap-5">
    <FormGroup :label="t('diplomas')" class="col-span-12" for-id="diplomas">
      <FormFileUploader
        id="diplomas"
        v-model="form.values.diplomas"
        :default-images="form.values.diplomas"
        :is-edit="isEdit"
        url="diploma"
        accept-types=".pdf, .doc, .docx, .png, .jpg, .jpeg"
      />
    </FormGroup>

    <FormGroup
      :label="t('language_certificates')"
      class="col-span-12"
      for-id="language_certificates"
    >
      <FormFileUploader
        id="language_certificates"
        v-model="form.values.language_certificates"
        :default-images="form.values.language_certificates"
        url="language.certificate"
        :is-edit="isEdit"
        accept-types=".pdf, .doc, .docx, .png, .jpg, .jpeg"
      />
    </FormGroup>

    <FormGroup
      :label="t('other_certificates')"
      class="col-span-12"
      for-id="other_certificates"
    >
      <FormFileUploader
        id="other_certificates"
        v-model="form.values.other_certificates"
        :default-images="form.values.other_certificates"
        url="other.certification"
        :is-edit="isEdit"
        accept-types=".pdf, .doc, .docx, .png, .jpg, .jpeg"
      />
    </FormGroup>

    <FormGroup :label="t('links')" class="col-span-12" for-id="links">
      <FormInput v-model="form.values.links" :placeholder="t('links')" />
    </FormGroup>

    <FormGroup
      :label="t('letter_of_intent')"
      class="col-span-12"
      for-id="description"
    >
      <FormFileUploader
        id="letter_of_intent"
        v-model="form.values.letter_of_intent"
        :default-images="form.values.letter_of_intent"
        url="motivation.letter"
        :is-edit="isEdit"
        accept-types=".pdf, .doc, .docx, .png, .jpg, .jpeg"
      />
    </FormGroup>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'

const { t } = useI18n()

interface Props {
  form: TForm<any>
  isEdit: boolean
}

const props = defineProps<Props>()

const { form } = unref(props)
</script>
