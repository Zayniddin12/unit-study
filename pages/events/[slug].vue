<template>
  <div>
    <div v-if="data" class="bg-gray">
      <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      <CollapseTransition :duration="800">
        <NewsSingle
          v-if="!isNext"
          :data="data[0]"
          :similar-news="related"
          events
        />
      </CollapseTransition>
      <div ref="nextNews" class="h-1" />
    </div>
    <c-no-data v-else class="pt-10" />
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useIntersectionObserver } from '@vueuse/core/index'
import { useI18n } from 'vue-i18n'

import Error from '~/components/Sections/Service/Fee/Error.vue'
import type { INewsSingle } from '~/types/common'

definePageMeta({
  layout: 'news',
})

const nextNews = ref<HTMLElement>()
const contentNews = ref<HTMLElement>()
const { t } = useI18n()
const route = useRoute()
const isNext = ref(false)
const router = useRouter()

const { data, error } = await useAsyncData('news-single', () =>
  useApi().$get<INewsSingle>(
    `/development/params/education.event/advanced_read/`,
    {
      params: {
        object_id: route.params.slug,
        specification: {
          image_url: {},
          name: {},
          description: {},
          country_id: { fields: { id: {}, name: {} } },
          country_state_id: { fields: { id: {}, name: {} } },
          date: {},
          create_date: {},
          tag_ids: { fields: { id: {}, name: {} } },
          view_count: {},
        },
      },
    }
  )
)

const { data: related } = await useAsyncData('related-single', () =>
  useApi().$get<INewsSingle>(
    `/development/params/education.event/advanced_list/`,
    {
      params: {
        domain: [[['tag_ids', 'in', [1, 2, 3, 4, 5]]]],
        specification: {
          image_url: {},
          name: {},
          description: {},
          country_id: { fields: { id: {}, name: {} } },
          country_state_id: { fields: { id: {}, name: {} } },
          date: {},
          tag_ids: { fields: { id: {}, name: {} } },
          view_count: {},
          priority: {},
        },
        region: route.query.region ?? undefined,
      },
    }
  )
)

const breadcrumbRoutes = ref([
  {
    title: t('events'),
    link: '/events',
  },
])
if (error.value) {
  showError({ statusCode: 404 })
}

useSeoMeta({
  title: data?.value[0]?.name,
  description: data?.value[0]?.description,
  ogTitle: data?.value[0]?.name,
  ogDescription: data?.value[0]?.description,
  twitterTitle: data?.value[0]?.name,
  twitterDescription: data?.value[0]?.description,
  ogImage: data?.value[0]?.image_url,
  twitterImage: data?.value[0]?.image_url,
})
</script>

<style>
.linear-white-bg-news {
  background: linear-gradient(
    0deg,
    #f2f3f7 0%,
    rgba(242, 243, 247, 0.8) 50%,
    rgba(242, 243, 247, 0) 100%
  );
}
.static-text > * {
  margin: 0 auto 16px auto !important;
  max-width: 982px;
}

.static-text img,
.static-text blockquote {
  max-width: 100% !important;
}

.static-text p,
.static-text li {
  color: #181818;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  @apply: break-all;
}

.static-text ol,
.static-text ul {
  padding-left: 24px;
  color: #e74c3c !important;
}

.static-text ul li {
  list-style: none;
  position: relative;
  margin-bottom: 8px;
}

.static-text li::before {
  content: '';
  width: 3px;
  height: 3px;
  border-radius: 99px;
  background: #000;
  position: absolute;
  top: 12px;
  left: -16px;
}
.static-text pre span {
  word-break: break-all !important;
  white-space: pre-wrap;
  color: #181818;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}

.overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 27, 66, 0) 0%,
    rgba(0, 27, 67, 0) 23.17%,
    rgba(0, 27, 67, 0.67) 60.94%,
    rgba(0, 27, 67, 0.85) 100%
  );
}

.static-text ol li {
  list-style: none;
}

.static-text a {
  color: #4489f7;
}

.static-text a:hover {
  text-decoration: underline;
}

.static-text img {
  border-radius: 12px;
}

.static-text b {
  font-weight: 500;
}

.static-text h4 {
  color: #4489f7;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  padding-bottom: 12px;
  margin-bottom: 12px !important;
  position: relative;
}

.static-text h4:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  background: #4489f7;
  height: 1px;
  width: 130px;
}

.static-text blockquote {
  margin: 20px 0;
  padding: 24px;
  position: relative;
  background: #e1e8f0;
  border-radius: 20px;
  overflow: hidden;
}

.static-text blockquote p {
  margin-top: 0;
  padding-top: 0;
}

.static-text blockquote p,
.static-text blockquote {
  position: relative;
  z-index: 10;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: #181818;
}

.static-text blockquote h2 {
  position: relative;
  z-index: 10;
  font-size: 20px;
  font-weight: 400;
  color: #121c25;
  line-height: 130%;
}

.static-text blockquote:after {
  content: '\e900';
  font-family: icomoon;
  position: absolute;
  left: 20px;
  top: 24px;
  color: #0067ff;
  opacity: 0.22;
  font-size: 20px;
  line-height: 20px;
}

/*.static-text blockquote:before {*/
/*  content: '';*/
/*  position: absolute;*/
/*  left: 0;*/
/*  top: 0;*/
/*  width: 4px;*/
/*  height: 100%;*/
/*  background: #4489f7;*/
/*}*/
</style>
