import { defineStore } from 'pinia'

import type { Pagination, SelectOption } from '~/types'
import type {
  Branch,
  IContactInfos,
  ICountry,
  ILanguages,
  IResponse,
  IUniversity,
} from '~/types/common'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    isLoading: true,
    countries: {
      list: [] as ICountry[],
      search: [] as ICountry[],
      pagination: {
        next: null as string | null,
        count: 0,
      },
      params: {
        page_size: 25,
        page: 1,
        search: {
          id: '',
          name: '',
        },
      },
      loading: {
        list: true,
        more: false,
      },
    },
    socialLinks: [] as IContactInfos[],
    branchSingle: {} as Branch,
    branchess: [] as [],
    branchSingleLoading: false,
    languages: {
      list: [] as ILanguages[],
      pagination: {
        next: null as string | null,
        count: 0,
      },
      params: {
        page_size: 10,
        page: 1,
        search: {
          id: '',
          name: '',
        },
      },
      loading: {
        list: true,
        more: false,
      },
    },
    universities: {
      list: [] as IUniversity[],
      search: [] as IUniversity[],
      pagination: {
        next: null as string | null,
        count: 0,
      },
      params: {
        page_size: 10,
        page: 1,
        search: {
          id: '',
          name: '',
        },
      },
      loading: {
        list: true,
        more: false,
      },
    },
    headerTitles: {
      about: {
        about_project_title: '',
        about_project_description: '',
        about_project_icon: '',
      },
      why_uzbekistan: {
        why_uzbekistan_title: '',
        why_uzbekistan_description: '',
      },
    },
    cities: {
      length: 0,
      records: [] as SelectOption[], // Original list of all cities
      searchResults: [] as SelectOption[], // Filtered list based on search
      loading: true,
      loadingMore: false,
    },
  }),
  actions: {
    fetchCountries(force?: boolean, merge = false) {
      const domainParams = [
        ['name', 'ilike', this.countries.params.search?.name ?? '%'],
      ]

      if (this.countries.params.search.id) {
        domainParams.push(['id', '=', this.countries.params.search.id])
      }

      return new Promise((resolve, reject) => {
        if (this.countries.list.length && !merge && !force) {
          resolve(this.countries)
        } else {
          if (merge) {
            this.countries.loading.more = true
          } else {
            this.countries.loading.list = true
          }
          useApi()
            .$get<IResponse<ICountry>>(
              '/development/params/res.country/advanced_list',
              {
                params: {
                  domain: JSON.stringify(domainParams),
                  specification: {
                    name: {},
                    code: {},
                  },
                  page: this.countries.params.page,
                  page_size: this.countries.params.page_size,
                },
              }
            )
            .then((res) => {
              this.countries.pagination.next = res.next
              if (merge) {
                this.countries.list = [...this.countries.list, ...res.records]
              } else {
                this.countries.list = res.records

                return res.records
              }
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => {
              this.countries.loading.list = false
              this.countries.loading.more = false
            })
        }
      })
    },
    moreCountries() {
      this.countries.params.page = this.countries.params.page + 1
      this.fetchCountries(false, true)
    },

    fetchLanguages(force?: boolean, merge = false) {
      return new Promise((resolve, reject) => {
        if (this.languages.list.length && !merge && !force) {
          resolve(this.countries)
        } else {
          if (merge) {
            this.languages.loading.more = true
          } else {
            this.languages.loading.list = true
          }
          useApi()
            .$get<IResponse<ICountry>>(
              '/development/params/res.lang/advanced_list',
              {
                params: {
                  domain: [
                    [
                      [
                        'name',
                        'ilike',
                        this.languages.params.search?.name ?? '%',
                      ],
                    ],
                  ],
                  specification: {
                    name: {},
                    code: {},
                  },
                  page: this.languages.params.page,
                  page_size: this.languages.params.page_size,
                },
              }
            )
            .then((res) => {
              this.languages.pagination.next = res.next
              if (merge) {
                this.languages.list = [...this.languages.list, ...res.records]
              } else {
                this.languages.list = res.records
              }
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => {
              this.languages.loading.list = false
              this.languages.loading.more = false
            })
        }
      })
    },
    moreLanguages() {
      this.languages.params.page = this.languages.params.page + 1
      this.fetchLanguages(false, true)
    },

    fetchUniversities(force?: boolean, merge = false) {
      return new Promise((resolve, reject) => {
        if (this.universities.list.length && !merge && !force) {
          resolve(this.universities)
        } else if (merge) {
          this.universities.loading.more = true
        } else {
          this.universities.loading.list = true
        }
        useApi()
          .$get<IResponse<ICountry>>(
            'development/params/university/advanced_list/',
            {
              params: {
                domain: [
                  [
                    [
                      'name',
                      'ilike',
                      this.languages.params.search?.name ?? '%',
                    ],
                  ],
                ],
                specification: {
                  name: {},
                  code: {},
                },
                page: this.languages.params.page,
                page_size: this.languages.params.page_size,
              },
            }
          )
          .then((res) => {
            if (merge) {
              this.countries.list = [...this.countries.list, ...res.records]
            } else {
              this.countries.list = res.records
            }
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchContactInfos() {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        useApi()
          .$get<IResponse<IContactInfos>>(
            '/development/params/firm.contact.info/advanced_list',
            {
              params: {
                specification: {
                  branches: {
                    fields: {
                      street: {},
                      city: {},
                      country_id: { fields: { name: {} } },
                      latitude: {},
                      longitude: {},
                      complete_address: {},
                    },
                  },
                  phone: {},
                  mobile: {},
                  email: {},
                  website: {},
                  facebook: {},
                  linkedin: {},
                  instagram: {},
                  youtube: {},
                  telegram: {},
                },
              },
            }
          )
          .then((res) => {
            this.socialLinks = res.records
            this.isLoading = false
            resolve(res)
          })
          .catch((err) => {
            this.isLoading = false
            reject(err)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },

    fetchBranch(id: number) {
      this.branchSingleLoading = false

      useApi()
        .$get<IResponse<Branch>>(
          '/development/params/branch.address/advanced_list/',
          {
            params: {
              domain: id ? JSON.stringify([['id', '=', id]]) : [],
              specification: {
                contact_id: {
                  fields: {
                    phone: {},
                    mobile: {},
                    email: {},
                    website: {},
                    facebook: {},
                    linkedin: {},
                    instagram: {},
                    youtube: {},
                    telegram: {},
                  },
                },
                longitude: {},
                latitude: {},
                complete_address: {},
              },
            },
          }
        )
        .then((res) => {
          this.branchSingle = res.records?.[0]
        })
        .finally(() => {
          this.branchSingleLoading = false
        })
    },

    fetchBranches() {
      this.branchSingleLoading = false

      useApi()
        .$get<IResponse<Branch>>(
          '/development/params/branch.address/advanced_list/',
          {
            params: {
              specification: {
                contact_id: {
                  fields: {
                    phone: {},
                    mobile: {},
                    email: {},
                    website: {},
                    facebook: {},
                    linkedin: {},
                    instagram: {},
                    youtube: {},
                    telegram: {},
                  },
                },
                latitude: {},
                longitude: {},
                complete_address: {},
              },
            },
          }
        )
        .then((res) => {
          this.branchess = res.records
        })
        .finally(() => {
          this.branchSingleLoading = false
        })
    },

    fetchCities(countryId: string | number, pagination: Pagination) {
      this.cities.loading = true
      this.cities.loadingMore = pagination.page > 1

      const domainParams = [['country_id', '=', Number(countryId)]]

      if (pagination?.query) {
        domainParams.push(['name', 'ilike', pagination.query])
      }

      useApi()
        .$get<IResponse<SelectOption>>(
          '/development/params/res.country.state/advanced_list/',
          {
            params: {
              domain: JSON.stringify(domainParams, null, 2),
              specification: { name: {} },
              page_size: 400,
            },
          }
        )
        .then((res) => {
          if (pagination.page > 1) {
            this.cities.records = [...this.cities.records, ...res.records]
          } else {
            this.cities.records = res.records
          }

          this.cities.length = res.length
        })
        .finally(() => {
          this.cities.loading = false
          this.cities.loadingMore = false
        })
    },

    searchCities(query: string) {
      if (!query) {
        this.cities.searchResults = this.cities.records
        return
      }

      this.cities.searchResults = this.cities.records.filter((city) =>
        city.name.toLowerCase().includes(query.toLowerCase())
      )
    },
  },
})
