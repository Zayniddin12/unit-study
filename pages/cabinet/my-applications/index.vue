<template>
  <div>
    <UIWrapperPage
      :title="$t('my_applications')"
      custom-class="!bg-transparent !p-0"
    >
      <Transition mode="out-in" name="fade">
        <div
          v-if="userLoading || store.cabinetApplicationLoading"
          class="grid grid-cols-1 gap-5"
        >
          <CardApplicationLoading v-for="i in 10" :key="i" />
        </div>
        <div
          v-else-if="store.cabinetApplication.length > 0"
          class="grid grid-cols-1 gap-5"
        >
          <CardApplication
            v-for="(item, i) in store.cabinetApplication"
            :key="i"
            v-bind="{ item }"
            @handle-rejected="showApplicationModal(item)"
            @handle-edit="handleEditApplication(item?.id)"
          />

          <div
            v-if="paginationTargetVisible"
            ref="paginationTarget"
            class="h-20 w-full"
          />

          <template v-if="store.cabinetApplicationLoadingMore">
            <CardApplicationLoading v-for="i in 4" :key="i" />
          </template>
        </div>
        <LazyEmptyProgram
          v-else
          :button-text="$t('add')"
          :subtitle="$t('add_to_see')"
          button-link="/application/create"
          img="/images/svg/no-data.svg"
        />
      </Transition>
    </UIWrapperPage>

    <ModalApplication
      :item="currentApplication"
      :show="applicationModal"
      @close="applicationModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '~/store/auth'
import { cabinetStore } from '~/store/cabinet'
import type { Pagination } from '~/types'
import type { IApplication } from '~/types/application'

const router = useRouter()
const store = cabinetStore()
const { user, userLoading } = storeToRefs(useAuthStore())

const applicationModal = ref(false)
const currentApplication = ref<IApplication>()
const paginationTarget = ref<HTMLDivElement | null>(null)
const pagination = reactive<Pagination>({
  page: 1,
})

const userId = computed(() => user?.value?.id)
const paginationTargetVisible = computed(
  () =>
    store.cabinetApplication.length < store.cabinetApplicationCount &&
    !store.cabinetApplicationLoading &&
    !store.cabinetApplicationLoadingMore
)

watch(
  user,
  () => {
    if (userId.value) {
      store.fetchCabinetApplication(userId.value, pagination)
    }
  },
  { deep: true, immediate: true }
)

useIntersectionObserver(paginationTarget, ([{ isIntersecting }]) => {
  if (isIntersecting && userId.value) {
    pagination.page += 1
    store.fetchCabinetApplication(userId.value, pagination)
  }
})

const showApplicationModal = (item: IApplication) => {
  applicationModal.value = true
  currentApplication.value = item
}

const handleEditApplication = (id: number) => {
  router.push({ name: 'application-id-edit', params: { id } })
}

definePageMeta({
  middleware: 'auth',
})
</script>
