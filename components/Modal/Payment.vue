<template>
  <Modal
    :title="titles?.[innerState]"
    :has-go-back="innerState === ESTATE.addCard"
    body-class="!max-w-[580px]"
    close-button-style="-mt-4 -mr-4 !w-10 !h-10"
    close-icon-class="!text-2xl"
    title-style="!text-2xl"
    disable-outer-close
    v-bind="{ show }"
    @go-back="innerState = ESTATE.paymentMethod"
    @close="
      () => {
        $emit('close')
        innerState = 'paymentMethod'
      }
    "
  >
    <div class="p-8 pt-0">
      <CollapseTransition>
        <SectionsServiceFeeMethod
          v-if="innerState === ESTATE.paymentMethod"
          :items="paymentAplication"
          :data="items"
          :loading="payButtonLoading"
          @on-provider-submit="onProviderSubmit"
          @on-card-submit="onCardSubmit"
          @add-kart="innerState = ESTATE.addCard"
        />
      </CollapseTransition>
      <CollapseTransition>
        <SectionsServiceFeeAddCard
          v-if="innerState === ESTATE.addCard"
          :loading="regLoading"
          @error="innerState = ESTATE.error"
          @submit="innerState = ESTATE.paymentMethod"
          @fetch-cards="cardStore.fetchCards()"
        />
      </CollapseTransition>
      <CollapseTransition>
        <SectionsServiceFeeWaiting
          v-if="innerState === ESTATE.pending"
          @go-back="goBack"
          @try-again="innerState = ESTATE.paymentMethod"
        />
      </CollapseTransition>
      <CollapseTransition>
        <SectionsServiceFeeSuccess
          v-if="innerState === ESTATE.success"
          @go-back="goBack"
        />
      </CollapseTransition>
      <CollapseTransition>
        <SectionsServiceFeeError
          v-if="innerState === ESTATE.error"
          @go-back="goBack"
          @try-again="innerState = ESTATE.paymentMethod"
        />
      </CollapseTransition>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useI18n } from 'vue-i18n'

import { useCardStore } from '~/store/cardStore'
import type { IService } from '~/types/common'

interface Props {
  show?: boolean
  state?: 'paymentMethod' | 'addCard' | 'success' | 'error'
  items?: IService
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])
const { t } = useI18n()
const { showToast } = useCustomToast()

const innerState = ref(props.state)
const regLoading = ref(false)
const loginBtnLoading = ref(false)
const cardStore = useCardStore()

const cards = computed(() => cardStore.cards)
const providers = ref([])
const payButtonLoading = ref(false)

enum ESTATE {
  paymentMethod = 'paymentMethod',
  addCard = 'addCard',
  pending = 'pending',
  success = 'success',
  error = 'error',
}

function getProviders() {
  useApi()
    .$get('/payment/providers')
    .then((response) => {
      providers.value = response
    })
}

getProviders()

const paymentAplication = computed(() => [
  {
    title: 'payment_system',
    items: [...providers.value],
  },
  {
    title: 'with_card',
    items: [...cards.value],
  },
])

function onProviderSubmit(id: number) {
  payButtonLoading.value = true
  useApi()
    .$post(`/service/buy`, {
      body: {
        service_id: props.items.id,
        provider_id: id,
      },
    })
    .then((response) => {
      window.open(response.payment_url, '_self')
      innerState.value = ESTATE.pending
    })
    .catch((error) => {
      showToast(error._data.detail.detail, 'error')
      innerState.value = ESTATE.error
    })
    .finally(() => {
      payButtonLoading.value = false
    })
}

function onCardSubmit(id: number) {
  payButtonLoading.value = true
  useApi()
    .$post(`/service/buy`, {
      body: {
        service_id: props.items.id,
        card_id: id,
      },
    })
    .then((response) => {
      innerState.value = ESTATE.success
    })
    .catch((error) => {
      showToast(error._data.detail.detail, 'error')
      innerState.value = ESTATE.error
    })
    .finally(() => {
      payButtonLoading.value = false
    })
}

const titles = {
  paymentMethod: t('service_fee'),
  addCard: t('add_card'),
  success: t('service_fee'),
  pending: t('service_fee'),
  error: t('service_fee'),
}

function goBack() {
  emit('close')
  innerState.value = 'paymentMethod'
}
</script>
