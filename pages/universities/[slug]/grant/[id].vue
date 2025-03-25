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
              <SectionsUniversitySidebar :data="sidebarData" />
              <CardRelatedPrograms
                v-if="relatedProjects?.length"
                :button-text="$t('all_grants')"
                :list="relatedProjects"
                :loading="loading"
                class="mt-6 hidden lg:block"
                navigate-url="/grants"
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
                  loading="lazy"
                  src="/images/uicBanner.png"
                />
              </a>
            </Teleport>
          </ClientOnly>
          <div
            class="bg-white mt-4 lg:mt-0 sm:py-6 sm:px-12 p-4 rounded-10 md:rounded-28 !h-fit"
          >
            <NuxtLink
              class="lg:-ml-6 flex-center md:gap-5 gap-3 w-fit md:mb-8 mb-4"
              to="/grants"
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
                <CardGrant
                  :card="single"
                  class="!p-0 !border-[0px]"
                  is-program-single
                  v-bind="{ loading }"
                />
              </ClientOnly>
              <UIShimmer height="500px" v-bind="{ loading }" width="100%">
                <div
                  v-if="!loading"
                  class="text-sm mt-6 description-text"
                  v-html="single?.description"
                />
              </UIShimmer>
            </div>
            <div class="mt-6">
              <p class="text-base text-dark font-medium mb-3">
                {{ $t('related_tags') }}
              </p>
              <div class="flex gap-3 max-lg:flex-wrap">
                <template v-for="(item, key) in single?.tag_ids" :key>
                  <div
                    class="py-2 px-3 rounded-lg border border-dark-blue/[12%] bg-gray text-gray-100 text-sm font-medium text-center"
                  >
                    {{ item?.name }}
                  </div>
                </template>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <Button @click="navigateToGrants" variant="primary" class="font-medium text-sm" :text="$t('grant_application')"/>
            </div>
          </div>
          <div class="w-full mt-8">
            <UIWrapperTitle
              class="!max-h-fit !overflow-hidden"
              dark
              has-button
              image-class="relative-mr-[41px] -mb-[34px]"
              is-news
              subtitle="sign_up_free_subtitle"
              title="sign_up_free"
              :button-text="$t('get_consultation')"
              @clicked="showModal"
            />
          </div>
        </div>
      </CollapseTransition>
    </div>
    <ModalConsultation
      :key="state"
      v-bind="{ show, state, items }"
      @close="show = false"
    />
    <div
      v-if="single?.next_record_id && scrollPercent !== 100 && !isNext"
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
            :is-bg-shadow="true"
            :percent="scrollPercent"
            empty-color="#F24E911F"
            fill-color="#D62F75"
            style="width: 64px; height: 64px"
          />
        </client-only>
        <img
          alt="cursor"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-7"
          src="/images/cursor.png"
        />
      </div>
      <p>{{ $t('go_to_next_grant') }}</p>
    </div>
    <client-only>
      <Teleport to="#next_related_programs">
        <div
          v-if="single?.next_record_id"
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
              <SectionsUniversitySidebar :data="sidebarData" />
              <CardRelatedPrograms
                v-if="relatedProjects?.length"
                :button-text="$t('all_program')"
                :list="relatedProjects"
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
            <div
              class="bg-white sm:py-6 sm:px-12 p-4 rounded-28 !h-fit col-span-9"
            >
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
                  <CardGrant
                    :card="single"
                    class="!p-0 !border-[0px]"
                    is-program-single
                  />
                </ClientOnly>
                <UIShimmer height="500px" v-bind="{ loading }" width="100%">
                  <div
                    class="static-text mt-6"
                    v-html="formatRichText(single?.description)"
                  />
                </UIShimmer>
              </div>
            </div>
          </div>
        </div>
        <div ref="nextNews" class="h-1" />
      </Teleport>
    </client-only>
    <LayoutsLoader />
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import CircleProgress from 'vue3-circle-progress'

//
import type { IService } from '~/types/common'
import { IUniversity } from '~/types/common'
import type { IuniversitySingle } from '~/types/university'
import { formatRichText } from '~/utils'
import Button from "~/components/UI/Button/Button.vue";
import { useAuthStore } from '~/store/auth'

interface Props {
  sidebarData: IUniversity
}

defineProps<Props>()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const loading = ref(true)
const single = ref<IuniversitySingle>()
const relatedProjects = ref(null)
const scrollPercent = ref<number>(0)
const isNext = ref(false)
const nextNews = ref<HTMLElement>()
const contentNews = ref<HTMLElement>()

function getSingle() {
  useApi()
    .$get('/development/params/grant/advanced_read', {
      params: {
        object_id: route.params.id,
        specification: {
          slug: {},
          university_id: {
            fields: {
              logo_url: {},
              name: {},
              city_id: { fields: { id: {}, name: {} } },
              full_location: {},
            },
          },
          next_record_id: {},
          previous_record_id: {},
          view_count: {},
          image_url: {},
          title: {},
          end_date: {},
          language_of_education: {
            fields: { name: {} },
          },
          website: {},
          country_id: {
            fields: { name: {} },
          },
          education_level_ids: {
            fields: {
              id: {},
              name: {},
            },
          },
          description: {},
          tag_ids: { fields: { id: {}, name: {} } },
        },
      },
    })
    .then((res) => {
        single.value = res[0]
      loading.value = false
    })
    .catch((res) => {
      showError({ statusCode: 404 })
    })
    .finally(() => {
      loading.value = false
    })
}

function getGrants() {
  loading.value = true
  useApi()
    .$get('/development/params/grant/advanced_list', {
      params: {
        domain: [
          [
            ['slug', '=', single.value?.slug],
            ['id', '!=', route.params.id],
          ],
        ],
        specification: {
          amount: {},
          image_url: {},
          title: {},
          end_date: {},
          university_id: {
            fields: { id: {}, name: {}, image_url: {} },
          },
          education_level_ids: { fields: { id: {}, name: {} } },
          view_count: {},
          currency: { fields: { id: {}, name: {} } },
          country_id: { fields: { id: {}, name: {} } },
          language_of_education: { fields: { id: {}, name: {} } },
          description: {},
        },
      },
    })
    .then((res) => {
      relatedProjects.value = res?.records
    })
    .finally(() => {
      loading.value = false
    })
}

getSingle()

const show = ref(false)
const state = ref('have_question')
const items = ref<IService>()
const authStore = useAuthStore()
const userId = computed(() => authStore.user?.id)
const { $event } = useNuxtApp()



function showModal(item: IService) {
  state.value = 'have_question'
  items.value = item
  show.value = true
}

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
          if (single.value?.next_record_id) {
            router.push(`${single.value.next_record_id}`)
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
useSeoMeta({
  title: single.value?.title,
  ogTitle: single.value?.title,
})

const navigateToGrants = () => {
  if (!userId.value) {
    return $event('open-auth', 'login')
  }
  else{
    router.push({name: 'grants-create', query: {id: single.value.id}})
  }
}

const breadcrumbRoutes = computed(() => [
  {
    title: t('grants'),
    link: '/grants',
  },
  {
    title: single.value?.university_id?.name,
    link: '',
  },
])
watch(
  single,
  () => {
    if (single.value) {
      getGrants()
    }
  },
  { deep: true, immediate: true }
)
</script>
<style>
ol {
  position: relative;
}

li {
  position: relative;
}

.description-text p {
  @apply my-2;
}

.static-text img {
  width: 100% !important;
  height: 100% !important;
}

.skeleton {
  background-color: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  position: relative;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
}

.dark .skeleton {
  background: linear-gradient(
    to right,
    #25323d 10%,
    #2e3c48 35.78%,
    #25323d 73.28%
  ) !important;
}

@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
</style>
