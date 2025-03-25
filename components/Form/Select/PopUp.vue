<template>
  <div ref="select" class="relative">
    <!-- INPUT FIELD -->
    <div
      class="cursor-pointer flex items-center transition-300"
      @click="toggleSelect(true)"
    >
      <input
        v-model="searchValue"
        :placeholder="placeholder"
        class="outline-none h-[100%] text-[#2B2B2B] focus:border transition-300 border border-gray focus:border-primary focus:!bg-white bg-gray px-[14px] rounded-xl w-full py-3 font-medium text-sm !leading-130 placeholder:text-dark placeholder:font-medium"
        type="text"
        @focusout="toggleSelect(false)"
      />
    </div>

    <!-- OPTIONS -->
    <Transition mode="out-in" name="select">
      <div
        v-if="showOptions && filteredOptions.length"
        class="absolute top-full w-full bg-gray backdrop-blur-[32px] shadow-custom-select border-2 border-white rounded-xl z-40 overflow-hidden max-h-[250px] overflow-y-scroll mt-2"
      >
        <div
          v-for="(option, idx) in filteredOptions"
          :key="idx"
          class="transition-all px-4 py-3 hover:bg-gray-100/[8%] cursor-pointer"
          @click="onSelect(option)"
        >
          <div class="flex-y-center gap-2">
            <p class="text-dark text-sm !leading-5">{{ option[labelKey] }}</p>
          </div>
        </div>
        <div
          v-if="!filteredOptions.length"
          class="text-center py-2 text-sm text-dark"
        >
          {{ $t('no_data') }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

import { useProfileStore } from '~/store/profile'

export type TOption = string | number | { [key: string]: string | number }

export interface Props {
  modelValue: TOption
  options: TOption[]
  error?: boolean
  placeholder: string
  labelKey?: string
  idx: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'on-select', value: TOption): void
  (e: 'update', value: string): void
}>()

const showOptions = ref(false)
const searchValue = ref(props.modelValue.name)



const filteredOptions = ref<TOption[]>([])

watch(searchValue, (val) => {
  filteredOptions.value = props.options.filter((option) =>
    option.name.toLowerCase().includes(val.toLowerCase())
  )
  emit('update', searchValue.value)
})

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue
}

function onSelect(option: TOption) {
  searchValue.value = option[props.labelKey]
  toggleSelect(false)
  setTimeout(() => {
    emit('on-select', option)
  }, 50)
}



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
