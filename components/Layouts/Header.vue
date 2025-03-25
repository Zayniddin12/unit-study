<template>
  <header
    class="sticky top-0 left-0 w-full !z-50 py-4 transition-300 bg-white header-shadow"
  >
    <nav class="container flex items-center">
      <div class="cursor-pointer mr-3 lg:hidden" @click="showMobileHeader">
        <i class="icon-burger text-[28px]"></i>
      </div>
      <NuxtLink to="/">
        <img
          alt="logo"
          class="w-[92px] h-10 md:w-[119px] md:h-[52px] relative z-10"
          src="/images/logo.svg"
        />
      </NuxtLink>

      <LayoutsBottomHeader />

      <div class="ml-auto flex items-center">
        <div class="md:ml-5 flex items-center gap-x-4">
          <div class="flex-y-center gap-2 lg:mr-2">
            <UILang custom-class="!hidden lg:!block" />
          </div>

          <UIButton
            :text="$t('contact_us_btn')"
            class="hidden lg:block !text-sm"
            variant="outline"
            @click="navigateTo('/contact')"
          />

          <UIDropdown
            v-if="isAuthenticated"
            list-style="!min-w-[210px] !min-h-[137px] !top-16 absolute right-0 !z-[999]"
            @change="handleChange"
            @click="handleOutsideClick"
            @outside-click="handleOutsideClick"
          >
            <template #head>
              <div class="flex items-center">
                <img
                  v-if="store?.user?.image_1920_url"
                  :src="store?.user?.image_1920_url"
                  alt="store"
                  class="object-cover w-11 h-11 rounded-full border border-gray-100/30"
                />
                <img
                  v-else
                  alt="Default image"
                  class="object cover w-11 h-11 rounded-full border"
                  src="/images/profile/DefaultImage.svg"
                />
                <div class="ml-1 sm:ml-3">
                  <p
                    class="text-dark text-sm md:text-base font-bold leading-5 text-left"
                  >
                    {{ store.user?.first_name }}
                  </p>
                  <p
                    class="text-dark text-sm md:text-base font-bold leading-5 text-left"
                  >
                    {{ store.user?.last_name }}
                  </p>
                </div>
              </div>
            </template>
            <div
              v-for="item of profileLinks"
              :key="item.id"
              class="py-2.5 pl-3 pr-2.5 transition-colors max-w-sm w-full duration-300 first:rounded-t-xl last:rounded-b-xl hover:bg-white-200 flex-center-between hover:bg-gray-50"
              @click="$router.push(item.url)"
            >
              <div class="flex items-center gap-2">
                <i
                  :class="item.icon"
                  class="text-xl text-dark size-8 rounded-lg flex-center bg-gray"
                />
                <div class="text-sm leading-20 font-medium text-dark">
                  {{ item.title }}
                </div>
              </div>
            </div>
            <div
              class="py-2.5 pl-3 pr-2.5 transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl hover:bg-red/5 flex-center-between"
              @click="showLogoutModal = true"
            >
              <div class="flex items-center gap-2">
                <i
                  class="text-xl text-red size-8 rounded-lg flex-center bg-gray icon-logout"
                />

                <span class="text-sm leading-20 font-medium text-dark">
                  {{ $t('log_out') }}</span
                >
              </div>
            </div>
          </UIDropdown>

          <div v-else class="flex items-center md:space-x-6">
            <UIButton
              :text="$t('login')"
              class="max-sm:text-sm max-sm:py-2.5 !text-xs md:!text-base"
              icon="icon-logout text-20 font-bolg"
              @click="loginToApplication"
            />
          </div>
        </div>
      </div>
    </nav>

    <Transition name="from-left">
      <LayoutsMobileHeader
        v-if="isShown && !showSearch"
        :links="headerMenu"
        @close-mobile-header="onCloseMobileHeader"
      />
    </Transition>

    <ModalLogout v-model="showLogoutModal" @close="close" />
  </header>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { headerMenu } from '~/data'
import { useAuthStore } from '~/store/auth'

const store = useAuthStore()
const { t } = useI18n()
const isActive = ref(false)
const isShown = ref(false)
const showLogoutModal = ref(false)
const router = useRouter()
const isClicked = ref(false)
const showSearch = ref(false)

const isAuthenticated = computed(() =>
  Boolean(Object.values(store.user).length)
)

const profileLinks = [
  {
    id: 1,
    url: '/cabinet',
    title: t('profile_link'),
    icon: 'icon-profile-circle',
  },
  {
    id: 2,
    url: '/application/create',
    title: t('submit_your_application'),
    icon: 'icon-file-text',
  },
  {
    id: 3,
    url: '/cabinet/my-services',
    title: t('my_services'),
    icon: 'icon-heart !text-base',
  },
  {
    id: 4,
    url: '/cabinet/my-applications',
    title: t('my_applications'),
    icon: 'icon-clipboard-text',
  },
  {
    id: 5,
    url: '/cabinet/my-grants',
    title: t('my_grants'),
    icon: 'icon-file-star',
  },
  {
    id: 6,
    url: '/cabinet/my-cards',
    title: t('my_cards'),
    icon: 'icon-credit-card',
  },
]

const showMobileHeader = () => {
  if (process.client) {
    document.body.style.overflow = 'hidden'
    isShown.value = true
  }
}

const onCloseMobileHeader = () => {
  if (process.client) {
    document.body.style.overflow = 'auto'
    isShown.value = false
  }
}

const loginToApplication = () => {
  isClicked.value = true
  if (!Object.keys(store.user).length) {
    return $event('open-auth', 'login')
  }
  router.push({ path: '/cabinet/edit' })
}
const { $event } = useNuxtApp()

const handleChange = () => {
  isActive.value = true
}

const close = () => {
  showLogoutModal.value = false
}

const handleOutsideClick = () => {
  isShown.value = false
}
</script>

<style scoped>
.router-link-active {
  color: #0067ff;
}

.from-left-enter-active {
  animation: from-left 300ms ease-out;
}

.from-left-leave-active {
  animation: from-left 300ms ease-in reverse;
}

@keyframes from-left {
  0% {
    opacity: 0;
    transform: translateX(-100%) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.header-shadow {
  box-shadow: 0 4px 20px 0 rgba(21, 21, 21, 0.15);
}
</style>
