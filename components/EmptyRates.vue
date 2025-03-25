<template>
  <div class="w-full h-full flex items-center justify-center flex-col">
    <img src="/images/svg/no-data.svg" alt="Empty Icon" loading="lazy" />
    <h5 class="text-dark font-medium text-lg text-center leading-112 mt-6 mb-2">
      {{ $t('empty.rate_title') }}
    </h5>
    <p class="text-gray text-sm text-center font-normal leading-112">
      {{ $t('empty.rate_subtitle') }}
    </p>
  </div>
</template>
