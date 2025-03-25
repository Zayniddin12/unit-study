<template>
  <div class="flex-col justify-center">
    <img
      src="/images/svg/success.svg"
      alt="success"
      class="size-[132px] mx-auto"
    />
    <div class="mt-5">
      <p class="text-center text-20 font-semibold text-dark leading-130">
        {{ $t('completed_successfully') }}
      </p>
      <p class="text-gray-100 text-sm font-normal leading-130 text-center mt-1">
        {{ $t('completed_successfully_subtitle') }}
      </p>
    </div>
    <UIButton
      variant="primary"
      :text="$t('close')"
      class="w-full mt-8"
      @click="emit('go-back')"
    />
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['go-back'])
</script>
