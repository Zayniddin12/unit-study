<template>
  <div>
    <div class="my-6 py-3 px-4 rounded-20 border border-gray">
      <p class="text-dark text-20 font-semibold leading-130 mb-1">
        {{ data?.name }}
      </p>
      <p class="text-gray-100 font-medium text-sm leading-130">
        {{ $t('for_pay') }}: {{ data?.price }} {{ data?.currency_id?.name }}
      </p>
    </div>
    <UITab
      v-model="activeTab"
      :list="tabList"
      active-class="bg-white  h-[calc(100%_-_8px)] -translate-y-1/2 top-1/2 !rounded-xl ml-[4px] shadow-tab"
      active-items-class="!text-dark !font-bold"
      class="bg-gray rounded-2xl p-1 mb-4"
      item-class="!p-2 text-sm leading-5 font-medium w-full !text-center !flex !justify-center text-gray-100  font-semibold"
    />

    <div v-if="tabIndex == 0">
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-3">
        <div
          v-for="(item, index) in items[tabIndex]?.items"
          :key="index"
          :class="
            activeRadio == index + 1
              ? 'bg-white border-primary'
              : ' bg-gray border-gray'
          "
          class="rounded-xl transition-300 border hover:!border-primary transition-300"
          @click="activeRadio = !disabled ? item[valueKey] : modelValue"
        >
          <FormRadio
            v-model="activeRadio"
            :name="radioName"
            :value="index + 1"
            class="flex-row-reverse !justify-between !w-full cursor-pointer"
            v-bind="{ disabled }"
          >
            <template #label>
              <div class="flex gap-2">
                <UIShimmer height="24px" width="24px">
                  <img
                    :src="item?.icon || '/images/default/default.svg'"
                    alt="app of payment"
                    class="h-6"
                /></UIShimmer>
                <UIShimmer height="14px" width="w-[60%]">
                  <p
                    v-if="item?.title"
                    class="text-sm font-normal leading-5 text-dark-blue-300"
                  >
                    {{ item?.title }}
                  </p></UIShimmer
                >
              </div>
            </template>
          </FormRadio>
        </div>
      </div>
      <UIButton
        :disabled="isDisabled"
        :loading="loading"
        :text="$t('pay')"
        class="w-full mt-5"
        @click="submit()"
      />
    </div>
    <div v-if="tabIndex == 1">
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-3">
        <div
          v-for="(item, index) in items[tabIndex]?.items"
          :key="index"
          :class="
            activeCardRadio == index + 1
              ? 'bg-white border-primary'
              : ' bg-gray border-gray'
          "
          class="rounded-xl transition-300 border hover:!border-primary transition-300"
          @click="activeCardRadio = !disabled ? item[valueKey] : modelValue"
        >
          <FormRadio
            v-model="activeCardRadio"
            :name="radioName"
            :value="index + 1"
            class="flex-row-reverse !justify-between !w-full cursor-pointer"
            v-bind="{ disabled }"
          >
            <template #label>
              <div class="flex gap-2">
                <UIShimmer height="24px" width="24px">
                  <img
                    :src="
                      `/images/svg/payments/${(item?.card_type).toLowerCase()}.svg` ||
                      '/images/svg/payments/card.svg'
                    "
                    alt="app of payment"
                    class="h-6"
                /></UIShimmer>
                <UIShimmer height="14px" width="w-[60%]">
                  <p
                    v-if="item?.card_number"
                    class="text-sm font-normal leading-5 text-dark-blue-300"
                  >
                    {{ item?.card_number }}
                  </p></UIShimmer
                >
              </div>
            </template>
          </FormRadio>
        </div>
      </div>
      <UIButton
        :text="$t('add_card')"
        class="w-full mt-3 mb-4 flex items-center justify-center"
        icon="icon-plus text-20"
        variant="bg-white"
        @click="emit('addKart')"
      />
      <div class="flex items-center gap-1">
        <p class="text-gray-100 text-sm leading-130 font-medium">
          {{ $t('supported_by') }}:
        </p>
        <img alt="card" src="/images/svg/paylov.svg" />
      </div>
      <UIButton
        :disabled="isDisabledCard"
        :loading="loading"
        :text="$t('pay')"
        class="w-full mt-5"
        @click="submit"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IService } from '~/types/common'

interface Props {
  modelValue: string | number | object
  items: Array<object>
  data: IService
  disabled?: boolean
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  wrapperClass: 'flex flex-wrap gap-4',
  labelKey: 'name',
  valueKey: 'id',
  disabled: false,
})
const tabList = ref<
  {
    label: string
    value: string
    name: string
  }[]
>([])
const activeRadio = ref(props.modelValue)
const activeCardRadio = ref(props.modelValue)
const activeTab = ref(props?.items[0]?.title)
const isDisabled = ref(true)
const isDisabledCard = ref(true)
const emit = defineEmits(['onProviderSubmit', 'onCardSubmit'])

const radioName = `k-radio-${Math.floor(Math.random() * 1000)}`

const value = ref<string | number | object>([])

watch(
  () => activeRadio.value,
  (newValue: any) => {
    if (newValue !== value.value) {
      value.value = newValue
    }
    if (activeRadio) {
      isDisabled.value = false
    }
  }
)
watch(
  activeCardRadio,
  (newValue: any) => {
    if (newValue !== value.value) {
      value.value = newValue
    }

    if (activeCardRadio) {
      isDisabledCard.value = false
    }
  },
  { deep: true }
)

function submit() {
  if (activeRadio) {
    if (props.items[0].items[activeRadio.value - 1]?.id) {
      console.log('provider')
      emit('onProviderSubmit', props.items[0].items[activeRadio.value - 1]?.id)
    } else if (props.items[1].items[activeCardRadio.value - 1]?.id) {
      console.log('card')
      emit('onCardSubmit', props.items[1].items[activeCardRadio.value - 1]?.id)
    }
  }
}

onMounted(() => {
  props?.items.forEach((item) => {
    tabList.value.push({
      label: item?.title,
      value: item?.title,
      name: item?.title,
    })
  })
})
const tabIndex = ref(0)
watch(
  activeTab,
  () => {
    props?.items?.forEach((item, idx) => {
      if (item?.title == activeTab.value) {
        tabIndex.value = idx
      }
    })
  },
  { deep: true }
)
</script>
