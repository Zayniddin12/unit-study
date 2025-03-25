import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const tokens = authStore.getTokens()
  if (!tokens.access || !tokens.refresh) {
    return navigateTo('/', { redirectCode: 301 })
  }
  // await authStore.refreshTokens()
  // return abortNavigation()
})
