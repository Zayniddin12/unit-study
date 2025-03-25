<template>
  <div class="bg-gray">
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <NewsSingle
      v-if="!isNext"
      :data="single"
      :similar-news="related"
      v-bind="{ loading }"
    />
    <div
      v-if="single?.next_record_id && scrollPercent !== 100 && !isNext"
      class="flex-center gap-4 container"
    >
      <div class="relative w-fit">
        <client-only>
          <circle-progress
            style="width: 64px; height: 64px"
            :is-bg-shadow="true"
            :bg-shadow="{
              inset: true,
              vertical: 2,
              horizontal: 2,
              blur: 4,
              opacity: 0.4,
              color: '#D62F75',
            }"
            empty-color="#F24E911F"
            fill-color="#D62F75"
            :percent="scrollPercent"
          />
        </client-only>
        <img
          src="/images/cursor.png"
          alt="cursor"
          class="absolute-center size-7"
        />
      </div>
      <p class="w-fit">{{ $t('go_to_next_news') }}</p>
    </div>

    <div
      v-if="single?.next_record_id"
      ref="contentNews"
      class="h-[400px] relative overflow-hidden"
    >
      <Transition name="fade">
        <div
          v-if="!isNext"
          class="linear-white-bg-news w-full h-full absolute top-0 left-0 z-50"
        />
      </Transition>
      <NewsSingle :data="single" :similar-news />
    </div>
    <div ref="nextNews" class="h-1" />
    <LayoutsLoader :custom-loading="loading" />
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import CircleProgress from 'vue3-circle-progress'

import type { INewsSingle } from '~/types/common'

definePageMeta({
  layout: 'news',
})

const nextNews = ref<HTMLElement>()
const contentNews = ref<HTMLElement>()
const { t } = useI18n()
const route = useRoute()
const isNext = ref(false)
const loading = ref(true)
const router = useRouter()
const single = ref(null)
const related = ref<INewsSingle>()

function getSingle() {
  loading.value = true
  useApi()
    .$get<INewsSingle>(
      `/development/params/news/advanced_read?object_id=${route.params.slug}`,
      {
        params: {
          specification: {
            slug: {},
            name: {},
            create_date: {},
            views_count: {},
            subtitle: {},
            content: {},
            university_id: { fields: { id: {}, name: {} } },
            image_url: {},
            tag_ids: { fields: { id: {}, name: {} } },
            next_record_id: {},
            previous_record_id: {},
          },
        },
      }
    )
    .then((res) => {
      single.value = res?.[0]
      loading.value = false
    })
    .finally(() => {
      loading.value = false
    })
}

getSingle()

function getRelatedProjects() {
  useApi()
    .$get<INewsSingle>(`/development/params /news/advanced_list`, {
      params: {
        domain: [
          [
            ['slug', 'ilike', single.value?.slug],
            ['id', '!=', route.params.slug],
          ],
        ],
        specification: {
          create_date: {},
          views_count: {},
          subtitle: {},
          name: {},
          university_id: { fields: { id: {}, name: {} } },
          image_url: {},
          tag_ids: { fields: { id: {}, name: {} } },
        },
        region: route.query.region ?? undefined,
      },
    })
    .then((res) => {
      related.value = res
    })
}

// const { data: related } = await useAsyncData('related-single', () =>
//   useApi().$get<INewsSingle>(`/development/params/news/advanced_list`, {
//     params: {
//       domain: [
//         [
//           ['slug', 'ilike', single.value?.slug],
//           ['id', '!=', route.params.slug],
//         ],
//       ],
//       specification: {
//         create_date: {},
//         visits: {},
//         subtitle: {},
//         teaser: {},
//         university_id: { fields: { id: {}, name: {} } },
//         image_url: {},
//         tag_ids: { fields: { id: {}, name: {} } },
//       },
//       region: route.query.region ?? undefined,
//     },
//   })
// )
const breadcrumbRoutes = computed(() => [
  {
    title: t('news'),
    link: '/news',
  },
  {
    title: single.value?.name,
  },
])

useSeoMeta({
  title: single.value?.name,
  description: single.value?.description,
  ogTitle: single.value?.name,
  ogDescription: single.value?.description,
  twitterTitle: single.value?.name,
  twitterDescription: single.value?.description,
  ogImage: single.value?.image_url,
  twitterImage: single.value?.image_url,
})

let scrollNextTimeOut: ReturnType<typeof setTimeout> | undefined

useIntersectionObserver(nextNews, ([{ isIntersecting }]) => {
  if (process.client) {
    if (isIntersecting) {
      scrollNextTimeOut = setTimeout(() => {
        loading.value = true
        if (single.value?.next_record_id) {
          contentNews.value.style.height = 'auto'
          isNext.value = true
          window.scrollTo({ top: 0, behavior: 'smooth' })
          if (single.value.next_record_id) {
            router.push(`${single.value?.next_record_id}`)
          }

          // Uncomment this if you want to scroll `nextNews` into view
          // setTimeout(() => {
          //   nextNews.value.scrollIntoView({ behavior: 'smooth', top: 0 });
          // }, 500);
        } else {
          loading.value = false
        }
      }, 1000)
    } else {
      clearTimeout(scrollNextTimeOut)
    }
  }
})

const scrollPercent = ref<number>(0)
const handleScroll = () => {
  const scrollTop = window.scrollY
  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight
  scrollPercent.value = (scrollTop / windowHeight) * 100
}
onMounted(() => {
  getSingle()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
watch(
  single,
  () => {
    if (single.value?.slug) {
      getRelatedProjects()
    }
  },
  { deep: true }
)
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
