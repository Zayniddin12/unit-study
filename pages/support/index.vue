<template>
  <div>
    <div class="container pb-8">
      <div class="my-8">
        <UIWrapperTitle title="support" subtitle="services_subtitle" />
      </div>
      <div
        v-if="servicesStore.servicesLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <div
          v-for="(item, idx) in 3"
          :key="idx"
          class="bg-white w-full h-40 rounded-20 overflow-hidden"
        >
          <UIShimmer width="100%" height="100%" loading />
        </div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <SectionsServiceStatic
          v-for="(item, key) in servicesStore.services"
          :key="key"
          :data="item"
          @get-plan="getPlan"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useServicesStore } from '~/store/services'

const router = useRouter()

const servicesStore = useServicesStore()

servicesStore.fetchServices()

function getPlan(item: number) {
  router.push(`/support/${item}`)
}
</script>
