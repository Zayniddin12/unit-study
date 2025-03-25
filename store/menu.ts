import { defineStore } from 'pinia'

import type { IMenu, TMenu, TMenuArticle, TMenuCategory } from '~/types/menu'

export const useMenuStore = defineStore('menu', {
  state() {
    return {
      activeMenu: '' as TMenu,
      menuCategory: [] as Array<TMenuCategory>,
      menuArticle: [] as Array<TMenuArticle>,
      menu: [] as Array<IMenu>,
    }
  },

  actions: {
    fetchMenuArticleByCategoryId(id: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<Array<TMenuArticle>>(`/common/menu-articles/?category=${id}`)
          .then((res) => {
            this.menuArticle = res
            resolve(res)
          })
          .catch((res) => reject(res))
      })
    },
  },
})
