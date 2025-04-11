import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { LoginBody, LoginResponse } from '~/server/api/login'
import type { RegisterBody } from '~/server/api/registerUser'

export const authStore = defineStore('authState', () => {
  const cookie = useCookie('session')
  const session = ref(cookie.value)
  const isLoggedIn = ref(!!session.value)

  watch(session, (newValue) => {
    cookie.value = newValue
    console.log('cookie.value', cookie.value)
    isLoggedIn.value = !!newValue
  })

  async function logIn(credentials: string): Promise<void> {
    let loginError = ''
    const input: LoginBody = {
      client_id: credentials,
    }
    const res = await $fetch<LoginResponse>('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
      onResponseError: ({ response }) => {
        loginError = response._data.message
      },
    })

    if (loginError) {
      throw new Error(loginError)
    }

    session.value = res.token
  }

  async function registerUser(credential: string): Promise<void> {
    let registerError = ''
    const input: RegisterBody = {
      credential: credential,
    }

    const res = await $fetch<LoginResponse>('/api/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
      onResponseError: ({ response }) => {
        registerError = response._data.message
      },
    })

    if (registerError) {
      throw new Error(registerError)
    }

    session.value = res.token
  }

  async function logOut() {
    const router = useRouter()
    session.value = null
    router.push('/login')
  }

  return {
    isLoggedIn,
    logIn,
    registerUser,
    logOut,
  }
})
