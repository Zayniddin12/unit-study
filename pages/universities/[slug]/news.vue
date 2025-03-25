<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <div
      class="grid grid-cols-1 md:grid-cols-2 mt-6 gap-2 lg:gap-4 bg-white/80 border-2 border-white rounded-3xl md:p-6 p-3"
    >
      <template v-if="loading">
        <CardMainNews
          v-for="(card, index) in 8"
          :key="index"
          :class="[
            { 'max-lg:!border-r-0': index === 1 },
            { '!border-r-[0px]': (index - 3) % 4 === 0 },
            { 'max-lg:!border-r-[0px]': (index - 1) % 2 === 0 },
          ]"
          class="!bg-gray"
          loading
        />
      </template>
      <template v-if="!loading && list?.length">
        <CardMainNews
          v-for="(card, index) in list"
          :key="index"
          :news="card"
          card-style="!bg-gray"
          has-more
        />
      </template>
    </div>
    <template v-if="!loading && !list?.length">
      <CNoData class="col-span-3" />
    </template>

    <div
      v-if="paginationData.total > paginationData.limit"
      class="mt-6 flex justify-end"
    >
      <UIPagination
        :current-page="paginationData.currentPage"
        :limit="paginationData.limit"
        :total="paginationData.total"
        pagination-buttons
        @input="pageChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CNoData from '~/components/CNoData.vue'
import useUpdateRouteQuery from '~/composables/useQueryChange'
import { useUniversityStore } from '~/store/university'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const route = useRoute()
const universityStore = useUniversityStore()

const single = computed(() => universityStore.single)
const paginationData = reactive({
  total: 0,
  limit: 8,
  offset: 0,
  currentPage: route.query.page ? +route.query.page : 1,
})
const list = ref()
const loading = ref(true)

function getList() {
  loading.value = true
  useApi()
    .$get(`/development/params/news/advanced_list/`, {
      params: {
        page_size: paginationData.limit,
        page: paginationData.currentPage,
        domain: route.query.slug,
        specification: {
          create_date: {},
          views_count: {},
          subtitle: {},
          name: {},
          university_id: { fields: { id: {}, name: {} } },
          image_url: {},
          tag_ids: { fields: { id: {}, name: {} } },
        },
      },
    })
    .then((res: IResponse<any>) => {
      paginationData.total = res?.count
      list.value = res?.records
    })
    .finally(() => (loading.value = false))
}

getList()

function pageChange(page: number) {
  paginationData.currentPage = page
  useUpdateRouteQuery('page', '' + page)
  getList()
}

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
    title: t('news'),
    link: '',
  },
])
</script>
