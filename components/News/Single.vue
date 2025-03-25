<template>
  <div class="container grid md:grid-cols-12 pt-8 gap-5">
    <div class="max-md:hidden col-span-3 flex flex-col gap-2">
      <div
        v-if="similarNews?.records?.length"
        class="rounded-3xl bg-white/80 border-2 border-white p-5 h-fit"
      >
        <p class="text-20 text-dark font-bold">
          {{ $t('similar_projects') }}
        </p>
        <div class="divide-y divide-gray">
          <div
            v-for="(item, key) in similarNews?.records"
            :key
            class="py-4 cursor-pointer transition group"
          >
            <NuxtLink
              :to="
                route.name == 'events-slug'
                  ? `/events/${item?.id}`
                  : `/news/${item?.id}`
              "
              class="text-sm text-dark group-hover:text-primary transition-300 font-semibold leading-120 line-clamp-2"
            >
              {{ item?.name }}
            </NuxtLink>
            <div
              v-if="item?.create_date || item?.date"
              class="flex items-center gap-1"
            >
              <span class="text-xs font-normal">
                {{
                  item?.create_date
                    ? dayjs(item?.create_date).format('DD.MM.YYYY')
                    : dayjs(item?.date).format('DD.MM.YYYY')
                }}
              </span>
              •
              <span class="text-xs font-normal">
                {{
                  item?.create_date
                    ? dayjs(item?.create_date).format('HH:mm')
                    : dayjs(item?.date).format('HH:mm')
                }}
              </span>
            </div>
          </div>
        </div>
        <nuxt-link :to="route.name == 'events-slug' ? '/events' : '/news'">
          <UIButton
            :text="
              route.name == 'events-slug' ? $t('more_events') : $t('more_news')
            "
            class="w-full"
            variant="bg-white"
          />
        </nuxt-link>
      </div>
      <a aria-label="UIC group link" href="https://uic.group/" target="_blank">
        <img
          alt="uic group"
          class="border-2 border-white rounded-2xl"
          loading="lazy"
          src="/images/uicBanner.png"
        />
      </a>

    </div>
    <div class="md:col-span-9">
      <div class="bg-white py-6 lg:px-12 sm:px-6 px-2 rounded-28">
        <div
          class="lg:-ml-6 flex-center md:gap-6 gap-3 w-fit md:mb-8 mb-4 cursor-pointer"
        >
          <nuxt-link
            class="md:w-10 md:h-10 h-8 w-8 flex-center rounded-lg bg-gray hover:bg-gray-100 transition-300 group"
            :to="route.name == 'events-slug' ? '/events' : '/news'"
          >
            <span
              class="icon-chevron text-2xl rotate-90 text-dark group-hover:text-white transition-300"
            />
          </nuxt-link>
          <p class="text-base font-medium leading-6 text-dark">
            {{ $t('back') }}
          </p>
        </div>
        <img
          :src="data?.[0]?.image_url || data?.image_url"
          alt="news-why"
          class="w-full object-cover rounded-xl mx-auto aspect-video relative"
        />
        <div class="w-full pt-6">
          <div class="w-full md:mb-8">
            <div class="text-gray-100 flex items-center gap-5 mb-2">
              <div v-if="data?.create_date" class="flex items-center gap-1">
                <i class="icon-clock-check text-xs md:text-lg"></i>
                <span class="text-xs font-normal">
                  {{
                  dayjs(data?.create_date).format('DD.MM.YYYY')
                }}
                </span>
                •
                <span class="text-xs font-normal">
                  {{
                  dayjs(data?.create_date).format('HH:mm')
                }}
                </span>
              </div>

              <div v-if="data?.views_count" class="flex items-center gap-1">
                <i class="icon-eye text-xs md:text-lg"></i>
                <span class="text-xs font-normal">{{
                  formatNumberSpace(data?.views_count)
                }}</span>
              </div>
            </div>

            <h1
              class="text-dark text-base lg:text-[20px] leading-130 font-bold"
            >
              {{ data?.name || data?.teaser }}
            </h1>
            <div v-if="events" class="flex gap-2.5 mt-6">
              <div
                class="border border-dark/[0.10] p-3 rounded-[10px] flex gap-2 w-fit items-center"
              >
                <p
                  class="text-dark font-bold md:text-40 text-2xl md:w-12 text-right"
                >
                  {{ dayjs(data?.date).format('DD') }}
                </p>
                <p class="text-dark text-sm font-normal">{{ monthYear }}</p>
              </div>
              <div
                class="border border-dark/[0.10] p-3 rounded-[10px] flex gap-2 w-fit"
              >
                <p class="text-dark font-bold md:text-40 text-2xl">
                  {{ dayjs(data?.date).format('HH:mm') }}
                </p>
              </div>
              <div class="flex items-center gap-2.5 py-3">
                <span class="icon-map-pin text-primary text-2xl" />
                <p class="text-brand-black text-sm font-semibold leading-130">
                  {{ data?.country_id?.name }},
                  {{ data?.country_state_id?.name }}
                </p>
              </div>
            </div>
            <div class="w-full h-[1px] bg-gray md:my-6 my-3" />
          </div>
          <div
            class="static-text"
            v-html="formatRichText(data?.content ?? data?.description)"
          />
          <div>
            <p class="text-base text-dark font-medium mb-3">
              {{ $t('related_tags') }}
            </p>
            <div class="flex gap-3 max-lg:flex-wrap">
              <template v-for="(item, key) in data?.tag_ids" :key>
                <div
                  class="py-2 px-3 rounded-lg border border-dark-blue/[12%] bg-gray text-gray-100 text-sm font-medium text-center"
                >
                  {{ item?.name }}
                </div>
              </template>
            </div>
          </div>

          <div class="single-footer mt-8 md:pt-6 py-4 border-t border-gray-200">
            <p class="text-dark text-base font-medium mb-4">
              {{ $t('social_links') }}
            </p>
            <div
              class="max-sm:flex-col flex-center-between max-md:items-start md:gap-3 gap-5"
            >
              <div
                class="flex-y-center flex-wrap max-md:items-start gap-3 lg:gap-4"
              >
                <button
                  v-for="item in shareLink"
                  :key="item.id"
                  class="rounded-full w-10 h-10 p-4 hover:bg-primary flex-center bg-primary/[12%] group transition-300 relative"
                  @click="share(item.type, data?.name)"
                >
                  <i
                    :class="`${item.icon} text-[22px] text-primary group-hover:text-white transition-300`"
                  />
                </button>
              </div>

              <UIButtonCopy />
            </div>
          </div>
        </div>
      </div>
      <div class="my-8">
        <div class="my-8">
          <UIWrapperTitle
            :dark="true"
            :subtitle="$t('sign_up_free_subtitle')"
            :title="$t('sign_up_free')"
            class="overflow-hidden"
            has-button
            is-news
            @clicked="show = true"
          />
        </div>
      </div>
      <ModalConsultation
        :key="state"
        :items="items"
        :show="show"
        :state="state"
        @close="show = false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { INewsSingle, IService } from '~/types/common'
import { formatNumberSpace, share } from '~/utils'

const { locale, t } = useI18n()

interface Props {
  data: INewsSingle
  similarNews: INewsSingle[]
  events: boolean
}

const props = defineProps<Props>()

const shareLink = [
  {
    id: 1,
    name: 'Telegram',
    type: 'telegram',
    icon: 'icon-telegramm',
  },
  {
    id: 1,
    name: 'Facebook',
    type: 'facebook',
    icon: 'icon-facebook',
  },
  {
    id: 1,
    name: 'Twitter',
    type: 'twitter',
    icon: 'icon-twitter',
  },
]
const show = ref(false)
const state = ref<'have_question' | 'success'>('have_question')
const items = ref<IService>()
const route = useRoute()

const day = ref(dayjs('2024.10.11 10:30').format('DD'))
// const hour = dayjs('2024.10.11 10:30').format('HH:mm')
const month = dayjs(props.data?.date)
  .locale(
    locale.value === 'uz' ? 'uz-latn' : locale.value === 'ru' ? 'ru' : 'en'
  )
  .format('MMMM')
const year = dayjs(props.data?.date).format('YYYY')
const monthYear = ref(`${month} ${year}`)
onMounted(() => {
  if (day.value.charAt(0) == '0') {
    day.value = day.value.slice(1)
  }
})
</script>
