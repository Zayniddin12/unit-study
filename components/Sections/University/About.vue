<template>
  <div class="universities">
    <div class="container py-7 lg:py-[72px] relative overflow-visible">
      <UIPageTitle :title="header?.title" />
      <div
        class="text-dark text-xl leading-140 font-normal mt-4 max-w-[950px]"
        v-html="formatRichText(header.subtitle)"
      ></div>
      <img
        alt="Universities pattern"
        class="hidden lg:block absolute right-0 top-[72px] translate-x-2/3"
        src="/images/pattern/uzb-map.svg"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatRichText } from '~/utils'

const header = reactive({
  title: '',
  subtitle: '',
})
</script>
