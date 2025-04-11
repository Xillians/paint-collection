import type { LoginBody, LoginResponse } from '~/server/api/login'
import type { RegisterBody } from '~/server/api/registerUser'

export function useAuthState() {
  const cookie = useCookie('session')
  const isLoggedIn = ref(!!cookie.value)
  let loginError = ''

  async function logIn(credentials: string): Promise<void> {
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

    const session = useCookie('session', { maxAge: res.maxAge, secure: true, httpOnly: false })
    session.value = res.token
    isLoggedIn.value = true
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

    const session = useCookie('session', { maxAge: res.maxAge, secure: true, httpOnly: false })
    session.value = res.token
    isLoggedIn.value = true
  }
  async function logOut() {
    const router = useRouter()
    isLoggedIn.value = false
    const session = useCookie('session')
    session.value = null
    router.push('/login')
  }

  return {
    isLoggedIn: computed(() => isLoggedIn.value),
    logIn,
    registerUser,
    logOut,
  }
}
