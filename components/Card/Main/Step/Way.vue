<template>
  <div
    :class="
      index == 1
        ? 'bg-green-300 border-dark-blue'
        : 'border-white/[0.20] bg-dark-blue-200'
    "
    class="border rounded-[20px] md:px-5 px-2 max-[490px]:flex max-[490px]:items-center max-[490px]:ml-2"
  >
    <div
      :class="
        index == 1 ? 'bg-green-100 green-shadow' : 'yellow-shadow bg-warning'
      "
      class="sm:size-16 size-10 flex justify-center items-center min-[490px]:mx-auto rounded-2xl min-[490px]:-mt-5 max-[490px]:-translate-x-1/2 shrink-0"
    >
      <p
        v-if="!final"
        class="sm:text-32 text-lg font-bold leading-112 text-white"
      >
        {{ item?.id }}
      </p>
      <img
        v-else-if="index == 0"
        alt="flag"
        class="size-8 max-sm:size-6"
        loading="lazy"
        src="/images/svg/flag.svg"
      />
      <img
        v-else-if="index == 1"
        alt="phone"
        class="size-8 max-sm:size-6"
        loading="lazy"
        src="/images/svg/phone.svg"
      />
    </div>
    <div :class="index == 1 ? 'mt-5' : 'mt-7'" class="mb-5">
      <h2
        class="md:text-[20px] text-base md:font-bold font-semibold text-white min-[490px]:text-center leading-112"
      >
        {{ item?.title }}
      </h2>
      <p
        class="text-white/[0.40] text-sm font-normal leading-112 mt-3 min-[490px]:text-center"
      >
        {{ item?.description }}
      </p>

      <a :href="`tel:${phoneNumber}`" aria-label="Telefon raqam">
        <UIButton
          v-if="index == 1"
          :text="$t('do_call')"
          class="w-full mt-8"
          size="sm"
          variant="success"
        />
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCommonStore } from '~/store/common'

interface props {
  item: {
    id: number
    title: string
    subtitle: string
  }
  image: string
  index: number
  final: boolean
}

defineProps<props>()

const store = useCommonStore()

const phoneNumber = computed(() => store.socialLinks?.[0]?.phone)
</script>
<style>
.yellow-shadow {
  box-shadow: 0px 73px 56px 0px rgba(242, 163, 58, 0.04),
    0px 33.75px 25.89px 0px rgba(242, 163, 58, 0.06),
    0px 19.311px 14.814px 0px rgba(242, 163, 58, 0.07),
    0px 11.722px 8.992px 0px rgba(242, 163, 58, 0.09),
    0px 7.063px 5.418px 0px rgba(242, 163, 58, 0.1),
    0px 3.933px 3.017px 0px rgba(242, 163, 58, 0.12),
    0px 1.692px 1.298px 0px rgba(242, 163, 58, 0.16);
}

.green-shadow {
  box-shadow: 0px 73px 56px 0px rgba(37, 186, 57, 0.04),
    0px 33.75px 25.89px 0px rgba(37, 186, 57, 0.06),
    0px 19.311px 14.814px 0px rgba(37, 186, 57, 0.07),
    0px 11.722px 8.992px 0px rgba(37, 186, 57, 0.09),
    0px 7.063px 5.418px 0px rgba(37, 186, 57, 0.1),
    0px 3.933px 3.017px 0px rgba(37, 186, 57, 0.12),
    0px 1.692px 1.298px 0px rgba(37, 186, 57, 0.16);
}
</style>
