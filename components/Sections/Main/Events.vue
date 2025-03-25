<template>
  <div class="bg-gray">
    <div class="pt-16 pb-9 container">
      <div class="flex justify-between items-end max-md:gap-3 -mb-8">
        <UISectionTitle
          :title="$t('events')"
          :label-class="'md:text-40 text-xl text-bold !text-left'"
          :subtitle="$t('event_subtitle')"
          show-link
          :all-title="$t('all_events')"
          link="/events"
        />
      </div>

      <div
        class="h-full relative -ml-[5%] lg:-ml-[30%] lg:-mr-[30%] overflow-hidden py-16"
      >
        <div class="container">
          <Swiper
            v-if="!isLoading"
            :slides-per-view="'auto'"
            class="!overflow-visible"
          >
            <SwiperSlide
              v-for="(event, key) in list"
              :key="key"
              class="!overflow-visible sm:!w-[589px] w-[60%] max-sm:px-1 !mr-5"
            >
              <CardMainEvent :item="event" />
            </SwiperSlide>
          </Swiper>
          <div v-else class="flex gap-5">
            <CardMainEventLoading v-for="key in 3" :key />
          </div>
          <div
            class="w-[350px] h-[120%] absolute top-0 -right-0 z-10 -mt-2 max-[1260px]:!hidden"
            style="
              background: linear-gradient(
                90deg,
                rgba(242, 243, 247, 0) 0%,
                #f2f3f7 100%
              );
            "
          />
          <div
            class="h-full w-[100px] absolute -left-0 top-0 z-10 max-[1260px]:!hidden"
            style="
              background: linear-gradient(
                270deg,
                rgba(242, 243, 247, 0) 0%,
                #f2f3f7 100%
              );
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/vue'

import { Events } from '~/data'

const list = ref([])

async function getList() {
  await useApi()
    .$get('/development/params/education.event/advanced_list/', {
      params: {
        specification: {
          image_url: {},
          name: {},
          description: {},
          country_id: { fields: { id: {}, name: {} } },
          country_state_id: { fields: { id: {}, name: {} } },
          date: {},
          priority: {},
        },
      },
    })
    .then((res: any) => {
      list.value = res?.records
    })
}
getList()

const isLoading = ref(true)
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>
