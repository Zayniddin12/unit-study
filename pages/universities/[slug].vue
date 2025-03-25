<template>
  <div>
    <div id="otm_breadcrumb" class="max-lg:hidden"></div>
    <div
      class="lg:container flex flex-col lg:grid grid-cols-12 lg:gap-6 mt-6 mb-16"
    >
      <div v-if="!haveHeader" class="col-span-3">
        <SectionsUniversitySidebar v-if="haveHeader" :data="data[0]" />
        <div id="otm_related_programs" />
      </div>
      <div :class="haveHeader ? 'col-span-12' : '!col-span-9'">
        <SectionsUniversityHeader
          v-if="haveHeader"
          :card="{
            title: data[0]?.name,
            avatar: data[0]?.logo_url,
            background: data[0]?.image_url,
          }"
          :initial="initialActive"
          :list="universityTabsList"
          v-bind="{ active }"
          @navigate="navigateToApplicationCreate"
          @on-tab-change="onTabChange"
        >
          <NuxtPage />
        </SectionsUniversityHeader>
        <NuxtPage v-if="!haveHeader" :sidebar-data="data[0]" />
        <div
          v-if="route.params.program"
          class="step-shadow w-full rounded-2xl bg-white px-4 lg:px-6 py-3 lg:py-4 mt-5 flex flex-col md:flex-row sm:justify-end"
        >
          <UIButton
            class="w-full sm:w-auto"
            text="send_to_apply_edu"
            @click="getVuzId"
          />
        </div>
      </div>
    </div>
    <div id="next_related_programs" />
  </div>
</template>
<script lang="ts" setup>
import { universityTabsList } from '~/data/university'
import { useAuthStore } from '~/store/auth'
import { cabinetStore } from '~/store/cabinet'
import { useUniversityStore } from '~/store/university'

const { $event } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const universityStore = useUniversityStore()
const authStore = useAuthStore()
const store = cabinetStore()
const tokens = authStore.getTokens()

const haveHeader = ref(false)

const active = computed(() => {
  const tab = route.name?.split('-')[2]
  return tab || universityTabsList[0].value
})

const { data, error } = await useAsyncData('fetchSingleUniversity', () =>
  universityStore.fetchSingle(route.params.slug)
)

const initialActive = computed(() => {
  const foundData = universityTabsList?.find(
    (item) => item.value === active.value
  )

  // find index and return
  return foundData ? universityTabsList.indexOf(foundData) : 0
})

if (error.value) {
  showError({ statusCode: 404 })
}

function getVuzId() {
  store.setProgramId(String(route.params.program))

  // check auth
  if (Object.keys(authStore.user).length === 0) {
    return $event('open-auth', 'login')
  }

  router.push('/cabinet/edit')
}

watch(
  route,
  (newRoute) => {
    const routes = [
      'universities-slug-program-id',
      'universities-slug-grant-id',
    ]
    haveHeader.value = !routes.includes(newRoute.name)
  },
  { immediate: true }
)

useSeoMeta({
  title: data.value[0]?.name,
  description: data.value[0]?.description,
  twitterTitle: data.value[0]?.name,
  twitterDescription: data.value[0]?.description,
  ogTitle: data.value[0]?.name,
  ogDescription: data.value[0]?.description,
  ogImage: data.value[0]?.image_url,
  twitterImage: data.value[0]?.image_url,
})

useHead({
  link: [
    {
      rel: 'icon',
      href: data.value[0]?.logo_url,
      type: 'image/x-icon',
    },
  ],
})

const onTabChange = (tab: string) => {
  router.push(`/universities/${route.params.slug}/${tab}`)
}

const navigateToApplicationCreate = () => {
  if (!tokens.access || !tokens.refresh) {
    return $event('open-auth', 'login')
  } else {
    const uni = data.value?.[0]

    if (uni) {
      const query = {
        countryId: uni?.country_id?.id,
        countryName: uni?.country_id?.name,
        universityId: uni?.id,
        universityName: uni?.name,
      }

      router.push({ name: 'application-create', query })
    } else {
      router.push({ name: 'application-create' })
    }
  }
}
</script>
