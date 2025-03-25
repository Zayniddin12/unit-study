<template>
  <div class="breadcrumb bg-gray-200 py-2.5 hidden-on-print hidden md:block">
    <div class="container flex items-center gap-1.5">
      <NuxtLink
        to="/"
        class="flex items-center gap-[14px] text-dark font-medium leading-normal text-sm transition-300 hover:text-primary group"
      >
        <i
          class="icon-home leading-4 text-primary transition-300 group-hover:text-primary text-lg"
        ></i>
        <p>{{ $t('main') }}</p>
      </NuxtLink>
      <div
        v-for="(item, index) in breadcrumb"
        :key="index"
        class="flex items-center gap-2 group shrink-0 line-clamp-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="4"
          viewBox="0 0 4 4"
          fill="none"
        >
          <circle cx="2" cy="2" r="2" fill="#697583" />
        </svg>

        <!--        <i class="icon-chevron text-gray text-sm leading-[14px] -rotate-90" />-->
        <NuxtLink
          :to="item?.link"
          :class="{
            'pointer-events-none !text-dark/40 ':
              index === breadcrumb?.length - 1,
          }"
          class="transition-300 flex cursor-pointer items-center text-brand-black leading-130 text-sm min-w-max breadcrumb-menu hover:text-primary truncate max-w-sm"
        >
          {{ item?.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IBreadcrumb } from '~/types/components/breadcrumb'

interface Props {
  breadcrumb: IBreadcrumb[]
}

defineProps<Props>()
</script>
