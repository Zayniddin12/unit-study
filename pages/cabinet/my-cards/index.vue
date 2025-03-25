<template>
  <div class="flex flex-col flex-grow min-h-[495px] pb-10">
    <div>
      <div class="flex items-center justify-between">
        <UISectionTitle
          :title="$t('my_cards')"
          class="!text-2.5xl leading-112 font-bold text-dark"
          label-class="!text-left"
        />
        <UIButton
          v-if="cards.length || cardStore.cardsLoading"
          :text="$t('add_card')"
          class="w-full max-w-60"
          icon="icon-plus"
          variant="outline"
          @click="showDialog = true"
        />
      </div>
      <UIWrapperPage
        v-if="cardStore.cardsLoading"
        custom-class="grid grid-cols-2 gap-3"
      >
        <UICardLoading v-for="i in 2" :key="i" />
      </UIWrapperPage>
      <div
        v-else-if="cards.length === 0 && !cardStore.cardsLoading"
        class="grid gap-y-6 mt-12 align-middle place-items-center text-center mx-auto"
      >
        <img alt="empty-card" src="/images/svg/no-card.svg" />
        <div class="grid gap-1">
          <h3 class="font-semibold text-dark text-2xl leading-130">
            {{ $t('you_have_no_card') }}
          </h3>
          <p class="text-gray-100 text-base">
            {{ $t('you_have_no_card_text') }}
          </p>
        </div>
        <UIButton :text="$t('add_card')" @click="showDialog = true" />
      </div>
      <UIWrapperPage v-else custom-class="grid md:grid-cols-2 gap-3">
        <UICard
          v-for="card in cards"
          :key="card.id"
          :card="card"
          @show-delete="handleShowDelete(card.id)"
        />
      </UIWrapperPage>
    </div>
    <UICardDelete
      :card-id="showDelete.cardId"
      :show="showDelete.visible"
      @close="showDelete.visible = false"
      @fetch-card="cardStore.fetchCards()"
    />
    <Modal
      :show="showDialog"
      :title="step === 1 ? $t('add_card') : $t('confirm_code')"
      :body-class="'px-5 pb-8' + ' ' + (step === 1 ? '!max-w-xl' : '!max-w-sm')"
      header-style="!mx-0"
      @close="handleClose()"
    >
      <UICardAdd v-if="step === 1" @add-card="handleAddCard" />
      <UICardVerification
        v-if="step === 2"
        :card-deadline="cardInfo.card_deadline"
        :card-id="cardInfo.cid"
        :card-number="cardInfo.card_number"
        :otp_sent_phone="cardInfo.otp_sent_phone"
        @close="handleClose"
        @fetch-card="cardStore.fetchCards()"
      />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useCardStore } from '~/store/cardStore'

const { t } = useI18n()
const showDialog = ref(false)
const step = ref(1)
const cardStore = useCardStore()
cardStore.fetchCards()

const breadcrumbRoutes = computed(() => [
  {
    title: t('my_cards'),
    link: '/my-cards',
  },
])

const showDelete = reactive({
  visible: false,
  cardId: null,
})

const cardInfo = reactive({
  otp_sent_phone: '',
  cid: '',
  card_number: '',
  card_deadline: '',
})

const handleAddCard = (info) => {
  step.value = 2
  cardInfo.otp_sent_phone = info.otp_code
  cardInfo.cid = info.cid
  cardInfo.card_number = info.card_number
  cardInfo.card_deadline = info.card_deadline
}

const handleShowDelete = (cardId) => {
  showDelete.visible = true
  showDelete.cardId = cardId
}

const handleClose = () => {
  showDialog.value = false
  step.value = 1
}

const cards = computed(() => cardStore.cards)

definePageMeta({
  middleware: 'auth',
})
</script>
