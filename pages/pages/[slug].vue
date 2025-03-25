<template>
  <main>
    <Breadcrumb :breadcrumb="breadcrumbMenus" class="mb-8" />

    <section class="max-w-[982px] px-4 mx-auto mb-10 md:mb-16">
      <div class="w-full bg-white rounded-3xl p-6">
        <h2
          v-if="data?.records?.[0]?.title"
          class="mb-4 text-dark font-bold text-[28px] leading-140"
        >
          {{ data?.records?.[0]?.title }}
        </h2>
        <div
          class="text-xl font-normal text-dark leading-140 vhtml-text"
          v-html="formatRichText(data?.records?.[0]?.body ?? '')"
        />
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import Breadcrumb from '~/components/UI/Breadcrumb.vue'
import type { IResponse, StaticPage } from '~/types/common'
import { formatRichText } from '~/utils'

const route = useRoute()

const { data, error } = await useAsyncData<IResponse<StaticPage>, unknown>(
  'static-pages',
  () =>
    useApi().$get(
      `/development/params/unitstudy.${route?.params?.slug}/advanced_list`,
      {
        params: {
          specification: { body: {}, title: {} },
        },
      }
    )
)

const breadcrumbMenus = computed(() => [
  { title: data?.value.records?.[0]?.title || '', link: '/materials' },
])

if (error.value) {
  showError({ statusCode: 404 })
}
useSeoMeta({
  title: () => data?.value?.title,
  ogTitle: () => data?.value?.title,
  description: () => formatRichText(data?.value?.body),
  ogDescription: () => formatRichText(data?.value?.body),
  ogImage: () => data?.value?.banner,
})
</script>

<style>
.vhtml-text p {
  font-style: normal;
  font-size: 14px;
  line-height: 140%;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #181818;
  word-break: break-word;
}

.vhtml-text p:first-child {
  margin-bottom: 4px;
}

.vhtml-text a {
  color: #181818;
}

.vhtml-text a:hover {
  text-decoration: underline;
}

.vhtml-text img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 20px 0;
}

.vhtml-text blockquote {
  margin: 20px 0;
  padding: 16px 16px 16px 64px;
  position: relative;
  background: #181818;
  border-radius: 20px;
}

.vhtml-text blockquote p {
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 8px;
}

.vhtml-text blockquote p,
.vhtml-text blockquote {
  font-size: 16px;
  line-height: 140%;
  color: #f7f9fa;
  font-style: italic;
}

.vhtml-text blockquote:after {
  content: '\e947';
  font-family: icomoon;
  position: absolute;
  left: 20px;
  top: 20px;
  color: #181818;
  font-size: 20px;
  line-height: 20px;
}

.vhtml-text ol li,
.vhtml-text ul li {
  font-size: 14px;
  line-height: 140%;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #181818;
}

.vhtml-text h1 {
  @apply mb-5 font-bold text-xl md:text-2xl;
}

.vhtml-text h2 {
  @apply mt-4 mb-2 !text-lg font-medium;
}

.vhtml-text ul,
.vhtml-text ol {
  padding-left: 20px;
  margin: 10px 0;
}

.vhtml-text ul {
  list-style: disc;
}

.vhtml-text ol {
  list-style: auto;
}

@media screen and (max-width: 768px) {
  .vhtml-text p,
  .vhtml-text blockquote {
    font-size: 16px;
    line-height: 140%;
  }

  .vhtml-text img,
  .vhtml-text blockquote,
  .vhtml-text ul,
  .vhtml-text ol {
    margin: 12px 0;
  }
}

@media (max-width: 640px) {
  .vhtml-text ol li,
  .vhtml-text blockquote,
  .vhtml-text ul li {
    font-size: 14px !important;
  }
}
</style>
