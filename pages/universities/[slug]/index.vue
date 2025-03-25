<template>
  <div
    class="bg-white/80 border-2 border-white rounded-3xl backdrop-blur-[32px] p-6"
  >
    <Teleport v-if="mounted" to="#otm_breadcrumb">
      <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    </Teleport>
    <SectionsUniversityStatistics v-bind="{ single, loading }" />
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useUniversityStore } from '~/store/university'

const { t } = useI18n()
const universityStore = useUniversityStore()

const mounted = ref(false)

const single = computed(() => universityStore.single)
const loading = computed(() => universityStore.singleLoading)

onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 1000)
})

const breadcrumbRoutes = computed(() => [
  {
    title: t('universities'),
    link: '/universities',
  },
  {
    title: single.value.name,
    link: `/universities/${single.value.id}/`,
  },
  {
    title: t('about_university'),
    link: '',
  },
])
</script>

<style scoped>
.static-text {
  word-break: break-word;
}
</style>
