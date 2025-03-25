<template>
  <div
    :id="inputId"
    :class="{ '!border-red ': error }"
    class="bg-white border border-white-100 transition-300 focus-within:border-primary focus-within:bg-white overflow-hidden flex items-center rounded-lg relative"
  >
    <slot name="prefix" />
    <textarea
      :id="inputId"
      ref="Input"
      :class="[inputClass, { 'resize-none': removeResize }]"
      :value="modelValue"
      class="w-full h-full text-base sm:text-sm px-3 pt-2.5 pb-3 text-dark peer bg-transparent outline-none resize-none font-medium leading-5 placeholder:text-gray-100"
      v-bind="{
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        readonly,
        autocomplete,
        rows,
      }"
      @blur="$emit('blur')"
      @focus="handleFocus"
      @focusout="$emit('focusout')"
      @input="handleInput"
      @keyup.enter="handleEnter"
    />
    <span
      class="absolute bottom-1 right-1 py-1 px-2 rounded-lg backdrop-blur-xl text-dark text-xs opacity-100 peer-focus:opacity-0 transition-300"
    >
      {{ String(modelValue ? modelValue : '')?.length }} /
      <span class="text-gray-100">{{ maxlength }}</span>
    </span>
    <slot name="suffix" />
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  type?: string
  placeholder?: string
  modelValue: number | string
  disabled?: boolean
  error?: boolean
  focus?: boolean
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  inputClass?: string | string[]
  prefixClass?: string
  suffixClass?: string
  autocomplete?: string
  inputId?: string
  readonly?: boolean
  removeResize?: boolean
  rows?: number
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur'): void
  (e: 'focusout'): void
  (e: 'focus'): void
  (e: 'enter'): void
}>()

const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}
const handleEnter = () => {
  emit('enter')
}
const Input = ref()
defineExpose({ Input })

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  maxlength: 650,
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: 'new-password',
  inputId: 'textarea',
  prefixClass: '',
  suffixClass: '',
  rows: 5,
  placeholder: '',
})

const handleFocus = () => {
  emit('focus')
}
watch(
  () => props?.focus,
  (value) => {
    if (value) {
      Input?.value?.focus()
    }
  },
  { deep: true, immediate: true }
)
</script>
