<template>
  <div>
    <NuxtLayout>
      <div>
        <NuxtPage transition />
      </div>
    </NuxtLayout>
    <ModalAuth :key="state" v-bind="{ show, state }" @close="show = false" />
  </div>
</template>

<script setup>
import { useClientSecret } from '~/composables/useClientSecret'
import { useAuthStore } from '~/store/auth'

const route = useRoute()
const store = useAuthStore()
const { init } = useClientSecret()

const { $listen } = useNuxtApp()

const show = ref(false)
const state = ref('login')
const locale = useCookie('locale')

onMounted(async () => {
  await $listen('open-auth', (e) => {
    state.value = e
    show.value = true
  })
  store.authInit()
})
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

onMounted(() => {
  if (process.client) {
    if (!locale.value) {
      useCookie('locale').value = 'en'
      useCookie('django_language').value = null
    }
  }
})
</script>
