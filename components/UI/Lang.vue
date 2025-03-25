<template>
  <ul
    v-for="item of languagesList"
    :key="item.code"
    :class="customClass"
    class="transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl hover:bg-white-200 flex-center-between !w-fit"
    @click="handleLocaleChange(item?.code)"
  >
    <li
      :class="[{ '!text-dark': currentLanguage?.code === item?.code }]"
      class="text-xs leading-20 font-medium text-dark/40 list-none uppercase cursor-pointer hover:text-primary transition-300"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useLanguageSwitcher } from '~/composables/useLanguageSwitcher'

interface Props {
  listStyle?: string
  customClass: string
}

defineProps<Props>()

const { t } = useI18n()

const route = useRoute()

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()

onMounted(() => {
  // Add beforeunload event listener
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  // Remove beforeunload event listener
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

function handleBeforeUnload(event: BeforeUnloadEvent) {
  if (
    route.fullPath === '/cabinet/edit' ||
    route.fullPath === '/application/create'
  ) {
    event.preventDefault()
    event.returnValue = '' // This triggers the browser confirmation dialog.
  }
}

const isShown = ref(false)

const handleLocaleChange = (code: string) => {
  if (
    route.fullPath.includes('/cabinet/edit') ||
    route.fullPath.includes('/application')
  ) {
    const userConfirmed = confirm(t('unsaved_changes'))
    if (userConfirmed) {
      changeLocale(code)
    }
  } else {
    changeLocale(code)
  }
}
</script>
