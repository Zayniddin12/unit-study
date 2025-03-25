<template>
  <div
    class="container flex justify-between max-md:flex-col min-[960px]:gap-[120px] gap-10 py-16"
  >
    <div class="md:w-1/2 grid">
      <UISectionTitle
        :all-title="$t('all_service')"
        :label-class="'sm:text-40 text-xl !text-left'"
        :subtitle="$t('services_text')"
        :subtitle-class="'mt-1'"
        :title="$t('services')"
        all-title-hidden
        class="!text-left mb-6"
        show-link
      />
      <div class="space-y-4" @mouseleave="isHovered = 0">
        <div
          v-for="(item, key) in OurServices.splice(0, 3)"
          :key
          class="rounded-[19px] py-5 px-6 bg-gray border-2 border-gray group cursor-pointer hover:border-primary transition-300"
          @mouseenter="isHovered = key"
          @mouseleave="isHovered = 4"
        >
          <div :class="{ 'gap-2.5': item?.icon_url }" class="flex items-center">
            <img
              :alt="item?.name"
              :src="item?.icon_url"
              class="size-8 transition-300 invert"
            />
            <p class="text-dark font-semibold md:text-22 text-base">
              {{ item?.name }}
            </p>
          </div>
          <CollapseTransition>
            <div v-if="isHovered == key" class="pt-3">
              <p class="text-gray100 text-sm font-normal mb-7">
                {{ item?.sub_title }}
              </p>
              <NuxtLink
                :to="`/support/${item?.id}`"
                class="flex gap-1 items-center transition-300 select-none"
              >
                <p
                  class="text-dark group-hover:!text-primary text-sm font-semibold leading-[20px]"
                >
                  {{ $t('more') }}
                </p>
                <span
                  class="icon-chevron group-hover:!text-primary -rotate-90 text-xl"
                />
              </NuxtLink>
            </div>
          </CollapseTransition>
        </div>
      </div>
      <div
        class="self-end flex items-center gap-1 w-fit cursor-pointer group"
        @click="router.push('/support')"
      >
        <NuxtLink
          class="text-dark font-medium text-sm group-hover:text-primary transition-300"
          to="/support"
        >
          {{ $t('all_services') }}
        </NuxtLink>
        <i
          class="icon-chevron -rotate-90 text-xl text-dark group-hover:text-primary group-hover:translate-x-0.5 transition-300"
        />
      </div>
    </div>
    <div class="md:w-1/2 max-[960px]:shrink-0">
      <img
        alt="service image"
        class="rounded-3xl max-[960px]:shrink-0"
        loading="lazy"
        src="/images/servis-img.webp"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useRouter } from 'vue-router'

import { useServicesStore } from '~/store/services'

const router = useRouter()

const isHovered = ref(0)

const serviceStore = useServicesStore()

serviceStore.fetchServices()

const OurServices = computed(() => serviceStore.services)
</script>
