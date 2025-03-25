<template>
  <div class="container py-8">
    <div class="mb-8 max-md:gap-3">
      <UISectionTitle
        show-link
        :title="$t('item')"
        :label-class="'md:text-40 text-xl text-bold !text-left'"
        :subtitle="$t('partner_universities')"
        :subtitle-class="'max-md:text-sm'"
        :all-title="$t('all')"
        link="universities"
      />
    </div>
    <div class="grid md:gap-5 gap-2 sm:grid-cols-2 grid-cols-1">
      <CardMainUniversity
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const list = ref([])

function getList() {
  useApi()
    .$get('/development/params/university/advanced_list/', {
      params: {
        specification: {
          name: {},
          logo_url: {},
          image_url: {},
          country_id: { fields: { id: {}, name: {} } },
          city_id: { fields: { id: {}, name: {} } },
          location: {},
          website: {},
          establishment: {},
          local_student_count: {},
          foreign_student_count: {},
          all_student_count: {},
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
