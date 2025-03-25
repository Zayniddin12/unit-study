import { number } from '@intlify/core-base'
import { defineStore } from 'pinia'

import type { Pagination } from '~/types'
import type { IResponse, IUniversity } from '~/types/common'

export const useUniversityStore = defineStore('universityStore', {
  state: () => ({
    single: {} as IUniversity,
    singleLoading: false,
    brief: [] as IUniversity[],
    universities: {
      records: [] as IUniversity[],
      length: 0,
    },
    universitiesLoading: true,
    briefPagination: {
      next: null as string | null,
      count: 0,
    },
    briefLoading: {
      list: true,
      more: false,
    },
    briefParams: {
      limit: 10,
      offset: 0,
    },
  }),
  actions: {
    fetchSingle(id: string | string[]) {
      this.singleLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`/development/params/university/advanced_read`, {
            params: {
              object_id: id,
              specification: {
                name: {},
                slug: {},
                logo_url: {},
                image_url: {},
                country_id: { fields: { id: {}, name: {} } },
                city_id: { fields: { id: {}, name: {} } },
                location: {},
                website: {},
                establishment: {},
                local_student_count: {},
                foreign_student_count: {},
                all_student_count: {},
                description: {},
                faculty_ids: { fields: { id: {}, name: {} } },
                faculty_counts: {},
                speciality_ids: { fields: { id: {}, name: {} } },
                department_ids: { fields: { id: {}, name: {} } },
                department_counts: {},
                form_of_education_id: { fields: { id: {}, name: {} } },
                professor_count: {},
                doctor_count: {},
                teacher_count: {},
                full_location: {},
                phone: {},
                email: {},
                candidate_count: {},
                associate_professor_count: {},
                all_teacher_count: {},
                bachelor_count: {},
                master_count: {},
                speciality_count: {},
                higher_personal_count: {},
                longitude: {},
                latitude: {},
                facebook: {},
                instagram: {},
                youtube: {},
                telegram: {},
              },
            },
          })
          .then((res) => {
            this.single = res[0]
            resolve(res)
          })
          .catch(reject)
          .finally(() => (this.singleLoading = false))
      })
    },

    fetchBrief(params?: { program: number; region?: string }, merge = false) {
      return new Promise((resolve, reject) => {
        if (merge) {
          this.briefLoading.more = true
        } else {
          this.briefLoading.list = true
        }
        useApi()
          .$get(`/university/universities/brief/`, {
            params: {
              ...this.briefParams,
              ...params,
            },
          })
          .then((res) => {
            this.briefPagination.next = res.next
            this.briefPagination.count = res.count
            merge
              ? (this.brief = [...this.brief, ...res.results])
              : (this.brief = res.results)
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.briefLoading.list = false
            this.briefLoading.more = false
          })
      })
    },
    fetchMoreBrief(params?: { program: number; region?: string }) {
      this.briefParams.offset = this.briefParams.limit + this.briefParams.offset
      this.fetchBrief(params, true)
    },

    fetchUniversities(
      pagination: Pagination,
      filter: {
        countryId?: number
        educationLevelId?: number
        subjectId?: number
      } = {}
    ) {
      this.universitiesLoading = true
      return new Promise((resolve, reject) => {
        const params: Record<string, any> = {
          specification: {
            name: {},
            logo_url: {},
            city_id: { fields: { id: {}, name: {} } },
            location: {},
            website: {},
            slug: {},
            programs_count: {},
          },
          page_size: pagination?.page_size ?? 10,
          page: pagination.page,
        }

        // Add the `domain` field only if filter contains values
        const domainFilters = [
          filter.countryId != null
            ? ['country_id.id', '=', filter.countryId]
            : null,
          filter.educationLevelId != null
            ? ['education_level_ids.id', '=', filter.educationLevelId]
            : null,
          filter.subjectId != null
            ? ['subject_ids.id', '=', filter.subjectId]
            : null,
        ].filter(Boolean) // Remove null values

        if (domainFilters.length > 0) {
          params.domain = [domainFilters]
        }

        useApi()
          .$get<IResponse<IUniversity>>(
            '/development/params/university/advanced_list/',
            { params }
          )
          .then((res) => {
            this.universities = res
            resolve(this.universities)
          })
          .catch(reject)
          .finally(() => (this.universitiesLoading = false))
      })
    },
  },
})
