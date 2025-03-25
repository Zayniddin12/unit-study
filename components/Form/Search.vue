<!--<template>-->
<!--  <FormGroup-->
<!--    :label="label"-->
<!--    label-class="sm:!text-base !font-medium"-->
<!--    for-id="country"-->
<!--  >-->
<!--    <FormSelect-->
<!--      :options="options"-->
<!--      value-->
<!--      :loading="countriesLoading"-->
<!--      input-classes="!font-normal"-->
<!--      :placeholder="$t('select_country')"-->
<!--      infinite-scroll-->
<!--      selected-option-styles="!p-0 !border-none"-->
<!--      @load="store.moreCountries(countrySearch)"-->
<!--      @on-select="onSelect"-->
<!--    >-->
<!--      <template #selectedOption="data">-->
<!--        <FormInput-->
<!--          v-model="countrySearch"-->
<!--          :error="form.$v.value.country_id.$error"-->
<!--          :placeholder="countryName ? countryName : $t('select_country')"-->
<!--          :input-class="-->
<!--            countryName ? 'placeholder:!text-dark !font-normal' : '!font-normal'-->
<!--          "-->
<!--          selected-option-styles="border-gray/40 !p-0 !border-none"-->
<!--          class="w-full"-->
<!--          input-id="country"-->
<!--          type="text"-->
<!--        >-->
<!--          <template #suffix>-->
<!--            <div class="px-3 h-full flex-center">-->
<!--              <span-->
<!--                :class="{ '-rotate-180': data.toggleSelect }"-->
<!--                class="icon-chevron transition-all duration-200 inline-block text-warning"-->
<!--              ></span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </FormInput>-->
<!--      </template>-->
<!--    </FormSelect>-->
<!--  </FormGroup>-->
<!--</template>-->
<!--<script lang="ts" setup>-->
<!--import { useCommonStore } from '~/store/common'-->

<!--export type TOption = string | number | { [key: string]: string | number }-->
<!--const store = useCommonStore()-->
<!--interface Props {-->
<!--  label: string-->
<!--  options: TOption[]-->
<!--  countriesLoading: { list: boolean; more: boolean }-->
<!--  countrySearch: string-->
<!--}-->
<!--defineProps<Props>()-->

<!--function onSelect(option: any) {-->
<!--  form.value.values.country = option.name-->
<!--  countrySearch.value = form.value.values.country-->
<!--}-->
<!--</script>-->
