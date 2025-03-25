export const useCardStore = defineStore('useCardStore', {
  state: () => ({
    cards: [] as any[],
    cardsLoading: false,
    cardIdentity: {
      vendor: '',
      source: '',
    },
  }),
  actions: {
    fetchCards() {
      this.cardsLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/card/list')
          .then((response) => {
            this.cards = response?.items
            resolve(response)
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.cardsLoading = false
          })
      })
    },
    identifyCard(digits: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`/card/identify?card_number=${digits}`)
          .then((res) => {
            this.cardIdentity = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
