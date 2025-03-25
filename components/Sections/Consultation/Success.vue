<template>
  <div class="flex flex-col">
    <img
      src="/images/svg/success.svg"
      alt="success"
      class="size-[132px] mx-auto mb-5"
    />
    <div>
      <p class="text-dark text-20 font-semibold leading-130 text-center">
        {{ $t('thanks_done') }}
      </p>
      <p class="text-sm font-normal leading-130 text-gray-100 text-center">
        {{ $t('thanks_done_text') }}
      </p>
    </div>
  </div>
</template>
