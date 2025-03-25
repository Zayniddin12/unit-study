<template>
  <footer class="relative bg-[#111216]">
    <div class="bg-[#001C3C] w-full h-full absolute z-4 opacity-[0.13]" />
    <img
      class="absolute top-0 left-0 w-full h-full z-1 object-cover opacity-[0.13] object-center"
      src="/images/footer.webp"
    />
    <SectionsMainContact
      v-if="route?.name == 'index' || route?.name == 'contact'"
      class="relative z-10"
    />
    <div class="pt-8 container z-10 relative border-t border-white/30">
      <div
        class="flex md:flex-row flex-col justify-between md:space-x-8 max-md:gap-4"
      >
        <div class="md:max-w-[379px] w-full">
          <div class="flex gap-2 items-center mb-3 sm:mb-4">
            <NuxtLink to="/">
              <img
                alt="logo"
                class="w-[147px] h-16"
                loading="lazy"
                src="/images/logo-white.svg"
              />
            </NuxtLink>
          </div>
          <p
            class="footer-site-info max-h-[319px] text-white font-normal text-base leading-20 pt-10"
          >
            {{ $t('footer_text') }}
          </p>
          <div class="mt-12">
            <p class="text-white font-bold mb-4">{{ $t('social_network') }}</p>
            <div class="flex items-center space-x-3">
              <a
                v-for="(item, index) of socials"
                :href="item.link"
                aria-label="Socials"
                target="_blank"
              >
                <button
                  :key="index"
                  aria-label="Socials button"
                  class="rounded-full p-1.5 size-9 shrink-0 bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group"
                >
                  <i
                    :class="[
                      item.icon,
                      { 'text-base': item.icon === 'icon-twitter' },
                    ]"
                    class="text-2xl text-white group-hover:text-primary transition-300"
                  ></i>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div class="flex md:flex-row flex-col gap-x-10">
          <div
            :class="{ 'lg:!grid-cols-3': footer.at(0)?.links?.length === 0 }"
            class="flex gap-x-14"
          >
            <template v-for="(item, index) of footerMenu" :key="item.id">
              <div
                v-if="item?.type?.length > 0"
                class="max-sm:border-b w-fit last:border-b-0 border-white/[16%] max-sm:pb-4"
              >
                <h3
                  class="text-sm lg:text-sm flex items-center justify-between text-white leading-20 font-normal cursor-pointer"
                  @click="activeIndex = activeIndex === index ? null : index"
                >
                  {{ $t(`${item.title}`) }}
                </h3>
                <CollapseTransition>
                  <ul class="pt-4 space-y-2">
                    <li
                      v-for="link of item?.type"
                      :key="link.id"
                      class="group pt-2"
                    >
                      <NuxtLink
                        :to="link?.slug"
                        class="flex items-center gap-2 group transition-300 line-clamp-1"
                      >
                        <span
                          class="border-2 flex-shrink-0 border-white/20 bg-transparent rounded-full w-3 h-3 block group-hover:border-primary transition-300"
                        ></span>
                        <span
                          class="footer-link text-white/60 text-sm line-clamp-1 font-normal leading-120 transition-400 group-hover:text-white inline-block transition-300"
                          >{{ $t(`${link.name}`) }}</span
                        >
                      </NuxtLink>
                    </li>
                  </ul>
                </CollapseTransition>
              </div>
            </template>
          </div>
          <div
            class="bg-white/[0.02] !backdrop-blur-[32px] p-6 border border-white/30 rounded-2xl"
          >
            <div>
              <p class="text-white/40 text-sm">{{ $t('phone_number') }}:</p>
              <a
                :href="`tel:+${data?.mobile}`"
                class="text-white font-medium w-[232px] mt-1 hover:text-primary transition-300"
              >
                {{ data?.mobile }}
              </a>
            </div>
            <div class="mt-5">
              <p class="text-white/40 text-sm">{{ $t('email') }}:</p>
              <a
                :href="`mailto:${data?.email}`"
                class="text-white font-medium w-[232px] mt-1 hover:text-primary transition-300"
              >
                {{ data?.email }}
              </a>
            </div>
            <div class="mt-5">
              <p class="text-white/40 text-sm">{{ $t('address') }}</p>
              <p class="text-white font-medium w-[232px] mt-1">
                {{ data?.branches?.[0]?.street }},
                {{ data?.branches?.[0]?.city }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="py-4 md:py-5 border-t border-white/30 mt-8 sm:mt-[60px]">
        <div
          class="flex items-center relative text-xs justify-between text-white gap-3"
        >
          <p class="font-normal text-sm text-white/60">
            © {{ new Date().getFullYear() }} UNIT STUDY LLC
          </p>

          <p class="flex items-center gap-2">
            <span class="hidden text-white/60 sm:block">{{
              $t('developed_by')
            }}</span>
            <UISVG />
          </p>

          <!--          <div class="hidden sm:flex items-center space-x-3">-->
          <!--            <button-->
          <!--              v-for="(item, index) of socials"-->
          <!--              :key="index"-->
          <!--              v-tooltip="item.name"-->
          <!--            >-->
          <!--              <a :href="item.link" target="_blank"-->
          <!--                ><i-->
          <!--                  :class="[-->
          <!--                    item.icon,-->
          <!--                    { 'text-base': item.icon === 'icon-twitter' },-->
          <!--                  ]"-->
          <!--                  class="text-2.5xl"-->
          <!--                ></i-->
          <!--              ></a>-->
          <!--            </button>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import UILOGO from '~/components/UI/UIC/Logo.vue'
import UISVG from '~/components/UI/UIC/SVG.vue'
import { footerMenu } from '~/data'
import { useHomeStore } from '~/store'
import { useCommonStore } from '~/store/common'

const store = useCommonStore()

const activeIndex = ref<null | number>(null) // Add ref here
const route = useRoute()
const footer = computed(() => useHomeStore().footer)

const data = computed(() => store.socialLinks[0])
store.fetchContactInfos()

const socials = computed(() => [
  {
    name: 'Instagram',
    link: data.value?.instagram ?? 'https://x.com/home?lang=en',
    icon: 'icon-instagram',
  },
  {
    name: 'Telegram',
    link: data.value?.telegram ?? 'https://x.com/home?lang=en',
    icon: 'icon-telegram',
  },
  {
    name: 'Facebook',
    link: data.value?.facebook ?? 'https://x.com/home?lang=en',
    icon: 'icon-facebook',
  },
  {
    name: 'YouTube',
    link: data.value?.youtube ?? 'https://x.com/home?lang=en',
    icon: 'icon-youtube',
  },
])
</script>

<style scoped>
.footer-link > p {
  display: inline !important;
}

.footer-site-info > p {
  display: inline;
  white-space: break-spaces;
  word-break: break-word;
}
</style>
