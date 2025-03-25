<template>
  <div>
    <div
      class="bg-white px-[14px] py-3 cursor-pointer flex items-center justify-between transition-300"
      @click="toggleSelect(!showOptions)"
    >
      <div class="text-dark font-medium text-sm !leading-130">
        {{ $t('sum') }}
      </div>

      <slot name="chevron">
        <span
          :class="{ '!-rotate-180': showOptions }"
          class="icon-chevron transition-all duration-200 inline-block text-gray-100 relative text-2xl"
        ></span>
      </slot>
    </div>
    <CollapseTransition>
      <div
        v-if="showOptions"
        :key="showOptions"
        class="relative top-full w-full bg-transparent z-40 overflow-hidden overflow-y-scroll mt-2"
      >
        <slot name="options">
          <div v-if="loading?.list" class="flex-center">
            <UILoader class="mx-auto" />
          </div>
          <template v-else-if="options?.length">
            <div
              v-for="(option, idx) in search(searchValue)"
              :key="idx"
              @click="onSelect(option)"
            >
              <div class="transition-all px-4 py-3 cursor-pointer">
                <slot :index="idx" :option="option" name="option">
                  <div class="flex-y-center gap-2">
                    <FormCheckbox
                      :checked="value?.[labelKey] == option[labelKey]"
                      :label="`$${option[labelKey]}`"
                      checkbox-styles="w-5 h-5"
                      label-styles="text-dark text-sm !leading-5"
                    />
                  </div>
                </slot>
              </div>
            </div>
          </template>
          <div v-else class="text-center py-2 text-sm text-dark">
            {{ $t('no_data') }}
          </div>
        </slot>
      </div>
    </CollapseTransition>
  </div>
</template>
<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { onClickOutside } from '@vueuse/core'

export type TOption = string | number | { [key: string]: string | number }

export interface Props {
  modelValue: TOption
  options: TOption[]
  error?: boolean
  activeLabelKey: string
  isSearchable?: boolean
  labelKey?: string
  valueKey?: string
  loading?: {
    list: boolean
    more: boolean
  }
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
  loading: () => ({
    list: false,
    more: false,
  }),
})

const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'on-select', value: TOption): void
  (e: 'on-name-select', value: string): void
  (e: 'load'): void
}>()

const showOptions = ref(false)
const targetIsVisible = ref(false)
const searchValue = ref('')
const value = ref(findOption(props.modelValue))
const searchingResults = ref<TOption[]>([])

const search = (val: string) => {
  if (!props.isSearchable || val.length < 1) return props.options
  searchingResults.value = props.options.filter((option) => {
    return option[props.labelKey]?.toLowerCase().includes(val.toLowerCase())
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
  props.options.forEach((item: any) => {
    values.value.push(item.name)
  })
  searchValue.value = values.value
})
</script>
