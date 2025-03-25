<template>
  <Modal
    :title="titles?.[innerState]"
    body-class="!max-w-[396px]"
    close-button-style="-mt-4 -mr-4 !w-10 !h-10"
    close-icon-class="!text-2xl"
    disable-outer-close
    title-style="!text-2xl"
    v-bind="{ show }"
    @close="
      () => {
        $emit('close')
        innerState = 'login'
        clearLogin()
        clearRegister()
      }
    "
  >
    <div class="p-8 pt-0">
      <SectionsAuthLogin
        v-if="innerState === ESTATE.login"
        :form="loginForm"
        :loading="loginBtnLoading"
        @password="toReset"
        @register="innerState = ESTATE.register"
        @on-submit="onLogin"
      />
      <SectionsAuthRegister
        v-if="innerState === ESTATE.register"
        v-model="registerForm"
        :loading="regLoading"
        @login="innerState = ESTATE.login"
        @on-register="onRegister"
      />
      <SectionsAuthConfirmation
        v-if="innerState === ESTATE.codeConfirmation"
        :form="confirmationCode"
        @edit="innerState = ESTATE.register"
        @on-confirm="OnConfirm"
      />
      <SectionsAuthResetPassword
        v-if="innerState === ESTATE.password"
        @login="resetDone"
        @register="innerState = ESTATE.register"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { email, minLength, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'

const { showToast } = useCustomToast()
const store = useAuthStore()

export type AuthState = 'login' | 'register' | 'codeConfirmation' | 'password'

interface Props {
  show?: boolean
  state?: AuthState
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])
const { t } = useI18n()

const innerState = ref(props.state)
const regLoading = ref(false)
const loginBtnLoading = ref(false)

enum ESTATE {
  login = 'login',
  register = 'register',
  codeConfirmation = 'codeConfirmation',
  password = 'password',
}

const titles = {
  login: t('login'),
  register: t('registration'),
  codeConfirmation: t('code_confirmation'),
  password: t('reset_password'),
}

const loginForm = useForm(
  {
    email: '',
    password: '',
  },
  {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  }
)

const registerForm = useForm(
  {
    lastname: '',
    firstname: '',
    email: '',
    country_id: '',
    country: '',
    password: '',
    confirm: '',
    checked: false,
  },
  {
    lastname: {
      required,
    },

    firstname: {
      required,
    },
    email: {
      required,
      email,
    },
    country_id: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirm: {
      required,
      sameAs: (val: string) => {
        return val === registerForm.values.password
      },
      minLength: minLength(8),
    },
    checked: {
      sameAs: (val: boolean) => {
        return val
      },
    },
  }
)
const confirmationCode = useForm(
  {
    code: '',
    session:
      typeof window !== 'undefined' && localStorage.getItem('session')
        ? localStorage.getItem('session')
        : '',
    email: registerForm.values.email,
    password: registerForm.values.password,
  },
  {
    code: {
      required,
    },
    session: {
      required,
    },
  }
)

function toReset() {
  clearLogin()
  innerState.value = ESTATE.password
}

async function onLogin() {
  try {
    loginBtnLoading.value = true
    await store.login(loginForm.values)
    emit('close')
    clearLogin()
    showToast(t('success_messages.login'), 'success')
    loginBtnLoading.value = false
  } catch (err) {
    loginBtnLoading.value = false
    showToast(err?._data?.detail, 'error')
  }
}

function onRegister() {
  const obj = { ...registerForm.values }
  delete obj.confirm_pasword
  delete obj.checked
  delete obj.country
  obj.country_id = registerForm.values.country_id.id
  regLoading.value = true
  useApi()
    .$post(`/auth/register`, {
      body: {
        ...obj,
      },
    })
    .then((res) => {
      showToast(t('success_messages.registration'), 'success')
      localStorage.setItem('session', res?.session)
      confirmationCode.values.email = obj.email
      confirmationCode.values.session = res.session
      innerState.value = ESTATE.codeConfirmation
    })
    .catch((err) => {
      showToast(err?._data?.detail, 'error')
      if (err.status == 400) {
        confirmationCode.values.email = obj.email
        confirmationCode.values.session = err.session
        innerState.value = ESTATE.codeConfirmation
      }
    })
    .finally(() => {
      regLoading.value = false
    })
}

function clearRegister() {
  for (const key in registerForm.values) {
    registerForm.values[key] = ''
  }
  registerForm.values.checked = false
  registerForm.$v.value.$reset()
}

function clearLogin() {
  loginForm.values.email = ''
  loginForm.values.password = ''
  loginForm.$v.value.$reset()
}

function resetDone(e: { email: string; password: string }) {
  loginForm.values.email = e.email
  loginForm.values.password = e.password
  innerState.value = ESTATE.login
}

function OnConfirm(code: { email: string; otp_code: string; session: string }) {
  useApi()
    .$post(`/auth/register/confirm`, {
      body: {
        ...code,
      },
    })
    .then(() => {
      clearRegister()
      showToast(t('success_messages.registration'), 'success')
      innerState.value = ESTATE.login
    })
    .catch((err) => {
      showToast(err._data.detail, 'error')
    })
    .finally(() => {
      regLoading.value = false
    })
}

// watch(
//   () => props.show,
//   () => {
//     if (!props.show) {
//       // state.value = ESTATE.login
//       state.value = null
//     }
//     clearLogin()
//     clearRegister()
//   }
// )

// watch(
//   () => props.state,
//   () => {
//     innerState.value = 'login'
//   }
// )
</script>
