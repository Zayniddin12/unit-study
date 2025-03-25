<template>
  <div class="bg-dark-blue-200 sm:pb-[152px] py-10 sm:pt-16 relative">
    <img
      alt="decoration"
      class="absolute !w-screen h-full left-0 top-0 object-cover"
      loading="lazy"
      src="/images/decoration.webp"
    />
    <div class="container">
      <UISectionTitle
        :label-class="'md:text-40 text-xl text-bold text-white !text-center max-md:mb-1'"
        :subtitle="$t('way_of_students_subtitle')"
        :subtitle-class="'text-center'"
        :title="$t('way_of_students')"
      />

      <div
        class="grid lg:grid-cols-4 sm:grid-cols-3 min-[490px]:grid-cols-2 grid-cols-1 md:gap-5 gap-2 !gap-y-[60px] sm:mt-[92px] mt-10 relative z-10"
      >
        <CardMainStepWay
          v-for="(item, key) in list.slice(0, -2)"
          :key
          :item="item"
        />
        <CardMainStepWay
          v-for="(item, key) in list.slice(-2)"
          :key
          :class="{ 'cursor-pointer transition-300': key == 1 }"
          :final="true"
          :index="key"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const list = ref([])

async function getList() {
  await useApi()
    .$get('/development/params/student.path/advanced_list/', {
      params: {
        specification: { icon_url: {}, title: {}, description: {} },
      },
    })
    .then((res: any) => {
      list.value = res?.records
    })
}

getList()
</script>
