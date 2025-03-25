<template>
  <div
    class="md:p-6 p-3 rounded-[20px] bg-white/[0.80] border-2 border-white backdrop-blur-[32px] transition-300 duration-300 hover:border-primary group"
  >
    <div class="flex justify-between items-center mb-8">
      <div class="size-12 bg-gray rounded-xl border border-gray-100/10 grid">
        <img
          :src="item?.logo_url || '/images/default/default.svg'"
          alt="logo"
          class="size-full object-cover object-center rounded-xl"
          loading="lazy"
        />
      </div>

      <NuxtLink
        :to="`/universities/${item?.id}`"
        class="flex gap-1 items-center group cursor-pointer transition-300 select-none"
      >
        <p
          class="text-dark group-hover:text-primary text-sm font-semibold leading-[20px] transition-300"
        >
          {{ $t('more') }}
        </p>
        <span
          class="icon-chevron -rotate-90 text-xl group-hover:text-primary transition-300"
        />
      </NuxtLink>
    </div>
    <div>
      <h3
        class="text-dark font-semibold md:text-2xl text-base mb-2 line-clamp-1"
      >
        {{ item?.name }}
      </h3>
      <div class="flex gap-[1.5px] items-center mb-5">
        <span class="icon-map-pin" />
        <p class="text-dark text-sm font-normal line-clamp-1">
          {{ item?.location }}
        </p>
      </div>
      <p>
        <a
          :href="`${item?.website}`"
          class="text-primary text-sm font-medium leading-5"
          target="_blank"
          >{{ item?.website }}</a
        >
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface props {
  item: {
    image: string
    title: string
    location: string
    site_url: string
    logo_url: string
  }
}

defineProps<props>()
</script>
