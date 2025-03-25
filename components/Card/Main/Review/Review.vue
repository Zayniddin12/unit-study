<template>
  <div
    class="bg-white border-[1.5px] border-gray-300 shadow-sm rounded-2xl py-7 w-fit max-w-[380px] h-[279px] relative"
  >
    <div
      class="relative overflow-hidden mx-auto transition-300 flex items-center gap-3 pr-5"
    >
      <div class="shrink-0 p-1 pl-7 bg-gray rounded-r-full h-fit">
        <img
          loading="lazy"
          :src="card?.image_url || '/images/default.svg'"
          alt="review-image"
          class="w-12 h-12 shrink-0 rounded-full object-cover"
        />
      </div>
      <div>
        <p
          class="sm:text-20 text-base !leading-130 font-semibold text-dark uppercase line-clamp-1"
        >
          {{ card?.full_name }}
        </p>
        <p class="text-xs !leading-130 font-medium text-warning line-clamp-1">
          {{ card?.author_region }}
        </p>
      </div>
    </div>
    <div class="px-8 mt-7">
      <div
        class="text-sm !leading-130 font-normal text-dark-200 line-clamp-5"
        v-html="card?.description"
      ></div>
      <div class="flex gap-1.5 mt-6 absolute bottom-7 left-7">
        <div v-for="key in Number(card.rating)" :key>
          <img src="/images/star.svg" loading="lazy" alt="star" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  card: {
    author_name: string
    photo: string
    content: string
    author_region: string
  }
  active?: boolean
}

const props = defineProps<Props>()
</script>

<style scoped>
.review-shadow {
  box-shadow: 0 20px 60px 0 rgba(6, 40, 89, 0.12);
}
</style>
