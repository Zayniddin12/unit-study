<script setup lang="ts">
const route = useRoute()

interface Props {
  title: string
  backRoute?: string
  hasEdit?: boolean
  customEditRoute?: string
  customClass: string
}

defineProps<Props>()
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-5">
      <h2
        v-if="title"
        class="text-2xl text-dark font-bold leading-5 mb-5 flex-y-center gap-2"
      >
        <NuxtLink
          v-if="backRoute"
          :to="backRoute"
          class="icon-chevron text-[28px] leading-7 text-dark rotate-90 hover:-translate-x-1 transition-300"
        />
        {{ $t(title) }}
      </h2>

      <NuxtLink
        v-if="hasEdit"
        :to="customEditRoute ?? `${route.fullPath}/edit`"
      >
        <UIButton
          type="button"
          variant="outline"
          text="edit"
          icon="icon-edit"
          size="sm"
        />
      </NuxtLink>
    </div>
    <div :class="customClass" class="p-3 sm:p-6 rounded-2xl bg-white">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
