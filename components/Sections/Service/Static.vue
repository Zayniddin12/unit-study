<template>
  <div class="rounded-20 border-2 py-5 px-6 border-white bg-white/80 relative">
    <div v-if="!isService" class="flex items-center gap-3">
      <div class="p-3 bg-primary rounded-2xl w-fit">
        <img :src="data?.icon_url" alt="icon" class="w-10 h-10" />
      </div>
      <p class="text-dark font-semibold text-22">{{ data?.name }}</p>
    </div>
    <div v-if="isService" class="flex items-center gap-3">
      <div class="p-3 bg-primary rounded-2xl w-fit">
        <img :src="data?.icon_url" alt="icon" class="w-10 h-10" />
      </div>
      <div class="flex flex-col">
        <p class="text-warning font-medium uppercase text-base">
          {{ data?.name }}
        </p>
        <p>{{ data?.currency_id?.name + ' ' + data?.price }}</p>
      </div>
    </div>
    <p class="text-gray-100 text-sm mt-4">
      {{ isService ? data?.description : data?.sub_title }}
    </p>
    <div
      class="flex items-center gap-1 mt-4 group cursor-pointer w-fit"
      @click="onClicked(data?.id)"
    >
      <p
        class="text-dark text-sm font-medium group-hover:text-primary transition-300"
      >
        {{ $t('more') }}
      </p>
      <i
        class="icon-chevron rotate-[270deg] group-hover:text-primary group-hover:translate-x-1 transition-300"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  isService?: boolean
  data: {
    id: number
    name: string
    sub_title: string
    description?: string
    currency_id?: { name: string }
    price?: number
    icon_url: string
  }
}

const emit = defineEmits<{
  (event: 'getPlan', item: Props): void
}>()

defineProps<Props>()

function onClicked(e) {
  emit('getPlan', e)
}
</script>
