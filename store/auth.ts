import { defineStore } from 'pinia'

import type {
  TAuthTokens,
  TCheckEmailData,
  TRequestOtpData,
} from '~/types/auth'
import type { IUser } from '~/types/profile'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {} as IUser,
    userLoading: false,
    userFallback: {} as TRequestOtpData,
  }),
  actions: {
    async authInit() {
      this.getTokens()
      if (!this.accessToken && !this.refreshToken) {
        return
      }
      try {
        if (this.refreshToken) {
          await this.getProfile()
        }
      } catch (e) {}
    },
    getProfile() {
      return new Promise((resolve, reject) => {
        this.userLoading = true
        useApi()
          .$get(`/auth/profile`)
          .then((res) => {
            this.user = res
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.userLoading = false
          })
      })
    },
    setTokens(payload: TAuthTokens) {
      if (payload?.access_token) {
        const access = useCookie('access_token')
        access.value = payload.access_token
        this.accessToken = payload.access_token
      }
      if (payload?.refresh_token) {
        const refresh = useCookie('refresh_token')
        refresh.value = payload.refresh_token
        this.refreshToken = payload.refresh_token
      }
    },
    getTokens() {
      const access = useCookie('access_token')
      const refresh = useCookie('refresh_token')
      this.accessToken = access.value
      this.refreshToken = refresh.value
      return { access: access.value, refresh: refresh.value }
    },
    login(payload: Record<string, unknown>) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post('/auth/login', {
            body: {
              ...payload,
            },
          })
          .then(async (res) => {
            await this.setTokens(res)
            await this.getProfile()
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    logOut() {
      const $route = useRoute()
      const $router = useRouter()
      if ($route.path.includes('/profile')) {
        $router.push('/')
      }
      $router.push('/')
      this.user = {} as IUser
      this.accessToken = ''
      this.refreshToken = ''
      const access = useCookie('access_token')
      access.value = null
      const refresh = useCookie('refresh_token')
      refresh.value = null
    },
    checkAccount(email: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<TCheckEmailData>('/auth/reset-password/entrypoint', {
            body: {
              email,
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    requestOtp(email: string) {
      return new Promise((resolve, reject) => {
        const secret = useCookie('client_secret_id')
        useApi()
          .$post<TRequestOtpData>('/verification/request-otp/', {
            body: {
              type: 'email',
              address: email,
              purpose: 'reset_password',
              client_secret: secret.value,
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    submitOtp(otp: number, session: string, email: string) {
      // const secret = useCookie('client_secret_id')
      return new Promise((resolve, reject) => {
        useApi()
          .$post('/auth/reset-password/confirm', {
            body: {
              email,
              otp_code: otp,
              session,
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    resetPassword(
      email: string,
      password: string,
      confirmPassword: string,
      session: string
    ) {
      // const secret = useCookie('client_secret_id')
      return new Promise((resolve, reject) => {
        useApi()
          .$post('/auth/reset-password', {
            body: {
              email,
              session,
              new_password: password,
              new_password_confirm: confirmPassword,
            },
          })
          .then(async (res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
