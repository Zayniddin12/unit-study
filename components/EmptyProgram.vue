<template>
  <div class="w-full h-full flex items-center justify-center flex-col">
    <img :src="img ?? '/images/empty.png'" alt="Empty Icon" loading="lazy" class="w-[183px] h-[160px] mx-auto" />
    <h5 class="text-dark font-medium text-lg text-center leading-112 mt-6 mb-2">
      {{ title ?? $t('empty.program_title') }}
    </h5>
    <p class="text-gray-100 text-sm text-center font-normal leading-112">
      {{ subtitle ?? $t('empty.program_subtitle') }}
    </p>
    <UIButton v-if="buttonText" class="mt-4" @click="$router.push(buttonLink)" :text="buttonText" />
  </div>
</template>
<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  img?: string
  titleClass?: string
  subtitleClass?: string
  buttonText?: string
  buttonLink?: string
}
defineProps<Props>()
</script>
