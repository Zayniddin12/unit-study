import { defineStore } from 'pinia'

import type { UserApplication } from '~/store/application'
import type { Pagination } from '~/types'
import type { IApplication } from '~/types/application'
import type { IProfileAndCabinet, IResponse } from '~/types/common'

type State = {
  cabinetList: IProfileAndCabinet[]
  cabinetApplication: IApplication[]
  cabinetApplicationCount: number
  cabinetServiceLoading: boolean
  cabinetServiceList: any[]
  cabinetApplicationLoading: boolean
  cabinetApplicationLoadingMore: boolean
  cabinetSkills: IProfileAndCabinet[]
  cabinetSkillsLoading: boolean
  programId: string | number
  step: number
  applicationSingle: UserApplication
  applicationSingleLoading: boolean
  applicationEditLoading: boolean
}

export const cabinetStore = defineStore('cabinetStore', {
  state: (): State => ({
    cabinetList: [],
    cabinetApplication: [],
    cabinetApplicationCount: 0,
    cabinetApplicationLoadingMore: false,
    cabinetServiceLoading: false,
    cabinetServiceList: [],
    cabinetApplicationLoading: true,
    cabinetSkills: [],
    cabinetSkillsLoading: true,
    programId: '',
    step: 0,
    applicationSingle: {},
    applicationSingleLoading: true,
    applicationEditLoading: false,
  }),

  actions: {
    fetchCabinetApplication(userId: number, pagination: Pagination) {
      this.cabinetApplicationLoading = pagination.page === 1
      this.cabinetApplicationLoadingMore = pagination.page > 1
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IApplication>>(
            `development/params/application/advanced_list?specification={
                        "user_id": {},
                        "want_university_country_id": {},
                        "wanted_level_education": {},
                        "program": {},
                        "enrollment_date": {},
                        "want_university_id": {
                            "fields": {
                                "id": {},
                                "name": {},
                                "logo_url": {}
                            }
                        },
                        "diploma": {
                            "fields": {
                                "filename": {},
                                "file_url": {}
                            }
                        },
                        "diploma_rejected_reason": {},
                        "language_certificate": {
                            "fields": {
                                "filename": {},
                                "file_url": {}
                            }
                        },
                        "language_certificate_rejected_reason": {},
                        "other_certification": {
                            "certification_name": {},
                            "file_url": {}
                        },
                        "other_certification_rejected_reason": {},
                        "links": {},
                        "description": {},
                        "stage_id": {
                          "fields": {
                            "name": {}
                           }
                        },
                        "updated": {}
                    }&domain=[["user_id","=",${userId}], ["application_type","=","program"]]&page_size=10&page=${pagination.page}`
          )
          .then((res) => {
            if (pagination.page > 1) {
              this.cabinetApplication = [
                ...this.cabinetApplication,
                ...res.records,
              ]
            } else {
              this.cabinetApplication = res.records
            }
            this.cabinetApplicationCount = res.length
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.cabinetApplicationLoading = false
            this.cabinetApplicationLoadingMore = false
          })
      })
    },

    fetchCabinetGrants(userId: number, pagination: Pagination) {
      this.cabinetApplicationLoading = pagination.page === 1
      this.cabinetApplicationLoadingMore = pagination.page > 1
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IApplication>>(
            `development/params/application/advanced_list?specification={
                        "user_id": {},
                        "want_university_country_id": {},
                        "wanted_level_education": {},
                        "grant": {},
                        "enrollment_date": {},
                        "want_university_id": {
                            "fields": {
                                "id": {},
                                "name": {},
                                "logo_url": {}
                            }
                        },
                        "diploma": {
                            "fields": {
                                "filename": {},
                                "file_url": {}
                            }
                        },
                        "diploma_rejected_reason": {},
                        "language_certificate": {
                            "fields": {
                                "filename": {},
                                "file_url": {}
                            }
                        },
                        "language_certificate_rejected_reason": {},
                        "other_certification": {
                            "certification_name": {},
                            "file_url": {}
                        },
                        "other_certification_rejected_reason": {},
                        "links": {},
                        "description": {},
                        "stage_id": {
                          "fields": {
                            "name": {}
                           }
                        },
                        "updated": {}
                    }&domain=[["user_id","=",${userId}], ["application_type","=","grant"]]&page_size=10&page=${pagination.page}`
          )
          .then((res) => {
            if (pagination.page > 1) {
              this.cabinetApplication = [
                ...this.cabinetApplication,
                ...res.records,
              ]
            } else {
              this.cabinetApplication = res.records
            }
            this.cabinetApplicationCount = res.length
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.cabinetApplicationLoading = false
            this.cabinetApplicationLoadingMore = false
          })
      })
    },

    fetchCabinetSkills(userId: number) {
      this.cabinetSkillsLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IProfileAndCabinet>>(
            `/development/params/user.education/advanced_list?specification={
              "user_id": {},
              "education_level_id": {
                "fields": {
                      "name":{}
                  }
              },
              "end_university_country_id": {
                "fields": {
                      "name":{}
                  }
              },
              "end_university_id": {
                "fields": {
                      "name":{}
                  }
              },
              "extra_university": {},
              "start_year": {},
              "end_year": {},
              "native_language_id": {
                "fields": {
                      "name":{}
                  }
              },
              "other_language_ids": {
                  "fields": {
                      "name":{}
                  }
              }
             }&domain=[["user_id","=", ${userId}]]`
          )
          .then((res) => {
            this.cabinetSkills = res?.records
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.cabinetSkillsLoading = false
          })
      })
    },

    setProgramId(payload: string) {
      this.programId = payload
    },

    fetchApplicationSingle(id: number) {
      this.applicationSingleLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<UserApplication>>(
            `development/params/application/advanced_list`,
            {
              params: {
                specification: {
                  user_id: {},
                  want_university_country_id: {
                    fields: {
                      name: {},
                    },
                  },
                  wanted_level_education: {
                    fields: {
                      name: {},
                    },
                  },
                  enrollment_date: {},
                  want_university_id: {
                    fields: {
                      name: {},
                    },
                  },
                  diploma: {
                    fields: {
                      filename: {},
                      file_url: {},
                      filesize: {},
                    },
                  },
                  motivation_letter: {
                    fields: {
                      filename: {},
                      file_url: {},
                      filesize: {},
                    },
                  },
                  language_certificate: {
                    fields: {
                      filename: {},
                      file_url: {},
                      filesize: {},
                    },
                  },
                  other_certification: {
                    fields: {
                      filename: {},
                      file_url: {},
                      filesize: {},
                    },
                  },
                  links: {},
                  description: {},
                  planned_enrollment_year: {},
                  program: {
                    fields: {
                      name: {},
                    },
                  },
                  grant: {
                    fields: {
                      display_name: {},
                    },
                  },
                  stage_id: {
                    fields: {
                      name: {},
                    },
                  },
                },
                domain: [[['id', '=', id]]],
              },
            }
          )
          .then((res) => {
            this.applicationSingle = res?.records?.[0]
            resolve(res)
          })
          .catch(reject)
          .finally(() => {
            this.applicationSingleLoading = false
          })
      })
    },

    editApplication(data: Record<string, string | unknown>) {
      this.applicationEditLoading = true

      return new Promise((resolve, reject) => {
        useApi()
          .$post('development/application/advanced_update', {
            body: JSON.stringify(data),
          })
          .then(resolve)
          .catch(reject)
          .finally(() => (this.applicationEditLoading = false))
      })
    },

    editGrant(data: Record<string, string | unknown>) {
      this.applicationEditLoading = true

      return new Promise((resolve, reject) => {
        useApi()
          .$post('development/application/advanced_update', {
            body: JSON.stringify(data),
          })
          .then(resolve)
          .catch(reject)
          .finally(() => (this.applicationEditLoading = false))
      })
    },

    fetchService(id: number) {
      this.cabinetServiceLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`development/params/order/advanced_list/`, {
            params: {
              specification: {
                service_id: {
                  fields: {
                    name: {},
                    price: {},
                    currency_id: {
                      fields: {
                        id: {},
                        name: {},
                      },
                    },
                    item_ids: {
                      fields: {
                        name: {},
                        id: {},
                      },
                    },
                  },
                },
                related_service_id: {
                  fields: {
                    name: {},
                    description: {},
                    image_url: {},
                  },
                },
                user_id: {},
                application_id: {},
                stage_id: {
                  fields: {
                    id: {},
                    name: {},
                  },
                },
                payment_method: {},
                create_date: {},
              },
              domain: JSON.stringify([['user_id', 'in', [id]]]),
            },
          })
          .then((res) => {
            this.cabinetServiceList = res.records
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.cabinetServiceLoading = false
          })
      })
    },
  },
})
