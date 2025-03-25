<template>
  <div>
    <div class="container">
      <div class="bg-white md:py-6 md:px-12 p-4 rounded-28">
        <div class="lg:-ml-6 flex-center md:gap-5 gap-3 w-fit md:mb-8 mb-4">
          <div
              class="md:w-10 md:h-10 h-8 w-8 flex-center rounded-lg bg-gray hover:bg-gray-100 transition-300 group cursor-pointer"
              @click="goBack"
          >
            <span
                class="icon-chevron text-2xl rotate-90 text-dark group-hover:text-white transition-300"
            />
          </div>
          <p class="text-base font-medium leading-6 text-dark">
            {{ $t('back') }}
          </p>
        </div>
        <div class="mt-6 grid">
          <ClientOnly>
            <CardProgram
                v-if="data?.length"
                :card="data[0]"
                class="!p-0 !border-[0px]"
                is-program-single
            />
          </ClientOnly>
          <a
              v-if="file?.file_url"
              :href="file?.file_url"
              class="p-3 bg-gray w-fit mt-4 flex items-center gap-x-3 rounded-2xl group cursor-pointer"
          >
            <div
                class="p-2 bg-white rounded-xl size-10 flex items-center justify-center"
            >
              <i
                  class="icon-download text-2xl text-dark group-hover:text-primary transition-300"
              />
            </div>
            <p class="text-dark text-base font-bold">{{ file?.filename }}</p>
          </a>
          <h3 class="text-22 text-center text-dark font-bold mt-12">
            {{ t('education_content_program') }}
          </h3>
          <div
              v-if="single?.id"
              class="static-text mt-6"
              v-html="formatRichText(single?.description || '')"
          />
        </div>
      </div>
    </div>
    <LayoutsLoader :custom-loading="loading" />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { IUniversity } from '~/types/common'
import type { Program } from '~/types/university'
import { formatRichText } from '~/utils'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const loading = ref(true)
const single = ref(null)
const isNext = ref(false)
interface Props {
  sidebarData: IUniversity
}

defineProps<Props>()

const { data } = await useAsyncData<Program[], unknown>(
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
              nearest_expire_deadline: {},
              subject_ids: { fields: { id: {}, name: {} } },
            },
          },
        })
)

function getSingle() {
  loading.value = true
  useApi()
      .$get(`/development/params/program/advanced_list/`, {
        params: {
          domain: [[['id', '=', route.params.id]]],
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
        console.log('Single program data:', res)
        single.value = res?.records[0] || {}
      })
      .catch((err) => {
        console.error('Error fetching single program:', err)
      })
      .finally(() => {
        loading.value = false
      })
}

getSingle()

const file = ref()

function getFile() {
  useApi()
      .$get(
          `https://admin.unit.study/api/development/params/application/advanced_list?specification={
      "university_response_docs": {
          "fields": {
              "file_url": {},
              "filename": {}
          }
      }
     }
    &domain=[["id","=",${route.query.grantId}]]`
      )
      .then((res) => {
        console.log(res)
        file.value = res?.records[0]?.university_response_docs[0]
      })
}

getFile()

useSeoMeta({
  title: data?.value?.[0]?.university_id?.name || t('default_title'),
  ogTitle: data?.value?.[0]?.university_id?.name || t('default_title'),
})

function goBack() {
  router.back()
}
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
</style>
