<template>
  <div class="relative w-full">
    <div :class="showLink ? 'flex items-baseline justify-between' : ''">
      <p
        class="text-center text-2xl md:text-3.5xl leading-112 font-bold text-dark"
        :class="labelClass"
      >
        {{ title }}
      </p>
      <NuxtLink
        v-if="showLink"
        :to="`${link}`"
        class="gap-1 flex items-center group cursor-pointer transition-300 select-none"
        :class="allTitleHidden ? 'hidden' : 'visible'"
      >
        <p
          class="text-dark text-xs md:text-sm font-normal leading-[20px] group-hover:text-primary transition-300 whitespace-nowrap"
        >
          {{ allTitle }}
        </p>
        <span
          class="icon-chevron -rotate-90 text-xl group-hover:text-primary transition-300"
        />
      </NuxtLink>
    </div>
    <p
      :class="subtitleClass"
      class="text-sm font-normal leading-140 text-gray-100"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  labelClass?: string
  subtitleClass?: string
  showLink: boolean
  allTitle: string
  allTitleHidden: boolean
  link: string
}

defineProps<Props>()
</script>
