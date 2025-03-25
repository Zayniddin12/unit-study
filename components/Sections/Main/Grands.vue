<template>
  <div class="md:py-[100px] py-10 relative">
    <img
      alt="image"
      class="w-full h-full absolute top-0 left-0 object-cover aspect-[1/1]"
      loading="lazy"
      src="/images/grants-bg.webp"
    />
    <div class="container relative z-10">
      <div class="flex justify-between items-end mb-8 max-md:gap-3">
        <UISectionTitle
          :label-class="'md:text-40 text-xl text-bold !text-left text-white'"
          :subtitle="$t('grants_subtitle')"
          :subtitle-class="'text-gray-100'"
          :title="$t('grants_title')"
        />
        <NuxtLink
          class="md:flex hidden gap-1 items-center group cursor-pointer transition-300 select-none"
          to="/grants"
        >
          <p
            class="text-gray-100 text-sm font-semibold leading-[20px] group-hover:text-primary transition-300 whitespace-nowrap"
          >
            {{ $t('all') }}
          </p>
          <span
            class="icon-chevron -rotate-90 text-xl group-hover:text-primary transition-300 text-gray-100"
          />
        </NuxtLink>
      </div>
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <CardMainGrand v-for="(item, key) in list" :key :item />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const list = ref([])

async function getList() {
  await useApi()
    .$get('/development/params/grant/advanced_list/', {
      params: {
        specification: {
          amount: {},
          image_url: {},
          title: {},
          end_date: {},
          university_id: { fields: { id: {}, name: {} } },
          education_level_ids: { fields: { id: {}, name: {} } },
          view_count: {},
          currency: { fields: { name: {} } },
          country_id: { fields: { id: {}, name: {} } },
          language_of_education: { fields: { id: {}, name: {} } },
          description: {},
        },
      },
    })
    .then((res: any) => {
      list.value = res?.records
    })
}

getList()
</script>
