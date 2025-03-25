<template>
  <div
      class="flex-y-center gap-3 bg-gray items-center sm:p-4 p-3 sm:rounded-20 rounded-lg h-auto group"
  >
    <UIShimmer width="64px" height="64px" v-bind="{ loading }">
      <div
          class="sm:h-16 sm:w-16 h-8 w-8 shrink-0 sm:rounded-2xl rounded-md flex-center bg-primary shadow-university-content"
      >
        <i class="sm:text-4xl text-xl !text-white icon-book"/>
      </div>
    </UIShimmer>
    <UIShimmer
        width="80%"
        height="40px"
        v-bind="{ loading }"
        preloader-class=""
    >
      <p class="text-dark sm:text-20 text-base font-semibold line-clamp-2 flex-1">
        {{ faculty.name }}
      </p>
    </UIShimmer>

    <UIShimmer v-bind="{ loading }" width="40px" height="40px">
      <p
          class="text-primary flex items-center ml-9 font-medium text-xs gap-[5px] transition-all cursor-pointer"
      >
        <p class="max-sm:hidden whitespace-nowrap">{{ $t('more') }}</p>

        <span
            class="icon-chevron relative -rotate-90 font-medium sm:text-base text-xl text-primary group-hover:ml-0.5 group-hover:translate-x-0.5 transition-all transition-300"
        />
      </p>
    </UIShimmer>
  </div>
</template>

<script setup lang="ts">
interface Props {
  faculty: {
    name: string
    link: string
  }
  loading?: boolean
}

withDefaults(defineProps<Props>(), {})
</script>
