<template>
  <div
    class="relative w-full bg-white rounded-2xl p-6 gap-1 flex flex-col items-start"
  >
    <template v-for="(item, index) in steps" :key="index">
      <div
        :class="checkStatus(item?.check)"
        class="flex-shrink-0 rounded-xl select-none transition-300 cursor-pointer w-full group"
      >
        <div class="flex items-center space-x-[14px]">
          <div
            class="flex-center flex-shrink-0 w-10 h-10 flex-center transition-300 border-2 border-gray rounded-[10px] text-base font-semibold leading-5 text-gray-100 group-[.active]:text-white group-[.active]:border-primary group-[.active]:bg-primary group-[.done]:text-primary group-[.done]:border-primary/10 group-[.done]:bg-primary/10"
          >
            {{ index + 1 }}
          </div>
          <p
            class="text-base text-gray-100 font-semibold leading-5 group-[.active]:text-dark group-[.done]:text-dark transition-300"
          >
            {{ $t(item?.title) }}
          </p>
        </div>
      </div>
      <hr
        class="h-4 w-0.5 bg-gray ml-5 last-of-type:hidden"
        :class="{ '!bg-primary': checkStatus(item?.check) === 'done' }"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentStep: number
  steps: {
    title: string
    icon: string
    check: number
  }[]
}
const props = defineProps<Props>()

function checkStatus(target: number) {
  if (target === props.currentStep) {
    return 'active'
  } else if (props.currentStep > target) {
    return 'done'
  } else {
    return ''
  }
}
</script>
