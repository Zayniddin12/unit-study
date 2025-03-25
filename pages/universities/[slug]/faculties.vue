<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>

    <div>
      <Transition mode="out-in" name="fade">
        <div
          :key="loading"
          class="grid grid-cols-1 gap-x-4 gap-y-5 bg-white/80 border-2 border-white sm:rounded-3xl rounded-xl sm:p-6 p-4"
        >
          <template v-if="loading">
            <CardFaculty
              v-for="key in 6"
              :key="key"
              class="!bg-white"
              loading
            />
          </template>
          <template v-else-if="!loading && list?.length">
            <CardFaculty
              v-for="(card, i) in list"
              :key="i"
              :faculty="card"
              class="cursor-pointer"
              @click="openModal(card)"
            />
          </template>
          <div v-else-if="!loading && !list?.length" class="text-center">
            <CNoData class="col-span-3" />
          </div>
        </div>
      </Transition>
    </div>

    <Modal :title="t('info_faculty')" v-bind="{ show }" @close="close">
      <div class="p-8 pt-0">
        <h3 class="text-base font-medium text-dark mb-2">
          {{ selectedCard.name }}
        </h3>
        <p
          class="text-sm text-dark break-all"
          v-html="formatRichText(selectedCard?.description)"
        />
      </div>

      <template #footer>
        <div class="m-8 mt-0">
          <UIButton
            :text="$t('clear')"
            class="px-8 py-3 w-full text-sm"
            variant="primary"
            @click="show = false"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CNoData from '~/components/CNoData.vue'
import { useUniversityStore } from '~/store/university'
import { formatRichText } from '~/utils'

const { t } = useI18n()
const show = ref(false)
const universityStore = useUniversityStore()
const route = useRoute()

const single = computed(() => universityStore.single)
const list = ref<any>([])
const selectedCard = ref()
const loading = ref(true)

function getList() {
  useApi()
    .$get(`/development/params/university/advanced_read/`, {
      params: {
        object_id: route.params.slug,
        specification: {
          slug: {},
          faculty_ids: { fields: { icon_url: {}, name: {}, description: {} } },
        },
      },
    })
    .then((res) => {
      list.value = res[0].faculty_ids
    })
    .finally(() => {
      loading.value = false
    })
}

getList()

function openModal(card: { name: string; about: string }) {
  selectedCard.value = card
  show.value = true
}

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
    title: t('faculties'),
    link: '',
  },
])

const close = () => {
  show.value = false
}
</script>
