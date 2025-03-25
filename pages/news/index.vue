<template>
  <div class="bg-white-200">
    <Breadcrumb :breadcrumb="breadcrumbMenus" />
    <div class="pb-6 md:pb-16">
      <div class="container">
        <div class="mt-8">
          <UIWrapperTitle :subtitle="$t('news_subtitle')" :title="$t('news')" />
        </div>
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-5 md:mt-8">
          <template v-if="isLoading">
            <UIShimmer
              v-for="n of 6"
              :key="n"
              :border-radius="16"
              height="308px"
              loading
              width="100%"
            />
          </template>

          <CardMainNews
            v-for="item of newsList"
            v-else
            :key="item.id"
            :news="item"
          />
        </div>
        <div
          v-if="count > 6"
          class="mt-6 flex justify-end max-sm:flex-wrap max-sm:pb-6 gap-5"
        >
          <div class="flex gap-2 items-center">
            <p>{{ $t('show') }}</p>
            <FormSelect
              v-model="item"
              :options="degrees"
              chevron-class="!text-2xl text-gray-100"
              class="w-full"
              label-key="name"
              placeholder=" "
              selected-option-styles="!bg-transparent border-none !rounded-lg !py-2 !px-3"
              value-key="id"
              @on-select="onSelect"
            />
          </div>

          <UIPagination
            v-if="degrees[item - 1].name < count"
            :current-page="current"
            :limit="degrees[item - 1].name"
            :total="count"
            pagination-buttons
            @input="pageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import Breadcrumb from '~/components/UI/Breadcrumb.vue'
import { useNewsStore } from '~/store/news'

const fetchNewsList = useNewsStore()

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const degree = ref(+route.query.content || 6)
const { count, current, next } = storeToRefs(useNewsStore())
const queries = reactive({
  page: 1,
  content: degree.value,
  ...route.query,
})

const newsList = computed(() => fetchNewsList?.newsList)
const isLoading = computed(() => useNewsStore().isLoading)
const breadcrumbMenus = [
  {
    title: t('news'),
    link: '/news',
  },
]
const item = ref(1)
const degrees = [
  {
    id: 1,
    name: 6,
  },
  {
    id: 2,
    name: 8,
  },
  {
    id: 3,
    name: 12,
  },
]

const pageChange = (page: number) => {
  queries.page = page
  queries.content = degree.value
  router.push({ query: queries })
}

function onSelect(item) {
  degree.value = item.name
}

watchEffect(() => {
  fetchNewsList.fetchNewsList(queries.page, degree.value)
})

watch(
  degree,
  () => {
    queries.page = 1
    queries.content = degree.value
    router.push({ query: queries })
    fetchNewsList.fetchNewsList(queries.page, degree.value)
  },
  { deep: true }
)

onMounted(() => {
  const foundItem = degrees.find((item) => item.name === +route.query.content)
  item.value = foundItem ? foundItem.id : 1
})
fetchNewsList.fetchNewsList(queries.page, degree.value)

useSeoMeta({
  title: t('meta.news.title'),
  description: t('meta.news.info'),
})
</script>
