<template>
  <div>
    <div class="flex flex-col gap-5 mb-5">
      <FormGroup
        :label="$t('last_name')"
        for-id="last_name"
        label-class="sm:!text-base !font-medium"
      >
        <FormInput
          v-model="form.values.lastname"
          :error="form.$v.value.lastname.$error"
          :placeholder="$t('enter_last_name')"
          input-class="!font-normal"
          input-id="last_name"
        />
      </FormGroup>
      <FormGroup
        :label="$t('name')"
        for-id="name"
        label-class="sm:!text-base !font-medium"
      >
        <FormInput
          v-model="form.values.firstname"
          :error="form.$v.value.firstname.$error"
          :placeholder="$t('enter_name')"
          input-class="!font-normal"
          input-id="name"
        />
      </FormGroup>
      <FormGroup
        :label="$t('email')"
        for-id="email"
        label-class="sm:!text-base !font-medium"
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
        :label="$t('country')"
        for-id="country"
        label-class="sm:!text-base !font-medium"
      >
        <FormSelect
          v-model="form.values.country_id"
          :error="form.$v.value.country_id.$error"
          :loading="countriesLoading"
          :options="countries"
          :placeholder="$t('select_country')"
          infinite-scroll
          input-classes="!font-normal"
          selected-option-styles="!p-0 !border-none"
          value
          @load="store.moreCountries(countrySearch)"
          @on-select="onSelect"
        >
          <template #selectedOption="data">
            <FormInput
              v-model="countrySearch"
              :error="form.$v.value.country_id.$error"
              :input-class="
                countryName
                  ? 'placeholder:!text-dark !font-normal'
                  : '!font-normal'
              "
              :placeholder="countryName ? countryName : $t('select_country')"
              class="w-full"
              input-id="country"
              selected-option-styles="border-gray/40 !p-0 !border-none"
              type="text"
            >
              <template #suffix>
                <div class="px-3 h-full flex-center">
                  <span
                    :class="{ '-rotate-180': data.toggleSelect }"
                    class="icon-chevron transition-all duration-200 inline-block text-warning"
                  ></span>
                </div>
              </template>
            </FormInput>
          </template>
        </FormSelect>
      </FormGroup>
      <FormGroup
        :label="$t('password')"
        for-id="password"
        label-class="sm:!text-base !font-medium"
      >
        <FormInputPassword
          v-model="form.values.password"
          :error="form.$v.value.password.$error"
          :placeholder="$t('enter_password')"
          input-id="password"
          v-bind="{ type }"
          @change="type = $event"
        />
      </FormGroup>
      <FormGroup
        :label="$t('confirm_password')"
        for-id="confirm_password"
        label-class="sm:!text-base !font-medium"
      >
        <FormInputPassword
          v-model="form.values.confirm"
          :error="form.$v.value.confirm.$error"
          :placeholder="$t('enter_confirm_password')"
          input-id="confirm_password"
          v-bind="{ type }"
          @change="type = $event"
        />
      </FormGroup>
    </div>

    <div class="flex-y-center">
      <FormCheckbox
        v-model="form.values.checked"
        :checked="form.values.checked"
        :error="form.$v.value.checked.$error"
      />
      <i18n-t
        class="cursor-pointer text-xs leading-[124%] text-dark font-normal"
        for="terms_of_use"
        keypath="by_pressing_this_you_will_allow_rules"
        tag="p"
        @click="form.values.checked = !form.values.checked"
      >
        <template #rules>
          <NuxtLink
            class="underline hover:text-primary transition-300"
            target="_blank"
            to="/pages/privacy"
            >{{ $t('terms_of_use') }}
          </NuxtLink>
        </template>
      </i18n-t>
    </div>

    <UIButton
      :disabled="isDisabled"
      :text="$t('register')"
      class="w-full mt-5"
      v-bind="{ loading }"
      @click="submit"
    />
    <div class="flex-center gap-2 mt-3">
      <p class="text-dark/50 leading-20 text-sm font-medium">
        {{ $t('already_has_account') }}
      </p>
      <button
        class="text-sm leading-20 font-medium text-dark hover:text-primary transition-300"
        @click="$emit('login')"
      >
        {{ $t('login') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useCommonStore } from '~/store/common'
import { debounce } from '~/utils'

interface Props {
  // form: TForm<any>
  loading?: boolean
}

const props = defineProps<Props>()

const form = defineModel<TForm>()
const emit = defineEmits(['on-register', 'load-more', 'login'])
const { showToast } = useCustomToast()
const store = useCommonStore()
const { t } = useI18n()
const isDisabled = ref(true)
const type = ref('password')

function submit() {
  form.value.$v.value.$touch()
  if (!form.value.$v.value.$invalid) {
    emit('on-register')
  } else {
    if (form.value.$v.value?.password.$invalid) {
      return showToast(t('password_errors.length'), 'error')
    }
    if (form.value.$v.value?.confirm_password.$invalid) {
      return showToast(t('confirm_password_errors.match'), 'error')
    }

    showToast(t('no_validation'), 'error')
  }
}

const countries = computed(() => store.countries.list)
const countriesLoading = computed(() => store.countries.loading)
const pagination = computed(() => store.countries.pagination)

const countryName = computed(() => form.value.countryName)

const countrySearch = ref<string>(form.value.values.country)
const search = computed(() => {
  return {
    name: countryName.value,
    id: form.value?.country_id,
  }
})
watch(
  () => countrySearch.value,
  (newValue) => {
    debounce('searchCountry', () => {
      store.countries.params.page = 1
      store.countries.params.search.name = newValue
      store.countries.params.search.id = form.value?.country_id
      store.fetchCountries(true, false)
    })
  }
)

onMounted(() => {
  if (!countries.value?.length) {
    store.fetchCountries(true, false, search.value)
  }
})

function onSelect(option: any) {
  form.value.values.country = option.name
  countrySearch.value = form.value.values.country
}

watch(
  () => form.value.values,
  () => {
    if (
      form.value.values?.email?.length &&
      form.value.values?.password?.length &&
      form.value.values?.confirm == form.value.values?.password &&
      form.value.values?.lastname?.length &&
      form.value.values?.firstname?.length &&
      form.value.values?.country_id &&
      form.value.values?.checked
    ) {
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
