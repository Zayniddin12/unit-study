<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <!--    <div class="mb-6">-->
    <!--      <SectionsProgramsFilterWithTab-->
    <!--        is-program-->
    <!--        @submit="(data) => getData(data)"-->
    <!--      />-->
    <!--    </div>-->
    <div>
      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <template v-if="loading">
            <CardProgram
              v-for="(card, index) in 6"
              :key="index"
              :no-university="false"
              v-bind="{ card }"
              class="mb-4 last:mb-0"
              loading
            />
          </template>
          <template v-if="!loading && list?.length">
            <CardProgram
              v-for="(card, index) in list"
              :key="index"
              :no-university="false"
              v-bind="{ card }"
              is-extra
              class="mb-4 last:mb-0"
            />
          </template>

          <template v-if="!loading && !list?.length">
            <div>
              <EmptyProgram />
            </div>
          </template>
        </div>
      </Transition>
      <!--      <div-->
      <!--        v-if="paginationData.total > paginationData.limit"-->
      <!--        class="mt-6 flex justify-end"-->
      <!--      >-->
      <!--        <UIPagination-->
      <!--          :total="paginationData.total"-->
      <!--          :limit="paginationData.limit"-->
      <!--          :current-page="paginationData.currentPage"-->
      <!--          pagination-buttons-->
      <!--          @input="pageChange"-->
      <!--        />-->
      <!--      </div>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// import useUpdateRouteQuery from '~/composables/useQueryChange'
import { useUniversityStore } from '~/store/university'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const route = useRoute()
const universityStore = useUniversityStore()

const single = computed(() => universityStore.single)
// const paginationData = reactive({
//   limit: 3,
//   offset: route.query.page ? +route.query.page * 3 - 3 : 0,
//   currentPage: route.query.page ? +route.query.page : 1,
//   total: 0,
// })

const loading = ref(true)
const list = ref()

// function clean(obj: any) {
//   for (const propName in obj) {
//     if (
//       obj[propName] === null ||
//       obj[propName] === undefined ||
//       obj[propName] === ''
//     ) {
//       delete obj[propName]
//     }
//   }
//   return obj
// }

function getData() {
  loading.value = true
  useApi()
    .$get(
      `/development/params/program/advanced_list/?domain=[["university_id","=",${route.params.slug}]]`,
      {
        params: {
          specification: {
            university_id: {
              fields: {
                logo_url: {},
                name: {},
                city_id: { fields: { id: {}, name: {} } },
                full_location: {},
              },
            },
            name: {},
            education_level_ids: { fields: { id: {}, name: {} } },
            course_of_study_id: { fields: { id: {}, name: {} } },
            form_of_education: { fields: { name: {} } },
            language_of_education: { fields: { name: {} } },
            subject_count: {},
            duration: {},
            contract: {},
            currency: {
              fields: {
                name: {},
              },
            },
            description: {},
            nearest_expire_deadline: {},
          },
        },
      }
    )
    .then((res: IResponse<any>) => {
      list.value = res.records
    })
    .finally(() => (loading.value = false))
}

getData()

// function pageChange(page: number) {
//   paginationData.currentPage = page
//   paginationData.offset = page * paginationData.limit - paginationData.limit
//   useUpdateRouteQuery('page', '' + page)
//   getData()
// }

const breadcrumbRoutes = computed(() => [
  {
    title: t('universities'),
    link: '/universities',
  },
  {
    title: single.value.name,
    link: `/universities/${single.value.id}/`,
  },
  {
    title: t('programs'),
    link: '',
  },
])
</script>

<style scoped>
.router-link-active {
  color: #0067ff;
}
</style>
