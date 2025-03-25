<template>
  <div
    :class="{ '!bg-dark-blue-100': dark, ' max-h-[121px]': !hasButton }"
    class="flex justify-between bg-white rounded-3xl md:py-8 md:px-10 p-4 relative gap-3"
  >
    <div class="flex">
      <NuxtLink
        v-if="backRoute"
        :to="backRoute"
        class="icon-chevron -left-5 border border-gray bg-white p-1.5 rounded-full text-2xl text-gray-100 absolute text-[28px] leading-7 text-dark rotate-90 hover:-translate-x-1 transition-300"
        @click="emit('back')"
      />
      <div>
        <h2
          :class="(titleClass, { 'text-white': dark })"
          class="text-black md:text-3xl text-xl leading-130 font-bold"
        >
          {{ $t(`${title}`) }}
        </h2>
        <p
          :class="(subTitleClass, { 'text-white': dark })"
          class="text-sm leading-140 text-gray-100 mt-2 mb-10"
        >
          {{ $t(`${subtitle}`) }}
        </p>
        <UIButton
          v-if="hasButton"
          :text="buttonText ?? $t('more')"
          :variant="
            buttonVariant ? buttonVariant : dark ? 'bg-white-smth' : 'primary'
          "
          class="!rounded-lg"
          @click="emit('clicked')"
        />
      </div>
    </div>
    <div class="min-[900px]:flex hidden justify-end">
      <img
        v-if="home"
        :class="imageClass"
        alt="Title"
        class="max-w-[290px] -mb-8 -mt-[67px] -mr-20 z-20"
        loading="lazy"
        src="/images/happy_student_with_books.webp"
      />
      <img
        v-if="!dark && !home"
        :class="imageClass"
        alt="title"
        class="max-w-[290px] -mr-[36px] -mb-8"
        loading="lazy"
        src="/images/symbol-logo.svg"
      />
      <img
        v-if="!dark && home"
        :class="imageClass"
        alt="title"
        class="max-w-[290px] -mr-[36px] -mb-8"
        loading="lazy"
        src="/images/main-symbol-logo.svg"
      />
      <img
        v-else-if="isNews"
        :class="imageClass"
        alt="symbol"
        class="-mr-10 -mb-[32px] max-w-[270px]"
        loading="lazy"
        src="/images/newsLogo.png"
      />
      <img
        v-else-if="home"
        :class="imageClass"
        alt="image"
        class="max-w-[290px] -mr-[40px] -mb-[40px]"
        loading="lazy"
        src="/images/symbol-logo-white.svg"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TButtonVariants } from '~/types/components/button'

interface Props {
  title: string
  titleClass?: string
  subTitleClass?: string
  subtitle: string
  home?: boolean
  dark?: boolean
  isNews?: boolean
  imageClass?: string
  hasButton?: boolean
  // eslint-disable-next-line vue/require-default-prop
  buttonText?: string
  backRoute?: string
  buttonVariant?: TButtonVariants
}

withDefaults(defineProps<Props>(), {
  hasButton: false,
  titleClass: '',
  subTitleClass: '',
  imageClass: '',
  backRoute: '',
})

const emit = defineEmits(['clicked', 'back'])
</script>

<style scoped></style>
