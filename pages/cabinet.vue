<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div
      class="container py-6 pb-16 grid grid-cols-1 lg:grid-cols-3 space-y-6 lg:space-y-0 lg:gap-6 items-start"
    >
      <UISidebarTabs
        v-if="
          !useRouter().currentRoute.value.fullPath.includes('/cabinet/edit')
        "
        v-bind="{ tabs }"
        @logout="logoutModal"
      />
      <NuxtPage class="col-span-2"></NuxtPage>

      <Modal
        :show="showLogoutModal"
        :title="''"
        body-class="!max-w-[516px] !overflow-visible"
        class="logOut !w-[378px]"
        :title-style="'logout_title !text-2xl !font-bold !leading-120'"
        @close="close"
      >
        <div class="px-5 pb-5">
          <div class="gap-3">
            <div class="flex items-center justify-center pb-5">
              <span
                class="text-center !bg-[#E94720] icon-logout text-6xl text-white rounded-full p-6"
              ></span>
            </div>
            <h3
              class="text-center text-dark font-semibold leading-130 text-xl mb-1"
            >
              {{ $t('log_out') }}
            </h3>
            <p
              class="logout_subtitle text-center text-gray-100 text-sm leading-130 mb-8"
            >
              {{ $t('confirm_log_out') }}
            </p>
            <div class="flex gap-4">
              <UIButton
                :text="$t('cancel')"
                class="w-full cursor-pointer !px-12"
                main-class="whitespace-nowrap"
                variant="outline"
                @click="showLogoutModal = false"
              />
              <UIButton
                :text="$t('log_out')"
                class="w-full cursor-pointer !bg-orange !px-12"
                variant="primary"
                main-class="whitespace-nowrap"
                @click="handleLogout"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'

const store = useAuthStore()

const showLogoutModal = ref(false)

const handleLogout = () => {
  showLogoutModal.value = false // Close the modal
  store.logOut() // Call the logout function from your store
}

const close = () => {
  showLogoutModal.value = false
}

const logoutModal = (e: any) => {
  if (e === '') {
    showLogoutModal.value = true
  }
}

const { t } = useI18n()

const tabs = [
  {
    title: 'personal_info',
    icon: 'icon-user',
    link: '/cabinet',
  },
  {
    title: 'contact_info',
    icon: 'icon-clipboard-text',
    link: '/cabinet/contact',
  },
  {
    title: 'edu_skills',
    icon: 'icon-star-transparent',
    link: '/cabinet/edu-skills',
  },
  // {
  //   title: 'where_study',
  //   icon: 'icon-current-location',
  //   link: '/cabinet/where-study',
  // },
  // {
  //   title: 'additional_documents',
  //   icon: 'icon-files',
  //   link: '/cabinet/form-education',
  // },
  // {
  //   title: 'motivation_text',
  //   icon: 'icon-file-text',
  //   link: '/cabinet/motive-letter',
  // },
  {
    title: 'my_services',
    icon: 'icon-heart !text-lg',
    link: '/cabinet/my-services',
  },
  {
    title: 'my_applications',
    icon: 'icon-file-text',
    link: '/cabinet/my-applications',
  },
  {
    title: 'my_grants',
    icon: 'icon-file-star',
    link: '/cabinet/my-grants',
  },
  {
    title: 'my_cards',
    icon: 'icon-credit-card',
    link: '/cabinet/my-cards',
  },
  {
    title: 'log_out',
    icon: 'icon-logout !text-[#E94720]',
    link: '',
  },
]



const breadcrumbRoutes = computed(() => [
  {
    title: t('personal_account'),
    link: '/cabinet',
  },
])
</script>
