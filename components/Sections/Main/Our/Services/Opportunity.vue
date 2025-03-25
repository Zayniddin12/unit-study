<template>
  <div class="pt-7 md:pt-16 overflow-hidden bg-white relative">
    <div class="container text-left">
      <div class="!ml-0 md:w-1/2 md:pb-[120px] pb-5">
        <i18n-t
          class="text-xl md:text-40 text-dark leading-112 font-bold"
          keypath="why_uzbekistan"
          tag="h2"
        >
          <template #our>
            <span class="inline-flex flex-col w-fit items-center"
              ><span ref="target">{{ $t('our') }}</span
              ><img
                loading="lazy"
                :style="{ width: `${wordWidth}px` }"
                src="/images/underline.png"
                alt="decoration"
                :class="`!w-[${wordWidth}px] mr-[3px]`"
            /></span>
          </template>
        </i18n-t>
        <p
          class="md:text-base text-sm text-dark leading-128 font-normal mt-3 md:mt-6 whitespace-pre-line"
        >
          {{ $t('why_uzbekistan_text') }}
        </p>
      </div>
    </div>
    <img
      src="/images/unitStudyOfice.webp"
      alt="title"
      loading="lazy"
      class="absolute lg:w-1/3 w-1/2 right-0 top-0 max-md:hidden z-10"
    />
    <img
      src="/images/aboutImgDecoration.png"
      alt="title"
      loading="lazy"
      class="absolute lg:w-1/3 w-1/2 right-0 top-0 max-md:hidden z-0"
    />
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

const target = ref<HTMLSpanElement | null>(null)
const wordWidth = ref(0)

onMounted(() => {
  if (target.value) {
    wordWidth.value = target.value.getBoundingClientRect().width
  }
})
</script>
