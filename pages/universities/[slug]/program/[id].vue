<template>
  <div>
    <div class="container">
      <ClientOnly>
        <Teleport to="#otm_breadcrumb">
          <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
        </Teleport>
      </ClientOnly>
      <CollapseTransition :duration="800">
        <div v-if="!isNext">
          <ClientOnly>
            <Teleport to="#otm_related_programs">
              <SectionsUniversitySidebar
                :semester-ids="data[0]?.semester_ids"
                :data="sidebarData"
                :cards="data[0]"
                class="mx-1 lg:mx-0"
              />
              <CardRelatedPrograms
                v-if="single?.length"
                :button-text="$t('all_program')"
                :list="single"
                :loading="loading"
                class="mt-6 hidden lg:block"
                is-programs
                navigate-url="/programs"
              />
              <a
                aria-label="UIc group link"
                href="https://uic.group/"
                target="_blank"
                class="hidden lg:block"
              >
                <img
                  alt="uic-banner"
                  class="mt-12 rounded-2xl border-2 border-white"
                  src="/images/uicBanner.png"
                />
              </a>
            </Teleport>
          </ClientOnly>
          <div
            class="bg-white mt-4 lg:mt-0 md:py-6 md:px-12 p-4 rounded-10 md:rounded-28"
          >
            <NuxtLink
              class="lg:-ml-6 flex-center md:gap-5 gap-3 w-fit md:mb-8 mb-4"
              to="/programs"
            >
              <div
                class="md:w-10 md:h-10 h-8 w-8 flex-center rounded-lg bg-gray hover:bg-gray-100 transition-300 group"
              >
                <span
                  class="icon-chevron text-2xl rotate-90 text-dark group-hover:text-white transition-300"
                />
              </div>
              <p class="text-base font-medium leading-6 text-dark">
                {{ $t('back') }}
              </p>
            </NuxtLink>
            <div class="mt-6 grid">
              <ClientOnly>
                <CardProgram
                  :card="data[0]"
                  class="!p-0 !border-[0px]"
                  is-program-single
                />
              </ClientOnly>

              <h3 class="text-22 text-center text-dark font-bold mt-12">
                {{ t('education_content_program') }}
              </h3>
              <div
                v-if="data[0]?.id"
                class="static-text mt-6"
                v-html="formatRichText(data[0]?.description)"
              />

              <!--              <UIButton-->
              <!--                class="max-sm:w-full mt-4 !bg-primary-100 hover:!opacity-70 ml-auto self-end"-->
              <!--                :text="$t('buttons.apply')"-->
              <!--                @click="navigateToApplicationCreate"-->
              <!--              />-->
            </div>
          </div>
          <!--          <div class="my-8">-->
          <!--            <UIWrapperTitle-->
          <!--              :dark="true"-->
          <!--              :subtitle="$t('sign_up_free_subtitle')"-->
          <!--              :title="$t('sign_up_free')"-->
          <!--              class="overflow-hidden"-->
          <!--              has-button-->
          <!--              is-news-->
          <!--              @clicked="showModal"-->
          <!--            />-->
          <!--          </div>-->
        </div>
      </CollapseTransition>
    </div>
    <!--    <ModalConsultation-->
    <!--      :key="state"-->
    <!--      v-bind="{ show, state, items }"-->
    <!--      @close="show = false"-->
    <!--    />-->
    <div
      v-if="data[0]?.next_record_id && scrollPercent !== 100 && !isNext"
      class="flex-center gap-4 mb-24 mt-8"
    >
      <div class="relative w-fit">
        <client-only>
          <circle-progress
            :bg-shadow="{
              inset: true,
              vertical: 2,
              horizontal: 2,
              blur: 4,
              opacity: 0.4,
              color: '#D62F75',
            }"
            :percent="scrollPercent"
            empty-color="#F24E911F"
            fill-color="#D62F75"
            is-bg-shadow
            style="width: 64px; height: 64px"
          />
        </client-only>
        <img
          alt="cursor"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-7"
          src="/images/cursor.png"
        />
      </div>
      <p>{{ $t('go_to_next_program') }}</p>
    </div>
    <client-only>
      <Teleport to="#next_related_programs">
        <div
          v-if="data[0]?.next_record_id"
          ref="contentNews"
          class="h-[400px] relative overflow-hidden -mb-10"
        >
          <Transition name="fade">
            <div
              v-if="!isNext"
              class="linear-white-bg-news w-full h-full absolute top-0 left-0 z-[200]"
            />
          </Transition>
          <div class="lg:container flex flex-col lg:grid grid-cols-12 lg:gap-6">
            <div class="col-span-3">
              <SectionsUniversitySidebar
                :semester-ids="data[0]?.semester_ids"
                :data="sidebarData"
              />
              <CardRelatedPrograms
                :button-text="$t('all_program')"
                :list="single"
                :loading="loading"
                class="mt-6"
                is-programs
                navigate-url="/programs"
              />
              <a
                aria-label="UIc group link"
                href="https://uic.group/"
                target="_blank"
              >
                <img
                  alt="uic-banner"
                  class="mt-12 rounded-2xl border-2 border-white"
                  src="/images/uicBanner.png"
                />
              </a>
            </div>
            <div class="bg-white md:py-6 md:px-12 p-4 rounded-28 !col-span-9">
              <NuxtLink
                class="lg:-ml-6 flex-center md:gap-5 gap-3 w-fit md:mb-8 mb-4"
              >
                <div
                  class="md:w-10 md:h-10 h-8 w-8 flex-center rounded-lg bg-gray hover:bg-gray-100 transition-300 group"
                >
                  <span
                    class="icon-chevron text-2xl rotate-90 text-dark group-hover:text-white transition-300"
                  />
                </div>
                <p class="text-base font-medium leading-6 text-dark">
                  {{ $t('back') }}
                </p>
              </NuxtLink>
              <div class="mt-6">
                <ClientOnly>
                  <CardProgram
                    :card="data[0]"
                    class="!p-0 !border-[0px]"
                    is-program-single
                  />
                </ClientOnly>

                <h3 class="text-22 text-center text-dark font-bold mt-12">
                  {{ t('education_content_program') }}
                </h3>
                <div
                  v-if="data[0]?.id"
                  class="static-text mt-6 !text-base"
                  v-html="formatRichText(data[0]?.description)"
                />
              </div>
            </div>
          </div>
        </div>
        <div ref="nextNews" class="h-1" />
      </Teleport>
    </client-only>
    <LayoutsLoader :custom-loading="loading" />
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import CircleProgress from 'vue3-circle-progress'

import type { IUniversity } from '~/types/common'
import type { Program } from '~/types/university'
import { formatRichText } from '~/utils'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const loading = ref(true)
const single = ref(null)
const scrollPercent = ref<number>(0)
const isNext = ref(false)
const nextNews = ref<HTMLElement>()
const contentNews = ref<HTMLElement>()

interface Props {
  sidebarData: IUniversity
}

defineProps<Props>()

const { data } = await useAsyncData<Program, unknown>(
  'fetchSingleProgram',
  () =>
    useApi().$get(`/development/params/program/advanced_read/`, {
      params: {
        object_id: route.params.id,
        specification: {
          university_id: {
            fields: {
              logo_url: {},
              name: {},
              city_id: { fields: { id: {}, name: {} } },
              country_id: { fields: { id: {}, name: {} } },
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
              id: {},
              name: {},
            },
          },
          description: {},
          slug: {},
          next_record_id: {},
          previous_record_id: {},
          subject_ids: { fields: { id: {}, name: {} } },
          nearest_expire_deadline: {},
          semester_ids: {
            fields: {
              name: {},
              expire_datetime: {},
              is_expired: {},
              display_expire_datetime: {},
              start_date: {},
            },
          },
        },
      },
    })
)

function getSingle() {
  loading.value = true
  useApi()
    .$get(`/development/params/program/advanced_list/`, {
      params: {
        domain: [
          [
            [
              'slug',
              'ilike',
              data.value?.[0]?.slug.split('-').slice(0, 2).join('-'),
            ],
            ['id', '!=', route.params.id],
          ],
        ],
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
          form_of_education: { name: {} },
          language_of_education: { name: {} },
          subject_count: {},
          duration: {},
          contract: {},
          currency: {},
          description: {},
        },
      },
    })
    .then((res) => {
      single.value = res.records
      loading.value = false
    })
    .finally(() => {
      loading.value = false
    })
}

getSingle()

useSeoMeta({
  title: data.value?.title,
  // description: data.value?.content,
  // twitterTitle: data.value?.title,
  // twitterDescription: data.value?.content,
  ogTitle: data.value?.title,
  // ogDescription: data.value?.content,
  // ogImage: data.value?.banner?.[EImageSize.LARGE],
  // twitterImage: data.value?.banner?.[EImageSize.LARGE],
  // twitterCard: 'summary',
  // twitterSite: '@ijtimoiysayt',
})

const breadcrumbRoutes = computed(() => [
  {
    title: t('programs'),
    link: '/programs',
  },
  {
    title: data.value?.[0].university_id?.name,
    link: ``,
  },
])

let scrollNextTimeOut: ReturnType<typeof setTimeout> | undefined

useIntersectionObserver(nextNews, ([{ isIntersecting }]) => {
  if (process.client) {
    if (isIntersecting) {
      scrollNextTimeOut = setTimeout(() => {
        loading.value = true
        if (data.value?.[0].next_record_id) {
          contentNews.value.style.height = 'auto'
          isNext.value = true
          window.scrollTo({ top: 0, behavior: 'smooth' })
          if (data.value?.[0].next_record_id) {
            router.push(`${data.value?.[0].next_record_id}`)
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

const handleScroll = () => {
  const scrollTop = window.scrollY
  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight
  scrollPercent.value = (scrollTop / windowHeight) * 100
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// const navigateToApplicationCreate = () => {
//   if (!userId.value) {
//     return $event('open-auth', 'login')
//   } else {
//     const uni = data.value?.[0]
//
//     if (uni) {
//       const query = {
//         countryId: uni?.university_id?.country_id?.id,
//         countryName: uni?.university_id?.country_id?.name,
//         universityId: uni?.university_id?.id,
//         universityName: uni?.university_id?.name,
//         programId: uni?.id,
//         programName: uni?.name,
//         levelId: uni?.education_level_ids?.id,
//         levelName: uni?.education_level_ids?.name,
//       }
//       router.push({ name: 'application-create', query })
//     } else {
//       router.push({ name: 'application-create' })
//     }
//   }
// }
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

ol {
  position: relative;
}

li {
  position: relative;
}

static-text p {
  @apply !text-base;
}

.o_small-fs {
  @apply !text-base;
}

static-text p span {
  @apply !text-base;
}
</style>
