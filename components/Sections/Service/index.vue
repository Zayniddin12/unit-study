<template>
  <div
    class="rounded-20 border-2 border-white backdrop-blur-[32px] shadow-service-card bg-white/80 relative"
  >
    <div class="h-full flex flex-col justify-between">
      <div>
        <div
          :class="{ 'sm:!pl-[60px] !ml-8': tabList.length == 1 }"
          class="sm:pt-7 sm:pb-5 sm:px-6 p-2"
        >
          <div class="text-base uppercase font-medium text-warning mb-1">
            {{ data?.name }}
          </div>
          <div v-if="tabList.length > 1">
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
          </div>
          <div
            v-else
            class="text-dark-blue font-bold sm:text-5xl text-2xl leading-normal"
          >
            <span class="text-2xl relative">$</span>{{ data?.price }}
          </div>
        </div>
        <div class="w-full h-px bg-gray" />
        <div
          class="sm:pt-7 sm:pb-5 sm:px-6 p-2 flex-col space-y-5 border-b border-gray"
        >
          <div
            v-for="(item, index) in currentItems"
            :key="index"
            class="flex gap-3 items-start"
          >
            <span class="icon-checkbox text-2xl text-gray-100" />
            <p class="text-sm text-dark font-medium">{{ item.name }}</p>
          </div>
        </div>
      </div>

      <div class="px-6 pb-6">
        <UIButton
          variant="primary"
          :text="t('get_basic_plan')"
          class="w-full mt-[82px]"
          @click="onClicked(data)"
        />
      </div>
    </div>
    <img
      class="absolute w-full bottom-0 -z-10"
      src="/images/svg/service-decoration.svg"
      alt="decoration"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type { IService } from '~/types/common'

interface Props {
  data: IService
}
const emit = defineEmits<{
  (event: 'getPlan', item: Props): void
}>()

const { t } = useI18n()
const props = defineProps<Props>()
const activeTab = ref<string | null>(null)

const tabList = ref<{ label: string; value: string; name: string }[]>([])

onMounted(() => {
  // Initialize the tabList from data's categories
  props?.data?.category?.forEach((cat) => {
    tabList.value.push({
      label: cat.name,
      value: cat.name,
      name: cat.name,
    })
  })
  activeTab.value = tabList.value[0]?.name || null
})

// Get the current items and description for the selected tab
const currentItems = computed(() => props.data.items)
const currentDescription = computed(() => props.data.description)

function onClicked(e: Props) {
  emit('getPlan', e)
}

watch(
  activeTab,
  () => {
    // You can add additional logic here if needed to respond to tab changes
  },
  { deep: true }
)
</script>
