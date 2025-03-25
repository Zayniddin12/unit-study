<template>
  <SectionsServiceBase :data="data" @get-plan="onClicked">
    <template #tabs>
      <UITab
        v-model="activeTab"
        :list="tabList"
        class="bg-gray rounded-2xl p-1 sm:mt-5"
        active-items-class="!text-dark !font-bold"
        item-class="!p-2 text-sm leading-5 font-medium w-full !text-center !flex !justify-center text-gray-100 font-semibold"
        active-class="bg-white h-[calc(100%_-_8px)] -translate-y-1/2 top-1/2 !rounded-xl ml-[4px] shadow-tab"
      />
      <div class="py-3">
        <div class="text-dark-blue font-bold sm:text-5xl text-2xl flex">
          <p class="text-3xl leading-[48px] relative">$</p>
          {{ data?.price }}
        </div>
        <div class="text-base font-bold text-dark-blue leading-130">
          {{ currentDescription }}
        </div>
      </div>
    </template>
  </SectionsServiceBase>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

interface Props {
  data: any
}

const emit = defineEmits<{
  (event: 'getPlan', item: any): void
}>()

const props = defineProps<Props>()
const activeTab = ref<string | null>(null)
const tabList = ref<{ label: string; value: string; name: string }[]>([])

onMounted(() => {
  props.data?.category?.forEach((cat) => {
    tabList.value.push({
      label: cat.name,
      value: cat.name,
      name: cat.name,
    })
  })
  activeTab.value = tabList.value[0]?.name || null
})

const currentDescription = computed(() => props.data.description)

function onClicked(e) {
  emit('getPlan', e)
}
</script>
