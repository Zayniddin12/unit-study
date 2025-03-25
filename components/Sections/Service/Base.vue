<template>
  <div class="grid grid-cols-12 bg-white rounded-20 gap-5">
    <div
      :style="backgroundImageStyle"
      class="col-span-12 flex flex-col md:col-span-7 p-5"
    >
      <p class="text-dark text-2xl font-medium">
        {{ services?.name }}
      </p>
      <div
        class="text-dark text-base max-w-[430px] leading-tight my-4"
        v-html="services?.description"
      />
      <div
        class="grid grid-cols-2 md:grid-cols-4 self-end w-full gap-4 mt-auto"
      >
        <div
          v-for="(item, key) in services?.statistic_ids"
          :key="key"
          class="p-3 bg-gray w-full rounded-2xl"
        >
          <div
            v-if="item?.icon_url"
            class="p-2 rounded-xl bg-white flex items-center justify-center size-10"
          >
            <img class="text-primary size-6" :src="item?.icon_url" alt="icon" />
          </div>
          <p class="text-dark text-xs mt-4">{{ item?.name }}</p>
          <p class="text-dark text-base font-bold">{{ item?.number }}</p>
        </div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-5 flex flex-col p-6 h-full">
      <UITab
        v-model="activeTab"
        :list="tabList"
        class="bg-gray rounded-2xl p-1"
        active-items-class="!text-dark !font-bold"
        item-class="!p-2 text-sm leading-5 font-medium w-full !text-center !flex !justify-center text-gray-100 font-semibold"
        active-class="bg-white h-[calc(100%_-_8px)] -translate-y-1/2 top-1/2 !rounded-xl ml-[4px] shadow-tab"
      />
      <div v-if="activeTabDetails" class="my-5">
        <p class="text-32 font-bold text-dark-blue-400">
          {{ formatNumberSpace(activeTabDetails?.price || '0') }}
          {{ activeTabDetails?.currency_id?.name }}
        </p>
        <div class="w-full h-px bg-gray my-4" />
        <div
          class="px-3 py-1.5 bg-gray rounded-10 overflow-y-auto max-h-[172px] h-full"
        >
          <div
            v-for="(item, key) in activeTabDetails?.item_ids"
            :key
            class="flex items-center gap-x-3"
          >
            <i class="icon-checkbox text-gray-100 text-2xl" />
            <p class="text-dark text-sm font-medium">{{ item?.name }}</p>
          </div>
        </div>
      </div>
      <UIButton
        class="w-full mt-auto"
        :text="
          activeTabDetails?.is_bought && isAuth
            ? $t('bought_already')
            : $t('get_plan', { name: activeTabDetails?.name })
        "
        :disabled="activeTabDetails?.is_bought && isAuth"
        @click="$emit('getPlan', activeTabDetails)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { formatNumberSpace } from '~/utils'

interface Props {
  services: {
    id: number
    name: string
    description: string
    tab_ids: []
    image_url: string
  }
  isAuth: boolean
}

const props = defineProps<Props>()

defineEmits(['getPlan'])

const activeTab = ref<string | null>(null)
const tabList = ref<{ label: string; value: string; name: string }[]>([])
const isSmallScreen = ref(false)

// Watch screen size
onMounted(() => {
  const updateScreenSize = () => {
    isSmallScreen.value = window.innerWidth < 640 // sm breakpoint
  }
  window.addEventListener('resize', updateScreenSize)
  updateScreenSize() // Initial check
})

const backgroundImageStyle = computed(() => {
  if (isSmallScreen.value) return null
  return {
    backgroundImage: `url(${
      props.services?.image_url || '/images/servicebg.png'
    })`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundSize: '281px 281px',
  }
})

const activeTabDetails = computed(
  () =>
    props.services?.tab_ids.find((tab) => tab?.name === activeTab.value) ||
    'base'
)

onMounted(() => {
  props?.services?.tab_ids?.forEach((cat) => {
    tabList.value.push({
      label: cat?.name,
      value: cat?.name,
      name: cat?.name,
    })
  })
  activeTab.value = tabList.value[0]?.name || null
})
</script>
<style>
.overflow-y-auto {
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #d4d4d4 #f9f9f9; /* Thumb color and track color for Firefox */
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px; /* Total scrollbar width */
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  width: 4px; /* Thumb width */
  background: #d4d4d4; /* Thumb color */
  border-radius: 10px; /* Rounded thumb */
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f9f9f9; /* Track background color */
  border-radius: 10px; /* Rounded track */
}
</style>
