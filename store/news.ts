import { defineStore } from 'pinia'

import type { INews, INewsResponse } from '~/types/common'

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    newsList: [] as INews[],
    count: 0,
    next: false,
    isLoading: true,
    current: 1,
  }),
  actions: {
    fetchNewsList(
      page?: number,
      size?: number,
      specification = {
        create_date: {},
        content: {},
        subtitle: {},
        views_count: {},
        name: {},
        image_url: {},
      }
    ) {
      return new Promise((resolve, reject) => {
        const params = { page_size: size, page, specification }
        useApi()
          .$get<INewsResponse>(
            `development/params/news/advanced_list?order="id asc"`,
            {
              params,
            }
          )
          .then((res) => {
            this.newsList = res.records
            this.count = res.length
            this.next = res.next
            this.current = res.current
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.isLoading = false))
      })
    },
  },
})
