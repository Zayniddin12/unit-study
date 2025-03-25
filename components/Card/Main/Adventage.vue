<template>
  <div class="relative overflow-hidden group bg-transparent">
    <div
      class="w-16 h-16 flex items-center justify-center bg-primary rounded-2xl shadow-icon"
    >
      <img :src="card?.icon_url" alt="Title" class="w-10 h-10" loading="lazy" />
    </div>
    <div class="w-full flex flex-col justify-end inset-0 pt-6">
      <div>
        <p
          class="text-lg md:text-2.5xl font-bold text-dark leading-custom-normal line-clamp-2"
        >
          {{ card?.title }}
        </p>
        <div
          class="text-sm md:text-base text-dark !leading-130 mt-2 line-clamp-3"
          v-html="card?.description"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  card: {
    title: string
    description: string
    icon_url: string
    banner: string
    id: number
  }
}

defineProps<Props>()
</script>

<style scoped>
.news-linear-blue {
  background: linear-gradient(
    180deg,
    rgba(0, 27, 66, 0) 0%,
    rgba(0, 27, 67, 0.85) 60.42%
  );
}

.news-linear-bluer {
  background: linear-gradient(
    180deg,
    rgba(0, 103, 255, 0) 0%,
    rgba(0, 103, 255, 0.85) 60.42%
  );
}
</style>
