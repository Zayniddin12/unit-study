<template>
  <div class="p-3 sm:p-6 rounded-2xl bg-white grid sm:grid-cols-2 gap-5">
    <div v-for="(item, index) in data" :key="index" class="grid gap-y-2">
      <p class="text-xs text-gray-100">{{ item?.label }}</p>
      <p class="text-base font-medium text-dark">{{ item?.value }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  data: any
}

defineProps<Props>()
</script>
