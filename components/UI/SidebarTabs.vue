<template>
  <div
    class="default-shadow relative w-full bg-white rounded-2xl space-y-px border border-white"
  >
    <NuxtLink
      v-for="(item, index) in tabs"
      :key="index"
      class="relative cursor-pointer flex-shrink-0 first:rounded-t-2xl last:rounded-b-2xl select-none transition-300 flex-y-center px-5 py-4 gap-3 hover:bg-gray group after:absolute after:w-[calc(100%-72px)] after:h-px after:bg-gray after:top-full after:right-0"
      exact-active-class="bg-gray active"
      :to="item?.link"
      @click="$emit('logout', item?.link)"
    >
      <span
        :class="item?.icon"
        class="text-2xl leading-6 rounded-[10px] bg-gray shrink-0 text-dark group-[.active]:bg-primary group-[.active]:text-white w-10 h-10 flex-center transition-300 icon"
      />
      <p
        class="text-sm text-dark font-semibold group-hover:text-primary leading-5"
      >
        {{ $t(item?.title) }}
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tabs: {
    title: string
    icon: string
    link: string
  }[]
}
const props = defineProps<Props>()
</script>

<style>
.active .icon {
  box-shadow: 0px 73px 56px 0px rgba(242, 78, 145, 0.04),
    0px 33.75px 25.89px 0px rgba(242, 78, 145, 0.06),
    0px 19.311px 14.814px 0px rgba(242, 78, 145, 0.07),
    0px 11.722px 8.992px 0px rgba(242, 78, 145, 0.09),
    0px 7.063px 5.418px 0px rgba(242, 78, 145, 0.1),
    0px 3.933px 3.017px 0px rgba(242, 78, 145, 0.12),
    0px 1.692px 1.298px 0px rgba(242, 78, 145, 0.16);
}
</style>
