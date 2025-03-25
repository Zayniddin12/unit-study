<template>
  <div ref="select" class="relative">
    <!--  SELECTED OPTION  -->
    <div
      class="bg-gray px-[14px] py-3 cursor-pointer border border-gray rounded-xl flex items-center justify-between transition-300"
      :class="[
        selectedOptionStyles,
        { '!border-red': error },
        { 'border border-primary !bg-white': showOptions && !isHomeMain },
        { 'border !border-warning !bg-white': showOptions && isHomeMain },
      ]"
      @click="toggleSelect(!showOptions)"
    >
      <slot :value="value" :toggle-select="showOptions" name="selectedOption">
        <div
          v-if="isSearchable"
          :class="parentInputClasses"
          class="flex items-center"
        >
          <input
            v-model="searchValue"
            placeholder="placeholder"
            class="border-0 outline-none text-dark font-medium text-sm !leading-130 placeholder:text-dark placeholder:font-medium"
            :class="
              ({ '!text-gray-100 placeholder:!text-gray-100': showOptions },
              inputClasses)
            "
            type="text"
          />
        </div>

        <div v-else>
          <div
            v-if="!value"
            class="text-dark font-medium text-sm !leading-130"
            :class="({ '!text-gray-100': showOptions }, labelClass)"
          >
            {{ $t('family_status') }}
          </div>
          <div
            v-else
            :class="(labelClass, { '!text-gray-100': showOptions })"
            class="text-dark text-sm font-medium !leading-130"
          >
            {{ $t('marital_status.' + value.name) }}
          </div>
        </div>
        <slot name="chevron">
          <span
            :class="{
              '!-rotate-180': showOptions,
              '!-rotate-1804': showOptions && isHomeMain,
            }"
            class="icon-chevron transition-all duration-200 inline-block text-gray-100 relative"
          ></span>
        </slot>
      </slot>
    </div>
    <!--  OPTIONS  -->
    <Transition mode="out-in" name="select">
      <div
        v-if="showOptions"
        :key="showOptions"
        class="absolute top-full w-full bg-gray backdrop-blur-[32px] shadow-custom-select border-2 border-white rounded-xl z-40 overflow-hidden max-h-[250px] overflow-y-scroll mt-2"
        :class="dropDownClass"
      >
        <slot name="options">
          <template v-if="options?.length">
            <!--              :class="{ 'bg-gray-300': isActive(option) }"-->
            <div
              v-for="(option, idx) in search(searchValue)"
              :key="idx"
              @click="onSelect(option)"
            >
              <div
                v-if="isMain"
                :class="{
                  'bg-gray-100/[8%]': value?.[labelKey] == option?.[labelKey],
                }"
                class="transition-all px-4 py-3 hover:bg-gray-100/[8%] cursor-pointer"
              >
                <slot :index="idx" :option="option" name="option">
                  <div
                    class="flex-y-center gap-2"
                    :class="
                      value?.[labelKey] == option?.[labelKey]
                        ? 'font-medium'
                        : 'font-normal'
                    "
                  >
                    <p
                      v-if="option[labelKey]"
                      class="text-dark text-sm !leading-5"
                    >
                      {{ option[labelKey] }}
                    </p>
                    <p
                      v-if="option?.university"
                      class="text-dark-100 text-sm !leading-130"
                    >
                      {{ option.university.name }}
                    </p>
                    <p
                      v-else-if="!option[labelKey] && option.name"
                      class="text-dark-100 text-sm !leading-130"
                    >
                      {{ option.name }}
                    </p>
                  </div>
                </slot>
              </div>
              <div
                v-else-if="!isMain"
                class="transition-all px-4 py-3 group cursor-pointer !overflow-scroll"
                :class="
                  (value?.[labelKey] == option?.[labelKey]
                    ? '!bg-gray-100/[8%]'
                    : value?.[labelKey] == option?.university
                    ? '!bg-gray-100/[8%]'
                    : value?.[labelKey] == option?.university?.name
                    ? '!bg-gray-100/[8%]'
                    : value?.[labelKey] == option?.name
                    ? '!bg-gray-100/[8%]'
                    : '',
                  { 'hover:bg-gray-100/[8%]': !isHomeMain })
                "
              >
                <slot :index="idx" :option="option" name="option">
                  <div
                    class="flex-y-center gap-2"
                    :class="
                      value?.[labelKey] == option?.[labelKey]
                        ? 'font-medium'
                        : value?.[labelKey] == option?.university
                        ? 'font-medium'
                        : value?.[labelKey] == option?.university?.name
                        ? 'font-medium'
                        : value?.[labelKey] == option?.name
                        ? 'font-medium'
                        : 'font-normal'
                    "
                  >
                    <p
                      v-if="option[labelKey]"
                      :class="{ 'group-hover:text-primary': isHomeMain }"
                      class="text-dark-100 text-sm !leading-130 transition-300"
                    >
                      {{ $t(`marital_status.${option[labelKey]}`) }}
                    </p>
                    <p
                      v-if="option?.university"
                      class="text-dark-100 text-sm !leading-130"
                    >
                      {{ option.university.name }}
                    </p>
                    <p
                      v-else-if="!option[labelKey] && option.name"
                      class="text-dark-100 text-sm !leading-130"
                    >
                      {{ option.name }}
                    </p>
                  </div>
                </slot>
              </div>
            </div>
          </template>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '~/store/auth'

export type TOption = string | number | { [key: string]: string | number }

export interface Props {
  modelValue: TOption
  options: TOption[]
  error?: boolean
  dropDownClass: string
  chevronClass?: string
  activeLabelKey: string
  labelKey?: string
  valueKey?: string
  placeholder: string
  infiniteScroll?: boolean
  isSearchable?: boolean
  labelClass?: string
  selectedOptionStyles?: string
  inputClasses?: string
  parentInputClasses?: string
  isHomeMain?: boolean
  isMain?: boolean
  loading?: {
    list: boolean
    more: boolean
  }
  pagination?: {
    next?: string | null
    count: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
  placeholder: 'Select an option',
  loading: () => ({
    list: false,
    more: false,
  }),
  pagination: () => ({
    next: undefined,
    count: 0,
  }),
})

const { user } = storeToRefs(useAuthStore())

const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'infinite-scroll'): void
  (e: 'on-select', value: TOption): void
  (e: 'on-name-select', value: string): void
  (e: 'load'): void
}>()

const showOptions = ref(false)
const target = ref(null)
const targetIsVisible = ref(false)
const searchValue = ref('')
const value = ref(props?.modelValue)
const searchingResults = ref<TOption[]>([])

watch(
  () => props?.modelValue,
  (newVal) => {
    value.value = props.modelValue
  }
)

watch(
  () => user.value,
  () => {
    value.value = { name: user.value.marital_status_id }
  },
  {
    deep: true,
    immediate: true,
  }
)

const search = (val: string) => {
  if (!props.isSearchable || val.length < 1) return props.options

  searchingResults.value = props.options.filter((option) => {
    return option[props.labelKey].toLowerCase().includes(val.toLowerCase())
  })

  return searchingResults.value
}

watch(
  () => searchValue.value,
  (val) => {
    search(val)
  },
  { deep: true }
)

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue
  emit('on-toggle', showOptions.value)
}

function findOption(option: TOption) {
  if (option === null) return

  return props.options?.find(
    (o) => o === option || o[props.valueKey] === option
  )
}

function onSelect(option: TOption) {
  value.value = option
  toggleSelect(false)
  emit('update:modelValue', option[props.valueKey])
  emit('on-select', option)
  if (option?.university?.name) {
    emit('on-name-select', option.university.name)
  }
}
const select = ref()
onClickOutside(select, () => toggleSelect(false))

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
  if (
    isIntersecting &&
    (props.pagination.next || props.pagination?.next === undefined) &&
    !props.loading.list &&
    !props.loading.more
  ) {
    emit('load')
  }
})

watch(
  () => targetIsVisible.value,
  (newValue) => {
    if (newValue) {
      emit('infinite-scroll')
    }
  }
)
watch(
  () => props.modelValue,
  (val) => {
    if (val?.name && Object.keys(val).length) {
      value.value = val
      searchValue.value = val[props.labelKey]
    } else {
      value.value = findOption(props.modelValue)
    }
  },
  {
    immediate: true,
  }
)
watch(
  () => value.value,
  (val) => {
    if (val) {
      searchValue.value = val[props.labelKey]
    }
  }
)
const values = ref([])
onMounted(() => {
  if (props.options) {
    props.options.forEach((item: any) => {
      values.value.push(item.name)
    })
    searchValue.value = values.value
  }
})
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
