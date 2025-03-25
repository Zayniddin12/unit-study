<template>
  <div class="flex-y-center gap-3">
    <i class="text-2xl text-primary" :class="card?.icon"/>
    <div
        :class="{ 'border-b border-gray-200': !last }"
        class="flex flex-col gap-1 w-full pb-2"
    >
      <p class="text-xs leading-112 text-gray-100">{{ card?.title }}</p>
      <a
          :href="card?.link"
          class="text-sm leading-112 text-dark font-medium transition-300 block"
          :class="{ 'hover:text-primary': isHover }"
          :target="targetBlank ? '_blank' : ''"
      >{{ card?.value }}</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  card: {
    icon: string
    title: string
    value: string
    link?: string
  }
  isHover?: boolean
  targetBlank?: boolean
  last: boolean
}

defineProps<Props>()
</script>
