import { defineStore } from 'pinia'

import type {
  IFooter,
  IgetTitles,
  ILivingCondition,
  IMoveList,
  IReview,
  IStaticPageSingle,
  IStats,
  ISteps,
  IStudyPeriod,
  IStudyType,
  IWhyUzbSlider,
} from '~/types/common'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    studyPeriodCount: 0,
    footer: [] as IFooter[],
    staticPageSingle: {} as IStaticPageSingle | null,
    whyUzbSlider: [] as IWhyUzbSlider[],
    stats: [] as IStats[],
    steps: [] as ISteps[],
    studyTypes: [] as IStudyType[],
    studyPeriod: [] as IStudyPeriod[],
    livingConditions: [] as ILivingCondition[],
    review: [] as IReview[],
    moveList: [] as IMoveList[],
    fetchTitles: [] as IgetTitles[],
    loading: false,
  }),
  actions: {
    fetchStaticPageSingle(slug: string) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/pages/${slug}/`)
          .then((res: any) => {
            this.staticPageSingle = res
            resolve(res)
          })
          .catch((err) => {
            this.staticPageSingle = null
            reject(err)
          })
          .finally(() => (this.loading = false))
      })
    },
    fetchStats() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/stats/`)
          .then((res: any) => {
            this.stats = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchSteps() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/steps/`)
          .then((res: any) => {
            this.steps = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchStudyType() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/study_form/`)
          .then((res: any) => {
            this.studyTypes = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchStudyPeriod(
      params?: { limit: number; offset: number },
      force?: boolean,
      merge = true
    ) {
      return new Promise((resolve, reject) => {
        if (this.studyPeriod.length && !merge && !force) {
          resolve(this.studyPeriod)
        } else {
          useApi()
            .$get(`common/duration_type/`, {
              params,
            })
            .then((res: any) => {
              if (merge) {
                this.studyPeriod = [...this.studyPeriod, ...res.results]
              } else {
                this.studyPeriod = []
                this.studyPeriod = res.results
              }
              resolve(res)
              this.studyPeriodCount = res.count
            })
            .catch((err) => reject(err))
        }
      })
    },
    fetchlivingConditions() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`/development/params/advantage/advanced_list/`, {
            params: {
              specification: { icon_url: {}, title: {}, description: {} },
            },
          })
          .then((res: any) => {
            this.livingConditions = res.records
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchReview() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`/development/params/review/advanced_list/`, {
            params: {
              specification: {
                image_url: {},
                full_name: {},
                university_id: { name: {} },
                description: {},
                rating: {},
              },
            },
          })
          .then((res: any) => {
            this.review = res.records
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    fetchMoveUzb() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/move-to-uzbekistan-list/`)
          .then((res: any) => {
            this.moveList = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
