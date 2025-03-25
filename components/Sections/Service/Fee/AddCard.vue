<template>
  <div>
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
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

import { useCardStore } from '~/store/cardStore'

const step = ref(1)

const cardStore = useCardStore()

const cardInfo = reactive({
  otp_sent_phone: '',
  cid: '',
  card_number: '',
  card_deadline: '',
})

const emit = defineEmits(['submit', 'fetchCards'])

const handleAddCard = (info) => {
  step.value = 2
  cardInfo.otp_sent_phone = info.otp_code
  cardInfo.cid = info.cid
  cardInfo.card_number = info.card_number
  cardInfo.card_deadline = info.card_deadline
}

const handleClose = () => {
  emit('submit')
  emit('fetchCards')
  step.value = 1
}
</script>
