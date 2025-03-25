<template>
  <div>
    <UIWrapperPage :title="$t('my_services')" custom-class="!bg-transparent !p-0">
      <div
          v-if="cabinetServiceLoading || loading"
          class="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div
            v-for="(item, idx) in 2"
            :key="idx"
            class="bg-white w-full h-60 rounded-20 overflow-hidden"
        >
          <UIShimmer width="100%" height="100%" loading />
        </div>
      </div>
      <div v-else class="flex flex-col gap-y-8">
        <div v-for="item of cabinetServiceList" :key="item.id" class="p-5 bg-white rounded-3xl overflow-hidden">
          <div class="flex gap-1.5 flex-col w-full">
            <span class="text-gray-100 text-sm font-medium">{{$t('type_service')}}</span>
            <p class="text-primary font-medium leading-4">{{item?.related_service_id?.name}}</p>
          </div>
          <div class="grid my-4 grid-cols-3 gap-4">
            <div class="flex gap-1.5 flex-col  w-max">
              <span class="text-gray-100 text-sm font-medium">{{$t('service_name')}}</span>
              <p class="text-primary text-base leading-4 font-medium">
                {{ item?.service_id?.name }} </p>
            </div>
            <div class="flex gap-1.5 flex-col  w-max">
              <span class="text-gray-100 text-sm font-medium">{{$t('service_price')}}</span>
              <p class="text-primary text-base leading-4 font-medium">
                {{ formatNumberSpace(item?.service_id?.price || '0') }}
                {{ item?.service_id?.currency_id?.name }}</p>
            </div>
            <div class="flex gap-1.5 flex-col  w-max">
              <span class="text-gray-100 text-sm font-medium">{{$t('service_created')}}</span>
              <p class="text-primary text-base leading-4 font-medium"> {{dayjs(item?.create_date).format('DD.MM.YYYY')}} </p>
            </div>
          </div>
          <div class="bg-gray h-[204px] overflow-y-scroll rounded-xl p-3 flex flex-col gap-3">
            <div v-for="i of item?.service_id?.item_ids" :key="item.id" class="flex gap-4 items-center">
              <i class="icon-checkbox text-gray-100 text-xl text-center"></i>
              <span class="text-sm text-dark font-medium">{{i?.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <LazyEmptyProgram
          v-if="cabinetServiceLoading === false && loading === false && store.cabinetServiceList.length === 0"
          :button-text="$t('services')"
          :subtitle="$t('my_services_no_data')"
          button-link="/services"
          img="/images/svg/no-data.svg"
      />
    </UIWrapperPage>
  </div>
</template>
<script setup lang="ts">
import {cabinetStore} from "~/store/cabinet";
import {useAuthStore} from "~/store/auth";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";
import dayjs from "dayjs";

const store = cabinetStore()
const {cabinetServiceLoading, cabinetServiceList} = storeToRefs(cabinetStore())
const {user} = storeToRefs(useAuthStore())
const loading = ref(true)

watch(
  () => user.value,
  async(newVal) => {
     if(newVal.id){
       await store.fetchService(newVal?.id)
     }
  },
  { deep: true, immediate: true }
)

watch(()=> cabinetServiceLoading.value, (newVal) => loading.value = newVal)

</script>