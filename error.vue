<template>
  <div class="relative overflow-y-hidden h-screen w-full">
    <LayoutsHeader />
    <div
      class="container h-screen relative flex items-center max-md:flex-col max-md:mt-10 max-md:gap-2 z-10"
    >
      <div class="main__content relative ml-20">
        <p class="title">404</p>
        <p class="subtitle">{{ $t('temporarily_unavailable') }}</p>
        <NuxtLink to="/">
          <UIButton
            class="px-14 py-3"
            variant="primary"
            :text="$t('back_to_home')"
          ></UIButton>
        </NuxtLink>
      </div>
      <div class="error_img">
        <img src="/images/img.png" alt="404" />
      </div>
    </div>
    <ModalAuth :key="state" v-bind="{ show, state }" @close="show = false" />
    <img
      src="/images/web.png"
      alt="decoration"
      class="absolute w-full sm:h-1/2 h-full bottom-0 left-0"
    />
  </div>
</template>

<script setup>
import { useClientSecret } from '~/composables/useClientSecret'
import { useAuthStore } from '~/store/auth'
import { useCommonStore } from '~/store/common'

const route = useRoute()
const store = useAuthStore()
const commonStore = useCommonStore()
const { init } = useClientSecret()
defineProps(['error'])
const { $listen } = useNuxtApp()

const show = ref(false)
const state = ref('login')

$listen('open-auth', (e) => {
  state.value = e
  commonStore.fetchCountries().then(() => {
    show.value = true
  })
})
const data = useAsyncData('init', async () => await store.authInit())
onMounted(() => {
  if (process.client) {
    init()
  }
})

if ('setup' in route.query) {
  throw new Error('error in setup')
}
if ('mounted' in route.query) {
  onMounted(() => {
    throw new Error('error in mounted')
  })
}
</script>

<style scoped>
header {
  top: 0;
  background: white;
}
.title {
  color: #f24e91;
  font-size: 172px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  font-family: Inter;
}
.main__content {
  width: 571px;
  align-content: start;
  margin-left: 100px;
}
.subtitle {
  color: #2b2b2b;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  margin-top: 20px;
  margin-bottom: 24px;
  width: 479px;
}
.error_img {
  margin-bottom: -79px;
  right: 14px;
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 36px;
  }
  .main__content {
    width: 100%;
    margin-left: 0;
    z-index: 20;
  }
  .subtitle {
    width: 100%;
  }
}
</style>
