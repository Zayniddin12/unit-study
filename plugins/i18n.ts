import { createI18n } from 'vue-i18n'

import en from '@/i18n/en.json'
import ru from '@/i18n/ru.json'
import uz from '@/i18n/uz.json'

const messages = {
  uz,
  ru,
  en,
}
export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: useCookie('locale').value ?? 'ru',
    messages,
  })

  vueApp.use(i18n)
})
