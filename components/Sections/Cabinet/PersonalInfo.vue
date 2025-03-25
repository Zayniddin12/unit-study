<template>
  <div class="relative">
    <div
      v-if="loadingData || authStore.userLoading"
      class="absolute flex items-center justify-center w-full h-[100%] bg-white z-[20]"
    >
      <UILoader class="!border-primary" />
    </div>

    <FormGroup :label="$t('photo')" class="mb-5" is-required>
      <UIAvatarUploader
        hidden
        :default-image="values.image_1920"
        @update:image="handleAvatarUpload"
        @remove-image="values.image_1920 = $event"
      />
    </FormGroup>

    <div class="grid grid-cols-12 gap-5">
      <FormGroup
        :label="$t('last_name')"
        class="col-span-12 lg:col-span-6"
        for-id="last_name"
        is-required
      >
        <client-only>
          <FormInput
            v-model="values.last_name"
            :error="$v.last_name.$error"
            :placeholder="$t('enter_last_name')"
            input-id="last_name"
          />
        </client-only>
      </FormGroup>
      <FormGroup
        :label="$t('name')"
        class="col-span-12 lg:col-span-6"
        for-id="name"
        is-required
      >
        <client-only>
          <FormInput
            v-model="values.first_name"
            :error="$v.first_name.$error"
            :placeholder="$t('enter_name')"
            input-id="name"
          />
        </client-only>
      </FormGroup>
      <FormGroup
        :label="$t('birth_date')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <client-only>
          <FormDatePicker
            v-model="values.birth_date"
            :error="$v.birth_date.$error"
            :max-date="new Date()"
            :min-date="new Date(1985, 0, 1)"
            :placeholder="$t('enter_birth_date')"
          />
        </client-only>
      </FormGroup>
      <FormGroup
        :label="$t('gender')"
        class="col-span-12 lg:col-span-6 flex"
        is-required
      >
        <div class="flex gap-4">
          <client-only>
            <FormRadio
              v-model="values.gender"
              :class="{ '!border-red': $v.gender.$error }"
              btn-styles="!mr-0"
              class="h-10 bg-gray rounded-lg flex flex-row-reverse px-3 py-2.5 w-full justify-between"
              name="male"
              value="male"
            >
              <template #label>
                <label class="flex items-center gap-2.5 pointer-events-none">
                  <i
                    :class="{ '!text-dark-blue': values.gender === 'male' }"
                    class="icon-user-male text-xl text-gray-100 transition-300"
                  />
                  <span class="text-sm text-gray-100 leading-130">
                    {{ $t('male') }}</span
                  >
                </label>
              </template>
            </FormRadio>
          </client-only>
          <client-only>
            <FormRadio
              v-model="values.gender"
              :class="{ '!border-red': $v.gender.$error }"
              btn-styles="!mr-0"
              class="h-10 bg-gray rounded-lg flex flex-row-reverse px-3 py-2.5 w-full justify-between"
              name="female"
              value="female"
            >
              <template #label>
                <label class="flex items-center gap-2.5 pointer-events-none">
                  <i
                    :class="{ '!text-dark-blue': values.gender === 'female' }"
                    class="icon-user-female text-xl text-gray-100 transition-300"
                  />
                  <span class="text-sm text-gray-100 leading-130">
                    {{ $t('female') }}</span
                  >
                </label>
              </template>
            </FormRadio>
          </client-only>
        </div>
      </FormGroup>
    </div>

    <div class="grid grid-cols-12 gap-5 mt-5">
      <FormGroup
        :label="$t('citizenship')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormSelect
          v-model="form.values.country"
          :error="$v.country.$error"
          :loading="loading"
          :options="countries"
          :pagination="pagination"
          :placeholder="$t('select_country')"
          infinite-scroll
          label-key="name"
          selected-option-styles="!p-0 !border-none"
          value-key="id"
          @load="store.moreCountries"
          @on-select="onSelect"
        >
          <template #selectedOption="data">
            <FormInput
              v-model="countrySearch"
              :error="$v.country.$error"
              :input-class="
                form.values.country?.name ? 'placeholder:!text-dark' : ''
              "
              :placeholder="$t('select_country')"
              class="w-full"
              type="text"
            >
              <template #suffix>
                <div class="px-3 h-full flex-center">
                  <span
                    :class="{ '-rotate-180': data.toggleSelect }"
                    class="icon-chevron transition-all duration-200 inline-block text-blue"
                  ></span>
                </div>
              </template>
            </FormInput>
          </template>
        </FormSelect>
      </FormGroup>

      <FormGroup
        :label="$t('family_status')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <Select
          v-model="statusM"
          class="additionalClass"
          :options="maritalStatuses"
          :placeholder="$t('family_status')"
          label-key="name"
          value-key="id"
          @on-select="onSelectMaritalStatus"
        />
      </FormGroup>
    </div>

    <div class="grid grid-cols-12 gap-5 mt-5">
      <FormGroup
        :label="$t('passport')"
        class="col-span-12 lg:col-span-6"
        for-id="passport"
      >
        <client-only>
          <FormInput
            v-model="values.passport"
            v-maska="'AA #######'"
            :error="$v.passport?.$error"
            placeholder="AC 1234567"
            input-id="passport"
          />
        </client-only>
      </FormGroup>

      <FormGroup
        :label="$t('address')"
        class="col-span-12 lg:col-span-6"
        for-id="address"
      >
        <client-only>
          <FormInput
            v-model="values.address"
            :error="$v.address?.$error"
            :placeholder="$t('enter_address')"
            input-id="address"
          />
        </client-only>
      </FormGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import Select from '~/components/Form/Select/Select.vue'
import type { TForm } from '~/composables/useForm'
import { useMaritalStatuses } from '~/data'
import { useAuthStore } from '~/store/auth'
import { useCommonStore } from '~/store/common'
import { useProfileStore } from '~/store/profile'
import type { SelectOption } from '~/types'

const authStore = useAuthStore()
const { user } = storeToRefs(useAuthStore())
const loadingData = ref(true)

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()

const { form } = unref(props)
const { values, $v } = form
const maritalStatuses = useMaritalStatuses()
const { userFallback } = storeToRefs(useAuthStore())
const store = useCommonStore()
const profileStore = useProfileStore()
const { stepsBool, lastStep } = storeToRefs(useProfileStore())
lastStep.value = true

const statusM = ref()

watch(
  () => values.marital_status_id,
  () => {
    console.log(values.marital_status_id)
    for (const i of maritalStatuses) {
      if (values.marital_status_id == i.name) {
        statusM.value = i
      }
    }
  },
  { deep: true, immediate: true }
)

const countries = computed(() => store?.countries?.list)
const loading = computed(() => store?.countries?.loading)
const pagination = computed(() => store?.countries?.pagination)

const trigger = ref(false)

const countrySearch = ref(form.values.country.name)

watch(
  () => countrySearch.value,
  (newValue) => {
    if (newValue) {
      debounce('searchCountry', () => {
        store.countries.params.offset = 0
        store.countries.params.search.name = newValue
        store
          .fetchCountries(true, false)
          .finally(() => (trigger.value = !trigger.value))
      })
    } else {
      // Если значение пустое, сбрасываем поиск
      store.countries.params.search.name = ''
      store.fetchCountries(true, false)
    }
  }
)

store.fetchCountries(true)

// photo Watch
watch(
  () => values.photo,
  (newValue) => {
    if (typeof newValue === 'string' || !newValue) return

    profileStore.uploadProfileImage(newValue).then((imageObject) => {
      profileStore.imageId = imageObject.id
      values.photo = imageObject.file
    })
  },
  {
    deep: true,
  }
)

watch(
  () => form.values.country,
  (newVal) => {
    if (newVal) {
      countrySearch.value = newVal.name
    }
  },
  { immediate: true, deep: true } // Чтобы синхронизировать сразу после монтирования компонента
)

onMounted(() => {
  Promise.all([store.fetchCountries(true), props.form])
    .then(() => {
      loadingData.value = false
    })
    .catch(() => {
      loadingData.value = false
    })

  loadingData.value = false
})

watch(
  () => values,
  (newVal) => {
    if (
      newVal.birth_date &&
      newVal.country &&
      newVal.first_name &&
      newVal.gender &&
      newVal.last_name &&
      newVal.marital_status_id
    ) {
      stepsBool.value = true
    } else {
      stepsBool.value = false
    }
  },
  {
    deep: true,
    immediate: true,
  }
)

function onSelect(option: SelectOption) {
  countrySearch.value = option.name
  form.values.country = option
  form.values.countryName = option.name
}

function onSelectMaritalStatus(option: SelectOption) {
  form.values.marital_status_id = option.id
  userFallback.value.marital_status_id = option.id
}

function handleAvatarUpload(file: File) {
  getBase64(file).then((base64) => {
    form.values.image_1920 = base64
  })
}
</script>

<style>
.additionalClass div {
  border-radius: 8px;
  padding: 3px 4px;
  padding-right: 12px;
}

.additionalClass div span {
  color: #017bfe;
}
</style>
