type AuthState = {
  isLoggedIn: boolean
}
export const useAuthState = () => useState<AuthState>('auth', () => {
  const cookie = useCookie('session');
  return {
    isLoggedIn: !!cookie.value
  }
});