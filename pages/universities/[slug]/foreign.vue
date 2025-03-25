<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <template v-if="single.description === false">
      <div>
        <EmptyProgram />
      </div>
    </template>
    <div v-else class="bg-white p-6 rounded-3xl">
      <h2 class="text-xl md:text-xl text-dark mb-4 font-medium">
        {{ $t('foreign_student_services') }}
      </h2>
      <div
        class="static-text no-margin small-content"
        v-html="single.description"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { convertBlocksToHTML } from '~/helpers'
import { useUniversityStore } from '~/store/university'
import { formatRichText } from '~/utils'

const { t } = useI18n()
const route = useRoute()
const list = ref([])

const universityStore = useUniversityStore()

const single = computed(() => universityStore.single)

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
    title: t('foreign_student_services'),
    link: '',
  },
])
</script>
<style>
.static-text {
  word-break: break-word;
}

.static-text >>> pre {
  white-space: normal;
  max-width: 834px;
  font-family: sans-serif;
}
.static-text p img {
  width: 100% !important;
  height: 100% !important;
}
</style>
