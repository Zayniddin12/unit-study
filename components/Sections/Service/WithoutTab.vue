<template>
  <SectionsServiceBase :data="data" @get-plan="onClicked" />
</template>

<script lang="ts" setup>

interface Props {
  data: any
}

const emit = defineEmits<{
  (event: 'getPlan', item: any): void
}>()

const props = defineProps<Props>()

function onClicked(e) {
  emit('getPlan', e)
}
</script>
