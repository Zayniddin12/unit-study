<template>
  <div>
    <div class="container pb-8">
      <div class="my-8">
        <UIWrapperTitle title="services" subtitle="services_subtitle" />
      </div>
      <div
        v-if="serviceStore.mainServicesLoading"
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
        <SectionsServiceBase
          v-for="(item, key) in mainServices"
          :key
          :services="item"
          :is-auth="userId"
          @get-plan="getPlan"
        />
        <!--        <SectionsServiceStatic-->
        <!--          v-for="(item, key) in baseServices"-->
        <!--          :key-->
        <!--          :data="item"-->
        <!--          is-service-->
        <!--          @get-plan="getPlan"-->
        <!--        />-->
      </div>
    </div>
    <ModalPayment :key="state" v-bind="{ show, state, items }" @close="close" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useAuthStore } from '~/store/auth'
import { useCardStore } from '~/store/cardStore'
import { useServicesStore } from '~/store/services'
import type { IService } from '~/types/common'

const serviceStore = useServicesStore()
const authStore = useAuthStore()
const userId = computed(() => authStore?.user.id)
const { $event } = useNuxtApp()
serviceStore.fetchMainServices()

const mainServices = computed(() => serviceStore.mainServices)

watch(userId, () => serviceStore.fetchMainServices())

const show = ref(false)
const state = ref<
  'paymentMethod' | 'addCard' | 'pending' | 'success' | 'error'
>('paymentMethod')
const items = ref<IService>()
const cardStore = useCardStore()

function getPlan(item: IService) {
  if (!userId.value) {
    return $event('open-auth', 'login')
  } else {
    cardStore.fetchCards()
    show.value = true
    items.value = item
  }
}

function close() {
  show.value = false
  serviceStore.fetchMainServices()
}
</script>
