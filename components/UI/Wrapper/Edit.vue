<script setup lang="ts">
defineEmits<{
  (e: 'edit'): void
}>()
</script>

<template>
  <div class="py-4 px-6 rounded-2xl bg-white">
    <slot>
      <NuxtLink to="/cabinet/edit">
        <UIButton
          :text="$t('edit')"
          class="!px-8 ml-auto block"
          type="button"
        />
      </NuxtLink>
    </slot>
  </div>
</template>
