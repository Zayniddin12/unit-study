<template>
  <div v-if="list?.length" class="py-7 md:py-16 bg-white">
    <div class="container">
      <UISectionTitle
        :label-class="'md:text-48 text-xl font-bold leading-116 !text-left'"
        :title="$t('news')"
      />
      <template v-if="list?.length">
        <div
          v-for="(item, key) in list?.slice(0, 1)"
          :key
          class="flex gap-10 md:mt-12 mt-4 max-[860px]:flex-col"
        >
          <div class="min-[860px]:w-1/2">
            <img
              :src="item?.image_url || '/images/default/default.svg'"
              alt="new img"
              class="rounded-[20px] w-full aspect-video object-cover"
              loading="lazy"
            />
          </div>
          <div class="min-[860px]:w-1/2 relative">
            <p class="text-dark text-base font-normal md:mb-7 mb-3">
              {{
                dayjs(item?.create_date)
                  .locale(
                    locale === 'uz' ? 'uz-latn' : locale === 'ru' ? 'ru' : 'en'
                  )
                  .format('DD MMMM, YYYY')
              }}
            </p>
            <h3
              class="text-dark font-semibold leading-130 md:text-3xl text-lg mb-4 line-clamp-2"
            >
              {{ item?.name }}
            </h3>
            <p
              v-if="item?.content"
              class="text-dark font-normal leading-130 text-sm"
            >
              {{ richTextPurify(item?.content, 200) }}...
            </p>
            <UIButton
              :icon="'icon-chevron text-xl -rotate-90'"
              :text="t('more')"
              class="min-[860px]:!absolute max-[860px]:mt-4 !left-0 !bottom-0"
              variant="outline"
              @click="navigateTo('/news')"
            />
          </div>
        </div>
      </template>

      <div
        class="grid md:grid-cols-2 lg:grid-cols-3 mt-5 md:mt-8 gap-5 -translate-x-3.5"
      >
        <template v-if="!loading && list?.length">
          <CardMainNews
            v-for="card in list.slice(1, 4)"
            :key="card?.id"
            :news="card"
            card-style="!bg-white"
            is-main
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/en'

import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useNewsStore } from '~/store/news'

const fetchNewsList = useNewsStore()
const { locale, t } = useI18n()

const list = computed(() => fetchNewsList?.newsList)
const loading = computed(() => useNewsStore().isLoading)
fetchNewsList.fetchNewsList()
</script>
