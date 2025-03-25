import FingerprintJS from '@fingerprintjs/fingerprintjs'

export default defineNuxtPlugin(async (nuxtApp) => {
  const fpPromise = await FingerprintJS.load()

  nuxtApp.provide('fingerprint', fpPromise)
})
