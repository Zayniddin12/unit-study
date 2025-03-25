<template>
  <div class="lg:ml-8 md:pl-4 max-[800px]:w-full">
    <div class="max-[800px]:hidden">
      <h2 class="text-white font-bold leading-120 text-32 mb-3">
        {{ $t('contact_us_title') }}
      </h2>
      <p class="text-white/60 text-base font-normal leading-140 mb-8">
        {{ $t('contact_us_subtitle') }}
      </p>
    </div>
    <div class="flex flex-col gap-3 max-[800px]:w-full">
      <a
        v-if="data?.branches[0]?.longitude && data?.branches[0]?.latitude"
        :href="`https://yandex.ru/maps/?pt=${data?.branches[0]?.longitude},${data?.branches[0]?.latitude}&z=16&l=map`"
        class="p-3 max-[800px]:w-full flex gap-2 border border-white/[0.16] rounded-xl group hover:bg-yellow cursor-pointer transition-300 hover:border-yellow active:scale-95 select-none"
        target="_blank"
      >
        <div
          class="p-[9px] rounded-lg bg-primary/[0.12] flex items-center justify-center w-[42px] h-[42px] group-hover:bg-white/20 transition-300 relative"
        >
          <span
            class="icon-map-pin text-primary text-2xl group-hover:text-white transition-300"
          />
        </div>
        <div>
          <p class="text-white/60 text-sm font-normal leading-130">
            {{ $t('visit_office') }}
          </p>
          <p
            class="text-white font-normal md:text-base text-sm leading-130 mt-1.5"
          >
            {{ data?.branches[0]?.city }}, {{ data?.branches[0]?.street }}
            <span class="icon-direct max-md:hidden text-sm leading-130" />
          </p>
        </div>
        <span
          class="block md:hidden icon-direct absolute top-3 right-3 text-white text-sm"
        />
      </a>
      <a
        v-if="data?.mobile"
        :href="`tel: ${data?.mobile}`"
        class="p-3 flex gap-2 border border-white/[0.16] rounded-xl group hover:bg-yellow cursor-pointer transition-300 hover:border-yellow active:scale-95 select-none"
      >
        <div
          class="p-[9px] rounded-lg bg-primary/[0.12] flex items-center justify-center w-[42px] h-[42px] group-hover:bg-white/20 transition-300"
        >
          <span
            class="icon-phone text-primary text-2xl group-hover:text-white transition-300"
          />
        </div>
        <span>
          <p class="text-white/60 text-sm font-normal leading-130">
            {{ $t('phone_number') }}
          </p>
          <p class="font-normal text-white md:text-base text-sm mt-1.5">
            {{ phoneNumberFormatter(data?.mobile) }}
          </p>
        </span>
      </a>
      <div
        v-if="data?.email"
        class="p-3 flex gap-2 border border-white/[0.16] rounded-xl group hover:bg-yellow cursor-pointer transition-300 hover:border-yellow active:scale-95 select-none"
      >
        <div
          class="p-[9px] rounded-lg bg-primary/[0.12] flex items-center justify-center w-[42px] h-[42px] group-hover:bg-white/20 transition-300"
        >
          <span
            class="icon-mail text-primary text-2xl group-hover:text-white transition-300"
          />
        </div>
        <a :href="`mailto: ${data?.email}`">
          <p class="text-white/60 text-sm font-normal leading-130">
            {{ $t('email') }}
          </p>
          <p class="font-normal text-white md:text-base text-sm mt-1.5">
            {{ data?.email }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ContactData } from '~/data'
import { useCommonStore } from '~/store/common'
import { formatNumberSpace, phoneNumberFormatter } from '~/utils'

const store = useCommonStore()
// const ContactData = ref(null)
// const error = ref()
//
// const fetchData = async () => {
//   try {
//     const res = await useApi().$get('landing/link-with-us/')
//     ContactData.value = res.results
//   } catch (err) {
//     error.value = err
//   }
// }
//
// fetchData()

const data = computed(() => store.socialLinks[0])
store.fetchContactInfos()
</script>
