<template>
  <div
    class="w-full bg-slate-50 flex items-center justify-between rounded-[10px] p-3"
  >
    <div class="flex justify-between">
      <UICardPaymentLogo :type="card?.card_type" class="my-auto" />
      <p class="ml-1 my-auto">{{ card?.card_number }}</p>
    </div>
    <button class="place-self-end group" @click="$emit('showDelete', card?.id)">
      <i
        class="icon-trash text-[#A3A3A3] text-2xl group-hover:text-red flex transition-300"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  card: {
    id: string | number
    name: string
    card_number: string
    card_type: string
  }
}

const props = defineProps<Props>()
defineEmits(['showDelete'])
</script>
