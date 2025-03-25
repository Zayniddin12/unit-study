import { useI18n } from 'vue-i18n'

export const useLanguageSwitcher = () => {
  const { locale } = useI18n()

  const languagesList = [
    {
      name: 'Ru',
      code: 'ru',
    },
    {
      name: 'Uz',
      code: 'uz',
    },
    {
      name: 'Eng',
      code: 'en',
    },
  ]

  const currentLanguage = computed(() =>
    languagesList.find((lang) => lang.code === locale.value)
  )

  function changeLocale(_locale: string) {
    if (process.client) {
      useCookie('locale').value = _locale
      locale.value = _locale
      window.location.reload()
    }
  }

  return { currentLanguage, languagesList, changeLocale }
}
