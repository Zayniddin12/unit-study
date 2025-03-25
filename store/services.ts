export const useServicesStore = defineStore('servicesStore', {
  state: () => ({
    services: [] as any,
    singleService: [] as any,
    singleServiceLoading: true,
    servicesLoading: true,
    baseServices: [] as any,
    baseServicesLoading: true,
    mainServices: [] as any,
    mainServicesLoading: true,
    singleBaseServiceLoading: true,
    singleBaseService: [] as any,
  }),
  actions: {
    fetchServices() {
      this.servicesLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/development/params/static.service/advanced_list', {
            params: {
              specification: {
                name: {},
                sub_title: {},
                icon_url: {},
              },
            },
          })
          .then((res) => {
            this.services = res?.records
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.servicesLoading = false))
      })
    },
    fetchServicesById(id: number) {
      this.singleServiceLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get(
            `/development/params/static.service/advanced_list?domain=[["id","=",${id}]]`,
            {
              params: {
                specification: {
                  name: {},
                  description: {},
                  sub_title: {},
                  icon_url: {},
                  image_url: {},
                  body: {},
                },
              },
            }
          )
          .then((res) => {
            this.singleService = res?.records[0]
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.singleServiceLoading = false))
      })
    },
    fetchBaseServices() {
      this.baseServicesLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`development/params/base.service/advanced_list`, {
            params: {
              specification: {
                name: {},
                description: {},
                price: {},
                currency_id: {
                  fields: {
                    name: {},
                  },
                },
                icon_url: {},
                image_url: {},
                body: {},
              },
            },
          })
          .then((res) => {
            this.baseServices = res?.records
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.baseServicesLoading = false))
      })
    },
    fetchBaseServicesById(id: number) {
      this.singleBaseServiceLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get(
            `development/params/base.service/advanced_list?domain=[["id","=",${id}]]`,
            {
              params: {
                specification: {
                  name: {},
                  description: {},
                  price: {},
                  currency_id: {
                    fields: {
                      name: {},
                    },
                  },
                  icon_url: {},
                  image_url: {},
                  body: {},
                },
              },
            }
          )
          .then((res) => {
            this.singleBaseService = res?.records[0]
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.singleBaseServiceLoading = false))
      })
    },
    fetchMainServices() {
      this.mainServicesLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/development/params/service.service/advanced_list', {
            params: {
              specification: {
                name: {},
                description: {},
                image_url: {},
                tab_ids: {
                  fields: {
                    name: {},
                    price: {},
                    is_bought: {},
                    currency_id: {
                      fields: {
                        name: {},
                      },
                    },
                    item_ids: {
                      fields: {
                        name: {},
                      },
                    },
                  },
                },
                statistic_ids: {
                  fields: {
                    name: {},
                    number: {},
                    icon_url: {},
                  },
                },
              },
            },
          })
          .then((res) => {
            this.mainServices = res.records
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.mainServicesLoading = false))
      })
    },
  },
})
