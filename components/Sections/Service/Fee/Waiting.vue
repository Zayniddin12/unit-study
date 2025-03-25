<template>
  <div class="flex-col justify-center">
    <img
      src="/images/svg/warning.svg"
      alt="success"
      class="size-[132px] mx-auto"
    />
    <div class="mt-5">
      <p class="text-center text-20 font-semibold text-dark leading-130">
        {{ $t('waiting_payment') }}
      </p>
      <p class="text-gray-100 text-sm font-normal leading-130 text-center mt-1">
        {{ $t('payment_process') }}
      </p>
    </div>
    <div class="flex gap-6 mt-8">
      <UIButton
        variant="bg-white"
        :text="$t('return_service')"
        class="w-full"
        @click="emit('go-back')"
      />
      <UIButton
        variant="primary"
        :text="$t('repeat')"
        class="w-full"
        @click="emit('try-again')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['go-back', 'try-again'])
</script>
