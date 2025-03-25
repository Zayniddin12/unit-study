import { isJwtExpired } from 'jwt-check-expiration'
import type { NitroFetchRequest } from 'nitropack'
import type { FetchOptions } from 'ofetch'

import { useCustomToast } from '~/composables/useCustomToast'
import { useAuthStore } from '~/store/auth'
import { errorHandler } from '~/utils'

export const useApi = (apiUrl?: string) => {
  const baseURL = apiUrl || (import.meta.envvisitorId.VITE_API_BASE_URL as string)
  const locale = useCookie('locale')
  const loading = ref(false)
  const { $fingerprint } = useNuxtApp()
  const token = useCookie('access_token')
  const store = useAuthStore()
  const { showToast } = useCustomToast()
  const  = useCookie('visitor-id')

  const isExpired = ref(false)

  const headers = {}

  onMounted(async () => {
    const fp = await $fingerprint
    const result = await fp.get()
    if (!visitorId.value) {
      visitorId.value = result.visitorId
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  })

  if (token.value) {
    isExpired.value = isJwtExpired(token.value)
    Object.assign(headers, {
      Authorization: 'Bearer ' + token.value || store.accessToken,
    })
  }

  function $service(options?: FetchOptions) {
    return $fetch.create({
      ...options,
      baseURL,
      headers: {
        ...options?.headers,
        'Accept-Language': locale.value || 'en',
        'Device-Id': visitorId.value,
        ...headers,
      },
      onResponseError({ response: { status } }): Promise<void> | void {
        if (status === 401 || status === 403) {
          token.value = undefined
          Object.assign(headers, {
            Authorization: undefined,
          })
          store.logOut()
        }
      },
    })
  }

  function $get<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      loading.value = true
      $service(options)(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (
            error.response?.status !== 401 &&
            error.response?.status !== 403
          ) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $post<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'POST' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (
            error.response?.status !== 401 &&
            error.response?.status !== 403
          ) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $put<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'PUT' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (
            error.response?.status !== 401 &&
            error.response?.status !== 403
          ) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $patch<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'PATCH' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status !== 401 && error.response.status !== 403) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $delete<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'DELETE' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status !== 401 && error.response.status !== 403) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  return {
    loading,
    baseURL,
    $get,
    $post,
    $put,
    $patch,
    $delete,
  }
}
